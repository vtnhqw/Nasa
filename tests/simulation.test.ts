import {describe,it,expect} from 'vitest';
import {simulate,KITS} from '../src/lib/simulation';
const loc={lat:18.44,lon:77.45};
describe('habitat mass and energy model',()=>{
 it('is deterministic with 120 sols plus initial state',()=>{const a=simulate(KITS[2],loc);expect(a).toEqual(simulate(KITS[2],loc));expect(a.states.length).toBe(121);expect(a.states.at(-1)?.sol).toBe(120)});
 it('consumes resources, respecting capacity and no negative reserves',()=>{const r=simulate(KITS[2],loc);expect(r.states[1].foodKg).toBeLessThan(r.states[0].foodKg);expect(r.states.every(s=>s.waterKg>=0&&s.oxygenKg>=0&&s.batteryKWh>=0&&s.batteryKWh<=KITS[2].batteryCapacity)).toBe(true)});
 it('fails when food is depleted',()=>{const r=simulate({...KITS[2],foodKg:0},loc);expect(r.states.at(-1)?.survivalStatus).toBe('failed');expect(r.states.at(-1)?.failureReason).toContain('Food')});
 it('never produces oxygen without power',()=>{const r=simulate({...KITS[2],solarKw:0,batteryCapacity:0,lifeSupportKw:0,heatingKw:0},loc);expect(r.states[1].oxygenKg).toBeLessThan(r.states[0].oxygenKg)});
 it('uses different kits and attenuates sunlight during storm',()=>{expect(simulate(KITS[0],loc)).not.toEqual(simulate(KITS[2],loc));const clear=simulate(KITS[2],loc);const storm=simulate({...KITS[2],dust:true},loc);expect(storm.states[25].powerGeneratedKWh).toBeLessThan(clear.states[25].powerGeneratedKWh)});
 it('bounds recycling and rejects invalid inputs',()=>{expect(()=>simulate({...KITS[2],recycling:1.1},loc)).toThrow();expect(()=>simulate({...KITS[2],solarKw:NaN},loc)).toThrow()});
 it('is finite at poles and timeline states are stable',()=>{const r=simulate(KITS[2],{lat:90,lon:0});expect(r.states.every(s=>Number.isFinite(s.powerGeneratedKWh))).toBe(true);expect(r.states[0]).toEqual(simulate(KITS[2],{lat:90,lon:0}).states[0])});
});
