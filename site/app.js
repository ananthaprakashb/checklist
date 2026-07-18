const macroFiles=['buy-home.json','rent-home.json','lease-property-landlord.json','san-ramon-resident-activities.json'];
const microFiles=['home-buying.json','home-renting.json','property-leasing-landlord.json','san-ramon-resident-activities.json'];

const $=(id)=>document.getElementById(id);
const state={checklists:[],microById:new Map(),last:null};

function normalizeMacros(doc){
  if(Array.isArray(doc.checklists)) return doc.checklists.map(item=>({...item,version:item.version??doc.version,status:item.status??doc.status,risk_level:item.risk_level??doc.risk_level,composition:item.composition??doc.composition}));
  return [doc];
}
function normalizeMicros(doc){return (doc.checklists??[]).map(item=>({...item,version:item.version??doc.version,status:item.status??doc.status}));}
async function fetchJson(path){const res=await fetch(path);if(!res.ok)throw new Error(`Failed to load ${path}`);return res.json();}
function same(a,b){return String(a??'').trim().toLowerCase()===String(b??'').trim().toLowerCase();}
function layerMatches(layer,location){
  if(layer.level==='generic'||!layer.location)return true;
  return Object.entries(layer.location).every(([key,value])=>same(location[key],value));
}
function evaluateCondition(expression,context){
  if(!expression)return {include:true};
  const match=expression.match(/^([a-zA-Z_][\w.]*)\s*(==|!=|<=|>=|<|>)\s*(true|false|null|-?\d+(?:\.\d+)?|"[^"]*"|'[^']*')$/);
  if(!match)return {include:true,warning:`Unsupported condition retained: ${expression}`};
  const [,path,op,raw]=match;let value=context;
  for(const key of path.split('.')){if(value==null||!(key in Object(value)))return {include:true,warning:`Missing context for condition retained: ${expression}`};value=value[key];}
  let expected=raw;if(raw==='true')expected=true;else if(raw==='false')expected=false;else if(raw==='null')expected=null;else if(/^[-\d]/.test(raw))expected=Number(raw);else expected=raw.slice(1,-1);
  const ops={'==':(a,b)=>a===b,'!=':(a,b)=>a!==b,'<':(a,b)=>a<b,'>':(a,b)=>a>b,'<=':(a,b)=>a<=b,'>=':(a,b)=>a>=b};
  return {include:ops[op](value,expected)};
}
function compose(checklist,location,context={},expand=true){
  const selected=(checklist.layers??[]).filter(layer=>layerMatches(layer,location));
  const tasks=new Map(),sources=new Map(),warnings=[];
  for(const layer of selected){
    for(const source of layer.sources??[])sources.set(source.url??`${source.authority}:${source.title}`,source);
    for(const task of layer.tasks??[]){
      const result=evaluateCondition(task.condition,context);if(result.warning)warnings.push(result.warning);if(!result.include)continue;
      const key=task.semantic_key??`${task.phase}:${task.sequence}:${task.title}`;
      const enriched={...task,source_layer:layer.level,source_location:layer.location??null};
      if(expand&&task.micro_checklist_id){const micro=state.microById.get(task.micro_checklist_id);if(micro)enriched.micro_checklist=micro;else warnings.push(`Micro-checklist not found: ${task.micro_checklist_id}`);}
      tasks.set(key,enriched);
    }
  }
  return {id:checklist.id,title:checklist.title,version:checklist.version,status:checklist.status,risk_level:checklist.risk_level,location,applied_layers:selected.map(layer=>({level:layer.level,location:layer.location??null})),tasks:[...tasks.values()].sort((a,b)=>(a.sequence??0)-(b.sequence??0)||String(a.title).localeCompare(String(b.title))),sources:[...sources.values()],warnings:[...new Set(warnings)]};
}
function render(result){
  state.last=result;$('title').textContent=result.title;$('warnings').innerHTML=result.warnings.map(w=>`<div class="warning">${escapeHtml(w)}</div>`).join('');
  $('tasks').innerHTML=result.tasks.map(task=>`<li class="task"><h3>${escapeHtml(task.title)}</h3><div class="meta">${escapeHtml(task.phase??'task')} · ${escapeHtml(task.source_layer)}${task.micro_checklist_id?` · ${escapeHtml(task.micro_checklist_id)}`:''}</div>${task.micro_checklist?.steps?.length?`<ol class="steps">${task.micro_checklist.steps.map(step=>`<li>${escapeHtml(step)}</li>`).join('')}</ol>`:''}</li>`).join('');
  $('sources').innerHTML=result.sources.map(s=>`<li><a href="${escapeAttr(s.url)}" target="_blank" rel="noreferrer">${escapeHtml(s.title)}</a> — ${escapeHtml(s.authority??'')}</li>`).join('')||'<li>No sources attached.</li>';
  $('json').textContent=JSON.stringify(result,null,2);$('result').hidden=false;$('status').textContent=`${result.tasks.length} tasks composed from ${result.applied_layers.length} matching layers.`;
}
function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function escapeAttr(value){return escapeHtml(value);}
function currentLocation(){return {country:$('country').value,state:$('state').value,county:$('county').value,city:$('city').value};}
function composeSelected(){const checklist=state.checklists.find(c=>c.id===$('checklist').value);if(!checklist)return;render(compose(checklist,currentLocation(),{},$('expand').checked));}

async function init(){
  try{
    const macroDocs=await Promise.all(macroFiles.map(name=>fetchJson(`./data/macros/${name}`)));
    const microDocs=await Promise.all(microFiles.map(name=>fetchJson(`./data/micro/${name}`)));
    state.checklists=macroDocs.flatMap(normalizeMacros);const micros=microDocs.flatMap(normalizeMicros);state.microById=new Map(micros.map(m=>[m.id,m]));
    $('checklist').innerHTML=state.checklists.sort((a,b)=>a.title.localeCompare(b.title)).map(c=>`<option value="${escapeAttr(c.id)}">${escapeHtml(c.title)}</option>`).join('');
    const preferred=state.checklists.find(c=>c.id==='move-to-san-ramon');if(preferred)$('checklist').value=preferred.id;
    composeSelected();
  }catch(error){$('status').textContent=`Unable to load checklist data: ${error.message}`;}
}
$('compose').addEventListener('click',composeSelected);$('copy').addEventListener('click',async()=>{if(!state.last)return;await navigator.clipboard.writeText(JSON.stringify(state.last,null,2));$('copy').textContent='Copied';setTimeout(()=>$('copy').textContent='Copy JSON',1200);});
init();
