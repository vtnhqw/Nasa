import type {Location} from '../types';
import {validLocation} from './geo';
export const SOL_HOURS=24+39/60+35/3600;
export type HabitatConfig={name:string;crew:number;oxygenKg:number;waterKg:number;foodKg:number;batteryCapacity:number;solarKw:number;heatingKw:number;lifeSupportKw:number;oxygenProductionKg:number;oxygenKWhPerKg:number;recycling:number;dust:boolean;seasonLs:number};
export type SimulationState={sol:number;oxygenKg:number;waterKg:number;foodKg:number;batteryKWh:number;cumulativeRadiationMsv:null;powerGeneratedKWh:number;powerConsumedKWh:number;habitatTemperatureStatus:'nominal'|'warning'|'critical';survivalStatus:'operational'|'failed';failureReason?:string};
export type SimEvent={sol:number;message:string};
const base={crew:2,oxygenKWhPerKg:12,recycling:.85,dust:false,seasonLs:90};
export const KITS:HabitatConfig[]=[
 {...base,name:'Small Exploration Kit',oxygenKg:20,waterKg:90,foodKg:50,batteryCapacity:30,solarKw:12,heatingKw:1.5,lifeSupportKw:1,oxygenProductionKg:.5},
 {...base,name:'Standard Research Habitat',oxygenKg:100,waterKg:250,foodKg:180,batteryCapacity:120,solarKw:30,heatingKw:2,lifeSupportKw:1.5,oxygenProductionKg:1.8},
 {...base,name:'Advanced Survival Habitat',oxygenKg:250,waterKg:400,foodKg:240,batteryCapacity:300,solarKw:55,heatingKw:2,lifeSupportKw:1.5,oxygenProductionKg:2,recycling:.95},
];
// Daily integral for a horizontal array, fixed representative season. solarKw is local noon-equivalent rating at normal incidence.
export function solarHours(lat:number,ls:number){const r=Math.PI/180,phi=lat*r,dec=Math.asin(Math.sin(25.19*r)*Math.sin(ls*r));const h=Math.acos(Math.max(-1,Math.min(1,-Math.tan(phi)*Math.tan(dec))));return Math.max(0,SOL_HOURS/Math.PI*(h*Math.sin(phi)*Math.sin(dec)+Math.cos(phi)*Math.cos(dec)*Math.sin(h)))}
export function simulate(c:HabitatConfig,p:Location):{states:SimulationState[];events:SimEvent[]}{
 if(!validLocation(p))throw new Error('Invalid location');
 for(const [k,v] of Object.entries(c))if(typeof v==='number'&&(!Number.isFinite(v)||v<0))throw new Error(`Invalid ${k}`);
 if(c.recycling>1||c.crew<1||!Number.isInteger(c.crew)||c.oxygenKWhPerKg<=0)throw new Error('Invalid resource parameters');
 const states:SimulationState[]=[{sol:0,oxygenKg:c.oxygenKg,waterKg:c.waterKg,foodKg:c.foodKg,batteryKWh:c.batteryCapacity,cumulativeRadiationMsv:null,powerGeneratedKWh:0,powerConsumedKWh:0,habitatTemperatureStatus:'nominal',survivalStatus:'operational'}],events:SimEvent[]=[];
 for(let sol=1;sol<=120;sol++){
 const previous=states[states.length-1],storm=c.dust&&sol>=20&&sol<=40;
 if(storm&&sol===20)events.push({sol,message:'Hypothetical dust storm begins: solar yield reduced by 75%.'});
 const generated=c.solarKw*solarHours(p.lat,c.seasonLs)*.75*(storm?.25:1);
 const demand=(c.heatingKw+c.lifeSupportKw)*SOL_HOURS,available=previous.batteryKWh+generated;
 const baseUsed=Math.min(available,demand),production=Math.min(c.oxygenProductionKg,Math.max(0,available-baseUsed)/c.oxygenKWhPerKg);
 // CO2 electrolysis: ambient CO2 feedstock (2.75 kg CO2/kg O2) is explicitly assumed unlimited; no water extraction.
 const consumed=baseUsed+production*c.oxygenKWhPerKg;
 const oxygen=previous.oxygenKg+production-c.crew*.84,water=previous.waterKg-c.crew*3*(1-c.recycling),food=previous.foodKg-c.crew*.62;
 const failure=available+1e-9<demand?'Insufficient power for heating and life support':oxygen<=0?'Oxygen reserve exhausted':water<=0?'Water reserve exhausted':food<=0?'Food reserve exhausted':undefined;
 const state:SimulationState={sol,oxygenKg:Math.max(0,oxygen),waterKg:Math.max(0,water),foodKg:Math.max(0,food),batteryKWh:Math.min(c.batteryCapacity,Math.max(0,available-consumed)),powerGeneratedKWh:generated,powerConsumedKWh:consumed,cumulativeRadiationMsv:null,habitatTemperatureStatus:available<demand?'critical':generated<demand?'warning':'nominal',survivalStatus:failure?'failed':'operational',failureReason:failure};
 states.push(state);
 if(generated<demand&&(sol===1||states[states.length-2].powerGeneratedKWh>=demand))events.push({sol,message:'Solar power below base demand; drawing on battery.'});
 if(state.oxygenKg<c.crew*.84*5&&previous.oxygenKg>=c.crew*.84*5)events.push({sol,message:'Oxygen reserve below five sols of consumption.'});
 if(failure){events.push({sol,message:failure});break}
 }
 return {states,events};
}
