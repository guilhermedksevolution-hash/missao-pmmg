/* MISSÃO PMMG V10.8.0 — módulo consolidado; dados/chaves preservados. */
(function(){
'use strict';
const KEY='pmmg_flashcards_v100';
const SESSION_SIZE=10;
let session=[];
let index=0;
let revealed=false;
let subjectFilter='Todos';
let modeFilter='due';

const defs=[
  {name:'Português',icon:'📘',source:()=>window.lessons||{}},
  {name:'Literatura',icon:'📚',source:()=>window.literaturaLessons||{}},
  {name:'Inglês',icon:'🇬🇧',source:()=>window.inglesLessons||{}},
  {name:'Direito',icon:'⚖️',source:()=>window.direitoLessons||{}},
  {name:'Matemática',icon:'🧮',source:()=>window.matematicaLessons||{}}
];

function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
function save(data){localStorage.setItem(KEY,JSON.stringify(data))}
function todayStart(){const d=new Date();d.setHours(0,0,0,0);return d.getTime()}
function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}

function allCards(){
  const out=[];
  defs.forEach(def=>{
    const src=def.source();
    Object.keys(src).sort((a,b)=>Number(a)-Number(b)).forEach(k=>{
      const lesson=src[k]||{};
      (lesson.quiz||[]).forEach((q,qi)=>{
        if(!q||!q.question||!Array.isArray(q.options))return;
        const ans=Number(q.answer);
        const answer=Number.isFinite(ans)&&q.options[ans]!=null?q.options[ans]:'';
        out.push({
          id:`${def.name}|${k}|${qi}`,
          subject:def.name,icon:def.icon,lesson:Number(k),lessonTitle:lesson.title||`Aula ${k}`,
          front:q.question,answer,explanation:q.explanation||'',tip:q.tip||''
        });
      });
    });
  });
  return out;
}

function cardState(id){const db=load();return db[id]||{stage:0,due:0,seen:0,known:0,hard:0}}
function isDue(card){const s=cardState(card.id);return !s.seen||Number(s.due||0)<=todayStart()}
function filteredCards(){
  let cards=allCards();
  if(subjectFilter!=='Todos')cards=cards.filter(c=>c.subject===subjectFilter);
  if(modeFilter==='due')cards=cards.filter(isDue);
  if(modeFilter==='new')cards=cards.filter(c=>!cardState(c.id).seen);
  if(modeFilter==='hard')cards=cards.filter(c=>cardState(c.id).hard>0 && cardState(c.id).hard>=cardState(c.id).known);
  return cards;
}

function formatDue(ts){
  if(!ts)return 'novo';
  const days=Math.round((ts-todayStart())/86400000);
  if(days<=0)return 'hoje';
  if(days===1)return 'amanhã';
  return `em ${days} dias`;
}

function renderHub(){
  const cards=allCards(), db=load();
  const due=cards.filter(isDue).length;
  const studied=cards.filter(c=>db[c.id]?.seen).length;
  const mastered=cards.filter(c=>(db[c.id]?.stage||0)>=3).length;
  const total=document.getElementById('fc100Total'),dueEl=document.getElementById('fc100Due'),studiedEl=document.getElementById('fc100Studied'),masteredEl=document.getElementById('fc100Mastered');
  if(total)total.textContent=cards.length;
  if(dueEl)dueEl.textContent=due;
  if(studiedEl)studiedEl.textContent=studied;
  if(masteredEl)masteredEl.textContent=mastered;
  const subjectBox=document.getElementById('fc100Subjects');
  if(subjectBox){
    subjectBox.innerHTML=[{name:'Todos',icon:'🎯'},...defs].map(d=>{
      const count=d.name==='Todos'?cards.length:cards.filter(c=>c.subject===d.name).length;
      const active=subjectFilter===d.name?' active':'';
      return `<button class="fc100-chip${active}" onclick="setFlashcardSubjectV100('${d.name.replace(/'/g,"\\'")}')">${d.icon} ${escapeHtml(d.name)} <small>${count}</small></button>`;
    }).join('');
  }
  document.querySelectorAll('[data-fc-mode]').forEach(b=>b.classList.toggle('active',b.dataset.fcMode===modeFilter));
  const available=document.getElementById('fc100Available');
  const n=filteredCards().length;
  if(available)available.textContent=`${n} cartão${n===1?'':'ões'} disponível${n===1?'':'is'} neste filtro`;
}

function openHub(){
  if(typeof showScreen==='function')showScreen('flashcardsHubV100','navReview');
  renderHub();window.scrollTo(0,0);
}
function setSubject(name){subjectFilter=name;renderHub()}
function setMode(mode){modeFilter=mode;renderHub()}
function start(){
  const pool=filteredCards();
  if(!pool.length){alert('Nenhum flashcard disponível neste filtro agora. Tente “Todos” ou outra matéria.');return;}
  const dueFirst=[...pool].sort((a,b)=>(cardState(a.id).due||0)-(cardState(b.id).due||0));
  session=shuffle(dueFirst.slice(0,Math.max(SESSION_SIZE,Math.min(pool.length,30)))).slice(0,Math.min(SESSION_SIZE,pool.length));
  index=0;revealed=false;
  if(typeof showScreen==='function')showScreen('flashcardSessionV100','navReview');
  renderCard();window.scrollTo(0,0);
}
function renderCard(){
  const c=session[index]; if(!c)return finish();
  const pos=document.getElementById('fc100Pos'),bar=document.getElementById('fc100Bar'),meta=document.getElementById('fc100Meta'),front=document.getElementById('fc100Front'),back=document.getElementById('fc100Back'),answer=document.getElementById('fc100Answer'),ex=document.getElementById('fc100Explanation'),tip=document.getElementById('fc100Tip'),reveal=document.getElementById('fc100Reveal'),actions=document.getElementById('fc100Actions'),due=document.getElementById('fc100CardDue');
  if(pos)pos.textContent=`${index+1}/${session.length}`;
  if(bar)bar.style.width=`${Math.round(index/session.length*100)}%`;
  if(meta)meta.innerHTML=`<span>${c.icon} ${escapeHtml(c.subject)}</span><small>Aula ${String(c.lesson).padStart(2,'0')} • ${escapeHtml(c.lessonTitle)}</small>`;
  if(front)front.textContent=c.front;
  if(answer)answer.textContent=c.answer||'Resposta não cadastrada';
  if(ex){ex.innerHTML=c.explanation?`<b>Explicação</b><p>${escapeHtml(c.explanation)}</p>`:'';ex.style.display=c.explanation?'block':'none'}
  if(tip){tip.innerHTML=c.tip?`💡 ${escapeHtml(c.tip)}`:'';tip.style.display=c.tip?'block':'none'}
  if(due)due.textContent=`Próxima revisão: ${formatDue(cardState(c.id).due)}`;
  revealed=false;
  if(back)back.style.display='none';
  if(actions)actions.style.display='none';
  if(reveal)reveal.style.display='block';
}
function reveal(){
  revealed=true;
  const back=document.getElementById('fc100Back'),actions=document.getElementById('fc100Actions'),btn=document.getElementById('fc100Reveal');
  if(back)back.style.display='block';if(actions)actions.style.display='grid';if(btn)btn.style.display='none';
}
function grade(kind){
  const c=session[index]; if(!c)return;
  const db=load(), old=db[c.id]||{stage:0,due:0,seen:0,known:0,hard:0};
  const now=todayStart();
  if(kind==='hard'){
    old.stage=Math.max(0,(old.stage||0)-1); old.due=now+86400000; old.hard=(old.hard||0)+1;
  }else{
    const next=Math.min(4,(old.stage||0)+1); old.stage=next;
    const days=next===1?1:next===2?7:next===3?30:60;
    old.due=now+days*86400000; old.known=(old.known||0)+1;
  }
  old.seen=(old.seen||0)+1; old.last=Date.now(); db[c.id]=old;save(db);
  index++;if(index>=session.length)finish();else renderCard();
}
function finish(){
  if(typeof showScreen==='function')showScreen('flashcardDoneV100','navReview');
  const done=document.getElementById('fc100DoneCount');if(done)done.textContent=session.length;
  const due=document.getElementById('fc100DoneDue');if(due)due.textContent=allCards().filter(isDue).length;
  window.scrollTo(0,0);
}
function resetAll(){
  if(!confirm('Apagar apenas o progresso dos Flashcards? Suas aulas, simulados e demais dados não serão alterados.'))return;
  localStorage.removeItem(KEY);renderHub();alert('Progresso dos Flashcards reiniciado.');
}

function injectStyle(){if(document.getElementById('fc100Style'))return;const s=document.createElement('style');s.id='fc100Style';s.textContent=`
.fc100-hero{padding:18px;border:1px solid rgba(255,255,255,.08);border-radius:22px;background:linear-gradient(145deg,rgba(111,80,255,.16),rgba(255,255,255,.03));margin:14px 0}.fc100-hero h3{margin:4px 0 6px}.fc100-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:14px 0}.fc100-stats article{padding:12px 8px;border-radius:16px;background:rgba(255,255,255,.045);text-align:center}.fc100-stats strong{display:block;font-size:20px}.fc100-stats small{font-size:10px;opacity:.72}.fc100-subjects,.fc100-modes{display:flex;gap:8px;overflow:auto;padding:4px 0 10px}.fc100-chip,.fc100-mode{border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.04);color:inherit;border-radius:999px;padding:10px 12px;white-space:nowrap}.fc100-chip.active,.fc100-mode.active{border-color:rgba(150,120,255,.75);background:rgba(120,90,255,.16)}.fc100-chip small{opacity:.6;margin-left:4px}.fc100-card{margin:18px 0;padding:20px;border-radius:24px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035);min-height:300px;display:flex;flex-direction:column;justify-content:center}.fc100-meta{display:flex;flex-direction:column;gap:4px;margin-bottom:18px}.fc100-meta span{font-weight:800}.fc100-meta small{opacity:.65}.fc100-question{font-size:20px;font-weight:800;line-height:1.45}.fc100-back{margin-top:18px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08)}.fc100-answer{font-size:18px;font-weight:800}.fc100-explain{margin-top:14px;opacity:.88}.fc100-tip{margin-top:12px;padding:12px;border-radius:14px;background:rgba(255,198,76,.08)}.fc100-actions{grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.fc100-hard{background:rgba(255,85,85,.12)!important}.fc100-know{background:rgba(75,200,140,.12)!important}.fc100-progress{height:6px;background:rgba(255,255,255,.06);border-radius:999px;overflow:hidden;margin:10px 0 14px}.fc100-progress i{display:block;height:100%;background:currentColor;width:0}.fc100-done{text-align:center;padding:34px 18px}.fc100-done .icon{font-size:50px}@media(max-width:520px){.fc100-stats{grid-template-columns:1fr 1fr}.fc100-question{font-size:18px}}
`;document.head.appendChild(s)}

window.openFlashcardsV100=openHub;
window.setFlashcardSubjectV100=setSubject;
window.setFlashcardModeV100=setMode;
window.startFlashcardsV100=start;
window.revealFlashcardV100=reveal;
window.gradeFlashcardV100=grade;
window.resetFlashcardsV100=resetAll;

document.addEventListener('DOMContentLoaded',()=>{injectStyle();});
})();
