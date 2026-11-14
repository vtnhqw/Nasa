"""Fetch public scientific products, preserving URLs and hashes. No invented fallback."""
import argparse, hashlib, json, subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'data_pipeline' / 'raw'
PDS = 'https://pds-geosciences.wustl.edu/mgs/mgs-m-mola-5-megdr-l3-v1/mgsl_300x/meg004/'
TREK = 'https://trek.nasa.gov/tiles/Mars/EQ/'
LAYERS = {'imagery': 'Mars_Viking_MDIM21_ClrMosaic_global_232m', 'thermal': 'TES_Thermal_Inertia', 'jezero': 'JEZ_ctx_B_soc_008_orthoMosaic_6m_Eqc_latTs0_lon0'}
def fetch(url, name):
    path = RAW / name
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        subprocess.run(['curl','--fail','--location','--retry','2','--max-time','60',url,'-o',str(path)],check=True,stdout=subprocess.DEVNULL)
    return path

def main():
    p=argparse.ArgumentParser();p.add_argument('--all',action='store_true');args=p.parse_args()
    for ext in ['img','lbl']: fetch(PDS+'megt90n000cb.'+ext,'megt90n000cb.'+ext)
    fetch('https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_waypoints.json','M20_waypoints.json')
    for key in ['imagery','thermal','jezero']:
        layer=LAYERS[key]; fetch(TREK+layer+'/1.0.0/WMTSCapabilities.xml',key+'.xml')
        level={'imagery':2,'thermal':1,'jezero':12}[key]
        rows=range(2**level) if key!='jezero' else range(1626,1631)
        cols=range(2**(level+1)) if key!='jezero' else range(5856,5862)
        for row in rows:
            for col in cols:
                ext='jpg' if key=='imagery' else 'png'
                fetch(f'{TREK}{layer}/1.0.0/default/default028mm/{level}/{row}/{col}.{ext}',f'{key}/{level}_{row}_{col}.{ext}')
    inventory={str(f.relative_to(RAW)):hashlib.sha256(f.read_bytes()).hexdigest() for f in RAW.rglob('*') if f.is_file()}
    (RAW/'sha256.json').write_text(json.dumps(inventory,indent=2))
if __name__=='__main__': main()
