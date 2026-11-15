import type {Location} from '../types';
import {distanceKm} from './geo';
import {simulate,type HabitatConfig} from './simulation';

function outcome(config:HabitatConfig,location:Location){
 const simulation=simulate(config,location),last=simulation.states.at(-1)!;
 const failed=last.survivalStatus==='failed';
 return {simulation,last,completedSols:failed?last.sol-1:120,failureSol:failed?last.sol:null};
}
/** Compare static starting sites with identical reserves. Relocation itself is not modeled. */
export function analyzeSurvival(config:HabitatConfig,location:Location){
 const current=outcome(config,location),reason=current.last.failureReason??'';
 const cause=reason.includes('power')?'power':reason.includes('Oxygen')?'oxygen':reason.includes('Water')?'water':reason.includes('Food')?'food':'horizon';
 const explanation={
 power:'Your solar panels and battery cannot supply enough energy for heating and life support. The chosen latitude and season affect how much sunlight the panels receive.',
 oxygen:'Your oxygen supply runs out. Daily consumption is greater than the oxygen the equipment can produce with its available power.',
 water:'Your water supply runs out. Recycling reduces the loss each day, but it does not replace all the water used.',
 food:'Your food supply runs out. This model has no food production, so moving to another location cannot create more food.',
 horizon:'Your resources last through the 120-sol simulation. The model stops here, so your maximum survival time is not established.'
 }[cause];
 const candidates=[-30,-15,-5,-1,1,5,15,30].map(delta=>({lat:location.lat+delta,lon:location.lon})).filter(p=>Math.abs(p.lat)<=90).map(p=>{
 const r=outcome(config,p);return {location:p,completedSols:r.completedSols,failureSol:r.failureSol,powerGeneratedKWh:r.simulation.states[1]?.powerGeneratedKWh??0,distanceKm:distanceKm(location,p)};
 }).sort((a,b)=>b.completedSols-a.completedSols||a.distanceKm-b.distanceKm);
 const betterSite=candidates.find(c=>c.completedSols>current.completedSols)??null;
 return {...current,cause,explanation,candidates,betterSite};
}
