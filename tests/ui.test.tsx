// @vitest-environment jsdom
import React from 'react';
import {afterEach,beforeAll,describe,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {SciencePanel} from '../src/components/SciencePanel';
import {Planner} from '../src/components/Planner';
import {Habitat} from '../src/components/Habitat';
import {useMission} from '../src/store/useMission';
import {DEFAULT_EVA,assessRoute} from '../src/lib/route';
import type {DataBundle} from '../src/lib/data';
const data:DataBundle={grid:null,sites:[],pois:[],localImage:null,manifest:null,loading:false,error:null};
beforeAll(()=>{globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};vi.spyOn(HTMLElement.prototype,'getBoundingClientRect').mockReturnValue({width:800,height:300,top:0,left:0,right:800,bottom:300,x:0,y:0,toJSON(){}})});
afterEach(()=>{cleanup();useMission.setState({selected:{lat:18.44,lon:77.45},start:null,end:null,waypoint:null,pick:'inspect'})});
describe('mission interface',()=>{
 it('shows missing scientific data and accepts accessible coordinate input',()=>{render(<SciencePanel data={data}/>);expect(screen.getByText('NASA DATA UNAVAILABLE FOR THIS LOCATION')).toBeTruthy();fireEvent.change(screen.getByLabelText('Latitude'),{target:{value:'-4.5'}});fireEvent.click(screen.getByText('Inspect coordinates'));expect(useMission.getState().selected.lat).toBe(-4.5)});
 it('uses selected coordinate for route start and enables map destination selection',()=>{render(<Planner data={data} eva={DEFAULT_EVA} onEva={()=>{}} result={null}/>);fireEvent.click(screen.getAllByText('Use selected pin')[0]);expect(useMission.getState().start?.lon).toBe(77.45);fireEvent.click(screen.getAllByText('Pick on map')[2]);expect(useMission.getState().pick).toBe('end');useMission.getState().select({lat:18.45,lon:77.46});expect(useMission.getState().end).toEqual({lat:18.45,lon:77.46})});
 it('produces route briefing and calculated safety warnings',()=>{const result=assessRoute([{lat:0,lon:0},{lat:0,lon:1}],null,DEFAULT_EVA);render(<Planner data={data} eva={DEFAULT_EVA} onEva={()=>{}} result={result}/>);expect(screen.getByText('Estimated EVA duration exceeds configured mission limits.')).toBeTruthy();fireEvent.click(screen.getByText('Mission briefing'));expect(screen.getByText('Export JSON')).toBeTruthy()});
 it('changes habitat kit and scrubs deterministic simulation state',()=>{render(<Habitat/>);fireEvent.click(screen.getByText('Advanced Survival Habitat'));expect(screen.getByText('Survived 120 sols in this model')).toBeTruthy();fireEvent.change(screen.getByLabelText('Simulation sol'),{target:{value:'30'}});expect(screen.getByText('SOL 030')).toBeTruthy();fireEvent.click(screen.getByLabelText('Restart simulation'));expect(screen.getByText('SOL 000')).toBeTruthy()});
});
it('does not attribute a manual route destination to an unrelated science target',()=>{
 useMission.setState({targetId:'old-science-target',end:{lat:1,lon:2}});
 const result=assessRoute([{lat:0,lon:0},{lat:1,lon:2}],null,DEFAULT_EVA);
 render(<Planner data={{...data,sites:[{id:'old-science-target',name:'Unrelated target',mission:'Test',sourceUrl:'https://example.com',lat:20,lon:20}]}} eva={DEFAULT_EVA} onEva={()=>{}} result={result}/>);
 fireEvent.click(screen.getByText('Mission briefing'));
 expect(screen.queryByText('Unrelated target')).toBeNull();
});
it('rejects fractional crew input without crashing the habitat',()=>{
 render(<Habitat/>);
 const field=screen.getByRole('spinbutton',{name:/Crew/});
 fireEvent.change(field,{target:{value:'1.5'}});
 expect(screen.getByRole('alert').textContent).toContain('whole number');
 expect(screen.getByText('Mission resource model')).toBeTruthy();
});
it('allows temporarily clearing an input and restores its valid value on blur',()=>{
 render(<Habitat/>);
 const field=screen.getByRole('spinbutton',{name:/Initial oxygen/}) as HTMLInputElement;
 fireEvent.change(field,{target:{value:''}});
 expect(field.value).toBe('');
 fireEvent.blur(field);
 expect(field.value).toBe('100');
});
