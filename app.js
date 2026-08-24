const quiz1=[
{q:"Em uma questão de interpretação, a resposta deve se apoiar principalmente em:",a:["Sua opinião pessoal","O texto apresentado","A alternativa mais longa","O que outras pessoas pensam"],c:1,e:"A interpretação deve ser sustentada pelo texto."},
{q:"A ideia principal de um texto é:",a:["A mensagem central desenvolvida","Sempre a primeira frase","A palavra mais repetida","A opinião do leitor"],c:0,e:"A ideia principal representa o núcleo da mensagem."},
{q:"O texto diz: “Marina levou casaco porque a temperatura caiu.” O que é seguro concluir?",a:["Marina comprou o casaco hoje","A temperatura estava mais baixa","Marina odeia frio","Era madrugada"],c:1,e:"Somente a queda da temperatura está sustentada pela frase."},
{q:"Antes de marcar uma alternativa, uma boa estratégia é:",a:["Inventar detalhes","Confirmar a resposta no texto","Escolher rapidamente","Ignorar o enunciado"],c:1,e:"Voltar ao texto ajuda a evitar conclusões sem fundamento."},
{q:"Qual atitude pode causar erro de interpretação?",a:["Identificar palavras-chave","Ler o comando","Responder pela própria opinião sem conferir o texto","Procurar a ideia central"],c:2,e:"A opinião pessoal não substitui as informações fornecidas pelo texto."}
];

const quiz2=[
{q:"A ideia principal de um texto corresponde:",a:["Ao detalhe menos importante","À mensagem central","Sempre ao título","À opinião do leitor"],c:1,e:"A ideia principal organiza o sentido central do texto."},
{q:"Inferir significa:",a:["Copiar uma frase","Inventar uma informação","Concluir algo a partir de pistas do texto","Ignorar o contexto"],c:2,e:"Inferência é uma conclusão baseada em evidências do texto."},
{q:"“As ruas estavam molhadas e as pessoas carregavam guarda-chuvas.” Uma inferência possível é:",a:["Provavelmente choveu","Era meio-dia","Todos estavam atrasados","As ruas foram lavadas"],c:0,e:"A chuva é a conclusão mais diretamente sustentada pelas pistas."},
{q:"Uma inferência correta precisa:",a:["Ser baseada no texto","Ser criativa","Ser sempre explícita","Contradizer o autor"],c:0,e:"Inferências válidas partem de pistas e contexto fornecidos."},
{q:"Para localizar a ideia principal, ajuda perguntar:",a:["Qual palavra é mais longa?","Qual é a mensagem central?","Quantas linhas há?","Quem publicou primeiro?"],c:1,e:"Perguntar pela mensagem central ajuda a encontrar a ideia principal."}
];

let currentLesson=1,questions=[],qi=0,score=0,errors=[],answered=false,lastPassed=false,lastPct=0;

function show(id){
 document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
 document.getElementById(id).classList.add("active");
 document.querySelectorAll("nav button").forEach(x=>x.classList.toggle("active",x.dataset.page===id));
 scrollTo(0,0)
}

function startQuiz(lesson){
 currentLesson=lesson;
 questions=lesson===1?quiz1:quiz2;
 qi=0;score=0;errors=[];answered=false;
 show("quiz");renderQ()
}

function backToLesson(){show(currentLesson===1?"lesson1":"lesson2")}

function renderQ(){
 answered=false;
 let q=questions[qi];
 qnum.textContent=`QUESTÃO ${qi+1} DE ${questions.length}`;
 scoreNow.textContent=`${score} acertos`;
 qbar.style.width=`${(qi+1)/questions.length*100}%`;
 qtext.textContent=q.q;
 answers.innerHTML="";
 q.a.forEach((t,i)=>{
   let b=document.createElement("button");
   b.className="answer";
   b.textContent=String.fromCharCode(65+i)+". "+t;
   b.onclick=()=>answer(i,b);
   answers.appendChild(b)
 });
 feedback.classList.add("hidden");
 next.classList.add("hidden");
 next.textContent=qi===questions.length-1?"VER RESULTADO":"PRÓXIMA"
}

function answer(i,b){
 if(answered)return;
 answered=true;
 let q=questions[qi],bs=[...document.querySelectorAll(".answer")];
 bs.forEach(x=>x.disabled=true);
 if(i===q.c){score++;b.classList.add("ok")}
 else{b.classList.add("no");bs[q.c].classList.add("ok");errors.push({lesson:currentLesson,q:q.q,exp:q.e})}
 feedback.textContent=q.e;
 feedback.classList.remove("hidden");
 next.classList.remove("hidden");
 scoreNow.textContent=`${score} acertos`
}

