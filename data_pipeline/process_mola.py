"""Convert verified MEGDR 4 ppd MSB integer product; no resampling of elevations."""
import hashlib,json
from pathlib import Path
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
RAW=ROOT/'data_pipeline/raw'; OUT=ROOT/'public/data/mola'
def main():
    label=(RAW/'megt90n000cb.lbl').read_text()
    for expected in ['LINE_SAMPLES                 = 1440','LINES                        = 720','MSB_INTEGER','PLANETOCENTRIC','POSITIVE_LONGITUDE_DIRECTION = "EAST"']:
        if expected not in label: raise ValueError('Unexpected source label: '+expected)
    src=RAW/'megt90n000cb.img'; z=np.fromfile(src,dtype='>i2')
    if z.size != 1440*720: raise ValueError('MOLA file truncated or wrong dimensions')
    z=z.reshape(720,1440); OUT.mkdir(parents=True,exist_ok=True)
    z.astype('<i2').tofile(OUT/'elevation.i16')
    (OUT/'source.lbl').write_text(label)
    metadata={'width':1440,'height':720,'west':0,'north':90,'step':0.25,'noData':-32768,'asset':'/data/mola/elevation.i16','cellRegistration':'center','dtype':'int16-le','units':'m','category':'observed','sourceName':'MGS MOLA MEGDR 4 pixels/degree','productName':'MEGT90N000CB.IMG','version':'2.0','sourceUrl':'https://pds-geosciences.wustl.edu/missions/mgs/megdr.html','datum':'IAU2000; GMM3 (mgm1025) areoid, degree/order 50','coordinateSystem':'planetocentric latitude; east-positive longitude','resolution':'0.25 degrees; approximately 14.8 km north-south','observationPeriod':'1997-09-15 through 2001-06-30','processingMethod':'Unmodified median-topography grid; big-endian to little-endian conversion only. Source product fills unobserved bins by interpolation.','limitations':['Coarse global overview only; not suitable for operational astronaut navigation.','Median and archive-interpolated bin values, not a direct observation at each requested point.','Individual rocks and local walkability cannot be resolved.'],'sha256Raw':hashlib.sha256(src.read_bytes()).hexdigest(),'min':int(z.min()),'max':int(z.max())}
    (OUT/'grid.json').write_text(json.dumps(metadata,indent=2))
    # Display-only ramp; quantitative numbers always read the binary raster.
    ramp=np.array([[22,40,76],[34,112,139],[109,152,131],[185,140,84],[210,91,51],[242,217,171]],float)
    t=np.clip((z.astype(float)+8000)/29000,0,1)*(len(ramp)-1); i=t.astype(int); j=np.minimum(i+1,len(ramp)-1)
    rgb=(ramp[i]*(1-(t-i))[...,None]+ramp[j]*(t-i)[...,None]).astype('uint8')
    rgb=np.roll(rgb,720,axis=1) # 0..360 to -180..180
    Image.fromarray(rgb).save(ROOT/'public/textures/mola-elevation.webp',quality=90)
    print(json.dumps({'count':z.size,'min':int(z.min()),'max':int(z.max()),'rawSha256':metadata['sha256Raw']}))
if __name__=='__main__':main()
