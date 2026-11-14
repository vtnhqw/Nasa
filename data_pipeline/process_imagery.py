"""Mosaic WMTS tiles without changing their declared planetocentric registration."""
import json
from pathlib import Path
from PIL import Image
from download_data import ROOT,RAW,LAYERS,TREK

def stitch(key,level,rows,cols,dest):
    canvas=Image.new('RGBA',(len(cols)*256,len(rows)*256))
    for iy,row in enumerate(rows):
        for ix,col in enumerate(cols):
            ext='jpg' if key=='imagery' else 'png'
            with Image.open(RAW/f'{key}/{level}_{row}_{col}.{ext}') as tile:
                if tile.size!=(256,256):raise ValueError('Unexpected tile dimensions')
                canvas.paste(tile.convert('RGBA'),(ix*256,iy*256))
    canvas.save(ROOT/'public/textures'/dest,lossless=key=='thermal',quality=90)
    return canvas

def main():
    stitch('imagery',2,range(4),range(8),'mars-globe.webp')
    if (RAW/'thermal/1_1_3.png').exists():stitch('thermal',1,range(2),range(4),'tes-thermal-inertia.webp')
    if (RAW/'jezero/12_1630_5861.png').exists():
        stitch('jezero',12,range(1626,1631),range(5856,5862),'jezero-ctx.webp')
        bounds={'west':-180+5856*360/8192,'east':-180+5862*360/8192,'north':90-1626*180/4096,'south':90-1631*180/4096}
        (ROOT/'public/data/jezero-imagery.json').write_text(json.dumps({'asset':'/textures/jezero-ctx.webp','bounds':bounds,'width':1536,'height':1280,'sourceUrl':TREK+LAYERS['jezero']+'/1.0.0/WMTSCapabilities.xml','category':'observed','resolution':'WMTS level 12, approximately 10 m/pixel; source CTX mosaic 6 m/pixel','limitations':['Optical image only: no local high-resolution elevation imported.','Does not establish walkability or identify all obstacles.']},indent=2))
    print('Imagery mosaics created')
if __name__=='__main__':main()
