import {describe,it,expect} from 'vitest';
import {normalizeLon,toVector,fromVector,distanceKm,sampleGrid} from '../src/lib/geo';
const grid={width:4,height:2,west:0,north:90,step:90,noData:-32768,data:new Int16Array([10,20,30,40,50,60,70,80])};
describe('Mars geometry',()=>{
 it('wraps longitude',()=>{expect(normalizeLon(360)).toBe(0);expect(normalizeLon(-181)).toBe(179)});
 it('rejects invalid latitude',()=>expect(()=>toVector({lat:91,lon:0})).toThrow());
 it('round trips globe coordinates',()=>{for(const p of [{lat:18.4446,lon:77.4509},{lat:-4.5895,lon:137.4417},{lat:0,lon:-179}]){const r=fromVector(toVector(p));expect(r.lat).toBeCloseTo(p.lat);expect(r.lon).toBeCloseTo(p.lon)}});
 it('uses Mars radius',()=>expect(distanceKm({lat:0,lon:0},{lat:0,lon:90})).toBeCloseTo(Math.PI*3389.5/2));
 it('samples cell centers and wraps the zero meridian',()=>{expect(sampleGrid(grid,{lat:45,lon:45})).toBe(10);expect(sampleGrid(grid,{lat:45,lon:0})).toBe(25);expect(sampleGrid(grid,{lat:45,lon:360})).toBe(25)});
 it('rejects missing grid, invalid lat and nodata',()=>{expect(sampleGrid(null,{lat:0,lon:0})).toBeNull();expect(sampleGrid(grid,{lat:91,lon:0})).toBeNull();expect(sampleGrid({...grid,data:new Int16Array(8).fill(-32768)},{lat:0,lon:0})).toBeNull()});
});
