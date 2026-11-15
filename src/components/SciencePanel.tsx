import {useEffect,useState} from 'react';
import {ArrowUpRight,MapPin,Mountain,Layers,ChevronRight} from 'lucide-react';
import type {DataBundle} from '../lib/data';
import {coords,number} from '../lib/data';
import {sampleGrid,slopeDegrees} from '../lib/geo';
import {useMission} from '../store/useMission';
import {Badge,NumberField} from './ui';
export function SciencePanel({data}:{data:DataBundle}){const {selected,set,targetId,select}=useMission();const elevation=sampleGrid(data.grid,selected),slope=slopeDegrees(data.grid,selected),site=data.sites.find(s=>Math.abs(s.lat-selected.lat)<1e-7&&Math.abs(s.lon-selected.lon)<1e-7);const [lat,setLat]=useState(selected.lat),[lon,setLon]=useState(selected.lon);useEffect(()=>{setLat(selected.lat);setLon(selected.lon)},[selected]);
 return <aside className="science-panel panel"><div className="panel-heading"><span className="eyebrow">LOCATION INTELLIGENCE</span><MapPin size={17}/></div><h2>{site&&Math.abs(site.lat-selected.lat)<.0001&&Math.abs(site.lon-selected.lon)<.0001?site.name:'Selected location'}</h2><p className="mono location-coords">{coords(selected)}</p><div className="coordinate-form"><NumberField label="Latitude" value={lat} onChange={setLat} min={-90} max={90} step={.0001}/><NumberField label="Longitude" value={lon} onChange={setLon} min={-180} max={180} step={.0001}/><button className="small-button" onClick={()=>select({lat,lon})}>Inspect coordinates</button></div>
 <div className="science-reading"><div><Mountain size={18}/><span>Surface elevation</span><Badge kind="derived"/></div><strong>{number(elevation)} <small>{elevation===null?'':'m'}</small></strong><p>{elevation===null?'NASA DATA UNAVAILABLE FOR THIS LOCATION':'Interpolated MOLA topography · relative to areoid'}</p></div>
 <div className="science-reading"><div><Layers size={18}/><span>Regional slope</span><Badge kind="derived"/></div><strong>{number(slope,2)} <small>{slope===null?'':'°'}</small></strong><p>Regional gradient only. Local obstacles are unresolved.</p></div>
 <div className="availability-list"><span>Local air temperature <Badge kind="unavailable"/></span><span>Extractable water ice <Badge kind="unavailable"/></span><span>Local radiation <Badge kind="unavailable"/></span></div>
 <div className="notice"><strong>Know the limits</strong><p>MOLA samples broad terrain. These measurements cannot establish a safe walking route.</p></div><button className="text-button" onClick={()=>set({tab:'sources'})}>Inspect data provenance <ArrowUpRight size={15}/></button>
 {site&&<div className="science-objective"><span className="eyebrow">SCIENCE CONTEXT</span><h3>{site.mission}</h3><p>{site.relevance??'Investigate ancient environments using the documented rover mission context.'}</p><a href={site.sourceUrl} target="_blank" rel="noreferrer">Mission source <ChevronRight size={14}/></a></div>}
 </aside>
}
