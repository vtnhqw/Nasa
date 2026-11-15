// @vitest-environment jsdom
import React from 'react';
import {afterEach,beforeAll,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {Habitat} from '../src/components/Habitat';
import {useMission} from '../src/store/useMission';
beforeAll(()=>{globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};vi.spyOn(HTMLElement.prototype,'getBoundingClientRect').mockReturnValue({width:800,height:300,top:0,left:0,right:800,bottom:300,x:0,y:0,toJSON(){}})});
afterEach(()=>{cleanup();useMission.setState({selected:{lat:18.44,lon:77.45}})});
 it('changes habitat kit and scrubs deterministic simulation state',()=>{render(<Habitat/>);fireEvent.click(screen.getByText('Advanced Survival Habitat'));expect(screen.getByText('Survived 120 sols in this model')).toBeTruthy();fireEvent.change(screen.getByLabelText('Simulation sol'),{target:{value:'30'}});expect(screen.getByText('SOL 030')).toBeTruthy();fireEvent.click(screen.getByLabelText('Restart simulation'));expect(screen.getByText('SOL 000')).toBeTruthy()});
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
