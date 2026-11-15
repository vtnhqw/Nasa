import {create} from 'zustand';
import type {Location} from '../types';
export type Tab='explore'|'sources';
type State={selectionVersion:number;tab:Tab;view:'globe'|'map';selected:Location;autoRotate:boolean;set:(s:Partial<State>)=>void;select:(p:Location)=>void};
export const useMission=create<State>((set,get)=>({selectionVersion:0,tab:'explore',view:'globe',selected:{lat:18.4446,lon:77.4509},autoRotate:false,set,select:(p)=>set({selected:p,selectionVersion:get().selectionVersion+1})}));
