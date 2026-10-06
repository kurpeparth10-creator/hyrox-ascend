import {StrictMode,useEffect,useState} from 'react';import {createRoot} from 'react-dom/client';
import {BrowserRouter,Link,Route,Routes,useParams} from 'react-router-dom';
import {exercises,stations} from './data/exercises';import {FormMode} from './components/FormMode';import {WorkoutLog} from './components/WorkoutLog';
import {load,save,exportJson,importJson,type Store} from './lib/storage';import './styles.css';
const DISCLAIMER="This app is for training organization and educational purposes. Exercise technique and load should be appropriate to the user's experience. Stop if you experience sharp pain, dizziness, chest pain, or unusual symptoms and seek appropriate professional advice.";
function useStore():[Store,(f:(s:Store)=>Store)=>void]{const [s,set]=useState(load);
return [s,f=>set(p=>{const n=f(p);save(n);return n})]}
function Library(){const [s]=useStore();return <main><h1>HYROX // ASCEND</h1><p className="sub">Train hard. Track everything. Become race ready.</p>
<p className="note">These are supporting exercises from the referenced training video, not the official HYROX competition stations.</p>
{stations.map(st=><section key={st}><h2>{st}</h2><div className="grid">{exercises.filter(e=>e.station===st).map(e=>{
const d=(s.checks[e.id]||[]).filter(Boolean).length;return <Link key={e.id} to={`/exercises/${e.id}`} className="card"><b>{e.name}</b><small>Form checklist {d}/{e.checks.length}</small></Link>})}</div></section>)}</main>}
function Detail(){const {id}=useParams();const e=exercises.find(x=>x.id===id);const [s,up]=useStore();
if(!e)return <main><h1>Exercise not found</h1><Link to="/">Back to library</Link></main>;
const c=s.checks[e.id]||[];const setC=(f:(a:boolean[])=>boolean[])=>up(p=>({...p,checks:{...p.checks,[e.id]:f(Array.from({length:e.checks.length},(_,i)=>!!(p.checks[e.id]||[])[i]))}}));
const done=e.checks.filter((_,i)=>c[i]).length;
return <main><Link to="/">← Library</Link><h1>{e.name}</h1><p className="sub">{e.station.toUpperCase()} · HYROX-inspired supporting exercise · {e.prescription}</p>
<FormMode ex={e} checks={c}/>
<h2>FORM CHECKLIST — FORM SCORE: {done}/{e.checks.length} ({Math.round(done/e.checks.length*100)}%)</h2><ul className="chk">{e.checks.map((t,i)=><li key={i}><label><input type="checkbox" checked={!!c[i]} onChange={()=>setC(a=>a.map((v,j)=>j===i?!v:v))}/> {t}</label></li>)}</ul>
<button onClick={()=>setC(a=>a.map(()=>true))}>Mark all complete</button><button onClick={()=>setC(a=>a.map(()=>false))}>Reset checklist</button>
<h2>Why it matters for {e.station==='Bonus'?'HYROX preparation':'the '+e.station+' station'}</h2><p>{e.why} Technique and load should suit your experience.</p>
<WorkoutLog exId={e.id} logs={s.logs} onAdd={l=>up(p=>({...p,logs:[...p.logs,l]}))} onDel={i=>up(p=>({...p,logs:p.logs.filter(l=>l.id!==i)}))}/>
<h2>Personal notes</h2><textarea aria-label="Personal notes" value={s.notes[e.id]||''} onChange={ev=>up(p=>({...p,notes:{...p.notes,[e.id]:ev.target.value}}))}/></main>}
function App(){const [msg,setMsg]=useState('');useEffect(()=>{document.documentElement.dataset.t='dark'},[]);
return <BrowserRouter><header><Link to="/" className="logo">HYROX // ASCEND</Link><span><button onClick={exportJson}>Export</button>
<label className="btn">Import<input hidden type="file" accept="application/json" onChange={async ev=>{const f=ev.target.files?.[0];if(f){setMsg(await importJson(f)?'Imported. Reloading…':'Invalid backup file.');if(msg==='')setTimeout(()=>location.reload(),600)}}}/></label></span></header>
{msg&&<p role="status" className="note">{msg}</p>}<Routes><Route path="/" element={<Library/>}/><Route path="/exercises/:id" element={<Detail/>}/><Route path="*" element={<main><h1>Page not found</h1><Link to="/">Home</Link></main>}/></Routes>
<footer>{DISCLAIMER}</footer></BrowserRouter>}
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
