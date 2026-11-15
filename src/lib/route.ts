import type {Location,Grid} from '../types';
import {distanceKm,geodesic,sampleGrid,slopeDegrees} from './geo';
export const DEFAULT_EVA={crew:2,loadKg:15,speedKmh:2,oxygenKg:3,energyKWh:8,maxHours:8,reserve:.2,scienceHours:.5,oxygenKgPerHour:.1,powerKw:.3};
export type EVA=typeof DEFAULT_EVA;
export function assessRoute(points:Location[],grid:Grid|null,c:EVA){
 for(const value of Object.values(c))if(!Number.isFinite(value)||value<0)throw new Error('Invalid EVA assumption');
 if(c.speedKmh<=0||c.crew<1||!Number.isInteger(c.crew)||c.reserve>=1)throw new Error('Invalid EVA assumption');
 let km=0;const profile:{km:number;elevation:number|null;slope:number|null;lat:number;lon:number}[]=[];
 points.slice(1).forEach((p,i)=>{const segment=geodesic(points[i],p,64);segment.forEach((q,j)=>{if(i&&j===0)return;if(j)km+=distanceKm(segment[j-1],q);profile.push({...q,km,elevation:sampleGrid(grid,q),slope:slopeDegrees(grid,q)})})});
 const complete=profile.length>1&&profile.every(p=>p.elevation!==null);let ascent=0,descent=0;
 if(complete)for(let i=1;i<profile.length;i++){const d=profile[i].elevation!-profile[i-1].elevation!;ascent+=Math.max(0,d);descent+=Math.max(0,-d)}
 const maxSlope=profile.reduce<number|null>((m,p)=>p.slope===null?m:Math.max(m??0,p.slope),null);
 const durationHours=km/(c.speedKmh/(1+c.loadKg/100))+c.scienceHours+(complete?ascent/600:0),oxygenKg=durationHours*c.crew*c.oxygenKgPerHour,energyKWh=durationHours*c.crew*c.powerKw;
 const warnings=['Preliminary route assessment — not suitable for operational astronaut navigation.'];
 if(km<.001)warnings.push('Start and destination are the same location. Choose another destination for an excursion.');
 if(!complete)warnings.push('Scientific observation data unavailable for part of this route.');
 if(grid)warnings.push(`Elevation spacing is ${grid.step}° (~${(grid.step*Math.PI/180*3389.5).toFixed(1)} km north–south). Too coarse to evaluate rocks, cliffs or local walkability.`);
 if(maxSlope!==null&&maxSlope>15)warnings.push('High regional slope detected along the sampled route.');
 if(durationHours>c.maxHours)warnings.push('Estimated EVA duration exceeds configured mission limits.');
 if(oxygenKg>c.oxygenKg*(1-c.reserve))warnings.push('Insufficient oxygen to preserve the configured reserve.');
 if(energyKWh>c.energyKWh*(1-c.reserve))warnings.push('Insufficient battery energy to preserve the configured reserve.');
 return {profile,distanceKm:km,durationHours,oxygenKg,energyKWh,remainingOxygenKg:c.oxygenKg-oxygenKg,remainingEnergyKWh:c.energyKWh-energyKWh,ascentM:complete?ascent:null,descentM:complete?descent:null,netElevationM:complete?profile.at(-1)!.elevation!-profile[0].elevation!:null,maxSlope,warnings};
}
