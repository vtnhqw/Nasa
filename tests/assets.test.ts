import {expect,it} from 'vitest';
import {assetUrl} from '../src/lib/assets';
it('keeps imagery and nested dataset assets under the Pages repository path',()=>{
 expect(assetUrl('/textures/mars-globe.webp','/Nasa/')).toBe('/Nasa/textures/mars-globe.webp');
 expect(assetUrl('/data/mola/elevation.i16','/Nasa/')).toBe('/Nasa/data/mola/elevation.i16');
 expect(assetUrl('data/manifest.json','/')).toBe('/data/manifest.json');
 expect(assetUrl('https://example.com/data','/Nasa/')).toBe('https://example.com/data');
});
