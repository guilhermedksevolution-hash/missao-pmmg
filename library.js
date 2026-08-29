/* Missão PMMG V9.2.1 — Biblioteca PMMG interna • correção do leitor */
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
 {id:'pt-interp',subject:'Português',icon:'📘',tag:'MATERIAL PRINCIPAL',title:'Interpretação e estudo de texto',desc:'Aula escrita completa + exemplos + questões.',source:'lesson',lesson:1},
 {id:'pt-arg',subject:'Português',icon:'📝',tag:'REVISÃO',title:'Ideia principal, inferência e argumentação',desc:'Reforce tese, argumentos e inferências.',source:'lesson',lesson:2},
 {id:'mat-op',subject:'Matemática',icon:'🧮',tag:'MATERIAL PRINCIPAL',title:'Números e operações fundamentais',desc:'Base matemática para avançar com segurança.',source:'math',lesson:1},
 {id:'mat-frac',subject:'Matemática',icon:'➗',tag:'REVISÃO',title:'Frações — fundamentos',desc:'Equivalência, simplificação e comparação.',source:'math',lesson:2},
 {id:'dir-cf',subject:'Direito',icon:'⚖️',tag:'MATERIAL PRINCIPAL',title:'Princípios Fundamentais da Constituição',desc:'Aula interna sobre os arts. 1º a 4º.',source:'law',lesson:1},
 {id:'dir-art5',subject:'Direito',icon:'🛡️',tag:'ESSENCIAL',title:'Direitos e Garantias Fundamentais',desc:'Aula interna focada no art. 5º.',source:'law',lesson:2},
 {id:'lit-campo',subject:'Literatura',icon:'📖',tag:'OBRA',title:'Campo Geral — contexto e narrador',desc:'Miguilim, Mutúm, foco narrativo e amadurecimento.',source:'lit',lesson:1},
 {id:'lit-person',subject:'Literatura',icon:'📖',tag:'REVISÃO',title:'Campo Geral — personagens e conflitos',desc:'Dito, família, perdas e transformação.',source:'lit',lesson:2},
 {id:'ing-read',subject:'Inglês',icon:'🌐',tag:'MATERIAL PRINCIPAL',title:'Estratégias de leitura — do zero',desc:'Skimming, scanning e interpretação.',source:'eng',lesson:1},
 {id:'ing-cog',subject:'Inglês',icon:'🔤',tag:'REVISÃO',title:'Cognatos e falsos cognatos',desc:'Vocabulário essencial para leitura.',source:'eng',lesson:2}
];
const official=[
 {id:'of-cf',subject:'Direito',title:'Constituição Federal — guia de leitura',source:'Planalto',url:'https://www4.planalto.gov.br/legislacao/legis-federal/constituicao',content:`<div class="edital-badge">🏛 FONTE OFICIAL • CONSTITUIÇÃO FEDERAL</div><h2>Guia de leitura — Constituição Federal</h2><p>Este material organiza a leitura constitucional dentro do Missão PMMG. Para preparação, comece pelos dispositivos já conectados às aulas de Direito do projeto.</p><h3>1. Princípios Fundamentais</h3><p>Revise os arts. 1º a 4º: fundamentos da República, separação dos Poderes, objetivos fundamentais e princípios das relações internacionais.</p><h3>2. Direitos e Garantias Fundamentais</h3><p>Dê atenção especial ao art. 5º. Treine a literalidade dos direitos, deveres e garantias e aprenda a diferenciar os principais instrumentos de proteção.</p><div class="gold-rule">🎯 Use este guia para estudar dentro do site. O botão “Fonte oficial” fica disponível apenas para conferir o texto atualizado no Planalto.</div>`},
 {id:'of-cp',subject:'Direito',title:'Código Penal — guia de estudo',source:'Planalto',url:'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm',content:`<div class="edital-badge">🏛 FONTE OFICIAL • CÓDIGO PENAL</div><h2>Guia de estudo — Código Penal</h2><p>Use esta página como ponto de entrada para a legislação penal dentro da Biblioteca. O foco deve seguir exatamente os tópicos previstos no edital-base e nas aulas de Direito do projeto.</p><h3>Como estudar lei seca</h3><p>Faça uma primeira leitura para entender a estrutura. Na segunda, destaque conceitos, requisitos, exceções e palavras que alteram o sentido da regra. Depois, teste o conteúdo com questões.</p><h3>Revisão ativa</h3><p>Ao terminar um bloco, tente explicar a regra sem olhar o texto e anote no Caderno de Erros qualquer confusão recorrente.</p><div class="gold-rule">🎯 O texto oficial pode sofrer alterações. Use “Fonte oficial” quando quiser conferir a redação vigente.</div>`},
 {id:'of-cemg',subject:'Direito',title:'Constituição de Minas Gerais — guia de leitura',source:'ALMG',url:'https://www.almg.gov.br/atividade-parlamentar/leis/constituicao-estadual/',content:`<div class="edital-badge">🏛 FONTE OFICIAL • MINAS GERAIS</div><h2>Guia de leitura — Constituição do Estado de Minas Gerais</h2><p>A Constituição mineira é uma fonte importante para compreender a organização estadual e os dispositivos relacionados à segurança pública.</p><h3>Estratégia</h3><p>Leia os dispositivos cobrados pelo edital em blocos curtos. Compare competências, órgãos e atribuições, evitando decorar frases fora do contexto.</p><h3>Segurança pública</h3><p>Quando o programa cobrar organização da segurança pública estadual, concentre a revisão na redação constitucional indicada pelo edital e relacione-a às aulas correspondentes.</p><div class="gold-rule">🎯 A Biblioteca traz o guia; a ALMG continua disponível no botão “Fonte oficial” para conferência da redação atual.</div>`},
 {id:'of-dudh',subject:'Direito',title:'Declaração Universal dos Direitos Humanos — guia',source:'ONU/UNICEF',url:'https://www.unicef.org/brazil/declaracao-universal-dos-direitos-humanos',content:`<div class="edital-badge">🌍 DIREITOS HUMANOS • GUIA DE LEITURA</div><h2>Declaração Universal dos Direitos Humanos</h2><p>Estude a Declaração entendendo seus princípios e a proteção da dignidade humana, e não apenas como uma lista isolada de artigos.</p><h3>Pontos de atenção</h3><p>Observe igualdade e dignidade, proteção contra discriminação, liberdade, segurança, garantias básicas e direitos civis, políticos, sociais e culturais.</p><h3>Método para prova</h3><p>Leia um pequeno conjunto de artigos, resuma com suas palavras e depois compare sua explicação com o texto. Questões costumam explorar trocas de termos e afirmações absolutas.</p><div class="gold-rule">🎯 A fonte externa fica opcional. Todo o roteiro de estudo pode ser lido aqui dentro.</div>`}
];
let current=null;
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
function save(v){localStorage.setItem(KEY,JSON.stringify(v))}
function getDone(id){return !!load()[id]}
function setDone(id,val){const s=load();s[id]=val;save(s)}
function lessonData(m){
 const src=m.source==='lesson'?window.lessons:m.source==='math'?window.matematicaLessons:m.source==='law'?window.direitoLessons:m.source==='lit'?window.literaturaLessons:window.inglesLessons;
 return src?.[m.lesson]||null;
}
window.toggleLibraryDoneV9=function(id){setDone(id,!getDone(id));renderLibraryV9();}
window.openLibraryV9=function(){renderLibraryV9(); if(typeof showScreen==='function') showScreen('libraryV9Screen','navStudy');}
window.selectLibrarySubjectV9=function(subject){const f=document.getElementById('v9libFilter');if(f)f.value='all';const q=document.getElementById('v9libSearch');if(q)q.value='';window.v9libSubject=subject;renderLibraryV9();document.getElementById('v9libMaterials')?.scrollIntoView({behavior:'smooth'});}
window.openLibraryMaterialV9=function(id){
 const m=materials.find(x=>x.id===id); if(!m)return; const l=lessonData(m); if(!l)return;
 current={...m,url:null};
 openReader(current,l.content,`${m.tag} • ${m.subject}`,m.desc);
}
window.openOfficialV9=function(id){
 const o=official.find(x=>x.id===id); if(!o)return; current=o;
 openReader(o,o.content,'FONTE OFICIAL • '+o.source,'Leitura organizada dentro do Missão PMMG.');
}
function openReader(item,html,kicker,subtitle){
 const reader=document.getElementById('libraryReaderV92Screen');
 const kickerEl=document.getElementById('v92ReaderKicker');
 const titleEl=document.getElementById('v92ReaderTitle');
 const subtitleEl=document.getElementById('v92ReaderSubtitle');
 const bodyEl=document.getElementById('v92ReaderBody');
 const source=document.getElementById('v92ReaderSource');
 if(!reader||!kickerEl||!titleEl||!subtitleEl||!bodyEl){
   console.error('Biblioteca PMMG: leitor interno não encontrado.');
   return;
 }
 kickerEl.textContent=kicker||'BIBLIOTECA PMMG';
 titleEl.textContent=item.title||'Material';
 subtitleEl.textContent=subtitle||'';
 bodyEl.innerHTML=html||'<p>Material indisponível.</p>';
 if(source) source.style.display=item.url?'inline-flex':'none';
 updateReaderDone();
 // V9.2.1: ativação direta do leitor. Não depende de outras rotinas de navegação.
 document.querySelectorAll('.screen').forEach(function(screen){
   screen.classList.remove('active');
   screen.style.display='';
 });
 reader.classList.add('active');
 reader.style.display='block';
 const navStudy=document.getElementById('navStudy');
 document.querySelectorAll('.bottom-nav button').forEach(function(btn){btn.classList.remove('active');});
 if(navStudy) navStudy.classList.add('active');
 window.scrollTo(0,0);
}
function updateReaderDone(){const b=document.getElementById('v92ReaderDone');if(b&&current)b.textContent=getDone(current.id)?'✓ Estudado':'○ Marcar estudado';}
window.toggleCurrentLibraryDoneV92=function(force){if(!current)return;setDone(current.id,force===true?true:!getDone(current.id));updateReaderDone();renderLibraryV9();}
window.openCurrentLibrarySourceV92=function(){if(current?.url)window.open(current.url,'_blank','noopener,noreferrer')}
window.askProfessorFromLibraryV92=function(){
 if(!current)return;
 try{window.pmmgProfessorContext={subject:current.subject||'Direito',title:current.title,source:'Biblioteca PMMG'};}catch(e){}
 if(typeof openProfessorIA==='function')openProfessorIA();
}
window.renderLibraryV9=function(){
 const status=load(), q=(document.getElementById('v9libSearch')?.value||'').toLowerCase().trim(), filter=document.getElementById('v9libFilter')?.value||'all';
 const all=[...materials,...official], allCount=all.length, doneCount=all.filter(x=>status[x.id]).length, pct=Math.round(doneCount/allCount*100);
 const t=document.getElementById('v9libProgressText'),b=document.getElementById('v9libProgressBar'),sub=document.getElementById('v9libProgressSub');if(t)t.textContent=pct+'%';if(b)b.style.width=pct+'%';if(sub)sub.textContent=doneCount+' de '+allCount+' materiais estudados';
 const se=document.getElementById('v9libSubjects');if(se)se.innerHTML=subjects.map(s=>{const list=materials.filter(m=>m.subject===s.id),d=list.filter(m=>status[m.id]).length,p=list.length?Math.round(d/list.length*100):0;return `<article onclick="selectLibrarySubjectV9('${s.id}')"><em>${s.icon}</em><div><b>${s.id==='Matemática'?'Raciocínio Lógico-Matemático':s.id}</b><p>${s.desc}</p><div class="bar"><i style="width:${p}%"></i></div><small>${d}/${list.length} estudados</small></div><strong>›</strong></article>`}).join('');
 let list=materials.filter(m=>(!window.v9libSubject||m.subject===window.v9libSubject)&&(!q||(m.title+' '+m.desc+' '+m.subject).toLowerCase().includes(q))&&(filter==='all'||(filter==='done'?status[m.id]:!status[m.id])));
 const me=document.getElementById('v9libMaterials');if(me)me.innerHTML=(window.v9libSubject?`<button class="v9lib-clear" onclick="window.v9libSubject=null;renderLibraryV9()">← Ver todas as matérias</button>`:'')+(list.length?list.map(m=>`<article class="${status[m.id]?'is-done':''}"><div class="v9lib-mat-icon">${m.icon}</div><div class="v9lib-mat-main"><span>${m.tag} • ${m.subject}</span><b>${m.title}</b><p>${m.desc}</p><div><button type="button" onclick="event.preventDefault();event.stopPropagation();window.openLibraryMaterialV9('${m.id}')">Ler dentro do site</button><button class="v9lib-check" onclick="event.stopPropagation();toggleLibraryDoneV9('${m.id}')">${status[m.id]?'✓ Estudado':'Marcar estudado'}</button></div></div></article>`).join(''):'<div class="v9lib-empty">Nenhum material encontrado com esse filtro.</div>');
 const oe=document.getElementById('v9libOfficial');if(oe)oe.innerHTML=official.map(o=>`<article class="${status[o.id]?'is-done':''}"><div>🏛️</div><section><span>LEITURA INTERNA • ${o.source}</span><b>${o.title}</b><small>Abra sem sair do Missão PMMG</small></section><div class="v9lib-off-actions"><button type="button" onclick="event.preventDefault();event.stopPropagation();window.openOfficialV9('${o.id}')">Ler aqui</button><button onclick="toggleLibraryDoneV9('${o.id}')">${status[o.id]?'✓':'○'}</button></div></article>`).join('');
}
})();
