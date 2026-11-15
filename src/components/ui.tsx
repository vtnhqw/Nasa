import {useEffect,useId,useState,type ReactNode} from 'react';
export function Badge({kind,children}:{kind:'observed'|'derived'|'simulated'|'unavailable';children?:ReactNode}){return <span className={`badge ${kind}`}>{children??({observed:'NASA observed',derived:'Derived',simulated:'Simulated',unavailable:'Unavailable'}[kind])}</span>}
export function Metric({label,value,unit,detail}:{label:string;value:string;unit?:string;detail?:string}){return <div className="metric"><span>{label}</span><strong>{value}<small>{unit}</small></strong>{detail&&<p>{detail}</p>}</div>}
export function NumberField({label,value,onChange,min=0,max=10000,step=1,unit,integer=false}:{label:string;value:number;onChange:(value:number)=>void;min?:number;max?:number;step?:number;unit?:string;integer?:boolean}){
 const [draft,setDraft]=useState(String(value)),[error,setError]=useState('');const id=useId();
 useEffect(()=>{setDraft(String(value));setError('')},[value]);
 function change(raw:string){setDraft(raw);if(raw===''){setError('Enter a value.');return}const v=Number(raw);const issue=!Number.isFinite(v)?'Enter a valid number.':integer&&!Number.isInteger(v)?'Enter a whole number.':v<min||v>max?`Use a value from ${min} to ${max}.`:'';setError(issue);if(!issue)onChange(v)}
 return <label className="number-field"><span>{label}{unit&&<small>{unit}</small>}</span><input aria-label={label} aria-invalid={!!error} aria-describedby={error?id:undefined} type="number" value={draft} min={min} max={max} step={step} onChange={e=>change(e.target.value)} onBlur={()=>{if(error||draft===''){setDraft(String(value));setError('')}}}/>{error&&<small id={id} role="alert" className="field-error">{error}</small>}</label>
}
