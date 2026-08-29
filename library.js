/* Missão PMMG V9.5.0 — Biblioteca Complementar: sem duplicar as aulas */
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
 {id:'comp-pt-1',subject:'Português',icon:'⚡',tag:'RESUMO RÁPIDO',title:'Interpretação em 10 minutos',desc:'Revisão objetiva para antes de questões.',content:`<div class="edital-badge">⚡ REVISÃO • PORTUGUÊS</div><h2>Interpretação em 10 minutos</h2><p>Use este material como revisão, não como substituto da aula. Em questões de interpretação, procure primeiro o comando e depois a evidência textual.</p><h3>Checklist de prova</h3><ul><li><b>Segundo o texto:</b> responda apenas com o que o texto sustenta.</li><li><b>Infere-se:</b> procure pistas que autorizem a conclusão.</li><li><b>Tema:</b> identifique o recorte central.</li><li><b>Finalidade:</b> pergunte o que o autor pretende produzir no leitor.</li></ul><div class="gold-rule">🎯 Não escolha uma alternativa só porque ela é verdadeira fora do texto.</div>`},
 {id:'comp-pt-2',subject:'Português',icon:'🧠',tag:'MAPA MENTAL',title:'Explícito x implícito x inferência',desc:'Mapa de revisão para não confundir os conceitos.',content:`<div class="edital-badge">🧠 MAPA MENTAL • PORTUGUÊS</div><h2>Explícito x implícito x inferência</h2><h3>Explícito</h3><p>A informação aparece diretamente no texto.</p><h3>Implícito</h3><p>A informação não está escrita de forma literal, mas pode ser percebida pelas relações construídas no texto.</p><h3>Inferência</h3><p>É a conclusão produzida a partir de pistas textuais. Precisa ser justificável.</p><div class="gold-rule">🎯 Se você não consegue apontar a pista, trate a conclusão como suspeita.</div>`},
 {id:'comp-pt-3',subject:'Português',icon:'⚠️',tag:'ARMADILHAS',title:'10 armadilhas de Português em prova',desc:'Erros de leitura e linguagem para evitar.',content:`<div class="edital-badge">⚠️ ARMADILHAS • PORTUGUÊS</div><h2>10 armadilhas para vigiar</h2><ol><li>Responder pela opinião pessoal.</li><li>Ignorar palavras como “exceto” e “incorreta”.</li><li>Confundir tema com detalhe.</li><li>Transformar possibilidade em certeza.</li><li>Não observar conectivos.</li><li>Ignorar a referência de pronomes.</li><li>Trocar causa por consequência.</li><li>Generalizar uma afirmação limitada.</li><li>Escolher pela alternativa mais longa.</li><li>Não voltar ao trecho antes de marcar.</li></ol>`},
 {id:'comp-pt-4',subject:'Português',icon:'📝',tag:'TREINO EXTRA',title:'Treino rápido de interpretação',desc:'Questões complementares para revisão ativa.',content:`<div class="edital-badge">📝 TREINO EXTRA • PORTUGUÊS</div><h2>Treino rápido</h2><p><b>Texto:</b> “A leitura frequente amplia o contato com diferentes formas de expressão. Por isso, pode contribuir para o desenvolvimento do vocabulário.”</p><details><summary>1. O texto afirma que a leitura garante vocabulário perfeito?</summary><p><b>Resposta:</b> Não. O texto diz que ela <i>pode contribuir</i>.</p></details><details><summary>2. Qual relação é indicada por “Por isso”?</summary><p><b>Resposta:</b> Uma relação de conclusão/consequência em relação à ideia anterior.</p></details>`},
 {id:'comp-math-1',subject:'Matemática',icon:'📐',tag:'FOLHA DE FÓRMULAS',title:'Fórmulas essenciais de Matemática',desc:'Consulta rápida para revisão antes dos exercícios.',content:`<div class="edital-badge">📐 FÓRMULAS • MATEMÁTICA</div><h2>Folha de fórmulas essenciais</h2><h3>Porcentagem</h3><p>p% de V = (p/100) × V.</p><h3>Regra de três</h3><p>Organize grandezas correspondentes e verifique se a relação é direta ou inversa antes de multiplicar.</p><h3>Média aritmética</h3><p>Média = soma dos valores ÷ quantidade de valores.</p><h3>PA</h3><p>aₙ = a₁ + (n−1)r.</p><h3>PG</h3><p>aₙ = a₁·qⁿ⁻¹.</p><div class="gold-rule">🎯 Fórmula só ajuda depois que você identifica corretamente o que o problema pede.</div>`},
 {id:'comp-math-2',subject:'Matemática',icon:'🧭',tag:'PASSO A PASSO',title:'Como atacar problemas matemáticos',desc:'Método de 5 passos para reduzir erros.',content:`<div class="edital-badge">🧭 MÉTODO • MATEMÁTICA</div><h2>5 passos para problemas</h2><ol><li>Leia sem calcular.</li><li>Separe dados e pergunta.</li><li>Identifique a relação matemática.</li><li>Calcule organizadamente.</li><li>Confira unidade, sinal e plausibilidade.</li></ol><div class="gold-rule">🎯 Antes da conta, escreva o que precisa descobrir.</div>`},
 {id:'comp-math-3',subject:'Matemática',icon:'⚡',tag:'REVISÃO',title:'Porcentagem e regra de três — revisão expressa',desc:'Resumo complementar para exercícios.',content:`<div class="edital-badge">⚡ REVISÃO • MATEMÁTICA</div><h2>Porcentagem e regra de três</h2><p>Transforme porcentagens em fração sobre 100 ou decimal quando isso simplificar a conta. Em regra de três, compare as grandezas antes de montar a proporção.</p><h3>Exemplo</h3><p>20% de 250 = 0,20 × 250 = 50.</p><div class="gold-rule">🎯 Em grandezas inversas, uma aumenta enquanto a outra diminui.</div>`},
 {id:'comp-law-1',subject:'Direito',icon:'⚖️',tag:'LEI SECA ORGANIZADA',title:'CF/88 — roteiro de artigos para revisão',desc:'Roteiro complementar para leitura constitucional.',content:`<div class="edital-badge">⚖️ LEI SECA • DIREITO</div><h2>Roteiro constitucional</h2><p>Use como roteiro de revisão dos blocos constitucionais estudados no projeto.</p><h3>Arts. 1º a 4º</h3><p>Fundamentos, Poderes, objetivos fundamentais e relações internacionais.</p><h3>Art. 5º</h3><p>Direitos, deveres e garantias fundamentais. Dê atenção à literalidade e às diferenças entre os instrumentos de proteção.</p><div class="gold-rule">🎯 Leia a regra, identifique palavras-chave e depois tente explicá-la sem olhar.</div>`},
 {id:'comp-law-2',subject:'Direito',icon:'🧠',tag:'QUADRO COMPARATIVO',title:'Fundamentos x objetivos x princípios internacionais',desc:'Quadro mental para evitar confusões na Constituição.',content:`<div class="edital-badge">🧠 QUADRO • DIREITO</div><h2>Não misture os artigos 1º, 3º e 4º</h2><h3>Art. 1º — Fundamentos</h3><p>É a base estruturante da República Federativa do Brasil.</p><h3>Art. 3º — Objetivos fundamentais</h3><p>Indica finalidades constitucionais a serem perseguidas.</p><h3>Art. 4º — Relações internacionais</h3><p>Reúne princípios que orientam o Brasil em suas relações internacionais.</p><div class="gold-rule">🎯 Em prova, primeiro descubra de qual grupo o item está falando.</div>`},
 {id:'comp-law-3',subject:'Direito',icon:'🛡️',tag:'REVISÃO',title:'Art. 5º — garantias em linguagem simples',desc:'Revisão complementar das garantias fundamentais.',content:`<div class="edital-badge">🛡️ REVISÃO • DIREITO</div><h2>Garantias fundamentais</h2><p>O art. 5º exige leitura cuidadosa. Em vez de decorar frases soltas, associe cada garantia ao bem que ela protege.</p><h3>Legalidade</h3><p>Ninguém será obrigado a fazer ou deixar de fazer algo senão em virtude de lei.</p><h3>Manifestação</h3><p>A manifestação do pensamento é livre, sendo vedado o anonimato.</p><h3>Habeas corpus</h3><p>Relacione-o à proteção da liberdade de locomoção contra ilegalidade ou abuso.</p>`},
 {id:'comp-lit-1',subject:'Literatura',icon:'🗺️',tag:'MAPA DA OBRA',title:'Campo Geral — mapa de personagens e temas',desc:'Revisão visual em texto da obra de Guimarães Rosa.',content:`<div class="edital-badge">🗺️ MAPA • LITERATURA</div><h2>Campo Geral — mapa de revisão</h2><h3>Miguilim</h3><p>Centro da narrativa e da percepção infantil.</p><h3>Dito</h3><p>Figura afetiva importante na formação de Miguilim.</p><h3>Mutúm</h3><p>Espaço mineiro que participa da experiência e do amadurecimento do protagonista.</p><h3>Eixos</h3><p>Infância, família, percepção, perda, natureza e amadurecimento.</p><div class="gold-rule">🎯 Terceira pessoa não significa distanciamento: a focalização acompanha de perto Miguilim.</div>`},
 {id:'comp-lit-2',subject:'Literatura',icon:'⚡',tag:'REVISÃO',title:'Campo Geral — revisão de véspera',desc:'Pontos-chave para relembrar rapidamente.',content:`<div class="edital-badge">⚡ VÉSPERA • LITERATURA</div><h2>Revisão de véspera</h2><ul><li>Autor: João Guimarães Rosa.</li><li>Protagonista: Miguilim.</li><li>Espaço central: Mutúm, em Minas Gerais.</li><li>Focalização próxima da percepção infantil.</li><li>Família, Dito, perdas e amadurecimento são eixos importantes.</li><li>A descoberta da miopia dialoga com transformação e nova percepção.</li></ul>`},
 {id:'comp-eng-1',subject:'Inglês',icon:'🔎',tag:'GUIA DE LEITURA',title:'Inglês sem traduzir tudo',desc:'Estratégia complementar para textos de prova.',content:`<div class="edital-badge">🔎 READING • INGLÊS</div><h2>Leia com objetivo</h2><p>Comece pela pergunta. Depois use <b>skimming</b> para captar o assunto e <b>scanning</b> para localizar a informação pedida.</p><h3>Pistas úteis</h3><ul><li>Título e subtítulo.</li><li>Palavras repetidas.</li><li>Cognatos confirmados pelo contexto.</li><li>Conectivos.</li><li>Pronomes e seus referentes.</li></ul><div class="gold-rule">🎯 Palavra desconhecida não significa texto incompreensível.</div>`},
 {id:'comp-eng-2',subject:'Inglês',icon:'⚠️',tag:'VOCABULÁRIO',title:'Falsos cognatos para revisar',desc:'Lista curta dos falsos cognatos mais perigosos do material.',content:`<div class="edital-badge">⚠️ VOCABULÁRIO • INGLÊS</div><h2>Falsos cognatos</h2><ul><li><b>actually</b> = na verdade.</li><li><b>parents</b> = pais.</li><li><b>pretend</b> = fingir.</li><li><b>push</b> = empurrar.</li></ul><div class="gold-rule">🎯 Se a tradução óbvia deixar a frase estranha, confirme pelo contexto.</div>`}
];

function advancedHtml(id){ return ''; }

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
function lessonData(m){ return m; }
window.toggleLibraryDoneV9=function(id){setDone(id,!getDone(id));renderLibraryV9();}
window.openLibraryV9=function(){renderLibraryV9(); if(typeof showScreen==='function') showScreen('libraryV9Screen','navStudy');}
window.selectLibrarySubjectV9=function(subject){const f=document.getElementById('v9libFilter');if(f)f.value='all';const q=document.getElementById('v9libSearch');if(q)q.value='';window.v9libSubject=subject;renderLibraryV9();document.getElementById('v9libMaterials')?.scrollIntoView({behavior:'smooth'});}
window.openLibraryMaterialV9=function(id){
 const m=materials.find(x=>x.id===id); if(!m)return;
 current={...m,url:null};
 openReader(current,m.content,`${m.tag} • ${m.subject}`,m.desc);
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
 bodyEl.innerHTML=(html||'<p>Material indisponível.</p>')+advancedHtml(item.id);
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
