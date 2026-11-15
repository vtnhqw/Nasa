import {it,expect} from 'vitest';
import {analyzeSurvival} from '../src/lib/survivalAnalysis';
import {KITS} from '../src/lib/simulation';
it('explains the first failure and counts completed sols rather than the failed sol',()=>{
 const r=analyzeSurvival({...KITS[2],foodKg:0},{lat:0,lon:0});
 expect(r.completedSols).toBe(0);expect(r.failureSol).toBe(1);expect(r.cause).toBe('food');expect(r.explanation).toContain('food');
});
it('does not promise a longer life when all locations reach the horizon',()=>{
 const r=analyzeSurvival(KITS[2],{lat:0,lon:0});
 expect(r.completedSols).toBe(120);expect(r.failureSol).toBeNull();expect(r.betterSite).toBeNull();
});
it('finds a tested alternative with more modeled survival during polar winter',()=>{
 const r=analyzeSurvival({...KITS[2],seasonLs:270},{lat:80,lon:30});
 expect(r.cause).toBe('power');expect(r.betterSite).not.toBeNull();expect(r.betterSite!.completedSols).toBeGreaterThan(r.completedSols);expect(r.betterSite!.distanceKm).toBeGreaterThan(0);
});
it('does not change survival when only longitude changes',()=>{
 expect(analyzeSurvival(KITS[0],{lat:12,lon:10}).completedSols).toBe(analyzeSurvival(KITS[0],{lat:12,lon:150}).completedSols);
});
