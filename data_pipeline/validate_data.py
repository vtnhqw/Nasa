"""Offline validation of asset checksums and MOLA layout."""
import hashlib
import json
import struct
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / 'public/data/manifest.json').read_text())
for d in manifest['datasets']:
    if not d.get('installed'):
        continue
    path = ROOT / 'public' / d['asset'].lstrip('/')
    content = path.read_bytes()
    assert len(content) == d['bytes'], f'Size mismatch: {path}'
    assert hashlib.sha256(content).hexdigest() == d['sha256'], f'Checksum mismatch: {path}'
    print(f"PASS {d['id']}: {len(content):,} bytes, SHA-256 verified")
meta = json.loads((ROOT / 'public/data/mola/grid.json').read_text())
raw = (ROOT / 'public' / meta['asset'].lstrip('/')).read_bytes()
assert len(raw) == meta['width'] * meta['height'] * 2
values = struct.unpack('<' + str(meta['width'] * meta['height']) + 'h', raw)
assert min(values) == meta['min'] and max(values) == meta['max']
assert meta['west'] == 0 and meta['north'] == 90 and meta['step'] == .25
pois = json.loads((ROOT / 'public/data/science-pois.json').read_text())
assert len(pois) >= 2
assert all(-90 <= p['lat'] <= 90 and -180 <= p['lon'] <= 180 for p in pois)
print('PASS MOLA layout/extrema and POI coordinate bounds')
