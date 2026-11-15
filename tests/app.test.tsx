// @vitest-environment jsdom
import React from 'react';
import {it,expect,vi,beforeAll,afterEach} from 'vitest';
import {render,screen,fireEvent,cleanup,within} from '@testing-library/react';
import App from '../src/app/App';
import {useMission} from '../src/store/useMission';
vi.mock('../src/components/MapView',()=>({MapView:()=> <section id="mission-map" aria-label="Interactive Mars map"/>}));
vi.mock('../src/lib/data',async importOriginal=>({...await importOriginal<typeof import('../src/lib/data')>(),useData:()=>({grid:null,loading:false,error:null,localImage:null,manifest:{datasets:[]},sites:[],pois:[{id:'jezero-sol-13',name:'Landing site',lat:18.44,lon:77.45,mission:'Perseverance',sourceUrl:'https://mars.nasa.gov/'},{id:'jezero-sol-420',name:'Sol 420 science stop',lat:18.45,lon:77.40,mission:'Perseverance',sourceUrl:'https://mars.nasa.gov/',relevance:'Investigate ancient environments.'}]})}));
beforeAll(()=>{globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};window.matchMedia=vi.fn().mockReturnValue({matches:false,addEventListener:vi.fn(),removeEventListener:vi.fn()});window.scrollTo=vi.fn();HTMLElement.prototype.scrollIntoView=vi.fn();vi.spyOn(HTMLElement.prototype,'getBoundingClientRect').mockReturnValue({width:800,height:300,top:0,left:0,right:800,bottom:300,x:0,y:0,toJSON(){}})});
afterEach(()=>{cleanup();useMission.setState({tab:'explore',start:null,end:null,waypoint:null,targetId:null,pick:'inspect'})});
it('guides a first-time user from Explore to a calculated mission and briefing',()=>{
 render(<App/>);
 expect(screen.queryByText('Route configuration')).toBeNull();
 fireEvent.click(screen.getAllByRole('button',{name:/Try a Jezero mission/})[0]);
 expect(useMission.getState().start).toMatchObject({lat:18.44,lon:77.45});
 expect(useMission.getState().end).toMatchObject({lat:18.45,lon:77.40});
 expect(screen.getByLabelText('Science destination')).toBeTruthy();
 expect(screen.getByText('SURFACE DISTANCE')).toBeTruthy();
 fireEvent.click(screen.getByRole('button',{name:/Read your briefing/}));
 expect(screen.getByRole('button',{name:'Export JSON'})).toBeTruthy();
 fireEvent.click(screen.getByRole('button',{name:'Reset route'}));
 expect(useMission.getState().end).toBeNull();
 expect((screen.getByRole('button',{name:/Read your briefing/}) as HTMLButtonElement).disabled).toBe(true);
});
it('switches to habitat without leaving a pending map-pick operation',()=>{
 render(<App/>);
 useMission.setState({pick:'end'});
 fireEvent.click(within(screen.getByRole('navigation',{name:'Main navigation'})).getByRole('button',{name:'Habitat simulator'}));
 expect(useMission.getState().pick).toBe('inspect');
 expect(screen.getByText('120 sols. Every resource counts.')).toBeTruthy();
});
