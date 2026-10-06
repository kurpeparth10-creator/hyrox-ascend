// All persistence lives here. Corrupt data never throws.
const KEY='hyrox-ascend:v1';
export type Log={id:string;exId:string;date:string;weight:number;reps:number;sets:number;duration:number;distance:number;rpe:number;notes:string};
export type Store={checks:Record<string,boolean[]>;notes:Record<string,string>;logs:Log[]};
const empty=():Store=>({checks:{},notes:{},logs:[]});
export function load():Store{try{const s=JSON.parse(localStorage.getItem(KEY)||'null');
return s&&typeof s==='object'?{...empty(),...s,logs:Array.isArray(s.logs)?s.logs:[]}:empty()}catch{return empty()}}
export function save(s:Store){try{localStorage.setItem(KEY,JSON.stringify(s))}catch{/* storage full or blocked */}}
export function exportJson(){const a=document.createElement('a');
a.href=URL.createObjectURL(new Blob([JSON.stringify(load(),null,2)],{type:'application/json'}));
a.download='hyrox-ascend-backup.json';a.click()}
export async function importJson(f:File):Promise<boolean>{try{const d=JSON.parse(await f.text());
if(!d||typeof d.checks!=='object'||typeof d.notes!=='object'||(d.logs!==undefined&&!Array.isArray(d.logs)))return false;save({...empty(),...d,logs:d.logs||[]});return true}catch{return false}}
