/* MISSÃO PMMG V10.8.0 — Banco de Questões consolidado.
   Evolui o banco existente; não cria um segundo banco. */
(function(){
  'use strict';
  const SUBJECTS=['Todos','Português','Literatura','Inglês','Direito','Matemática'];
  function el(id){return document.getElementById(id)}
  function pool(subject){return typeof window.getSimulationPoolV510==='function'
    ? (subject==='Todos'?window.getSimulationPoolV510(): (typeof window.getSimulationPoolV7==='function'?window.getSimulationPoolV7(subject):[]))
    : (typeof window.getSimulationPoolV7==='function'?window.getSimulationPoolV7(subject):[])}
  function allPool(subject){
    if(typeof window.getSimulationPoolV7==='function') return window.getSimulationPoolV7(subject);
    const p=typeof window.getSimulationPoolV510==='function'?window.getSimulationPoolV510():[];
    return subject==='Todos'?p:p.filter(q=>q.subject===subject);
  }
  function errors(){
    try{
      if(window.state && Array.isArray(window.state.errors)) return window.state.errors;
      const s=JSON.parse(localStorage.getItem('missaoPMMGState')||'{}'); return Array.isArray(s.errors)?s.errors:[];
    }catch(e){return[]}
  }
  function isError(q){
    return errors().some(e=>
      (e.question && e.question===q.question) ||
      (e.subject===q.subject && Number(e.lessonNumber)===Number(q.lessonNumber) && Number(e.questionIndex)===Number(q.questionIndex))
    );
  }
  function filtered(){
    const subject=el('v7BankSubject')?.value||'Todos';
    const lesson=el('v103BankLesson')?.value||'Todos';
    const mode=el('v103BankMode')?.value||'all';
    let p=allPool(subject);
    if(lesson!=='Todos') p=p.filter(q=>`${q.subject}|${q.lessonNumber}`===lesson);
    if(mode==='errors') p=p.filter(isError);
    return p;
  }
  function updateLessons(){
    const select=el('v103BankLesson'); if(!select)return;
    const subject=el('v7BankSubject')?.value||'Todos';
    const p=allPool(subject), seen=new Set();
    const rows=[];
    p.forEach(q=>{const k=`${q.subject}|${q.lessonNumber}`;if(!seen.has(k)){seen.add(k);rows.push({k,subject:q.subject,n:q.lessonNumber,title:q.lessonTitle||`Aula ${q.lessonNumber}`})}});
    rows.sort((a,b)=>a.subject.localeCompare(b.subject,'pt-BR')||a.n-b.n);
    select.innerHTML='<option value="Todos">Todos os assuntos</option>'+rows.map(x=>`<option value="${x.k}">${subject==='Todos'?x.subject+' • ':''}${String(x.n).padStart(2,'0')} — ${x.title}</option>`).join('');
    updateInfo();
  }
  function updateInfo(){
    const p=filtered(), total=allPool('Todos').length, err=errors().length;
    const info=el('v7BankTotal'); if(info)info.textContent=`${p.length} questões neste filtro • ${total} no banco`;
    const meta=el('v103BankMeta'); if(meta)meta.innerHTML=`<span>📚 ${total} no banco</span><span>❌ ${err} no Caderno de Erros</span>`;
  }
  function shuffle(q){
    const tagged=q.options.map((text,i)=>({text,correct:i===q.answer})).sort(()=>Math.random()-.5);
    return {...q,options:tagged.map(x=>x.text),answer:tagged.findIndex(x=>x.correct)};
  }
  window.openQuestionBankV7=function(){
    if(typeof window.showScreen==='function')window.showScreen('questionBankV7','navTrain');
    updateLessons(); updateInfo(); scrollTo(0,0);
  };
  window.startQuestionBankV7=function(){
    const count=Number(el('v7BankCount')?.value||10), p=filtered();
    if(!p.length){alert(el('v103BankMode')?.value==='errors'?'Nenhuma questão do Caderno de Erros corresponde a este filtro.':'Nenhuma questão disponível neste filtro.');return;}
    window.simQuestionsV510=[...p].sort(()=>Math.random()-.5).slice(0,Math.min(count,p.length)).map(shuffle);
    window.simAnswersV510=new Array(window.simQuestionsV510.length).fill(null);
    window.simIndexV510=0; window.simSecondsV510=Math.max(300,window.simQuestionsV510.length*90); window.simStartedAtV510=Date.now();
    if(window.simTimerV510)clearInterval(window.simTimerV510);
    const subject=el('v7BankSubject')?.value||'Todos', mode=el('v103BankMode')?.value||'all';
    const title=mode==='errors'?'Refazer meus erros':(subject==='Todos'?'Banco misto':`Banco • ${subject}`);
    const titleEl=el('simTitleV510');if(titleEl)titleEl.textContent=title;
    window.showScreen('simulationScreenV510','navTrain'); window.renderSimulationQuestionV510(); window.updateSimulationClockV510();
    window.simTimerV510=setInterval(()=>{window.simSecondsV510--;window.updateSimulationClockV510();if(window.simSecondsV510<=0){clearInterval(window.simTimerV510);window.simTimerV510=null;window.finishSimulationV510(true)}},1000);
  };
  window.v103BankSubjectChanged=updateLessons;
  window.v103BankFilterChanged=updateInfo;
  document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{updateLessons();updateInfo()},180));
})();