function nextQ(){
 if(qi<questions.length-1){qi++;renderQ();return}
 lastPct=Math.round(score/questions.length*100);
 lastPassed=lastPct>=70;
 saveAttempt();
 renderResult();
 show("result")
}

function saveAttempt(){
 let history=JSON.parse(localStorage.getItem("history")||"[]");
 history.unshift({lesson:currentLesson,pct:lastPct,passed:lastPassed,date:new Date().toLocaleDateString("pt-BR")});
 history=history.slice(0,8);
 localStorage.setItem("history",JSON.stringify(history));
 let stored=JSON.parse(localStorage.getItem("errors")||"[]");
 stored=[...errors,...stored].slice(0,20);
 localStorage.setItem("errors",JSON.stringify(stored))
}

function renderResult(){
 resultPct.textContent=lastPct+"%";
 resultScore.textContent=`${score}/${questions.length}`;
 document.querySelector(".circle").className="circle";
 if(lastPassed){
   resultTitle.textContent="Missão aprovada 🟢";
   resultMsg.textContent="Você atingiu o mínimo de 70% e pode avançar.";
   mastery.textContent="DOMÍNIO: aprovado";
   resultAction.textContent="CONCLUIR E RECEBER XP";
 }else{
   document.querySelector(".circle").classList.add(lastPct>=50?"warn":"fail");
   resultTitle.textContent=lastPct>=50?"Quase lá 🟠":"Vamos reforçar a base 🔴";
   resultMsg.textContent="Você ainda não atingiu 70%. Seus erros foram salvos para revisão.";
   mastery.textContent="DOMÍNIO: refazer conteúdo";
   resultAction.textContent="REVISAR E TENTAR NOVAMENTE";
 }
}

function finishResult(){
 if(lastPassed){
   const key="passed"+currentLesson;
   if(!localStorage.getItem(key)){
     localStorage.setItem("xp",Number(localStorage.getItem("xp")||0)+100);
     localStorage.setItem(key,"1");
   }
   if(currentLesson===1)localStorage.setItem("lesson2Unlocked","1");
   sync();
   show("progressPage");
 }else{
   sync();
   show("review");
   showReview()
 }
}

function showReview(){
 const e=JSON.parse(localStorage.getItem("errors")||"[]");
 reviewList.innerHTML=e.length?e.map((x,i)=>`<div class="card reviewItem"><b>${i+1}. ${x.q}</b><p class="muted">${x.exp}</p></div>`).join(""):'<div class="card">Nenhum erro registrado.</div>';
 show("review")
}

function sync(){
 let x=Number(localStorage.getItem("xp")||0);
 let p1=!!localStorage.getItem("passed1");
 let p2=!!localStorage.getItem("passed2");
 let unlocked=!!localStorage.getItem("lesson2Unlocked");
 let passedCount=(p1?1:0)+(p2?1:0);
 let progress=passedCount*20;

 xp.textContent=x;
 missions.textContent=passedCount;
 general.textContent=progress+"%";
 pPct.textContent=progress+"%";
 pbar.style.width=progress+"%";

 status1.textContent=p1?"✅ Aprovada":"Em andamento";
 status2.textContent=p2?"✅ Aprovada":unlocked?"🔓 Liberada":"🔒";

 nextMissionTitle.textContent=unlocked?"🔓 Aula 02 liberada":"🔒 Aula 02 bloqueada";
 nextMissionText.textContent=unlocked?"Ideia principal e inferência já está disponível.":"Acerte pelo menos 70% na Aula 01 para desbloquear.";
 nextMissionBtn.disabled=!unlocked;
 nextMissionBtn.textContent=unlocked?"COMEÇAR AULA 02":"BLOQUEADA";

 if(p1){aPass.textContent="✅ Aprovado na primeira aula";aSecond.textContent="✅ Desbloqueei a Aula 02"}

 const h=JSON.parse(localStorage.getItem("history")||"[]");
 history.innerHTML=h.length?h.map(x=>`Aula ${x.lesson}: <b>${x.pct}%</b> • ${x.passed?"✅ aprovado":"❌ refazer"} • ${x.date}`).join("<br><br>"):"Nenhuma tentativa registrada.";

 const e=JSON.parse(localStorage.getItem("errors")||"[]");
 errorBook.innerHTML=e.length?`${e.length} erro(s) salvo(s) para revisão.`:"Nenhum erro registrado."
}
sync();
