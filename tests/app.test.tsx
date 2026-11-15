// @vitest-environment jsdom
import React from 'react';
import {it,expect,vi,beforeAll,afterEach} from 'vitest';
import {render,screen,fireEvent,cleanup,within} from '@testing-library/react';
import App from '../src/app/App';
import {useMission} from '../src/store/useMission';
vi.mock('../src/components/MapView',()=>({MapView:()=> <section aria-label="Interactive Mars map"><button onClick={()=>useMission.getState().select({lat:80,lon:30})}>Select a point on Mars</button></section>}));
vi.mock('../src/lib/data',async importOriginal=>({...await importOriginal<typeof import('../src/lib/data')>(),useData:()=>({grid:null,loading:false,error:null,localImage:null,manifest:{datasets:[]},sites:[]})}));
beforeAll(()=>{globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};window.matchMedia=vi.fn().mockReturnValue({matches:false,addEventListener:vi.fn(),removeEventListener:vi.fn()});window.scrollTo=vi.fn();HTMLElement.prototype.scrollIntoView=vi.fn();vi.spyOn(HTMLElement.prototype,'getBoundingClientRect').mockReturnValue({width:800,height:300,top:0,left:0,right:800,bottom:300,x:0,y:0,toJSON(){}})});
afterEach(()=>{cleanup();useMission.setState({tab:'explore',selectionVersion:0,selected:{lat:18.4446,lon:77.4509}})});
it('starts with a globe, accepts any point, and shows survival, cause and location comparison',()=>{
 render(<App/>);
 expect(screen.getByRole('heading',{name:'How long could you survive here?'})).toBeTruthy();
 expect(screen.queryByRole('button',{name:/planning a walk/i})).toBeNull();
 expect(screen.queryByTestId('survival-duration')).toBeNull();
 fireEvent.click(screen.getByRole('button',{name:'Select a point on Mars'}));
 expect(screen.getByTestId('survival-duration')).toBeTruthy();
 expect(screen.getByText('02 / WHY THIS LONG?')).toBeTruthy();
 expect(screen.getByText('03 / WHAT COULD HELP?')).toBeTruthy();
 expect(useMission.getState().selected).toEqual({lat:80,lon:30});
});
it('accepts arbitrary typed coordinates and updates immediately without a route',()=>{
 render(<App/>);
 fireEvent.click(screen.getByText('Or choose a location using coordinates'));
 fireEvent.change(screen.getByLabelText('Latitude'),{target:{value:'-33.2'}});
 fireEvent.change(screen.getByLabelText('Longitude'),{target:{value:'-111.4'}});
 fireEvent.click(screen.getByRole('button',{name:'Check this location'}));
 expect(useMission.getState().selected).toEqual({lat:-33.2,lon:-111.4});
 expect(screen.getByTestId('survival-duration')).toBeTruthy();
});
it('previews a longer-survival candidate and keeps supplies when visiting data sources',()=>{
 render(<App/>);
 fireEvent.click(screen.getByRole('button',{name:'Select a point on Mars'}));
 fireEvent.change(screen.getByLabelText('Your equipment'),{target:{value:'2'}});
 fireEvent.change(screen.getByLabelText('Season assumption'),{target:{value:'270'}});
 const before=screen.getByTestId('survival-duration').textContent;
 fireEvent.click(screen.getByRole('button',{name:'Preview this location'}));
 expect(screen.getByTestId('survival-duration').textContent).not.toBe(before);
 expect(screen.getByTestId('previous-estimate').textContent).toBe(before);
 expect(screen.getByTestId('estimate-comparison').textContent).toContain('Latitude changed');
 const after=screen.getByTestId('survival-duration').textContent;
 const nav=within(screen.getByRole('navigation',{name:'Main navigation'}));
 fireEvent.click(nav.getByRole('button',{name:'Data & limitations'}));
 expect(screen.getByRole('heading',{name:'Science you can trace.'})).toBeTruthy();
 fireEvent.click(nav.getByRole('button',{name:'Survival map'}));
 expect(screen.getByTestId('survival-duration').textContent).toBe(after);
 expect((screen.getByLabelText('Your equipment') as HTMLSelectElement).value).toBe('2');
 expect(screen.queryByRole('button',{name:'Toggle navigation'})).toBeNull();
});
it('shows a before-and-after estimate only after a meaningful change',()=>{
 render(<App/>);
 fireEvent.click(screen.getByRole('button',{name:'Select a point on Mars'}));
 expect(screen.queryByTestId('estimate-comparison')).toBeNull();
 const before=screen.getByTestId('survival-duration').textContent;
 fireEvent.change(screen.getByLabelText('Your equipment'),{target:{value:'2'}});
 const comparison=screen.getByTestId('estimate-comparison');
 expect(comparison.textContent).toContain('Equipment changed');
 expect(within(comparison).getByTestId('previous-estimate').textContent).toBe(before);
 expect(within(comparison).getByTestId('current-estimate').textContent).toBe(screen.getByTestId('survival-duration').textContent);
 expect(screen.getByText('01 / HOW LONG?')).toBeTruthy();
});

it('explains an unchanged estimate when only longitude changes',()=>{
 render(<App/>);
 fireEvent.change(screen.getByLabelText('Your equipment'),{target:{value:'2'}});
 fireEvent.click(screen.getByRole('button',{name:'Select a point on Mars'}));
 expect(screen.queryByTestId('estimate-comparison')).toBeNull();
 fireEvent.change(screen.getByLabelText('Longitude'),{target:{value:'40'}});
 fireEvent.click(screen.getByRole('button',{name:'Check this location'}));
 expect(screen.getByTestId('estimate-comparison').textContent).toContain('Longitude changed');
 expect(screen.getByTestId('estimate-comparison').textContent).toContain('No change in completed sols');
 expect(screen.getByTestId('previous-estimate').textContent).toBe(screen.getByTestId('current-estimate').textContent);
});
