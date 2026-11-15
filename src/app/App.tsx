import {Orbit} from 'lucide-react';
import {useMission} from '../store/useMission';
import {useData} from '../lib/data';
import {SurvivalExplorer} from '../components/SurvivalExplorer';
import {Sources} from '../components/Sources';
export default function App(){
 const data=useData();const {tab,set}=useMission();
 const showSources=tab==='sources';
 return <><a className="skip-link" href="#main-content">Skip to content</a><header className="app-header survival-header"><button className="brand" aria-label="Mars Survival home" onClick={()=>set({tab:'explore'})}><span className="brand-mark"><Orbit size={24}/></span><span>MARS<span className="brand-light"> SURVIVAL</span></span></button><nav aria-label="Main navigation"><button aria-current={!showSources?'page':undefined} className={!showSources?'active':''} onClick={()=>set({tab:'explore'})}>Survival map</button><button aria-current={showSources?'page':undefined} className={showSources?'active':''} onClick={()=>set({tab:'sources'})}>Data & limitations</button></nav></header>
 <main id="main-content"><div hidden={showSources}><SurvivalExplorer data={data}/></div>{showSources&&<Sources data={data}/>}</main><footer><span className="footer-brand"><Orbit size={16}/> MARS SURVIVAL</span><p>Educational survival scenarios for an astronaut with a pressurized shelter. Missing environmental data and simplified models limit these estimates.</p><button className="text-button" onClick={()=>set({tab:'sources'})}>What is this estimate based on?</button></footer></>
}
