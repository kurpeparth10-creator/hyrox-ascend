import {useState} from 'react';import type {Log} from '../lib/storage';
const F=['weight','reps','sets','duration','distance','rpe'] as const;
export function WorkoutLog({exId,logs,onAdd,onDel}:{exId:string;logs:Log[];onAdd:(l:Log)=>void;onDel:(id:string)=>void}){
const [v,setV]=useState<Record<string,string>>({date:new Date().toISOString().slice(0,10),notes:''});const mine=logs.filter(l=>l.exId===exId);
const n=(k:string)=>Math.max(0,Number(v[k])||0);
const submit=()=>{if(!F.some(k=>n(k)>0))return;onAdd({id:crypto.randomUUID(),exId,date:v.date,weight:n('weight'),reps:n('reps'),sets:n('sets'),duration:n('duration'),distance:n('distance'),rpe:Math.min(10,n('rpe')),notes:v.notes});setV({date:v.date,notes:''})};
const isPR=(l:Log)=>l.weight>0&&mine.filter(o=>o.date<l.date||(o.date===l.date&&o.id<l.id)).every(o=>o.weight<l.weight)&&mine.some(o=>o.id!==l.id);
return <section><h2>WORKOUT LOG</h2><div className="logf">{F.map(k=><label key={k}>{k==='weight'?'weight (kg)':k==='duration'?'duration (min)':k==='distance'?'distance (m)':k==='rpe'?'RPE (1-10)':k}
<input inputMode="decimal" value={v[k]||''} onChange={e=>setV({...v,[k]:e.target.value})}/></label>)}
<label>date<input type="date" value={v.date} onChange={e=>setV({...v,date:e.target.value})}/></label>
<label className="wide">notes<input value={v.notes} onChange={e=>setV({...v,notes:e.target.value})}/></label><button onClick={submit}>Save entry</button></div>
{mine.length===0?<p className="note">No entries yet. Log a set above.</p>:<ul className="logs">{[...mine].reverse().map(l=><li key={l.id}><b>{l.date}</b> {l.weight?`${l.weight} kg `:''}{l.sets?`${l.sets}×`:''}{l.reps?`${l.reps} `:''}{l.duration?`${l.duration} min `:''}{l.distance?`${l.distance} m `:''}{l.rpe?`RPE ${l.rpe} `:''}{l.notes}
{isPR(l)&&<span className="pr"> NEW PR</span>} <button aria-label="Delete entry" onClick={()=>onDel(l.id)}>✕</button></li>)}</ul>}</section>}
