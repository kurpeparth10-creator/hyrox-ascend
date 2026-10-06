import {useState} from 'react';import {JOINTS,POSES,type Exercise} from '../data/exercises';
const ix=(j:string)=>JOINTS.indexOf(j as never)*2;
export function FormFigure({ex,phase}:{ex:Exercise;phase:0|1|2}){
const [photo,setPhoto]=useState(false);const label=['Start position','Mid position','Finish position'][phase];
const src=[ex.images.start,ex.images.mid,ex.images.end][phase];const alt=`${ex.name} ${label.toLowerCase()}: ${ex.captions[phase]}`;
const p=POSES[ex.poses[phase]]||POSES.stand;const pt=(j:string)=>[p[ix(j)],p[ix(j)+1]];
const seg=(a:string,b:string)=>{const[A,B]=[pt(a),pt(b)];return <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} />};
return <figure className="fig"><span className="tag">{phase+1}. {label.toUpperCase()}</span>
<img src={src} alt={alt} loading="lazy" onLoad={()=>setPhoto(true)} onError={()=>setPhoto(false)} style={{display:photo?'block':'none'}}/>
{!photo&&<svg viewBox="0 0 200 190" role="img" aria-label={alt}>
<line x1="10" y1="180" x2="190" y2="180" className="gr"/><g className="bd">{seg('s','p')}{seg('p','k')}{seg('k','a')}{seg('s','e')}{seg('e','w')}
<line x1={pt('a')[0]} y1={pt('a')[1]} x2={pt('a')[0]+14} y2={pt('a')[1]}/><circle cx={pt('h')[0]} cy={pt('h')[1]} r="9"/></g>
{ex.callouts.map(([l,j],i)=>{const[x,y]=pt(j);const tx=Math.min(x+12,128),ty=14+i*14;return <g key={i} className="co"><line x1={x} y1={y} x2={tx} y2={ty-3}/><circle cx={x} cy={y} r="3"/><text x={tx+2} y={ty}>{l}</text></g>})}</svg>}
<figcaption>{ex.captions[phase]}</figcaption></figure>}
