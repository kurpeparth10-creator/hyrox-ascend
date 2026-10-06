import {useState} from 'react';import type {Exercise} from '../data/exercises';import {extras} from '../data/formExtras';import {FormFigure} from './FormFigure';
const L=['START','MOVE','FINISH'];
export function FormMode({ex,checks}:{ex:Exercise;checks:boolean[]}){
const [i,setI]=useState<0|1|2>(0);const [x0,setX]=useState(0);const [cue,mist]=extras[ex.id]||['Brace → move → control',''];
const go=(d:number)=>setI(v=>Math.max(0,Math.min(2,v+d)) as 0|1|2);
return <section className="fm" tabIndex={0} aria-label={`Form mode for ${ex.name}`} onKeyDown={e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)}}
onTouchStart={e=>setX(e.touches[0].clientX)} onTouchEnd={e=>{const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)go(d<0?1:-1)}}>
<h2>FORM MODE</h2><div role="tablist" className="steps">{L.map((l,n)=><button key={l} role="tab" aria-selected={i===n} className={i===n?'on':''} onClick={()=>setI(n as 0|1|2)}>{n+1} {l}</button>)}</div>
<progress max={3} value={i+1} aria-label={`Step ${i+1} of 3`}/>
<FormFigure key={i} ex={ex} phase={i}/>
<h3>WHAT TO DO</h3><p>{ex.captions[i]}</p><ul>{ex.checks.slice(i===0?0:i===1?2:3,i===0?2:i===1?4:5).map(c=><li key={c}>{c}</li>)}</ul>
<h3>AVOID</h3><ul>{mist.split('|').filter(Boolean).map(m=><li key={m}>{m}</li>)}</ul>
<h3>COACHING CUE</h3><p className="cue">“{cue}”</p><h3>BREATHING</h3><p>Breathe in and brace before the effort; breathe out through the hardest part, then reset.</p>
<div className="row"><button disabled={i===0} onClick={()=>go(-1)}>← Previous</button><button disabled={i===2} onClick={()=>go(1)}>Next →</button></div>
<small>Use ← → keys or swipe. Form checks done: {checks.filter(Boolean).length}/{ex.checks.length}</small></section>}
