import {create} from 'zustand';
import type {Location} from '../types';
export type Tab='explore'|'planner'|'habitat'|'compare'|'sources';
type State={tab:Tab;view:'globe'|'map';selected:Location;start:Location|null;end:Location|null;waypoint:Location|null;targetId:string|null;pick:'inspect'|'start'|'end'|'waypoint';layer:string;opacity:number;autoRotate:boolean;set:(s:Partial<State>)=>void;select:(p:Location)=>void};
export const useMission=create<State>((set,get)=>({tab:'explore',view:'globe',selected:{lat:18.4446,lon:77.4509},start:null,end:null,waypoint:null,targetId:null,pick:'inspect',layer:'imagery',opacity:.6,autoRotate:false,set,select:(p)=>{const pick=get().pick;set({selected:p,...(pick==='inspect'?{}:{[pick]:p,pick:'inspect'})})}}));
