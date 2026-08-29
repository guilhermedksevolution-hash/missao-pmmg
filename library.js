/* Missão PMMG V9.1 — Biblioteca PMMG (módulo isolado) */
(function(){
const KEY='pmmg_library_v91';
const subjects=[
 {id:'Português',icon:'📘',desc:'Interpretação, gramática e linguagem'},
 {id:'Matemática',icon:'🧮',desc:'Raciocínio lógico e matemática'},
 {id:'Direito',icon:'⚖️',desc:'Direito e Direitos Humanos'},
 {id:'Literatura',icon:'📚',desc:'Obras, análise e revisão'},
 {id:'Inglês',icon:'🌐',desc:'Leitura, vocabulário e gramática'}
];
const materials=[
 {id:'pt-interp',subject:'Português',icon:'📘',tag:'MATERIAL PRINCIPAL',title:'Interpretação e estudo de texto',desc:'Aula escrita completa + exemplos + questões.',action:'lesson',lesson:1},
 {id:'pt-arg',subject:'Português',icon:'📝',tag:'REVISÃO',title:'Ideia principal, inferência e argumentação',desc:'Reforce tese, argumentos e inferências.',action:'lesson',lesson:2},
 {id:'mat-op',subject:'Matemática',icon:'🧮',tag:'MATERIAL PRINCIPAL',title:'Números e operações fundamentais',desc:'Base matemática para avançar com segurança.',action:'math',lesson:1},
 {id:'mat-frac',subject:'Matemática',icon:'➗',tag:'REVISÃO',title:'Frações — fundamentos',desc:'Equivalência, simplificação e comparação.',action:'math',lesson:2},
 {id:'dir-cf',subject:'Direito',icon:'⚖️',tag:'MATERIAL PRINCIPAL',title:'Princípios Fundamentais da Constituição',desc:'Aula interna sobre os arts. 1º a 4º.',action:'law',lesson:1},
 {id:'dir-art5',subject:'Direito',icon:'🛡️',tag:'ESSENCIAL',title:'Direitos e Garantias Fundamentais',desc:'Aula interna focada no art. 5º.',action:'law',lesson:2},
 {id:'lit-campo',subject:'Literatura',icon:'📖',tag:'OBRA',title:'Campo Geral — contexto e narrador',desc:'Miguilim, Mutúm, foco narrativo e amadurecimento.',action:'lit',lesson:1},
 {id:'lit-person',subject:'Literatura',icon:'📖',tag:'REVISÃO',title:'Campo Geral — personagens e conflitos',desc:'Dito, família, perdas e transformação.',action:'lit',lesson:2},
 {id:'ing-read',subject:'Inglês',icon:'🌐',tag:'MATERIAL PRINCIPAL',title:'Estratégias de leitura — do zero',desc:'Skimming, scanning e interpretação.',action:'eng',lesson:1},
 {id:'ing-cog',subject:'Inglês',icon:'🔤',tag:'REVISÃO',title:'Cognatos e falsos cognatos',desc:'Vocabulário essencial para leitura.',action:'eng',lesson:2}
];
const official=[
 {id:'of-cf',title:'Constituição Federal — texto compilado',source:'Planalto',url:'https://www4.planalto.gov.br/legislacao/legis-federal/constituicao'},
 {id:'of-cp',title:'Código Penal — Decreto-Lei 2.848',source:'Planalto',url:'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'},
 {id:'of-cemg',title:'Constituição do Estado de Minas Gerais',source:'ALMG',url:'https://www.almg.gov.br/atividade-parlamentar/leis/constituicao-estadual/'},
 {id:'of-dudh',title:'Declaração Universal dos Direitos Humanos',source:'UNICEF Brasil',url:'https://www.unicef.org/brazil/declaracao-universal-dos-direitos-humanos'}
];
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
function save(v){localStorage.setItem(KEY,JSON.stringify(v))}
function done(id){return !!load()[id]}
window.toggleLibraryDoneV9=function(id){const s=load();s[id]=!s[id];save(s);renderLibraryV9();}
window.openLibraryV9=function(){renderLibraryV9(); if(typeof showScreen==='function') showScreen('libraryV9Screen','navStudy');}
window.selectLibrarySubjectV9=function(subject){const f=document.getElementById('v9libFilter');if(f)f.value='all';const q=document.getElementById('v9libSearch');if(q)q.value='';window.v9libSubject=subject;renderLibraryV9();document.getElementById('v9libMaterials')?.scrollIntoView({behavior:'smooth'});}
window.openLibraryMaterialV9=function(id){const m=materials.find(x=>x.id===id);if(!m)return; const s=load();s[id]=true;save(s);
 if(m.action==='lesson'){currentSubject='Português';openLesson(m.lesson)}
 else if(m.action==='math'){currentSubject='Matemática'; if(window.openMathLessonV70) openMathLessonV70(m.lesson); else {openMathV70?.();setTimeout(()=>openLesson(m.lesson),0)}}
 else if(m.action==='law'){currentSubject='Direito'; if(window.openLawLessonV648) openLawLessonV648(m.lesson); else {openLawV648?.();setTimeout(()=>openLesson(m.lesson),0)}}
 else if(m.action==='lit'){currentSubject='Literatura'; if(window.openLiteratureLessonV6443) openLiteratureLessonV6443(m.lesson); else {openLiteratureV6443?.();setTimeout(()=>openLesson(m.lesson),0)}}
 else if(m.action==='eng'){currentSubject='Inglês'; if(window.openEnglishLessonV646) openEnglishLessonV646(m.lesson); else {openEnglishV646?.();setTimeout(()=>openLesson(m.lesson),0)}}
}
window.openOfficialV9=function(id){const o=official.find(x=>x.id===id);if(o)window.open(o.url,'_blank','noopener,noreferrer')}
window.renderLibraryV9=function(){
 const status=load(), q=(document.getElementById('v9libSearch')?.value||'').toLowerCase().trim(), filter=document.getElementById('v9libFilter')?.value||'all';
 const allCount=materials.length+official.length, doneCount=[...materials,...official].filter(x=>status[x.id]).length, pct=Math.round(doneCount/allCount*100);
 const t=document.getElementById('v9libProgressText'),b=document.getElementById('v9libProgressBar'),sub=document.getElementById('v9libProgressSub');if(t)t.textContent=pct+'%';if(b)b.style.width=pct+'%';if(sub)sub.textContent=doneCount+' de '+allCount+' materiais estudados';
 const se=document.getElementById('v9libSubjects');if(se)se.innerHTML=subjects.map(s=>{const list=materials.filter(m=>m.subject===s.id),d=list.filter(m=>status[m.id]).length,p=list.length?Math.round(d/list.length*100):0;return `<article onclick="selectLibrarySubjectV9('${s.id}')"><em>${s.icon}</em><div><b>${s.id==='Matemática'?'Raciocínio Lógico-Matemático':s.id}</b><p>${s.desc}</p><div class="bar"><i style="width:${p}%"></i></div><small>${d}/${list.length} estudados</small></div><strong>›</strong></article>`}).join('');
 let list=materials.filter(m=>(!window.v9libSubject||m.subject===window.v9libSubject)&&(!q||(m.title+' '+m.desc+' '+m.subject).toLowerCase().includes(q))&&(filter==='all'||(filter==='done'?status[m.id]:!status[m.id])));
 const me=document.getElementById('v9libMaterials');if(me)me.innerHTML=(window.v9libSubject?`<button class="v9lib-clear" onclick="window.v9libSubject=null;renderLibraryV9()">← Ver todas as matérias</button>`:'')+(list.length?list.map(m=>`<article class="${status[m.id]?'is-done':''}"><div class="v9lib-mat-icon">${m.icon}</div><div class="v9lib-mat-main"><span>${m.tag} • ${m.subject}</span><b>${m.title}</b><p>${m.desc}</p><div><button onclick="openLibraryMaterialV9('${m.id}')">Abrir material</button><button class="v9lib-check" onclick="event.stopPropagation();toggleLibraryDoneV9('${m.id}')">${status[m.id]?'✓ Estudado':'Marcar estudado'}</button></div></div></article>`).join(''):'<div class="v9lib-empty">Nenhum material encontrado com esse filtro.</div>');
 const oe=document.getElementById('v9libOfficial');if(oe)oe.innerHTML=official.map(o=>`<article class="${status[o.id]?'is-done':''}"><div>🏛️</div><section><span>FONTE OFICIAL</span><b>${o.title}</b><small>${o.source}</small></section><div class="v9lib-off-actions"><button onclick="openOfficialV9('${o.id}');toggleLibraryDoneV9('${o.id}')">Abrir</button><button onclick="toggleLibraryDoneV9('${o.id}')">${status[o.id]?'✓':'○'}</button></div></article>`).join('');
}
})();
