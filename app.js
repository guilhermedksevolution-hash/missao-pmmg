const PASS_SCORE = 70;
const XP_PER_APPROVAL = 100;
const TOTAL_LESSONS = Object.keys(window.lessons||{}).length; // V7: Português dinâmico

let currentLessonNumber = 1;
let currentSubject = "Português";
let currentQuiz = null;
let lastResult = null;

const state = loadState();

// V6.4.3.1 — migração de progresso das versões anteriores.
// Se uma aula já tem nota >= 70% (ou consta como concluída),
// libera automaticamente a aula seguinte sem apagar XP/notas/revisões.
function syncUnlockedLessonsFromProgress(){
  if(!Array.isArray(state.unlockedLessons)) state.unlockedLessons=[1];
  if(!state.unlockedLessons.includes(1)) state.unlockedLessons.push(1);
  const nums=Object.keys(window.lessons||{}).map(Number).filter(Number.isFinite).sort((a,b)=>a-b);
  nums.forEach((n,idx)=>{
    const score=Number(state.scores&&state.scores[n]);
    const passed=(Number.isFinite(score)&&score>=PASS_SCORE)||state.completedLessons.includes(n);
    const next=nums[idx+1];
    if(passed&&next&&!state.unlockedLessons.includes(next)) state.unlockedLessons.push(next);
  });
  state.unlockedLessons=[...new Set(state.unlockedLessons.map(Number))].sort((a,b)=>a-b);
  saveState();
}

// lessons.js é carregado antes de app.js, então os números das aulas já estão disponíveis.
syncUnlockedLessonsFromProgress();

function defaultState(){
  return {
    unlockedLessons:[1],
    completedLessons:[],
    scores:{},
    xp:0,
    streak:0,
    lastStudyDate:null,
    errors:[],
    literatureUnlocked:[1],
    literatureCompleted:[],
    literatureScores:{},englishUnlocked:[1],englishCompleted:[],englishScores:{},lawUnlocked:[1],lawCompleted:[],lawScores:{},mathUnlocked:[1],mathCompleted:[],mathScores:{}
  };
}

function loadState(){
  try{
    const raw=localStorage.getItem("missaoPMMGState");
    if(!raw) return defaultState();
    const parsed=JSON.parse(raw);
    return {
      ...defaultState(),
      ...parsed,
      unlockedLessons:Array.isArray(parsed.unlockedLessons)?parsed.unlockedLessons:[1],
      completedLessons:Array.isArray(parsed.completedLessons)?parsed.completedLessons:[],
      scores:parsed.scores||{},
      errors:Array.isArray(parsed.errors)?parsed.errors:[],
      literatureUnlocked:Array.isArray(parsed.literatureUnlocked)?parsed.literatureUnlocked:[1],
      literatureCompleted:Array.isArray(parsed.literatureCompleted)?parsed.literatureCompleted:[],
      literatureScores:parsed.literatureScores||{},englishUnlocked:Array.isArray(parsed.englishUnlocked)?parsed.englishUnlocked:[1],englishCompleted:Array.isArray(parsed.englishCompleted)?parsed.englishCompleted:[],englishScores:parsed.englishScores||{},lawUnlocked:Array.isArray(parsed.lawUnlocked)?parsed.lawUnlocked:[1],lawCompleted:Array.isArray(parsed.lawCompleted)?parsed.lawCompleted:[],lawScores:parsed.lawScores||{},mathUnlocked:Array.isArray(parsed.mathUnlocked)?parsed.mathUnlocked:[1],mathCompleted:Array.isArray(parsed.mathCompleted)?parsed.mathCompleted:[],mathScores:parsed.mathScores||{}
    };
  }catch(e){
    console.error(e);
    return defaultState();
  }
}

function saveState(){localStorage.setItem("missaoPMMGState",JSON.stringify(state));}

function showScreen(id,nav=""){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  const target=document.getElementById(id);
  if(target) target.classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.remove("active"));
  if(nav){
    const b=document.getElementById(nav);
    if(b) b.classList.add("active");
  }
  window.scrollTo({top:0,behavior:"smooth"});
}

function goHome(){updateDashboard();showScreen("homeScreen","navHome");}
function openSubjects(){updateDashboard();showScreen("subjectsScreen","navStudy");}
function openPortuguese(){
  currentSubject="Português";
  document.getElementById("subjectTrailKicker").textContent="PORTUGUÊS";
  document.getElementById("subjectTrailTitle").textContent="Trilha de aulas";
  renderLessonList();updateDashboard();showScreen("lessonsScreen","navStudy");
}
function openLiterature(){ return window.openLiteratureV6443(); }
function openTips(){showScreen("tipsScreen");}
function openPerformance(){renderPerformance();showScreen("performanceScreen");}

function continueStudy(){
  const nums=getLessonNumbers();
  const firstPending=nums.find(n=>isLessonUnlocked(n)&&!isLessonCompleted(n));
  openLesson(firstPending || nums[nums.length-1] || 1);
}

function getLessonData(n){
  if(currentSubject==="Literatura") return window.literaturaLessons?.[n]||null;
  if(currentSubject==="Inglês") return window.inglesLessons?.[n]||null;
  if(currentSubject==="Direito") return window.direitoLessons?.[n]||null;
  if(currentSubject==="Matemática") return window.matematicaLessons?.[n]||null;
  return window.lessons?.[n]||null;
}
function getLessonNumbers(subject=currentSubject){
  const source=subject==="Literatura"?window.literaturaLessons:(subject==="Inglês"?window.inglesLessons:(subject==="Direito"?window.direitoLessons:(subject==="Matemática"?window.matematicaLessons:window.lessons)));
  if(!source) return [];
  return Object.keys(source).map(Number).filter(Number.isFinite).sort((a,b)=>a-b);
}
function getAllLessonNumbers(){
  return window.lessons?Object.keys(window.lessons).map(Number).filter(Number.isFinite).sort((a,b)=>a-b):[];
}
function activeUnlocked(){
  return currentSubject==="Literatura"?state.literatureUnlocked:(currentSubject==="Inglês"?state.englishUnlocked:(currentSubject==="Direito"?state.lawUnlocked:(currentSubject==="Matemática"?state.mathUnlocked:state.unlockedLessons)));
}
function activeCompleted(){
  return currentSubject==="Literatura"?state.literatureCompleted:(currentSubject==="Inglês"?state.englishCompleted:(currentSubject==="Direito"?state.lawCompleted:(currentSubject==="Matemática"?state.mathCompleted:state.completedLessons)));
}
function activeScores(){
  return currentSubject==="Literatura"?state.literatureScores:(currentSubject==="Inglês"?state.englishScores:(currentSubject==="Direito"?state.lawScores:(currentSubject==="Matemática"?state.mathScores:state.scores)));
}
function isLessonUnlocked(n){
  const nums=getLessonNumbers();
  return n===nums[0] || activeUnlocked().includes(n);
}
function isLessonCompleted(n){return activeCompleted().includes(n);}

function renderLessonList(){
  const el=document.getElementById("lessonList");
  if(!el) return;
  el.innerHTML=getLessonNumbers().map(n=>{
    const l=getLessonData(n), unlocked=isLessonUnlocked(n), completed=isLessonCompleted(n), score=activeScores()[n];
    return `
      <article class="lesson-card ${!unlocked?"locked":""} ${completed?"completed":""}" ${unlocked?`onclick="openLesson(${n})"`:""}>
        <div class="lesson-number">${String(n).padStart(2,"0")}</div>
        <div class="lesson-card-content">
          <h3>${l.title}</h3>
          <p>${l.subtitle} • ${l.time}</p>
          <p>${completed?"Concluída":unlocked?"Disponível":"Bloqueada"}</p>
          ${typeof score==="number"?`<span class="score-badge">Melhor nota: ${score}%</span>`:""}
          ${!unlocked?`<div class="lock-message">Atinga 70% na aula anterior.</div>`:""}
        </div>
        <div class="lesson-card-status">${completed?"✓":unlocked?"›":"🔒"}</div>
      </article>`;
  }).join("");
}

function openLesson(n){
  if(!isLessonUnlocked(n)) return;
  const lesson=getLessonData(n);
  if(!lesson){alert(`Conteúdo da Aula ${n} não encontrado.`);return;}

  currentLessonNumber=n;
  currentQuiz=null;
  document.getElementById("lessonSubtitle").textContent=lesson.subtitle;
  document.getElementById("lessonTitle").textContent=lesson.title;
  document.getElementById("lessonTime").textContent=lesson.time;
  document.getElementById("lessonContent").innerHTML=lesson.content;

  updateStudyStreak(); saveState(); updateDashboard();
  showScreen("lessonScreen","navStudy");
}

function backToCurrentLesson(){openLesson(currentLessonNumber);}


function shuffleQuestionOptions(question){
  const items=question.options.map((text,index)=>({text,isCorrect:index===question.answer}));
  for(let i=items.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [items[i],items[j]]=[items[j],items[i]];
  }
  return {
    ...question,
    options:items.map(item=>item.text),
    answer:items.findIndex(item=>item.isCorrect)
  };
}

function startQuiz(){
  const lesson=getLessonData(currentLessonNumber);
  if(!lesson||!Array.isArray(lesson.quiz)||!lesson.quiz.length){alert("Esta aula ainda não possui prova.");return;}
  // V6.4.2.1: embaralha as alternativas em cada tentativa e recalcula
  // o índice correto. Assim o gabarito não fica preso à letra A.
  currentQuiz=lesson.quiz.map(q=>shuffleQuestionOptions(q));
  document.getElementById("quizTitle").textContent=(currentSubject==="Literatura"&&currentLessonNumber===7)?`Prova • ${lesson.title}`:`Prova da Aula ${String(currentLessonNumber).padStart(2,"0")}`;
  document.getElementById("quizForm").innerHTML=currentQuiz.map((q,i)=>`
    <article class="question-card">
      <div class="question-number">QUESTÃO ${String(i+1).padStart(2,"0")}</div>
      <h3>${q.question}</h3>
      <div class="answers">
        ${q.options.map((o,oi)=>`
          <label class="answer-option">
            <input type="radio" name="question-${i}" value="${oi}">
            <span>${o}</span>
          </label>`).join("")}
      </div>
    </article>`).join("");
  showScreen("quizScreen","navStudy");
}

function submitQuiz(){
  if(!currentQuiz) return;

  let correct=0, answered=0;
  const responses=[];

  currentQuiz.forEach((q,i)=>{
    const selected=document.querySelector(`input[name="question-${i}"]:checked`);
    if(!selected){
      responses.push({selectedIndex:null,correct:false});
      return;
    }
    answered++;
    const selectedIndex=Number(selected.value);
    const ok=selectedIndex===q.answer;
    if(ok){correct++;removeError(currentLessonNumber,i);}
    else addError(currentLessonNumber,i,selectedIndex);
    responses.push({selectedIndex,correct:ok});
  });

  if(answered<currentQuiz.length){
    alert(`Você ainda deixou ${currentQuiz.length-answered} questão(ões) sem resposta.`);
    return;
  }

  const score=Math.round((correct/currentQuiz.length)*100);
  const approved=score>=PASS_SCORE;
  registerResult(currentLessonNumber,score,approved);
  registerQuestionAttemptV613(currentLessonNumber,correct,currentQuiz.length,score);

  lastResult={
    lessonNumber:currentLessonNumber,
    score,correct,total:currentQuiz.length,approved,
    responses,
    quiz:currentQuiz
  };

  showResult();
}

function showResult(){
  if(!lastResult) return;
  const {score,correct,total,approved}=lastResult;

  document.getElementById("resultIcon").textContent=approved?"🏆":"📚";
  document.getElementById("resultTitle").textContent=approved?"Missão cumprida!":"Ainda não foi dessa vez";
  document.getElementById("resultScore").textContent=`${score}%`;
  document.getElementById("resultMessage").textContent=approved
    ?"Você atingiu a meta. Veja a correção comentada para consolidar o conteúdo."
    :"Revise a correção comentada e use o Caderno de Erros antes de tentar novamente.";

  document.getElementById("resultStats").innerHTML=`
    <div class="result-stat"><strong>${correct}/${total}</strong><span>Acertos</span></div>
    <div class="result-stat"><strong>${total-correct}</strong><span>Erros</span></div>`;

  const next=getNextLessonNumber(currentLessonNumber);

  document.getElementById("resultButtons").innerHTML=`
    <button class="btn primary full" onclick="openCorrection()">Ver correção comentada</button>
    ${approved&&next?`<button class="secondary-btn" onclick="openLesson(${next})">Ir para a próxima aula</button>`:""}
    <button class="secondary-btn" onclick="openErrorNotebook()">Abrir Caderno de Erros</button>
    <button class="secondary-btn" onclick="startQuiz()">Refazer prova</button>
    <button class="secondary-btn" onclick="openLesson(${currentLessonNumber})">Rever aula</button>`;

  showScreen("resultScreen","navMission");
}

function showLastResult(){showResult();}

function openCorrection(){
  if(!lastResult) return;
  const {score,correct,total,responses,quiz}=lastResult;

  document.getElementById("correctionSummary").innerHTML=`
    <strong>${score}% • ${correct} de ${total} questões corretas</strong>
    <p>Leia principalmente as explicações das questões que você errou.</p>`;

  document.getElementById("correctionList").innerHTML=quiz.map((q,i)=>{
    const r=responses[i], ok=r.correct;
    const userText=r.selectedIndex!==null?q.options[r.selectedIndex]:"Não respondida";
    const explanation=q.explanation||"Revise o conteúdo relacionado a esta questão.";
    const tip=q.tip||"Volte ao trecho da aula e compare a regra com a alternativa correta.";

    return `
      <article class="correction-card ${ok?"correct":"wrong"}">
        <div class="correction-meta">QUESTÃO ${String(i+1).padStart(2,"0")} • ${ok?"ACERTOU":"ERROU"}</div>
        <h3>${q.question}</h3>
        ${!ok?`<div class="answer-line user-wrong"><strong>Sua resposta:</strong> ${userText}</div>`:""}
        <div class="answer-line correct-answer"><strong>Resposta correta:</strong> ${q.options[q.answer]}</div>
        <div class="explanation"><strong>Explicação:</strong> ${explanation}</div>
        <div class="mini-tip"><strong>💡 Dica:</strong> ${tip}</div>
      </article>`;
  }).join("");

  showScreen("correctionScreen","navMission");
}

function addError(lessonNumber,questionIndex,selectedIndex){
  const lesson=getLessonData(lessonNumber), q=lesson.quiz[questionIndex], id=`${currentSubject==="Literatura"?"L":"P"}-${lessonNumber}-${questionIndex}`;
  state.errors=state.errors.filter(e=>e.id!==id);
  state.errors.push({
    id,subject:currentSubject,lessonNumber,lessonTitle:lesson.title,questionIndex,question:q.question,
    selectedText:q.options[selectedIndex],correctText:q.options[q.answer],
    explanation:q.explanation||"",tip:q.tip||"",addedAt:Date.now()
  });
  saveState();
}

function removeError(lessonNumber,questionIndex){
  const id=`${currentSubject==="Literatura"?"L":"P"}-${lessonNumber}-${questionIndex}`;
  state.errors=state.errors.filter(e=>e.id!==id);
  saveState();
}

function openErrorNotebook(){
  renderErrorNotebook();updateDashboard();showScreen("errorsScreen","navErrors");
}

function renderErrorNotebook(){
  const el=document.getElementById("errorNotebookList");
  const counter=document.getElementById("errorNotebookCounter");
  if(counter) counter.textContent=`${state.errors.length} ${state.errors.length===1?"questão":"questões"}`;

  if(!state.errors.length){
    el.innerHTML=`<div class="empty-state"><strong>Seu caderno está limpo 🎯</strong>As questões que você errar nas provas aparecerão aqui automaticamente.</div>`;
    return;
  }

  el.innerHTML=[...state.errors].sort((a,b)=>b.addedAt-a.addedAt).map(e=>`
    <article class="error-card">
      <div class="error-meta">${e.subject==="Literatura"?"LITERATURA • ":""}AULA ${String(e.lessonNumber).padStart(2,"0")} • ${e.lessonTitle}</div>
      <h3>${e.question}</h3>
      <div class="wrong-answer"><strong>Sua resposta:</strong> ${e.selectedText}</div>
      <div class="correct-answer"><strong>Correta:</strong> ${e.correctText}</div>
      ${e.explanation?`<div class="error-explanation"><strong>Por quê?</strong> ${e.explanation}</div>`:""}
      ${e.tip?`<div class="mini-tip"><strong>💡 Dica:</strong> ${e.tip}</div>`:""}
    </article>`).join("");
}

function clearErrorNotebook(){
  if(!state.errors.length) return;
  if(confirm("Apagar todas as questões do Caderno de Erros?")){
    state.errors=[];saveState();renderErrorNotebook();updateDashboard();
  }
}

function registerResult(lessonNumber,score,approved){
  const scores=activeScores(), completed=activeCompleted(), unlocked=activeUnlocked();
  const previous=typeof scores[lessonNumber]==="number"?scores[lessonNumber]:null;
  const firstApproval=approved&&!completed.includes(lessonNumber);

  if(previous===null||score>previous) scores[lessonNumber]=score;

  if(approved){
    if(!completed.includes(lessonNumber)) completed.push(lessonNumber);
    if(firstApproval) state.xp+=XP_PER_APPROVAL;
    unlockNextLesson(lessonNumber);
  }

  saveState();updateDashboard();
}

function lessonSubject(n){return currentSubject;}
function unlockNextLesson(n){
  const nums=getLessonNumbers(),idx=nums.indexOf(n),next=nums[idx+1],unlocked=activeUnlocked();
  if(next&&!unlocked.includes(next)) unlocked.push(next);
}
function getNextLessonNumber(n){
  const nums=getLessonNumbers(),idx=nums.indexOf(n);
  return idx>=0?(nums[idx+1]||null):null;
}

function updateStudyStreak(){
  const today=toDateKey(new Date());
  if(!state.lastStudyDate){state.streak=1;state.lastStudyDate=today;return;}
  if(state.lastStudyDate===today) return;

  const y=new Date();y.setDate(y.getDate()-1);
  state.streak=state.lastStudyDate===toDateKey(y)?state.streak+1:1;
  state.lastStudyDate=today;
}

function toDateKey(d){
  return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");
}

function renderPerformance(){
  updateDashboard();
  setText("perfAverage",getAverageScore()+"%");
  setText("perfErrors",state.errors.length);
  setText("perfXp",state.xp);
  setText("perfStreak",state.streak);

  const history=document.getElementById("scoreHistory");
  const nums=getLessonNumbers().filter(n=>typeof state.scores[n]==="number");

  history.innerHTML=nums.length?nums.map(n=>`
    <div class="score-row">
      <span>Aula ${String(n).padStart(2,"0")} • ${getLessonData(n).title}</span>
      <strong>${state.scores[n]}%</strong>
    </div>`).join(""):`<div class="empty-state"><strong>Nenhuma prova registrada</strong>Suas melhores notas aparecerão aqui.</div>`;
}

function getAverageScore(){
  const vals=Object.values(state.scores).filter(v=>typeof v==="number");
  return vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;
}

function updateDashboard(){
  const total=getLessonNumbers().length;
  const completed=state.completedLessons.filter(n=>!!getLessonData(n)).length;
  const progress=total?Math.round((completed/total)*100):0;
  const avg=getAverageScore();

  setText("streakValue",state.streak);
  setText("xpValue",`${state.xp} XP`);
  setText("globalProgressText",`${progress}%`);
  setText("averageScoreValue",`${avg}%`);
  setText("completedLessonsValue",completed);
  setText("errorCountValue",state.errors.length);
  setText("progressSubtitle",`${completed} de ${total} aulas concluídas`);
  setText("portugueseProgressText",`${completed} de ${total} aulas concluídas`);
  setWidth("globalProgressBar",progress);
  setWidth("portugueseProgressBar",progress);
  setWidth("portugueseProgressBar2",progress);
}

function setText(id,value){const e=document.getElementById(id);if(e)e.textContent=value;}
function setWidth(id,value){const e=document.getElementById(id);if(e)e.style.width=`${Math.max(0,Math.min(100,value))}%`;}

function initializeApp(){
  updateDashboard();
  renderLessonList();
  showScreen("homeScreen","navHome");
}
document.addEventListener("DOMContentLoaded",initializeApp);

function openProfessorIA(){ showScreen("professorScreen"); }

function openStudyHub(){ showScreen("studyHubScreen"); }
function openProfessorIA(){ showScreen("professorScreen"); }

/* ==========================================================
   V5 - BASE COMPLETA / ESTRUTURA DAS 17 FUNCIONALIDADES
   ========================================================== */
function openPlan(){ showScreen("planScreen"); loadV5Settings(); }
function openSimulations(){ showScreen("simulationsScreen"); }
function openQuickReview(){ showScreen("quickReviewScreen"); }
function openFavorites(){ showScreen("favoritesScreen"); }
function openAchievements(){ showScreen("achievementsScreen"); renderAchievements(); }
function openSearch(){ showScreen("searchScreen"); }
function placeholderFeature(name){ alert("🚧 "+name+" já tem espaço reservado. O banco de questões será ligado quando entrarmos na fase de conteúdo."); }

function saveV5Settings(){
  const goal=document.getElementById("dailyGoal")?.value || "60";
  const date=document.getElementById("examDate")?.value || "";
  localStorage.setItem("pmmg_daily_goal",goal);
  localStorage.setItem("pmmg_exam_date",date);
  renderCountdown();
}
function loadV5Settings(){
  const goal=localStorage.getItem("pmmg_daily_goal")||"60";
  const date=localStorage.getItem("pmmg_exam_date")||"";
  if(document.getElementById("dailyGoal")) document.getElementById("dailyGoal").value=goal;
  if(document.getElementById("examDate")) document.getElementById("examDate").value=date;
  renderCountdown();
}
function renderCountdown(){
  const el=document.getElementById("countdownCard"); if(!el)return;
  const raw=localStorage.getItem("pmmg_exam_date");
  if(!raw){el.innerHTML="<b>📆 Contagem regressiva</b><br>Defina a data da prova para ativar.";return;}
  const target=new Date(raw+"T12:00:00"), now=new Date();
  const days=Math.ceil((target-now)/86400000);
  el.innerHTML=days>=0?`<b>📆 Faltam ${days} dias</b><br>Seu plano poderá se adaptar ao tempo restante.`:"<b>📆 Data encerrada</b><br>Atualize a data da prova.";
}
function preparationIndex(){
  let completed=0, scores=[];
  for(let i=1;i<=TOTAL_LESSONS;i++){
    if(isPassed(i))completed++;
    const s=Number(localStorage.getItem(`bestScore${i}`)||0); if(s)scores.push(s);
  }
  const progress=(completed/TOTAL_LESSONS)*100;
  const avg=scores.length?scores.reduce((a,b)=>a+b,0)/scores.length:0;
  const reviewBonus=Math.min(100,getXP()/5);
  return Math.round(progress*.45+avg*.45+reviewBonus*.10);
}
function renderV5Dashboard(){
  const el=document.getElementById("preparationIndex"); if(el)el.textContent=preparationIndex();
}
function startQuickReview(minutes){
  const el=document.getElementById("quickReviewResult");
  const errors=JSON.parse(localStorage.getItem("errorNotebook")||"[]");
  const focus=errors.length?`${Math.min(errors.length,Math.max(3,Math.floor(minutes/2)))} questões do seu Caderno de Erros`:"revisão dos principais pontos da aula atual";
  el.innerHTML=`<b>⚡ Sessão de ${minutes} minutos</b><p>Prioridade: ${focus}. Quando o banco de questões crescer, esta seleção será automática.</p>`;
}
function getLevel(){
 const xp=getXP();
 if(xp<100)return["Recruta",0,100];
 if(xp<300)return["Aluno-Soldado",100,300];
 if(xp<600)return["Soldado",300,600];
 if(xp<1000)return["Cabo",600,1000];
 return["Sargento",1000,1500];
}
function renderAchievements(){
 const box=document.getElementById("levelCard"), list=document.getElementById("achievementList");
 if(!box||!list)return;
 const [name,min,max]=getLevel(), xp=getXP();
 box.innerHTML=`<span class="kicker">NÍVEL ATUAL</span><h3>${name}</h3><p>${xp} XP • próximo marco ${max} XP</p><div class="bar"><i style="width:${Math.min(100,((xp-min)/(max-min))*100)}%"></i></div>`;
 let passed=0;for(let i=1;i<=TOTAL_LESSONS;i++)if(isPassed(i))passed++;
 const errors=JSON.parse(localStorage.getItem("errorNotebook")||"[]").length;
 const items=[
  ["🎓","Primeira aprovação",passed>=1],
  ["💯","Nota máxima",Array.from({length:TOTAL_LESSONS},(_,i)=>Number(localStorage.getItem(`bestScore${i+1}`)||0)).some(x=>x===100)],
  ["📚","Duas aulas vencidas",passed>=2],
  ["⭐","100 XP conquistados",xp>=100],
  ["📓","Revisão ativa",errors>0]
 ];
 list.innerHTML=items.map(x=>`<div class="achievement ${x[2]?"":"locked"}"><span>${x[0]}</span><div><strong>${x[1]}</strong><small>${x[2]?"Conquistada":"Ainda bloqueada"}</small></div></div>`).join("");
}
function runStudySearch(){
 const q=(document.getElementById("studySearch")?.value||"").trim().toLowerCase();
 const out=document.getElementById("searchResults"); if(!out)return;
 if(q.length<2){out.innerHTML='<div class="empty-state">Digite pelo menos 2 letras.</div>';return;}
 let results=[];
 if(typeof lessons!=="undefined"){
  Object.keys(lessons).forEach(k=>{
   const l=lessons[k], hay=((l.title||"")+" "+(l.content||"")).toLowerCase();
   if(hay.includes(q))results.push({title:l.title||`Aula ${k}`,text:`Português • Aula ${String(k).padStart(2,"0")}`,n:Number(k)});
  });
 }
 out.innerHTML=results.length?results.slice(0,10).map(r=>`<div class="search-result" onclick="openLesson(${r.n})"><strong>📘 ${r.title}</strong><p>${r.text}</p></div>`).join(""):'<div class="empty-state">Nenhum conteúdo encontrado.</div>';
}
const _oldSync = typeof sync==="function" ? sync : null;
if(_oldSync){
  sync = function(){ _oldSync(); renderV5Dashboard(); };
}
document.addEventListener("DOMContentLoaded",()=>{renderV5Dashboard();});

/* ==========================================================
   V5.1 — SISTEMAS FUNCIONAIS: MISSÃO, STREAK, XP E PREPARO
   ========================================================== */
function dateKey(d=new Date()){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function updateStudyStreak(){
  const today=dateKey(), last=localStorage.getItem("pmmg_last_study_day");
  let streak=Number(localStorage.getItem("pmmg_streak")||0);
  if(last===today) return streak;
  const y=new Date(); y.setDate(y.getDate()-1);
  if(last===dateKey(y)) streak+=1; else streak=1;
  localStorage.setItem("pmmg_streak",String(streak));
  localStorage.setItem("pmmg_last_study_day",today);
  return streak;
}
function getStudyStreak(){ return Number(localStorage.getItem("pmmg_streak")||1); }
function registerStudyActivity(){
  updateStudyStreak();
  localStorage.setItem("pmmg_activity_"+dateKey(),"1");
  renderV51();
}
function renderDailyMission(){
  const pending=typeof firstPendingLesson==="function" ? firstPendingLesson() : 1;
  const title=document.getElementById("dailyMissionTitle"), text=document.getElementById("dailyMissionText");
  if(!title||!text)return;
  if(!pending){title.textContent="Português concluído 🎯";text.textContent="Revise seus erros e mantenha sua sequência.";return;}
  const errors=JSON.parse(localStorage.getItem("errorNotebook")||"[]").length;
  title.textContent=`Aula ${String(pending).padStart(2,"0")} • ${getLessonTitle(pending)}`;
  text.textContent=`1 aula • prova da aula${errors?` • revisar ${Math.min(errors,5)} erro(s)`:" • revisão rápida"}`;
}
function renderStreakBadge(){
  const candidates=[...document.querySelectorAll(".top-stat,.header-stat,.pill")];
  candidates.forEach(el=>{ if((el.textContent||"").includes("🔥")) el.innerHTML=`🔥 ${getStudyStreak()}`; });
}
function renderV51(){
  renderDailyMission();
  renderStreakBadge();
  renderV5Dashboard();
}
const _v51OpenLesson=typeof openLesson==="function"?openLesson:null;
if(_v51OpenLesson){
  openLesson=function(n){registerStudyActivity();return _v51OpenLesson(n);}
}
document.addEventListener("DOMContentLoaded",()=>{
  if(!localStorage.getItem("pmmg_streak")) localStorage.setItem("pmmg_streak","1");
  renderV51();
});

/* =========================================================
   V5.2 - ROTAS PRINCIPAIS DEFINITIVAS
   ========================================================= */
function setMainNavActive(id){
  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.remove("active"));
  const el=document.getElementById(id);
  if(el) el.classList.add("active");
}
function openStudyArea(){
  openSubjects();
  setMainNavActive("navStudy");
}
function openTrainingArea(){
  showScreen("trainingScreen");
  setMainNavActive("navTrain");
}
function openReviewArea(){
  openErrorNotebook();
  setMainNavActive("navReview");
}
function openEvolutionArea(){
  openPerformance();
  setMainNavActive("navEvolution");
}

const _v52GoHome = typeof goHome==="function" ? goHome : null;
if(_v52GoHome){
  goHome=function(){
    const result=_v52GoHome();
    setMainNavActive("navHome");
    return result;
  };
}

document.addEventListener("DOMContentLoaded",()=>{
  setMainNavActive("navHome");
});

/* V5.3 — quatro áreas principais */
function v53Show(id,navId){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  const target=document.getElementById(id);
  if(target) target.classList.add("active");
  setMainNavActive(navId);
  window.scrollTo(0,0);
}
openStudyArea=function(){v53Show("studyHubV53","navStudy");};
openTrainingArea=function(){v53Show("trainingHubV53","navTrain");};
openReviewArea=function(){v53Show("reviewHubV53","navReview");};
openEvolutionArea=function(){v53Show("evolutionHubV53","navEvolution");};

function utilityV53(title,text){
  document.getElementById("utilityTitleV53").textContent=title;
  document.getElementById("utilityTextV53").textContent=text;
  v53Show("utilityHubV53","navStudy");
}
function openStudyPlanV53(){ openStudyPlanV54(); }
function openStudyPlanV54(){
  showScreen("planScreen");
  setMainNavActive("navStudy");
  loadV5Settings();
  renderStudyPlanV54();
  window.scrollTo(0,0);
}
function renderStudyPlanV54(){
  const goal=Number(localStorage.getItem("pmmg_daily_goal")||60);
  const date=localStorage.getItem("pmmg_exam_date")||"";
  const completed=Array.from({length:TOTAL_LESSONS},(_,i)=>i+1).filter(isPassed).length;
  const remaining=Math.max(0,TOTAL_LESSONS-completed);
  let extra=document.getElementById("planV54Extra");
  if(!extra){
    extra=document.createElement("div"); extra.id="planV54Extra"; extra.className="plan-v54-extra";
    document.getElementById("countdownCard")?.insertAdjacentElement("afterend",extra);
  }
  const sessions=Math.max(1,Math.ceil(goal/30));
  extra.innerHTML=`<div class="v54-plan-title"><span>MISSÃO DE HOJE</span><b>${goal} minutos de preparação</b><p>Plano automático baseado na sua meta diária.</p></div>
  <div class="v54-plan-grid">
   <article><strong>📖 Teoria</strong><b>${Math.round(goal*.45)} min</b><small>Continue a próxima aula disponível.</small></article>
   <article><strong>🎯 Questões</strong><b>${Math.round(goal*.35)} min</b><small>Pratique o conteúdo estudado.</small></article>
   <article><strong>🔁 Revisão</strong><b>${Math.max(5,Math.round(goal*.20))} min</b><small>Revise erros e pontos fracos.</small></article>
   <article><strong>📚 Restantes</strong><b>${remaining}</b><small>Aulas ainda não aprovadas.</small></article>
  </div>
  <button class="v54-start" onclick="openSubjects()">Começar missão de hoje →</button>
  <div class="v54-plan-note">💡 Meta dividida em aproximadamente ${sessions} bloco${sessions>1?'s':''} de estudo. Você pode alterar a meta acima a qualquer momento.</div>`;
}
const _saveV5SettingsV54=saveV5Settings;
saveV5Settings=function(){ _saveV5SettingsV54(); renderStudyPlanV54(); };
function openFavoritesV53(){utilityV53("Favoritos","Seus conteúdos e questões marcados para consultar depois.");}
function openSearchV53(){openSearch();setMainNavActive("navStudy");window.scrollTo(0,0);}
function openTipsV53(){utilityV53("Dicas de prova","Estratégias para leitura, tempo e eliminação de alternativas.");}
function openQuickTrainingV53(){startSimulationV510("rapido");}
function openSimulationV53(){utilityV53("Simulados","Área preparada para provas completas e resultados.");}
function openQuickReviewV53(){utilityV53("Revisão rápida","Uma sessão objetiva baseada nos seus pontos fracos.");}

/* =========================================================
   V5.5 - FAVORITOS E ANOTACOES FUNCIONAIS
   ========================================================= */
const V55_FAV_KEY='pmmg_v55_favorites';
function v55Favs(){try{return JSON.parse(localStorage.getItem(V55_FAV_KEY)||'[]')}catch(e){return []}}
function v55SaveFavs(v){localStorage.setItem(V55_FAV_KEY,JSON.stringify(v));}
function openFavoritesV53(){openFavorites();setMainNavActive('navStudy');renderFavoritesV55();window.scrollTo(0,0);}
const _openFavoritesV55=typeof openFavorites==='function'?openFavorites:null;
if(_openFavoritesV55){openFavorites=function(){const r=_openFavoritesV55();renderFavoritesV55();return r;}}
function addFavoriteV55(){
 const title=document.getElementById('favTitleV55'); const note=document.getElementById('favNoteV55');
 if(!title||!note)return;
 const t=title.value.trim(), n=note.value.trim();
 if(!t&&!n){alert('Digite um titulo ou uma anotacao para salvar.');return;}
 const list=v55Favs(); list.unshift({id:Date.now(),title:t||'Anotacao de estudo',note:n,created:new Date().toISOString(),done:false});
 v55SaveFavs(list); title.value='';note.value='';renderFavoritesV55();
}
function removeFavoriteV55(id){v55SaveFavs(v55Favs().filter(x=>x.id!==id));renderFavoritesV55();}
function toggleFavoriteV55(id){const list=v55Favs();const item=list.find(x=>x.id===id);if(item)item.done=!item.done;v55SaveFavs(list);renderFavoritesV55();}
function renderFavoritesV55(){
 const host=document.getElementById('favoritesList');if(!host)return;
 const list=v55Favs();
 host.className='favorites-v55-list';
 host.innerHTML=list.length?list.map(x=>`<article class="favorite-v55 ${x.done?'done':''}"><div><small>${x.done?'REVISADO':'SALVO PARA REVISAR'}</small><b>${escapeHtmlV55(x.title)}</b><p>${escapeHtmlV55(x.note||'Sem anotacao adicional.')}</p><em>${new Date(x.created).toLocaleDateString('pt-BR')}</em></div><div class="fav-v55-actions"><button onclick="toggleFavoriteV55(${x.id})">${x.done?'↩':'✓'}</button><button onclick="removeFavoriteV55(${x.id})">×</button></div></article>`).join(''):'<div class="empty-state">Nenhum favorito ainda. Salve uma anotacao acima para montar sua biblioteca de revisao.</div>';
 const count=document.getElementById('favCountV55');if(count)count.textContent=list.length+' '+(list.length===1?'item salvo':'itens salvos');
}
function escapeHtmlV55(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
document.addEventListener('DOMContentLoaded',renderFavoritesV55);

// ============================================================
// V5.6 — BUSCA INTELIGENTE
// ============================================================
const SEARCH_ITEMS_V56 = [
  {icon:"📘",title:"Interpretação de texto",desc:"Português • Aula 01",terms:"interpretação compreensão texto português aula 1",action:()=>openLesson(1)},
  {icon:"🧠",title:"Ideia principal e inferência",desc:"Português • Aula 02",terms:"ideia principal inferência português aula 2",action:()=>openLesson(2)},
  {icon:"📅",title:"Plano de estudos",desc:"Organize sua meta diária e prova",terms:"plano estudos meta calendário prova",action:()=>openStudyPlanV54()},
  {icon:"⭐",title:"Favoritos e anotações",desc:"Sua biblioteca de revisão",terms:"favoritos anotações biblioteca resumo",action:()=>openFavorites()},
  {icon:"📓",title:"Caderno de erros",desc:"Revise seus pontos fracos",terms:"caderno erros revisão questões erradas",action:()=>openErrorNotebook()},
  {icon:"📝",title:"Simulados",desc:"Treinos e provas",terms:"simulado simulados prova treino questões",action:()=>openSimulations()},
  {icon:"⚡",title:"Revisão rápida",desc:"Treinos de 10, 20 ou 30 minutos",terms:"revisão rápida treino 10 20 30 minutos",action:()=>openQuickReview()},
  {icon:"📊",title:"Desempenho",desc:"Acompanhe sua evolução",terms:"desempenho evolução notas progresso xp",action:()=>openPerformance()},
  {icon:"🏅",title:"Conquistas",desc:"Nível, sequência e marcos",terms:"conquistas nível sequência marcos xp",action:()=>openAchievements()}
];

function normalizeSearchV56(value){
  return String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
}
function openSearch(){
  showScreen("searchScreen","navStudy");
  setTimeout(()=>{const el=document.getElementById("globalSearchV56"); if(el) el.focus();},120);
}
function runSearchV56(value){
  const q=normalizeSearchV56(value);
  const box=document.getElementById("searchResultsV56");
  const count=document.getElementById("searchCountV56");
  if(!box||!count) return;
  if(!q){
    count.textContent="Digite para pesquisar";
    box.innerHTML='<div class="empty-state"><b>🔎 Busca rápida</b><br>Comece digitando um assunto ou escolha um atalho acima.</div>';
    return;
  }
  const words=q.split(/\s+/).filter(Boolean);
  const found=SEARCH_ITEMS_V56.filter(item=>{
    const hay=normalizeSearchV56(item.title+" "+item.desc+" "+item.terms);
    return words.every(w=>hay.includes(w));
  });
  count.textContent=found.length+(found.length===1?" resultado":" resultados");
  if(!found.length){
    box.innerHTML='<div class="empty-state"><b>Nada encontrado</b><br>Tente outra palavra, como “erros”, “aula” ou “simulado”.</div>';
    return;
  }
  box.innerHTML="";
  found.forEach(item=>{
    const btn=document.createElement("button");
    btn.className="search-v56-item";
    btn.innerHTML='<span class="search-v56-icon">'+item.icon+'</span><span class="search-v56-copy"><b>'+item.title+'</b><span>'+item.desc+'</span></span><span class="search-v56-arrow">›</span>';
    btn.onclick=item.action;
    box.appendChild(btn);
  });
}
function setSearchV56(value){
  const el=document.getElementById("globalSearchV56");
  if(el){el.value=value;runSearchV56(value);}
}
function clearSearchV56(){
  const el=document.getElementById("globalSearchV56");
  if(el){el.value="";runSearchV56("");el.focus();}
}

// ============================================================
// V5.7 — RESUMO RÁPIDO
// ============================================================
let currentSummaryLessonV57 = 1;

const SUMMARY_DATA_V57 = {
  1: {
    title: "Interpretação de texto",
    subtitle: "Português • Aula 01",
    points: [
      ["Leia o comando", "Antes de voltar ao texto, identifique exatamente o que a questão está pedindo."],
      ["Responda pelo texto", "Sua resposta deve ser sustentada pelas informações apresentadas, e não por opinião pessoal."],
      ["Explícito x implícito", "Explícito aparece diretamente; implícito é concluído por pistas do texto."],
      ["Evite extrapolar", "Não acrescente fatos, causas ou consequências que o texto não permite concluir."],
      ["Fato x opinião", "Fato pode ser verificado; opinião apresenta avaliação, julgamento ou ponto de vista."],
      ["Palavras absolutas", "Termos como sempre, nunca, todos e somente podem tornar uma alternativa exagerada."],
      ["Conectivos importam", "Mas, porém, entretanto e embora ajudam a identificar relações de oposição ou concessão."],
      ["Confirme no texto", "Antes de marcar, volte ao trecho e procure a evidência que sustenta a alternativa."]
    ],
    tip: "Em interpretação, uma alternativa pode parecer verdadeira na vida real e ainda estar errada se não for sustentada pelo texto."
  },
  2: {
    title: "Ideia principal e inferência",
    subtitle: "Português • Aula 02",
    points: [
      ["Tema x ideia principal", "Tema é o assunto geral; ideia principal é o que o texto diz de mais importante sobre esse assunto."],
      ["Procure o núcleo", "Elimine exemplos e detalhes e tente resumir a mensagem central em uma frase."],
      ["Inferência exige pista", "Uma conclusão só é válida quando pode ser sustentada por elementos do texto."],
      ["Não generalize", "Alguns não significa todos; pode não significa sempre; possibilidade não é certeza."],
      ["Pressupostos", "Expressões como voltou a, parou de e continua podem carregar informações implícitas."],
      ["Causa e consequência", "Observe a direção da relação para não inverter o motivo e o resultado."],
      ["Conectivos", "Embora indica concessão; entretanto e porém costumam marcar contraste."],
      ["Teste a conclusão", "Pergunte: qual trecho do texto prova essa inferência? Se não houver evidência, desconfie."]
    ],
    tip: "A melhor inferência não é a mais criativa; é a conclusão que exige menos suposições e possui mais apoio textual."
  }
};

function openSummaryV57(){
  showScreen("summaryScreenV57","navStudy");
  renderSummaryV57(currentSummaryLessonV57);
  window.scrollTo(0,0);
}
function renderSummaryV57(n){
  currentSummaryLessonV57=n;
  const data=SUMMARY_DATA_V57[n];
  if(!data) return;
  const title=document.getElementById("summaryTitleV57");
  const subtitle=document.getElementById("summarySubtitleV57");
  const content=document.getElementById("summaryContentV57");
  if(title) title.textContent=data.title;
  if(subtitle) subtitle.textContent=data.subtitle+" • revisão em 3–5 min";
  ["summaryBtn1V57","summaryBtn2V57"].forEach(id=>document.getElementById(id)?.classList.remove("active"));
  document.getElementById("summaryBtn"+n+"V57")?.classList.add("active");
  if(content){
    content.innerHTML=data.points.map((p,i)=>`
      <article class="summary-v57-point">
        <b>${String(i+1).padStart(2,"0")}</b>
        <div><strong>${p[0]}</strong><p>${p[1]}</p></div>
      </article>`).join("")+
      `<article class="summary-v57-tip"><strong>💡 Dica de prova</strong><p>${data.tip}</p></article>`;
  }
}
function openCurrentSummaryLessonV57(){
  openLesson(currentSummaryLessonV57);
}
function saveSummaryFavoriteV57(){
  const data=SUMMARY_DATA_V57[currentSummaryLessonV57];
  if(!data) return;
  // Reaproveita o armazenamento da V5.5.1, sem depender da tela estar aberta.
  let list=[];
  try{ list=JSON.parse(localStorage.getItem("pmmg_favorites_v55")||"[]"); }catch(e){ list=[]; }
  const title="Resumo • "+data.title;
  const body=data.points.map((p,i)=>`${i+1}. ${p[0]} — ${p[1]}`).join("\n")+"\n\nDica: "+data.tip;
  const exists=list.some(x=>x.title===title);
  if(exists){ alert("⭐ Este resumo já está salvo nos seus favoritos."); return; }
  list.unshift({id:Date.now(),title,body,reviewed:false,createdAt:new Date().toISOString()});
  localStorage.setItem("pmmg_favorites_v55",JSON.stringify(list));
  alert("⭐ Resumo salvo nos favoritos!");
}
document.addEventListener("DOMContentLoaded",()=>renderSummaryV57(1));

// ============================================================
// V5.8 — REVISÃO RÁPIDA FUNCIONAL
// ============================================================
let reviewDurationV58 = 10;
let reviewRemainingV58 = 600;
let reviewTimerIdV58 = null;
let reviewRunningV58 = false;
let reviewPlanStepsV58 = [];

function openQuickReviewV58(){
  showScreen("quickReviewScreenV58","navReview");
  window.scrollTo(0,0);
}

function getErrorCountV58(){
  try{
    const keys=["errorNotebook","missaoPMMGState"];
    const direct=JSON.parse(localStorage.getItem("errorNotebook")||"[]");
    if(Array.isArray(direct) && direct.length) return direct.length;
    const state=JSON.parse(localStorage.getItem("missaoPMMGState")||"{}");
    if(Array.isArray(state.errors)) return state.errors.length;
  }catch(e){}
  return 0;
}

function getBestScoreV58(n){
  try{
    const state=JSON.parse(localStorage.getItem("missaoPMMGState")||"{}");
    if(state.scores && typeof state.scores[n] === "number") return state.scores[n];
  }catch(e){}
  return 0;
}

function buildQuickReviewV58(minutes){
  reviewDurationV58 = minutes;
  reviewRemainingV58 = minutes * 60;
  reviewRunningV58 = false;
  clearInterval(reviewTimerIdV58);
  reviewTimerIdV58 = null;

  const errors = getErrorCountV58();
  const s1 = getBestScoreV58(1);
  const s2 = getBestScoreV58(2);

  let weakestLesson = 1;
  if(s2 && (!s1 || s2 < s1)) weakestLesson = 2;

  const lessonName = weakestLesson === 1 ? "Interpretação de texto" : "Ideia principal e inferência";

  if(minutes === 10){
    reviewPlanStepsV58 = [
      {title:"Resumo essencial",time:"3 min",text:`Releia o Resumo Rápido de ${lessonName}.`},
      {title:"Revisar pontos fracos",time:"4 min",text:errors ? `Revise até ${Math.min(errors,3)} questão(ões) do Caderno de Erros.` : "Revise as principais pegadinhas e dicas da aula."},
      {title:"Fixação final",time:"3 min",text:"Explique mentalmente os pontos principais sem consultar o material."}
    ];
  } else if(minutes === 20){
    reviewPlanStepsV58 = [
      {title:"Resumo rápido",time:"5 min",text:`Revise os pontos essenciais de ${lessonName}.`},
      {title:"Caderno de Erros",time:"7 min",text:errors ? `Revise até ${Math.min(errors,5)} erro(s) e tente justificar a resposta correta.` : "Faça uma revisão dirigida das regras que mais confundem."},
      {title:"Treino ativo",time:"5 min",text:"Refaça mentalmente exemplos e compare alternativas."},
      {title:"Fechamento",time:"3 min",text:"Anote uma dúvida ou regra importante nos Favoritos."}
    ];
  } else {
    reviewPlanStepsV58 = [
      {title:"Resumo da aula",time:"7 min",text:`Leia o resumo de ${lessonName} e marque os pontos menos seguros.`},
      {title:"Revisão dos erros",time:"10 min",text:errors ? `Revise até ${Math.min(errors,8)} questão(ões) salvas no Caderno de Erros.` : "Revise exemplos e pegadinhas da aula."},
      {title:"Treino ativo",time:"8 min",text:"Teste sua memória: explique conceitos e elimine alternativas erradas."},
      {title:"Registro",time:"5 min",text:"Salve nos Favoritos as regras que ainda precisam de reforço."}
    ];
  }

  const plan = document.getElementById("reviewPlanV58");
  const timer = document.getElementById("reviewTimerV58");
  if(plan){
    plan.innerHTML = reviewPlanStepsV58.map((step,i)=>`
      <article class="review-v58-block">
        <span class="num">${String(i+1).padStart(2,"0")}</span>
        <div>
          <strong>${step.title}</strong>
          <p>${step.text}</p>
          <em>⏱️ ${step.time}</em>
        </div>
      </article>`).join("");
  }
  if(timer) timer.classList.remove("hidden");
  updateReviewClockV58();
  document.getElementById("reviewStartBtnV58").textContent="Iniciar";
  document.getElementById("reviewStepV58").textContent=`Sessão de ${minutes} minutos pronta.`;
  localStorage.setItem("pmmg_last_review_duration", String(minutes));
}

function updateReviewClockV58(){
  const el=document.getElementById("reviewClockV58");
  if(!el) return;
  const m=Math.floor(reviewRemainingV58/60);
  const s=reviewRemainingV58%60;
  el.textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function toggleReviewTimerV58(){
  const btn=document.getElementById("reviewStartBtnV58");
  if(reviewRemainingV58<=0){
    resetReviewTimerV58();
  }
  reviewRunningV58=!reviewRunningV58;
  if(reviewRunningV58){
    if(btn) btn.textContent="Pausar";
    document.getElementById("reviewStepV58").textContent="Revisão em andamento. Mantenha o foco.";
    reviewTimerIdV58=setInterval(()=>{
      reviewRemainingV58--;
      updateReviewClockV58();
      if(reviewRemainingV58<=0){
        clearInterval(reviewTimerIdV58);
        reviewTimerIdV58=null;
        reviewRunningV58=false;
        if(btn) btn.textContent="Concluído";
        document.getElementById("reviewStepV58").textContent="✅ Revisão concluída! Sessão registrada.";
        const today=new Date().toISOString().slice(0,10);
        localStorage.setItem("pmmg_review_completed_"+today,"1");
      }
    },1000);
  }else{
    clearInterval(reviewTimerIdV58);
    reviewTimerIdV58=null;
    if(btn) btn.textContent="Continuar";
    document.getElementById("reviewStepV58").textContent="Sessão pausada.";
  }
}

function resetReviewTimerV58(){
  clearInterval(reviewTimerIdV58);
  reviewTimerIdV58=null;
  reviewRunningV58=false;
  reviewRemainingV58=reviewDurationV58*60;
  updateReviewClockV58();
  const btn=document.getElementById("reviewStartBtnV58");
  if(btn) btn.textContent="Iniciar";
  const step=document.getElementById("reviewStepV58");
  if(step) step.textContent=`Sessão de ${reviewDurationV58} minutos pronta.`;
}

// ============================================================
// V5.9 — NÍVEIS, SEQUÊNCIA E CONQUISTAS
// ============================================================
const LEVELS_V59 = [
  {name:"Recruta",min:0,max:100},
  {name:"Aluno-Soldado",min:100,max:300},
  {name:"Soldado",min:300,max:600},
  {name:"Cabo",min:600,max:1000},
  {name:"Sargento",min:1000,max:1500},
  {name:"Subtenente",min:1500,max:2200},
  {name:"Aspirante",min:2200,max:3000}
];

function getXpV59(){
  try{
    const state=JSON.parse(localStorage.getItem("missaoPMMGState")||"{}");
    if(typeof state.xp==="number") return state.xp;
  }catch(e){}
  const direct=Number(localStorage.getItem("xp")||0);
  return Number.isFinite(direct)?direct:0;
}

function getStreakV59(){
  const values=[
    Number(localStorage.getItem("pmmg_streak")||0),
    (()=>{try{const s=JSON.parse(localStorage.getItem("missaoPMMGState")||"{}");return Number(s.streak||0)}catch(e){return 0}})()
  ];
  return Math.max(1,...values.filter(Number.isFinite));
}

function getCompletedLessonsV59(){
  try{
    const s=JSON.parse(localStorage.getItem("missaoPMMGState")||"{}");
    if(Array.isArray(s.completedLessons)) return s.completedLessons.length;
  }catch(e){}
  return 0;
}

function getScoresV59(){
  try{
    const s=JSON.parse(localStorage.getItem("missaoPMMGState")||"{}");
    if(s.scores && typeof s.scores==="object") return Object.values(s.scores).map(Number).filter(Number.isFinite);
  }catch(e){}
  return [];
}

function getErrorCountV59(){
  try{
    const s=JSON.parse(localStorage.getItem("missaoPMMGState")||"{}");
    if(Array.isArray(s.errors)) return s.errors.length;
  }catch(e){}
  try{
    const e=JSON.parse(localStorage.getItem("errorNotebook")||"[]");
    if(Array.isArray(e)) return e.length;
  }catch(e){}
  return 0;
}

function getFavoritesCountV59(){
  try{
    const f=JSON.parse(localStorage.getItem("pmmg_favorites_v55")||"[]");
    return Array.isArray(f)?f.length:0;
  }catch(e){return 0}
}

function getReviewDoneV59(){
  const today=new Date().toISOString().slice(0,10);
  return localStorage.getItem("pmmg_review_completed_"+today)==="1";
}

function currentLevelV59(xp){
  let level=LEVELS_V59[0];
  for(const l of LEVELS_V59){
    if(xp>=l.min) level=l;
    if(xp<l.max) break;
  }
  return level;
}

function openAchievementsV59(){
  showScreen("achievementsScreenV59","navEvolution");
  renderAchievementsV59();
  window.scrollTo(0,0);
}

function renderAchievementsV59(){
  const xp=getXpV59();
  const streak=getStreakV59();
  const completed=getCompletedLessonsV59();
  const scores=getScoresV59();
  const errors=getErrorCountV59();
  const favorites=getFavoritesCountV59();
  const reviewDone=getReviewDoneV59();
  const level=currentLevelV59(xp);

  const max=level.max;
  const min=level.min;
  const progress=max>min?Math.max(0,Math.min(100,((xp-min)/(max-min))*100)):100;

  document.getElementById("levelNameV59").textContent=level.name;
  document.getElementById("levelXpV59").textContent=xp+" XP";
  document.getElementById("levelMinV59").textContent=min+" XP";
  document.getElementById("levelMaxV59").textContent=max+" XP";
  document.getElementById("levelBarV59").style.width=progress+"%";
  document.getElementById("levelSubtitleV59").textContent=
    xp>=max ? "Nível máximo desta versão atingido." : `Faltam ${Math.max(0,max-xp)} XP para o próximo marco.`;

  document.getElementById("streakDaysV59").textContent=streak;
  document.getElementById("streakRingV59").textContent=streak;

  const achievements=[
    {icon:"🎓",title:"Primeira aprovação",desc:"Conclua sua primeira aula.",ok:completed>=1},
    {icon:"💯",title:"Nota máxima",desc:"Tire 100% em uma prova.",ok:scores.some(s=>s===100)},
    {icon:"📚",title:"Duas etapas vencidas",desc:"Conclua as duas primeiras aulas.",ok:completed>=2},
    {icon:"⭐",title:"100 XP",desc:"Acumule pelo menos 100 XP.",ok:xp>=100},
    {icon:"🔥",title:"Sequência de 3 dias",desc:"Estude por 3 dias consecutivos.",ok:streak>=3},
    {icon:"🔥",title:"Sequência de 7 dias",desc:"Mantenha 7 dias de estudo.",ok:streak>=7},
    {icon:"📓",title:"Aprendendo com os erros",desc:"Tenha ao menos 1 questão no Caderno de Erros.",ok:errors>=1},
    {icon:"⭐",title:"Biblioteca pessoal",desc:"Salve 3 itens nos Favoritos.",ok:favorites>=3},
    {icon:"⚡",title:"Revisão concluída",desc:"Complete uma sessão de Revisão Rápida hoje.",ok:reviewDone},
    {icon:"🎯",title:"Excelente desempenho",desc:"Alcance 80% ou mais em uma prova.",ok:scores.some(s=>s>=80)}
  ];

  const unlocked=achievements.filter(a=>a.ok).length;
  document.getElementById("achievementCountV59").textContent=`${unlocked}/${achievements.length}`;

  const list=document.getElementById("achievementListV59");
  list.innerHTML=achievements.map(a=>`
    <article class="achievement-v59-item ${a.ok?"":"locked"}">
      <span class="icon">${a.icon}</span>
      <span class="achievement-v59-status">${a.ok?"CONQUISTADA":"BLOQUEADA"}</span>
      <strong>${a.title}</strong>
      <p>${a.desc}</p>
    </article>
  `).join("");
}

// ============================================================
// V5.9.1 — VOLTAR INTELIGENTE
// O botão ← retorna à tela anterior real, em vez de ir à Home.
// ============================================================
const screenHistoryV591 = [];
let navigatingBackV591 = false;

function getActiveScreenV591(){
  return document.querySelector(".screen.active");
}

function getActiveNavV591(){
  const active = document.querySelector(".bottom-nav button.active");
  return active ? active.id : "";
}

const originalShowScreenV591 = showScreen;
showScreen = function(id, nav=""){
  const current = getActiveScreenV591();

  if(
    !navigatingBackV591 &&
    current &&
    current.id &&
    current.id !== id
  ){
    const last = screenHistoryV591[screenHistoryV591.length - 1];

    // Evita duplicar a mesma tela consecutivamente.
    if(!last || last.id !== current.id){
      screenHistoryV591.push({
        id: current.id,
        nav: getActiveNavV591(),
        scrollY: window.scrollY || document.documentElement.scrollTop || 0
      });
    }

    // Limite para não acumular histórico demais.
    if(screenHistoryV591.length > 40){
      screenHistoryV591.shift();
    }
  }

  return originalShowScreenV591(id, nav);
};

// As centrais V5.3 agora também passam pelo mesmo histórico.
v53Show = function(id, navId){
  showScreen(id, navId);
  if(typeof setMainNavActive === "function" && navId){
    setMainNavActive(navId);
  }
  window.scrollTo(0,0);
};

function goBackSmart(){
  // Remove referências inválidas caso alguma tela antiga não exista.
  while(screenHistoryV591.length){
    const previous = screenHistoryV591.pop();
    if(previous && document.getElementById(previous.id)){
      navigatingBackV591 = true;
      originalShowScreenV591(previous.id, previous.nav || "");
      if(previous.nav && typeof setMainNavActive === "function"){
        setMainNavActive(previous.nav);
      }
      navigatingBackV591 = false;
      window.scrollTo(0,0);
      return;
    }
  }

  // Se não houver histórico, volta para o início.
  navigatingBackV591 = true;
  originalShowScreenV591("homeScreen","navHome");
  if(typeof setMainNavActive === "function"){
    setMainNavActive("navHome");
  }
  navigatingBackV591 = false;
  window.scrollTo(0,0);
}

// Ao tocar em Início, começa uma nova pilha lógica.
const goHomeBeforeV591 = goHome;
goHome = function(){
  screenHistoryV591.length = 0;
  return goHomeBeforeV591();
};

// ============================================================
// V6.3.8.1 — VOLTAR PARA ONDE ESTAVA
// Usa o histórico real de telas e restaura também a rolagem.
// ============================================================
window.goBackSmart = function(){
  while(screenHistoryV591.length){
    const previous = screenHistoryV591.pop();
    if(previous && document.getElementById(previous.id)){
      navigatingBackV591 = true;
      originalShowScreenV591(previous.id, previous.nav || "");
      if(previous.nav && typeof setMainNavActive === "function"){
        setMainNavActive(previous.nav);
      }
      navigatingBackV591 = false;
      requestAnimationFrame(()=>window.scrollTo(0, Number(previous.scrollY)||0));
      return;
    }
  }

  navigatingBackV591 = true;
  originalShowScreenV591("homeScreen","navHome");
  if(typeof setMainNavActive === "function") setMainNavActive("navHome");
  navigatingBackV591 = false;
  window.scrollTo(0,0);
};

// ============================================================
// V5.10 — SIMULADOS FUNCIONAIS
// ============================================================
let simQuestionsV510 = [];
let simAnswersV510 = [];
let simIndexV510 = 0;
let simSecondsV510 = 900;
let simTimerV510 = null;
let simStartedAtV510 = null;
let simLastResultV510 = null;

function openSimulatorHubV510(){
  showScreen("simulatorHubV510","navTrain");
  renderSimulationHistoryV510();
  window.scrollTo(0,0);
}

function getSimulationPoolV510(){
  const pool=[];
  if(typeof window.lessons!=="undefined"){
    Object.keys(window.lessons).forEach(k=>{
      const lesson=window.lessons[k];
      if(Array.isArray(lesson.quiz)){
        lesson.quiz.forEach((q,qi)=>{
          pool.push({
            lessonNumber:Number(k),
            lessonTitle:lesson.title,
            question:q.question,
            options:q.options,
            answer:q.answer,
            explanation:q.explanation||"Revise o conteúdo relacionado a esta questão.",
            tip:q.tip||"Volte ao conteúdo e compare a regra com a resposta correta."
          });
        });
      }
    });
  }
  return pool;
}

function startSimulationV510(type){
  const pool=getSimulationPoolV510();
  if(pool.length<5){
    alert("Ainda não há questões suficientes para montar o simulado.");
    return;
  }

  const shuffled=[...pool].sort(()=>Math.random()-.5);
  simQuestionsV510=shuffled.slice(0,Math.min(type==="rapido"?5:10,shuffled.length));
  simAnswersV510=new Array(simQuestionsV510.length).fill(null);
  simIndexV510=0;
  simSecondsV510=type==="rapido"?300:900;
  simStartedAtV510=Date.now();
  clearInterval(simTimerV510);

  document.getElementById("simTitleV510").textContent=type==="portugues"?"Português":"Simulado misto";
  showScreen("simulationScreenV510","navTrain");
  renderSimulationQuestionV510();
  updateSimulationClockV510();

  simTimerV510=setInterval(()=>{
    simSecondsV510--;
    updateSimulationClockV510();
    if(simSecondsV510<=0){
      clearInterval(simTimerV510);
      simTimerV510=null;
      alert("⏱️ Tempo encerrado. O simulado será finalizado.");
      finishSimulationV510(true);
    }
  },1000);
}

function renderSimulationQuestionV510(){
  const q=simQuestionsV510[simIndexV510];
  if(!q)return;

  document.getElementById("simProgressV510").textContent=`${simIndexV510+1}/${simQuestionsV510.length}`;
  document.getElementById("simQuestionCardV510").innerHTML=`
    <div class="qnum">QUESTÃO ${String(simIndexV510+1).padStart(2,"0")}</div>
    <h3>${q.question}</h3>
    <div class="sim510-answers">
      ${q.options.map((o,i)=>`
        <label class="sim510-answer ${simAnswersV510[simIndexV510]===i?"selected":""}">
          <input type="radio" name="sim510-answer" value="${i}" ${simAnswersV510[simIndexV510]===i?"checked":""} onchange="selectSimulationAnswerV510(${i})">
          <span>${o}</span>
        </label>`).join("")}
    </div>`;

  document.getElementById("simPrevV510").disabled=simIndexV510===0;
  const atEnd=simIndexV510===simQuestionsV510.length-1;
  document.getElementById("simNextV510").classList.toggle("hidden",atEnd);
  document.getElementById("simFinishV510").classList.toggle("hidden",!atEnd);
}

function selectSimulationAnswerV510(index){
  simAnswersV510[simIndexV510]=index;
  renderSimulationQuestionV510();
}

function prevSimulationQuestionV510(){
  if(simIndexV510>0){simIndexV510--;renderSimulationQuestionV510();}
}

function nextSimulationQuestionV510(){
  if(simIndexV510<simQuestionsV510.length-1){simIndexV510++;renderSimulationQuestionV510();}
}

function updateSimulationClockV510(){
  const m=Math.floor(Math.max(0,simSecondsV510)/60);
  const s=Math.max(0,simSecondsV510)%60;
  const el=document.getElementById("simClockV510");
  if(el)el.textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function finishSimulationV510(force=false){
  if(!force){
    const unanswered=simAnswersV510.filter(x=>x===null).length;
    if(unanswered>0 && !confirm(`Você deixou ${unanswered} questão(ões) sem resposta. Finalizar mesmo assim?`)) return;
  }

  clearInterval(simTimerV510);
  simTimerV510=null;

  let correct=0;
  simQuestionsV510.forEach((q,i)=>{if(simAnswersV510[i]===q.answer)correct++;});
  const total=simQuestionsV510.length;
  const score=Math.round((correct/total)*100);
  const used=Math.max(0,900-simSecondsV510);

  simLastResultV510={questions:simQuestionsV510,answers:simAnswersV510,correct,total,score,used,date:Date.now()};
  saveSimulationResultV510(simLastResultV510);

  document.getElementById("simResultIconV510").textContent=score>=70?"🏆":score>=50?"📈":"📚";
  document.getElementById("simResultScoreV510").textContent=score+"%";
  document.getElementById("simResultTextV510").textContent=
    score>=70?"Bom desempenho. Continue revisando os erros para consolidar o conteúdo.":
    "Use a correção para identificar os pontos que mais precisam de revisão.";
  document.getElementById("simCorrectV510").textContent=correct;
  document.getElementById("simWrongV510").textContent=total-correct;
  document.getElementById("simTimeUsedV510").textContent=formatSecondsV510(used);
  document.getElementById("simCorrectionV510").classList.add("hidden");

  showScreen("simulationResultV510","navTrain");
  window.scrollTo(0,0);
}

function saveSimulationResultV510(result){
  let hist=[];
  try{hist=JSON.parse(localStorage.getItem("pmmg_sim_history_v510")||"[]");}catch(e){hist=[];}
  hist.unshift({score:result.score,correct:result.correct,total:result.total,used:result.used,date:result.date});
  hist=hist.slice(0,20);
  localStorage.setItem("pmmg_sim_history_v510",JSON.stringify(hist));
}

function renderSimulationHistoryV510(){
  const box=document.getElementById("simHistoryV510");
  const count=document.getElementById("simHistoryCountV510");
  if(!box||!count)return;

  let hist=[];
  try{hist=JSON.parse(localStorage.getItem("pmmg_sim_history_v510")||"[]");}catch(e){hist=[];}
  count.textContent=`${hist.length} ${hist.length===1?"simulado":"simulados"}`;

  if(!hist.length){
    box.innerHTML='<div class="empty-state"><b>Nenhum simulado realizado</b><br>Seu histórico aparecerá aqui.</div>';
    return;
  }

  box.innerHTML=hist.map(h=>`
    <article class="sim510-history-item">
      <div><strong>${new Date(h.date).toLocaleDateString("pt-BR")}</strong><span>${h.correct}/${h.total} acertos • ${formatSecondsV510(h.used)}</span></div>
      <b>${h.score}%</b>
    </article>`).join("");
}

function reviewSimulationV510(){
  if(!simLastResultV510)return;
  const box=document.getElementById("simCorrectionV510");
  box.innerHTML=simLastResultV510.questions.map((q,i)=>{
    const selected=simLastResultV510.answers[i];
    const ok=selected===q.answer;
    return `
      <article class="sim510-correction-item ${ok?"ok":"bad"}">
        <strong>Questão ${i+1} • ${ok?"✅ Acertou":"❌ Errou"}</strong>
        ${!ok?`<p class="badans"><b>Sua resposta:</b> ${selected===null?"Não respondida":q.options[selected]}</p>`:""}
        <p class="good"><b>Correta:</b> ${q.options[q.answer]}</p>
        <p class="why"><b>Explicação:</b> ${q.explanation}</p>
        <p class="why"><b>💡 Dica:</b> ${q.tip}</p>
      </article>`;
  }).join("");
  box.classList.remove("hidden");
  box.scrollIntoView({behavior:"smooth",block:"start"});
}

function formatSecondsV510(sec){
  const m=Math.floor(sec/60),s=sec%60;
  return `${m}:${String(s).padStart(2,"0")}`;
}

function confirmExitSimulationV510(){
  if(confirm("Sair do simulado? O progresso desta tentativa será perdido.")){
    clearInterval(simTimerV510);
    simTimerV510=null;
    openSimulatorHubV510();
  }
}

function showFutureSimulationV510(){
  alert("🎯 O Simulado Completo PMMG será liberado quando adicionarmos as próximas matérias e mais questões.");
}

// ============================================================
// V5.11 — DICAS DE PROVA FUNCIONAIS
// ============================================================
const TIPS_V511 = [
  {id:1,cat:"interpretacao",title:"Responda pelo texto",tag:"INTERPRETAÇÃO",text:"Não escolha uma alternativa só porque ela parece verdadeira na vida real. Em interpretação, a resposta precisa ser sustentada pelo texto.",example:"Pergunte: qual trecho do texto prova esta alternativa?"},
  {id:2,cat:"interpretacao",title:"Leia o comando primeiro",tag:"INTERPRETAÇÃO",text:"Antes de mergulhar no texto, identifique o que a questão pede. Isso direciona sua leitura e evita perda de tempo.",example:"Procure palavras como 'segundo o texto', 'infere-se', 'correta' e 'incorreta'."},
  {id:3,cat:"alternativas",title:"Elimine antes de escolher",tag:"ALTERNATIVAS",text:"Em vez de procurar imediatamente a correta, descarte as claramente erradas. Isso reduz a dúvida entre opções parecidas.",example:"Elimine contradições, exageros e respostas que fogem do comando."},
  {id:4,cat:"pegadinhas",title:"Desconfie de palavras absolutas",tag:"PEGADINHAS",text:"Termos como sempre, nunca, todos, somente e exclusivamente podem transformar uma ideia plausível em uma afirmação exagerada.",example:"Compare o grau de certeza da alternativa com o grau de certeza do texto."},
  {id:5,cat:"tempo",title:"Não fique preso em uma questão",tag:"GESTÃO DO TEMPO",text:"Se uma questão estiver consumindo tempo demais, marque para revisar e siga. Uma questão difícil vale o mesmo ponto que uma fácil.",example:"Defina um limite mental de tempo e volte depois."},
  {id:6,cat:"tempo",title:"Reserve tempo para revisão",tag:"GESTÃO DO TEMPO",text:"Evite usar 100% do tempo apenas respondendo. Deixe alguns minutos finais para conferir marcações e questões em dúvida.",example:"Revise primeiro as questões que você marcou como incertas."},
  {id:7,cat:"alternativas",title:"Compare duas finalistas",tag:"ALTERNATIVAS",text:"Quando restarem duas opções, compare palavra por palavra. Muitas vezes a diferença está em um termo exagerado ou restritivo.",example:"Observe causa, intensidade, tempo verbal e abrangência."},
  {id:8,cat:"pegadinhas",title:"Cuidado com extrapolação",tag:"PEGADINHAS",text:"Uma alternativa pode começar correta e terminar adicionando uma conclusão que o texto não permite.",example:"Confirme cada parte da alternativa, não apenas o início."},
  {id:9,cat:"interpretacao",title:"Diferencie tema e ideia principal",tag:"INTERPRETAÇÃO",text:"Tema é o assunto geral. Ideia principal é a mensagem central construída sobre esse assunto.",example:"Tente resumir o texto em uma única frase."},
  {id:10,cat:"prova",title:"Comece pelo que você domina",tag:"DIA DA PROVA",text:"Ganhar pontos nas questões mais seguras primeiro ajuda a controlar tempo e ansiedade durante a prova.",example:"Se a ordem das questões permitir, priorize seus assuntos mais fortes."},
  {id:11,cat:"prova",title:"Leia com atenção o que é pedido",tag:"DIA DA PROVA",text:"Erros por distração são evitáveis. Antes de marcar, confirme se a questão pede a correta, incorreta, exceção ou sequência.",example:"Circule mentalmente a palavra-chave do comando."},
  {id:12,cat:"prova",title:"Não troque resposta sem motivo",tag:"DIA DA PROVA",text:"Mudar uma resposta apenas por insegurança pode custar pontos. Troque somente quando encontrar uma razão concreta.",example:"Uma regra lembrada, cálculo corrigido ou evidência textual é um bom motivo."}
];

function openTipsV511(){
  showScreen("tipsHubV511","navStudy");
  renderTipsV511("todas");
  window.scrollTo(0,0);
}

function filterTipsV511(cat,btn){
  document.querySelectorAll(".tips511-categories button").forEach(b=>b.classList.remove("active"));
  if(btn) btn.classList.add("active");
  renderTipsV511(cat);
}

function getSavedTipsV511(){
  try{
    const ids=JSON.parse(localStorage.getItem("pmmg_saved_tips_v511")||"[]");
    return Array.isArray(ids)?ids:[];
  }catch(e){return[]}
}

function renderTipsV511(cat="todas"){
  const box=document.getElementById("tipsListV511");
  if(!box)return;
  const saved=getSavedTipsV511();
  const list=cat==="todas"?TIPS_V511:TIPS_V511.filter(t=>t.cat===cat);
  box.innerHTML=list.map((t,i)=>`
    <article class="tip511-card">
      <div class="tip511-top">
        <div>
          <span class="tip511-number">${String(t.id).padStart(2,"0")}</span>
          <div>
            <h3>${t.title}</h3>
            <span class="tip511-tag">${t.tag}</span>
          </div>
        </div>
        <button class="tip511-save ${saved.includes(t.id)?"saved":""}" onclick="toggleTipV511(${t.id})">${saved.includes(t.id)?"★":"☆"}</button>
      </div>
      <p>${t.text}</p>
      <div class="tip511-example">
        <strong>APLICAÇÃO</strong>
        <span>${t.example}</span>
      </div>
    </article>
  `).join("");
}

function toggleTipV511(id){
  let saved=getSavedTipsV511();
  if(saved.includes(id)) saved=saved.filter(x=>x!==id);
  else saved.push(id);
  localStorage.setItem("pmmg_saved_tips_v511",JSON.stringify(saved));
  renderTipsV511(document.querySelector(".tips511-categories button.active")?.textContent.toLowerCase().includes("interpretação")?"interpretacao":
                 document.querySelector(".tips511-categories button.active")?.textContent.toLowerCase().includes("tempo")?"tempo":
                 document.querySelector(".tips511-categories button.active")?.textContent.toLowerCase().includes("alternativas")?"alternativas":
                 document.querySelector(".tips511-categories button.active")?.textContent.toLowerCase().includes("pegadinhas")?"pegadinhas":
                 document.querySelector(".tips511-categories button.active")?.textContent.toLowerCase().includes("dia")?"prova":"todas");

  const tip=TIPS_V511.find(t=>t.id===id);
  if(!tip)return;

  // Espelha dica salva na biblioteca de favoritos.
  let fav=[];
  try{fav=JSON.parse(localStorage.getItem("pmmg_favorites_v55")||"[]");}catch(e){fav=[];}
  const favTitle="Dica • "+tip.title;

  if(saved.includes(id)){
    if(!fav.some(x=>x.title===favTitle)){
      fav.unshift({
        id:Date.now(),
        title:favTitle,
        body:tip.text+"\n\nAplicação: "+tip.example,
        reviewed:false,
        createdAt:new Date().toISOString()
      });
    }
  }else{
    fav=fav.filter(x=>x.title!==favTitle);
  }
  localStorage.setItem("pmmg_favorites_v55",JSON.stringify(fav));
}

// ============================================================
// V6.0 — ESTRUTURA COMPLETA
// ============================================================

// ---------- Helpers ----------
function v60TodayKey(d=new Date()){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function v60Read(key,fallback){
  try{const v=JSON.parse(localStorage.getItem(key));return v ?? fallback}catch(e){return fallback}
}
function v60Write(key,val){localStorage.setItem(key,JSON.stringify(val))}
function logStudyEventV60(type,title,detail=""){
  const list=v60Read("pmmg_history_v60",[]);
  list.unshift({id:Date.now(),type,title,detail,date:new Date().toISOString()});
  v60Write("pmmg_history_v60",list.slice(0,120));
}
function openCalendarV60(){showScreen("calendarScreenV60","navStudy");renderCalendarV60();window.scrollTo(0,0)}
function openWeeklyGoalsV60(){showScreen("weeklyGoalsScreenV60","navStudy");loadWeeklyGoalsV60();window.scrollTo(0,0)}
function openNotificationsV60(){showScreen("notificationsScreenV60","navStudy");renderRemindersV60();window.scrollTo(0,0)}
function openRevisionScheduleV60(){showScreen("revisionScheduleScreenV60","navReview");renderRevisionScheduleV60();window.scrollTo(0,0)}
function openSubjectPerformanceV60(){showScreen("subjectPerformanceScreenV60","navEvolution");renderSubjectPerformanceV60();window.scrollTo(0,0)}
function openQuestionStatsV60(){showScreen("questionStatsScreenV60","navEvolution");renderQuestionStatsV60();window.scrollTo(0,0)}
function openStudyHistoryV60(){showScreen("studyHistoryScreenV60","navEvolution");renderStudyHistoryV60();window.scrollTo(0,0)}
function openPreparationIndexV60(){showScreen("preparationIndexScreenV60","navEvolution");renderPreparationIndexV60();window.scrollTo(0,0)}
function openErrorsProV60(){showScreen("errorsProScreenV60","navReview");renderErrorsProV60("todos");window.scrollTo(0,0)}

// ---------- Calendar ----------
let calendarDateV60=new Date();
function changeMonthV60(delta){calendarDateV60=new Date(calendarDateV60.getFullYear(),calendarDateV60.getMonth()+delta,1);renderCalendarV60()}
function goTodayV60(){calendarDateV60=new Date();renderCalendarV60()}
function renderCalendarV60(){
  const title=document.getElementById("calendarMonthTitleV60"),grid=document.getElementById("calendarGridV60");
  if(!title||!grid)return;
  const y=calendarDateV60.getFullYear(),m=calendarDateV60.getMonth();
  title.textContent=new Intl.DateTimeFormat("pt-BR",{month:"long",year:"numeric"}).format(calendarDateV60);
  const first=new Date(y,m,1),start=first.getDay(),days=new Date(y,m+1,0).getDate();
  const studyDays=new Set();
  Object.keys(localStorage).forEach(k=>{if(k.startsWith("pmmg_activity_")&&localStorage.getItem(k)==="1")studyDays.add(k.replace("pmmg_activity_",""))});
  const revisions=v60Read("pmmg_revisions_v60",[]);
  const revDays=new Set(revisions.map(r=>r.date));
  const cells=[];
  for(let i=0;i<42;i++){
    const day=i-start+1;
    const d=new Date(y,m,day);
    const inMonth=day>=1&&day<=days;
    const key=v60TodayKey(d);
    cells.push(`<div class="v60-day ${inMonth?"":"muted"} ${key===v60TodayKey()?"today":""}">
      <span>${d.getDate()}</span>
      <div class="dots">${studyDays.has(key)?'<i class="v60-dot study"></i>':""}${revDays.has(key)?'<i class="v60-dot review"></i>':""}</div>
    </div>`);
  }
  grid.innerHTML=cells.join("");
}

// ---------- Weekly goals ----------
function currentWeekKeyV60(){
  const d=new Date(),day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);
  return v60TodayKey(d);
}
function saveWeeklyGoalsV60(){
  const goals={lessons:Number(document.getElementById("goalLessonsV60").value||3),questions:Number(document.getElementById("goalQuestionsV60").value||50),reviews:Number(document.getElementById("goalReviewsV60").value||3)};
  v60Write("pmmg_weekly_goals_v60",goals);loadWeeklyGoalsV60();logStudyEventV60("goal","Metas semanais atualizadas",`${goals.lessons} aulas • ${goals.questions} questões • ${goals.reviews} revisões`);
}
function loadWeeklyGoalsV60(){
  const g=v60Read("pmmg_weekly_goals_v60",{lessons:3,questions:50,reviews:3});
  document.getElementById("goalLessonsV60").value=g.lessons;document.getElementById("goalQuestionsV60").value=g.questions;document.getElementById("goalReviewsV60").value=g.reviews;
  const state=v60Read("missaoPMMGState",{}),completed=Array.isArray(state.completedLessons)?state.completedLessons.length:0;
  const sims=v60Read("pmmg_sim_history_v510",[]).length;
  const reviews=Object.keys(localStorage).filter(k=>k.startsWith("pmmg_review_completed_")&&localStorage.getItem(k)==="1").length;
  const items=[["Aulas",completed,g.lessons],["Questões",sims*10,g.questions],["Revisões",reviews,g.reviews]];
  document.getElementById("weeklyProgressV60").innerHTML=items.map(([name,val,max])=>`<article class="v60-progress-item"><header><strong>${name}</strong><span>${Math.min(val,max)}/${max}</span></header><div class="bar"><i style="width:${Math.min(100,(val/max)*100)}%"></i></div></article>`).join("");
}

// ---------- Reminders ----------
function addReminderV60(){
  const title=document.getElementById("reminderTitleV60").value.trim(),date=document.getElementById("reminderDateV60").value,time=document.getElementById("reminderTimeV60").value;
  if(!title||!date){alert("Preencha pelo menos o título e a data.");return}
  const list=v60Read("pmmg_reminders_v60",[]);list.push({id:Date.now(),title,date,time,done:false});v60Write("pmmg_reminders_v60",list);
  document.getElementById("reminderTitleV60").value="";renderRemindersV60();logStudyEventV60("reminder","Lembrete criado",title);
}
function renderRemindersV60(){
  const box=document.getElementById("reminderListV60");if(!box)return;
  const list=v60Read("pmmg_reminders_v60",[]).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  box.innerHTML=list.length?list.map(r=>`<article class="v60-list-item"><span class="icon">${r.done?"✅":"🔔"}</span><div class="copy"><strong>${r.title}</strong><p>${new Date(r.date+"T12:00:00").toLocaleDateString("pt-BR")}${r.time?" • "+r.time:""}</p></div><button onclick="toggleReminderV60(${r.id})">${r.done?"Reabrir":"Concluir"}</button><button onclick="deleteReminderV60(${r.id})">Excluir</button></article>`).join(""):'<div class="empty-state">Nenhum lembrete criado.</div>';
}
function toggleReminderV60(id){const list=v60Read("pmmg_reminders_v60",[]);const r=list.find(x=>x.id===id);if(r)r.done=!r.done;v60Write("pmmg_reminders_v60",list);renderRemindersV60()}
function deleteReminderV60(id){v60Write("pmmg_reminders_v60",v60Read("pmmg_reminders_v60",[]).filter(x=>x.id!==id));renderRemindersV60()}

// ---------- Scheduled review ----------
function scheduleRevisionV60(){
  const lesson=Number(document.getElementById("revisionLessonV60").value),delay=Number(document.getElementById("revisionDelayV60").value),d=new Date();d.setDate(d.getDate()+delay);
  const list=v60Read("pmmg_revisions_v60",[]);list.push({id:Date.now(),lesson,date:v60TodayKey(d),done:false});v60Write("pmmg_revisions_v60",list);renderRevisionScheduleV60();logStudyEventV60("review","Revisão agendada",`Aula ${String(lesson).padStart(2,"0")} • ${delay} dia(s)`);
}
function renderRevisionScheduleV60(){
  const box=document.getElementById("revisionListV60");if(!box)return;const list=v60Read("pmmg_revisions_v60",[]).sort((a,b)=>a.date.localeCompare(b.date));
  box.innerHTML=list.length?list.map(r=>`<article class="v60-list-item"><span class="icon">${r.done?"✅":"🧠"}</span><div class="copy"><strong>Aula ${String(r.lesson).padStart(2,"0")} • ${r.lesson===1?"Interpretação de texto":"Ideia principal e inferência"}</strong><p>${new Date(r.date+"T12:00:00").toLocaleDateString("pt-BR")}</p></div><button onclick="completeRevisionV60(${r.id})">${r.done?"Reabrir":"Concluir"}</button></article>`).join(""):'<div class="empty-state">Nenhuma revisão agendada.</div>';
}
function completeRevisionV60(id){const list=v60Read("pmmg_revisions_v60",[]),r=list.find(x=>x.id===id);if(r)r.done=!r.done;v60Write("pmmg_revisions_v60",list);renderRevisionScheduleV60();if(r&&r.done)logStudyEventV60("review","Revisão concluída",`Aula ${String(r.lesson).padStart(2,"0")}`)}

// ---------- V6.1.3 — desempenho e estatísticas reais ----------
function registerQuestionAttemptV613(lesson,correct,total,score){
  const list=v60Read("pmmg_question_history_v613",[]);
  list.unshift({lesson:Number(lesson),subject:"Português",correct:Number(correct),total:Number(total),score:Number(score),date:Date.now()});
  v60Write("pmmg_question_history_v613",list.slice(0,300));
}
function getPerformanceDataV613(){
  const st=v60Read("missaoPMMGState",{}), scores=st.scores||{};
  const lessonAttempts=v60Read("pmmg_question_history_v613",[]).filter(x=>Number.isFinite(Number(x.total)));
  const sims=v60Read("pmmg_sim_history_v510",[]).filter(x=>Number.isFinite(Number(x.total)));
  let attempts=lessonAttempts.map(x=>({kind:"aula",correct:Number(x.correct)||0,total:Number(x.total)||0,score:Number(x.score)||0}));
  // Para resultados anteriores à V6.1.3, usa a melhor nota salva apenas se ainda não existe tentativa registrada daquela aula.
  Object.entries(scores).forEach(([lesson,score])=>{
    if(lessonAttempts.some(x=>Number(x.lesson)===Number(lesson))) return;
    let total=10;
    try{const d=getLessonData(Number(lesson)); if(d&&Array.isArray(d.quiz)&&d.quiz.length) total=d.quiz.length;}catch(e){}
    const sc=Number(score)||0, correct=Math.max(0,Math.min(total,Math.round(total*sc/100)));
    attempts.push({kind:"aula",correct,total,score:sc,legacy:true});
  });
  const simAttempts=sims.map(x=>({kind:"simulado",correct:Number(x.correct)||0,total:Number(x.total)||0,score:Number(x.score)||0}));
  const all=[...attempts,...simAttempts], totalQuestions=all.reduce((a,x)=>a+x.total,0), correct=all.reduce((a,x)=>a+x.correct,0), wrong=Math.max(0,totalQuestions-correct);
  const accuracy=totalQuestions?Math.round(correct/totalQuestions*100):0;
  const completed=Array.isArray(st.completedLessons)?st.completedLessons.length:0;
  const vals=Object.values(scores).map(Number).filter(Number.isFinite);
  const simVals=sims.map(x=>Number(x.score)).filter(Number.isFinite);
  const allScores=[...vals,...simVals];
  const best=allScores.length?Math.max(...allScores):0;
  const avg=allScores.length?Math.round(allScores.reduce((a,b)=>a+b,0)/allScores.length):0;
  return {st,scores,lessonAttempts:attempts,sims,all,totalQuestions,correct,wrong,accuracy,completed,best,avg};
}
function renderSubjectPerformanceV60(){
  const box=document.getElementById("subjectPerformanceListV60");if(!box)return;
  const d=getPerformanceDataV613(), progress=Math.min(100,Math.round((d.completed/2)*100));
  box.innerHTML=`<article class="v60-subject-card v613-active-subject">
    <header><h3>📘 Língua Portuguesa</h3><b>${d.accuracy}%</b></header>
    <p>${d.completed} de 2 aulas concluídas • ${d.totalQuestions} questões contabilizadas</p>
    <div class="bar"><i style="width:${progress}%"></i></div>
    <div class="v613-subject-metrics">
      <span><strong>${d.correct}</strong><small>Acertos</small></span><span><strong>${d.wrong}</strong><small>Erros</small></span><span><strong>${d.best}%</strong><small>Melhor nota</small></span>
    </div>
  </article>
  <article class="v60-subject-card v613-coming"><header><h3>📚 Próximas matérias</h3><b>EM BREVE</b></header><p>Quando novas disciplinas forem adicionadas, o comparativo aparecerá aqui automaticamente.</p></article>`;
}
function renderQuestionStatsV60(){
  const d=getPerformanceDataV613(), savedErrors=Array.isArray(d.st.errors)?d.st.errors.length:0;
  setText("statTestsV60",d.lessonAttempts.length);setText("statSimsV60",d.sims.length);setText("statBestV60",d.best+"%");setText("statErrorsV60",savedErrors);
  setText("statAnsweredV613",d.totalQuestions);setText("statCorrectV613",d.correct);setText("statWrongV613",d.wrong);setText("statAccuracyV613",d.accuracy+"%");
  let text;
  if(!d.totalQuestions) text="Ainda não há questões suficientes registradas. Faça uma prova de aula ou um simulado para iniciar suas estatísticas.";
  else if(d.accuracy>=80) text=`Ótimo desempenho: ${d.accuracy}% de acerto em ${d.totalQuestions} questões contabilizadas. ${savedErrors?`Você ainda tem ${savedErrors} item(ns) no Caderno de Erros.`:"Seu Caderno de Erros está limpo."}`;
  else if(d.accuracy>=70) text=`Você está na faixa da meta: ${d.accuracy}% de acerto. Priorize os ${d.wrong} erros contabilizados e continue treinando para ganhar consistência.`;
  else text=`Sua taxa atual é ${d.accuracy}%. Revise os pontos fracos antes do próximo treino; ${d.wrong} das ${d.totalQuestions} questões contabilizadas foram erros.`;
  document.getElementById("questionDiagnosisV60").textContent=text;
}

// ---------- Study history ----------
function renderStudyHistoryV60(){
  const box=document.getElementById("studyHistoryListV60");if(!box)return;const list=v60Read("pmmg_history_v60",[]);
  box.innerHTML=list.length?list.map(e=>`<article class="v60-list-item"><span class="icon">${e.type==="review"?"🧠":e.type==="sim"?"📝":e.type==="lesson"?"📘":"•"}</span><div class="copy"><strong>${e.title}</strong><p>${e.detail||""}</p><em>${new Date(e.date).toLocaleString("pt-BR")}</em></div></article>`).join(""):'<div class="empty-state">O histórico começará a aparecer conforme você usar a plataforma.</div>';
}

// ---------- Preparation index ----------
function renderPreparationIndexV60(){
  const state=v60Read("missaoPMMGState",{}),scores=state.scores||{},vals=Object.values(scores).map(Number).filter(Number.isFinite),avg=vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:0,completed=Array.isArray(state.completedLessons)?state.completedLessons.length:0,progress=Math.min(100,(completed/2)*100),errors=Array.isArray(state.errors)?state.errors.length:0,sims=v60Read("pmmg_sim_history_v510",[]),simAvg=sims.length?sims.reduce((a,b)=>a+b.score,0)/sims.length:0,revisionBonus=Object.keys(localStorage).filter(k=>k.startsWith("pmmg_review_completed_")&&localStorage.getItem(k)==="1").length>0?100:0;
  const performance=vals.length?avg:0,training=sims.length?simAvg:0,review=errors===0&&completed>0?100:Math.max(0,100-errors*10),index=Math.round(progress*.35+performance*.30+training*.20+review*.10+revisionBonus*.05);
  document.getElementById("prepIndexValueV60").textContent=index;
  const label=index<30?"Início da preparação":index<50?"Base em construção":index<70?"Preparação intermediária":index<85?"Bom nível de preparo":"Preparação avançada";
  document.getElementById("prepIndexLabelV60").textContent=label;document.getElementById("prepIndexTextV60").textContent="Este índice não prevê aprovação. Ele resume conteúdo concluído, desempenho, treino e revisão.";
  const parts=[["Conteúdo concluído",progress],["Desempenho nas aulas",performance],["Simulados",training],["Controle de erros",review],["Revisão ativa",revisionBonus]];
  document.getElementById("prepBreakdownV60").innerHTML=parts.map(([n,v])=>`<article class="v60-progress-item"><header><strong>${n}</strong><span>${Math.round(v)}%</span></header><div class="bar"><i style="width:${Math.round(v)}%"></i></div></article>`).join("");
}

// ---------- Errors 2.0 ----------
function getErrorsV60(){
  const state=v60Read("missaoPMMGState",{});return Array.isArray(state.errors)?state.errors:[];
}
function filterErrorsProV60(filter,btn){
  document.querySelectorAll(".v60-filter-row button").forEach(b=>b.classList.remove("active"));if(btn)btn.classList.add("active");renderErrorsProV60(filter);
}
function renderErrorsProV60(filter="todos"){
  const all=getErrorsV60(),reviewed=v60Read("pmmg_reviewed_errors_v60",[]),box=document.getElementById("errorsProListV60"),stats=document.getElementById("errorsProStatsV60");if(!box||!stats)return;
  let list=all;if(filter==="1"||filter==="2")list=all.filter(e=>String(e.lessonNumber)===filter);if(filter==="revisados")list=all.filter(e=>reviewed.includes(e.id));
  stats.innerHTML=`<article><strong>${all.length}</strong><small>Total</small></article><article><strong>${reviewed.length}</strong><small>Revisados</small></article><article><strong>${Math.max(0,all.length-reviewed.length)}</strong><small>Pendentes</small></article>`;
  box.innerHTML=list.length?list.map(e=>`<article class="v60-list-item"><span class="icon">${reviewed.includes(e.id)?"✅":"❌"}</span><div class="copy"><strong>${e.question||"Questão"}</strong><p><b>Sua resposta:</b> ${e.selectedText||""}</p><p><b>Correta:</b> ${e.correctText||""}</p><em>Aula ${String(e.lessonNumber||"").padStart(2,"0")}</em></div><button onclick="toggleReviewedErrorV60('${e.id}')">${reviewed.includes(e.id)?"Pendente":"Revisado"}</button></article>`).join(""):'<div class="empty-state">Nenhuma questão neste filtro.</div>';
}
function toggleReviewedErrorV60(id){let list=v60Read("pmmg_reviewed_errors_v60",[]);list=list.includes(id)?list.filter(x=>x!==id):[...list,id];v60Write("pmmg_reviewed_errors_v60",list);renderErrorsProV60("todos")}

// ---------- Automatic history hooks ----------
const openLessonBeforeV60=typeof openLesson==="function"?openLesson:null;
if(openLessonBeforeV60){openLesson=function(n){logStudyEventV60("lesson","Aula aberta",`Aula ${String(n).padStart(2,"0")}`);return openLessonBeforeV60(n)}}
const finishSimulationBeforeV60=typeof finishSimulationV510==="function"?finishSimulationV510:null;
if(finishSimulationBeforeV60){finishSimulationV510=function(force=false){const result=finishSimulationBeforeV60(force);setTimeout(()=>{if(typeof simLastResultV510!=="undefined"&&simLastResultV510)logStudyEventV60("sim","Simulado concluído",`${simLastResultV510.score}% • ${simLastResultV510.correct}/${simLastResultV510.total}`)},100);return result}}


/* V6.1 — integração e acabamento */

/* ==========================================================
   V6.1.1 — CORREÇÃO: ABERTURA DAS AULAS
   ========================================================== */

window.renderLessonList = function(){
  const el = document.getElementById("lessonList");
  if(!el) return;

  const nums = getLessonNumbers();
  if(!nums.length){
    el.innerHTML = '<div class="empty-state"><b>Conteúdo não carregado</b><br>Atualize a página e tente novamente.</div>';
    return;
  }

  el.innerHTML = nums.map(n=>{
    const l = getLessonData(n);
    const unlocked = isLessonUnlocked(n);
    const completed = isLessonCompleted(n);
    const score = state.scores[n];

    return `
      <article class="lesson-card lesson-card-v611 ${!unlocked?"locked":""} ${completed?"completed":""}" data-lesson="${n}">
        <div class="lesson-number">${String(n).padStart(2,"0")}</div>
        <div class="lesson-card-content">
          <h3>${l ? l.title : "Aula "+n}</h3>
          <p>${l ? (l.subtitle || "") : ""}</p>
          ${typeof score==="number" ? `<span class="score-badge">Melhor nota: ${score}%</span>` : ""}
          ${!unlocked ? `<div class="lock-message">Atinga 70% na aula anterior.</div>` : ""}
        </div>
        <div class="lesson-card-status">${completed?"✓":unlocked?"›":"🔒"}</div>
        ${unlocked ? `<button class="lesson-open-v611" type="button" data-open-lesson="${n}">Abrir aula</button>` : ""}
      </article>`;
  }).join("");

  el.querySelectorAll("[data-open-lesson]").forEach(btn=>{
    btn.addEventListener("click", (ev)=>{
      ev.preventDefault();
      ev.stopPropagation();
      const n = Number(btn.dataset.openLesson);
      window.openLessonV611(n);
    });
  });

  el.querySelectorAll(".lesson-card-v611").forEach(card=>{
    if(card.classList.contains("locked")) return;
    card.addEventListener("click", ()=>{
      const n = Number(card.dataset.lesson);
      window.openLessonV611(n);
    });
  });
};

window.openLessonV611 = function(n){
  n = Number(n);
  if(!Number.isFinite(n)) return;

  if(!isLessonUnlocked(n)){
    alert("🔒 Esta aula ainda está bloqueada. Atinja pelo menos 70% na aula anterior.");
    return;
  }

  const lesson = getLessonData(n);
  if(!lesson){
    alert("Não foi possível carregar o conteúdo desta aula. Atualize a página e tente novamente.");
    return;
  }

  currentLessonNumber = n;
  currentQuiz = null;

  const subtitle = document.getElementById("lessonSubtitle");
  const title = document.getElementById("lessonTitle");
  const time = document.getElementById("lessonTime");
  const content = document.getElementById("lessonContent");

  if(subtitle) subtitle.textContent = lesson.subtitle || `AULA ${String(n).padStart(2,"0")}`;
  if(title) title.textContent = lesson.title || `Aula ${n}`;
  if(time) time.textContent = lesson.time || "—";
  if(content) content.innerHTML = lesson.content || "<p>Conteúdo em preparação.</p>";

  try{
    if(typeof updateStudyStreak === "function") updateStudyStreak();
    if(typeof saveState === "function") saveState();
    if(typeof updateDashboard === "function") updateDashboard();
    if(typeof logStudyEventV60 === "function") logStudyEventV60("lesson","Aula aberta",`Aula ${String(n).padStart(2,"0")}`);
  }catch(e){
    console.warn("Registro da aula:", e);
  }

  showScreen("lessonScreen","navStudy");
  window.scrollTo(0,0);
};

// O onclick antigo e os módulos futuros também passam por esta função segura.
window.openLesson = function(n){
  return window.openLessonV611(n);
};

window.openPortuguese = function(){
  renderLessonList();
  if(typeof updateDashboard === "function") updateDashboard();
  showScreen("lessonsScreen","navStudy");
  window.scrollTo(0,0);
};

window.openSubjects = function(){
  if(typeof updateDashboard === "function") updateDashboard();
  showScreen("subjectsScreen","navStudy");
  window.scrollTo(0,0);
};

/* ==========================================================
   V6.1.3 — EVOLUÇÃO SINCRONIZADA
   ========================================================== */

function renderEvolutionHubV612(){
  // V7.4: atualiza somente os dados da tela Evolução.
  // Nenhuma rota, tela ou botão de navegação é criado/modificado aqui.
  if(typeof updateDashboard === "function"){
    try{ updateDashboard(); }catch(e){}
  }

  const defs = (typeof V7_SUBJECTS!=="undefined" && Array.isArray(V7_SUBJECTS)) ? V7_SUBJECTS : [];
  const subjectRows = defs.map(def=>{
    const src = def.source ? def.source() : {};
    const nums = Object.keys(src||{}).map(Number).filter(Number.isFinite);
    const doneArr = Array.isArray(state?.[def.completed]) ? state[def.completed] : [];
    const done = doneArr.filter(n=>nums.includes(Number(n))).length;
    const scoreVals = Object.values(state?.[def.scores]||{}).map(Number).filter(Number.isFinite);
    const avg = scoreVals.length ? Math.round(scoreVals.reduce((a,b)=>a+b,0)/scoreVals.length) : 0;
    const best = scoreVals.length ? Math.max(...scoreVals) : 0;
    const pct = nums.length ? Math.round(done/nums.length*100) : 0;
    return {name:def.name,icon:def.icon||"📘",total:nums.length,done,pct,avg,best,tests:scoreVals.length};
  });

  const total = subjectRows.reduce((a,x)=>a+x.total,0);
  const completed = subjectRows.reduce((a,x)=>a+x.done,0);
  const progress = total ? Math.round(completed/total*100) : 0;
  const allScores = subjectRows.flatMap(x=>{
    const def=defs.find(d=>d.name===x.name);
    return Object.values(state?.[def?.scores]||{}).map(Number).filter(Number.isFinite);
  });
  const bestScore = allScores.length ? Math.max(...allScores) : 0;
  const xp = Number(state?.xp||0);
  const streak = Math.max(0,Number(state?.streak||localStorage.getItem("pmmg_streak")||0));

  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};
  set("evoProgressV612",`${progress}%`);
  set("evoProgressSubV612",`${completed} de ${total} etapas`);
  set("evoBestScoreV612",`${bestScore}%`);
  set("evoXpV612",String(xp));
  set("evoStreakV612",`${streak}🔥`);
  set("evoStreakSubV612",streak===1?"dia ativo":"dias ativos");

  // Estatísticas de provas de aula.
  set("v740LessonTests",subjectRows.reduce((a,x)=>a+x.tests,0));

  // Histórico dos simulados da V7.2.
  let simHist=[];
  try{
    simHist=JSON.parse(localStorage.getItem("pmmg_sim_history_v72")||"[]");
    if(!Array.isArray(simHist))simHist=[];
  }catch(e){simHist=[]}
  const simQuestions=simHist.reduce((a,x)=>a+(Number(x.total)||0),0);
  const simScores=simHist.map(x=>Number(x.pct)).filter(Number.isFinite);
  const simAvg=simScores.length?Math.round(simScores.reduce((a,b)=>a+b,0)/simScores.length):0;
  const simBest=simScores.length?Math.max(...simScores):0;
  set("v740SimQuestions",simQuestions);
  set("v740SimAverage",`${simAvg}%`);
  set("v740SimBest",`${simBest}%`);

  // Atividades reais registradas no histórico.
  let hist=[];
  try{
    hist=JSON.parse(localStorage.getItem("pmmg_history_v60")||"[]");
    if(!Array.isArray(hist))hist=[];
  }catch(e){hist=[]}
  const now=Date.now(),day=86400000;
  const week=hist.filter(x=>{const t=new Date(x.date).getTime();return Number.isFinite(t)&&(now-t)<=7*day}).length;
  const month=hist.filter(x=>{const t=new Date(x.date).getTime();return Number.isFinite(t)&&(now-t)<=30*day}).length;
  set("v740WeekActivity",week);
  set("v740MonthActivity",month);

  const subjectBox=document.getElementById("v740SubjectStats");
  if(subjectBox){
    subjectBox.innerHTML=subjectRows.map(x=>`
      <article>
        <div class="v740-subject-top"><span>${x.icon}</span><div><b>${x.name}</b><small>${x.done}/${x.total} etapas • média ${x.avg}%</small></div><strong>${x.pct}%</strong></div>
        <div class="v740-line"><i style="width:${x.pct}%"></i></div>
      </article>`).join("");
  }

  const bars=document.getElementById("v740TrendBars");
  const trendText=document.getElementById("v740TrendText");
  if(bars){
    const recent=[...simHist].slice(0,6).reverse();
    bars.innerHTML=recent.length?recent.map((x,i)=>{
      const score=Math.max(0,Math.min(100,Number(x.pct)||0));
      return `<div><i style="height:${Math.max(6,score)}%"></i><small>${score}%</small></div>`;
    }).join(""):'<div class="v740-empty-trend">Sem simulados ainda</div>';
    if(trendText){
      if(recent.length<2){
        trendText.textContent=recent.length?"Faça mais um simulado para calcular a tendência.":"Faça simulados para acompanhar sua tendência.";
      }else{
        const first=Number(recent[0].pct)||0,last=Number(recent[recent.length-1].pct)||0,diff=last-first;
        trendText.textContent=diff>0?`📈 Evolução de ${diff} ponto(s) entre o primeiro e o último simulado exibido.`:diff<0?`📉 Queda de ${Math.abs(diff)} ponto(s). Priorize revisão antes do próximo simulado.`:"➡️ Desempenho estável nos simulados recentes.";
      }
    }
  }
}

// Substitui a rota antiga para sempre atualizar antes de mostrar.
window.openEvolutionArea = function(){
  renderEvolutionHubV612();
  v53Show("evolutionHubV53","navEvolution");
  window.scrollTo(0,0);
};

// Também sincroniza ao tocar diretamente na aba Evolução.
document.addEventListener("DOMContentLoaded", ()=>{
  try{ renderEvolutionHubV612(); }catch(e){ console.warn("Evolução V6.1.3:", e); }
});


/* ==========================================================
   V6.1.4 — HISTÓRICO INTELIGENTE
   ========================================================== */

// Mantém apenas eventos importantes no histórico.
// "Aula aberta" deixa de ser registrado para evitar poluição.
const logStudyEventV614Base = logStudyEventV60;
window.logStudyEventV60 = function(type,title,detail=""){
  if(title === "Aula aberta") return;
  const list = v60Read("pmmg_history_v60",[]);
  const now = new Date();
  const last = list[0];

  // Evita duplicar o mesmo evento em poucos segundos.
  if(last && last.title===title && last.detail===detail){
    const lastDate = new Date(last.date);
    if(now - lastDate < 5000) return;
  }

  return logStudyEventV614Base(type,title,detail);
};

// Histórico antigo continua salvo, mas não aparece mais se for apenas abertura.
window.renderStudyHistoryV60 = function(){
  const box=document.getElementById("studyHistoryListV60");
  if(!box) return;

  const all=v60Read("pmmg_history_v60",[]);
  const list=all.filter(e=>e.title!=="Aula aberta");

  const iconByType={
    lesson:"🏆",
    exam:"📝",
    sim:"🎯",
    review:"🧠",
    error:"📘",
    achievement:"🥇"
  };

  box.innerHTML=list.length
    ? list.map(e=>`<article class="v60-list-item">
        <span class="icon">${iconByType[e.type]||"•"}</span>
        <div class="copy">
          <strong>${e.title}</strong>
          <p>${e.detail||""}</p>
          <em>${new Date(e.date).toLocaleString("pt-BR")}</em>
        </div>
      </article>`).join("")
    : '<div class="empty-state"><strong>Seu histórico inteligente começará aqui.</strong><br>Conclua aulas, faça provas, simulados e revisões para registrar sua evolução.</div>';
};

// Registra prova e conclusão de aula com prioridade.
const registerResultV614Base = registerResult;
registerResult = function(lessonNumber,score,approved){
  const beforeCompleted = Array.isArray(state.completedLessons) && state.completedLessons.includes(lessonNumber);
  const result = registerResultV614Base(lessonNumber,score,approved);

  const total = currentQuiz ? currentQuiz.length : 0;
  const correct = total ? Math.round((score/100)*total) : null;
  const detail = correct!==null
    ? `Aula ${String(lessonNumber).padStart(2,"0")} • ${score}% • ${correct}/${total}`
    : `Aula ${String(lessonNumber).padStart(2,"0")} • ${score}%`;

  if(approved && !beforeCompleted){
    logStudyEventV60("lesson","Aula concluída",detail);
  }else{
    logStudyEventV60("exam","Prova da aula realizada",detail);
  }

  return result;
};

// Revisões concluídas ganham registro consistente.
const toggleReviewedErrorV614Base = toggleReviewedErrorV60;
window.toggleReviewedErrorV60 = function(id){
  const reviewedBefore = v60Read("pmmg_reviewed_errors_v60",[]).includes(id);
  const result = toggleReviewedErrorV614Base(id);
  if(!reviewedBefore){
    logStudyEventV60("error","Erro revisado","Item marcado como revisado no Caderno de Erros");
  }
  return result;
};

// Revisões agendadas também entram na linha do tempo.
const scheduleRevisionV614Base = scheduleRevisionV60;
window.scheduleRevisionV60 = function(){
  const before = v60Read("pmmg_revisions_v60",[]).length;
  const result = scheduleRevisionV614Base();
  const afterList = v60Read("pmmg_revisions_v60",[]);
  if(afterList.length > before){
    const r = afterList[0];
    if(r){
      logStudyEventV60(
        "review",
        "Revisão agendada",
        `Aula ${String(r.lesson).padStart(2,"0")} • ${new Date(r.date+"T12:00:00").toLocaleDateString("pt-BR")}`
      );
    }
  }
  return result;
};

// Migração visual: remove apenas os registros de abertura da tela exibida.
(function(){
  const list = v60Read("pmmg_history_v60",[]);
  const cleaned = list.filter(e=>e.title!=="Aula aberta");
  if(cleaned.length !== list.length) v60Write("pmmg_history_v60",cleaned);
})();


/* ==========================================================
   V6.1.5 — ÍNDICE DE PREPARO INTELIGENTE
   Recalcula o preparo usando progresso, desempenho REAL,
   simulados, controle de erros e revisão ativa.
   ========================================================== */

function getPreparationMetricsV615(){
  const completed = Array.isArray(state.completedLessons) ? state.completedLessons.length : 0;
  const totalLessons = 2;
  const content = Math.min(100, Math.round((completed / totalLessons) * 100));

  // Usa estatísticas reais registradas nas provas; se ainda não houver,
  // usa a melhor nota existente apenas como fallback.
  const stats = v613GetStats ? v613GetStats() : null;
  let performance = 0;
  if(stats && Number(stats.questions) > 0){
    performance = Math.round((Number(stats.correct)||0) / Number(stats.questions) * 100);
  } else {
    const scores = Object.values(state.bestScores || {}).map(Number).filter(Number.isFinite);
    performance = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
  }

  const simHistory = v60Read("pmmg_sim_history_v60",[]);
  let simulations = 0;
  if(simHistory.length){
    const rates = simHistory.map(s=>{
      if(Number.isFinite(Number(s.score))) return Number(s.score);
      if(Number(s.total)>0) return (Number(s.correct)||0)/Number(s.total)*100;
      return 0;
    });
    simulations = Math.round(rates.reduce((a,b)=>a+b,0)/rates.length);
  }

  const errors = v60GetErrors ? v60GetErrors() : [];
  const reviewed = v60Read("pmmg_reviewed_errors_v60",[]);
  let errorControl = 100;
  if(errors.length){
    const reviewedCount = errors.filter(e=>reviewed.includes(e.id)).length;
    errorControl = Math.round(reviewedCount/errors.length*100);
  }

  const revisions = v60Read("pmmg_revisions_v60",[]);
  const today = new Date();
  today.setHours(0,0,0,0);
  let activeReview = 0;
  if(revisions.length){
    const valid = revisions.filter(r=>{
      const d = new Date(r.date+"T12:00:00");
      return !Number.isNaN(d.getTime()) && d >= today;
    });
    activeReview = Math.min(100, Math.round(valid.length / Math.max(1, completed) * 100));
  }

  // Pesos: conteúdo 30%, desempenho 35%, simulados 15%,
  // controle de erros 10%, revisão ativa 10%.
  const index = Math.round(
    content*0.30 +
    performance*0.35 +
    simulations*0.15 +
    errorControl*0.10 +
    activeReview*0.10
  );

  return {content, performance, simulations, errorControl, activeReview, index};
}

function preparationLabelV615(n){
  if(n >= 85) return "Preparação avançada";
  if(n >= 65) return "Boa preparação";
  if(n >= 45) return "Preparação intermediária";
  if(n >= 25) return "Preparação em desenvolvimento";
  return "Preparação inicial";
}

const renderPreparationIndexV615Base =
  typeof renderPreparationIndexV60 === "function" ? renderPreparationIndexV60 : null;

window.renderPreparationIndexV60 = function(){
  if(renderPreparationIndexV615Base) renderPreparationIndexV615Base();

  const m = getPreparationMetricsV615();

  const indexEl = document.getElementById("preparationIndexValue");
  const labelEl = document.getElementById("preparationIndexLabel");
  if(indexEl) indexEl.textContent = m.index;
  if(labelEl) labelEl.textContent = preparationLabelV615(m.index);

  const map = [
    ["preparationContentValue","preparationContentBar",m.content],
    ["preparationPerformanceValue","preparationPerformanceBar",m.performance],
    ["preparationSimValue","preparationSimBar",m.simulations],
    ["preparationErrorsValue","preparationErrorsBar",m.errorControl],
    ["preparationReviewValue","preparationReviewBar",m.activeReview]
  ];

  map.forEach(([valueId,barId,val])=>{
    const value=document.getElementById(valueId);
    const bar=document.getElementById(barId);
    if(value) value.textContent=val+"%";
    if(bar) bar.style.width=val+"%";
  });
};

// Compatibilidade com IDs existentes da tela de Índice.
const openPreparationIndexV615Base =
  typeof openPreparationIndexV60 === "function" ? openPreparationIndexV60 : null;

window.openPreparationIndexV60 = function(){
  if(openPreparationIndexV615Base) openPreparationIndexV615Base();
  setTimeout(()=>{
    const m=getPreparationMetricsV615();
    const screen=document.getElementById("preparationIndexScreen");
    if(!screen) return;

    const texts=[...screen.querySelectorAll("strong")];
    texts.forEach(el=>{
      const parent=(el.parentElement?.innerText||"").toLowerCase();
      if(parent.includes("conteúdo concluído")) el.textContent=m.content+"%";
      else if(parent.includes("desempenho nas aulas")) el.textContent=m.performance+"%";
      else if(parent.includes("simulados")) el.textContent=m.simulations+"%";
      else if(parent.includes("controle de erros")) el.textContent=m.errorControl+"%";
      else if(parent.includes("revisão ativa")) el.textContent=m.activeReview+"%";
    });

    const circle=[...screen.querySelectorAll("strong")].find(e=>/^\d+$/.test(e.textContent.trim()) && Number(e.textContent)<=100);
    if(circle) circle.textContent=m.index;

    const headings=[...screen.querySelectorAll("h2,h3,strong")];
    const label=headings.find(e=>/preparação (inicial|intermediária|avançada|em desenvolvimento|boa preparação)/i.test(e.textContent));
    if(label) label.textContent=preparationLabelV615(m.index);

    const rows=[...screen.querySelectorAll(".bar")];
    const vals=[m.content,m.performance,m.simulations,m.errorControl,m.activeReview];
    rows.forEach((row,i)=>{
      const fill=row.querySelector("i");
      if(fill && vals[i]!==undefined) fill.style.width=vals[i]+"%";
    });
  },0);
};

/* V6.1.6 — REVISÃO INTELIGENTE */
let smartReviewErrorV616=null;
function getReviewedErrorsV616(){return v60Read("pmmg_reviewed_errors_v60",[])}
function setReviewedErrorsV616(x){v60Write("pmmg_reviewed_errors_v60",[...new Set(x)])}

window.startSmartErrorReviewV616=function(id){
 const err=getErrorsV60().find(e=>e.id===id); if(!err)return;
 let q=null; try{q=getLessonData(Number(err.lessonNumber))?.quiz?.[Number(err.questionIndex)]}catch(e){}
 if(!q){alert("Não foi possível carregar esta questão.");return}
 smartReviewErrorV616={err,q};
 document.getElementById("smartErrorReviewBodyV616").innerHTML=`<article class="question-card v616-question">
 <div class="question-number">AULA ${String(err.lessonNumber).padStart(2,"0")} • REVISÃO</div><h3>${q.question}</h3>
 <div class="answers">${q.options.map((o,i)=>`<label class="answer-option"><input type="radio" name="smart-review-v616" value="${i}"><span>${o}</span></label>`).join("")}</div>
 <button class="primary full" onclick="submitSmartErrorReviewV616()">Conferir resposta</button><div id="smartReviewFeedbackV616"></div></article>`;
 showScreen("smartErrorReviewScreenV616","navReview");window.scrollTo(0,0)
};

window.submitSmartErrorReviewV616=function(){
 if(!smartReviewErrorV616)return;
 const s=document.querySelector('input[name="smart-review-v616"]:checked');
 if(!s){alert("Marque uma alternativa.");return}
 const {err,q}=smartReviewErrorV616,ok=Number(s.value)===q.answer,f=document.getElementById("smartReviewFeedbackV616");
 if(ok){
   removeError(Number(err.lessonNumber),Number(err.questionIndex));
   setReviewedErrorsV616([...getReviewedErrorsV616(),err.id]);
   if(typeof logStudyEventV60==="function")logStudyEventV60("review","Erro revisado",`Aula ${String(err.lessonNumber).padStart(2,"0")} • questão corrigida`);
   f.innerHTML='<div class="v616-feedback ok"><b>✅ Resposta correta!</b><p>Questão resolvida e removida das pendências.</p><button class="primary full" onclick="openErrorsProV60()">Continuar revisão</button></div>';
 }else{
   f.innerHTML=`<div class="v616-feedback no"><b>❌ Ainda não.</b><p><strong>Explicação:</strong> ${q.explanation||err.explanation||"Revise a aula e tente novamente."}</p><p><strong>💡 Dica:</strong> ${q.tip||err.tip||"Compare as alternativas com a regra estudada."}</p></div>`;
 }
 updateDashboard()
};

window.renderErrorsProV60=function(filter="todos"){
 const all=getErrorsV60(),rev=getReviewedErrorsV616(),box=document.getElementById("errorsProListV60"),stats=document.getElementById("errorsProStatsV60");if(!box||!stats)return;
 const smartLabel=document.getElementById("smartReviewPendingV619"),smartBtn=document.getElementById("startSmartReviewBtnV619");
 if(smartLabel)smartLabel.textContent=all.length?`${all.length} erro${all.length===1?"":"s"} pendente${all.length===1?"":"s"} • toque para começar`:"Nenhum erro pendente • revisão em dia";
 if(smartBtn){smartBtn.disabled=!all.length;smartBtn.classList.toggle("is-empty",!all.length);}
 stats.innerHTML=`<article><strong>${all.length}</strong><small>Pendentes</small></article><article><strong>${rev.length}</strong><small>Resolvidos</small></article><article><strong>${all.length+rev.length}</strong><small>Trabalhados</small></article>`;
 if(filter==="revisados"){box.innerHTML=rev.length?`<div class="empty-state"><strong>✅ ${rev.length} questão(ões) resolvida(s)</strong><br>As corrigidas saem das pendências.</div>`:'<div class="empty-state">Nenhuma revisão concluída ainda.</div>';return}
 let list=all;if(filter==="1"||filter==="2")list=all.filter(e=>String(e.lessonNumber)===filter);
 box.innerHTML=list.length?list.map(e=>`<article class="v60-list-item"><span class="icon">❌</span><div class="copy"><strong>${e.question||"Questão"}</strong><p><b>Sua resposta:</b> ${e.selectedText||""}</p><p><b>Correta:</b> ${e.correctText||""}</p><em>Aula ${String(e.lessonNumber||"").padStart(2,"0")}</em></div><button onclick="startSmartErrorReviewV616('${e.id}')">Revisar</button></article>`).join(""):'<div class="empty-state"><strong>Caderno em dia 🎯</strong><br>Nenhuma pendência neste filtro.</div>'
};

function getPreparationMetricsV616(){
 const d=getPerformanceDataV613(),st=d.st||{},completed=Array.isArray(st.completedLessons)?st.completedLessons.length:0;
 const lessonCount=Math.max(1,typeof getLessonNumbers==="function"?getLessonNumbers().length:2),content=Math.min(100,Math.round(completed/lessonCount*100));
 const a=v60Read("pmmg_question_history_v613",[]),ac=a.reduce((s,x)=>s+(+x.correct||0),0),at=a.reduce((s,x)=>s+(+x.total||0),0),performance=at?Math.round(ac/at*100):0;
 const sims=v60Read("pmmg_sim_history_v510",[]),sc=sims.reduce((s,x)=>s+(+x.correct||0),0),stot=sims.reduce((s,x)=>s+(+x.total||0),0),simulations=stot?Math.round(sc/stot*100):0;
 const pending=getErrorsV60().length,resolved=getReviewedErrorsV616().length,worked=pending+resolved,errorControl=worked?Math.round(resolved/worked*100):(completed?100:0);
 const revisions=v60Read("pmmg_revisions_v60",[]),today=new Date();today.setHours(0,0,0,0);
 const active=revisions.filter(r=>{const x=new Date((r.date||"")+"T12:00:00");return !isNaN(x)&&x>=today}).length,activeReview=Math.min(100,Math.round(active/Math.max(1,completed)*100));
 return {content,performance,simulations,errorControl,activeReview,index:Math.round(content*.30+performance*.35+simulations*.15+errorControl*.10+activeReview*.10)}
}
window.renderPreparationIndexV60=function(){
 const m=getPreparationMetricsV616(),v=document.getElementById("prepIndexValueV60"),l=document.getElementById("prepIndexLabelV60"),t=document.getElementById("prepIndexTextV60");
 if(v)v.textContent=m.index;if(l)l.textContent=preparationLabelV615(m.index);if(t)t.textContent="Índice baseado em conteúdo, desempenho, simulados, erros realmente resolvidos e revisão ativa.";
 const p=[["Conteúdo concluído",m.content],["Desempenho nas aulas",m.performance],["Simulados",m.simulations],["Controle de erros",m.errorControl],["Revisão ativa",m.activeReview]];
 const b=document.getElementById("prepBreakdownV60");if(b)b.innerHTML=p.map(([n,x])=>`<article class="v60-progress-item"><header><strong>${n}</strong><span>${x}%</span></header><div class="bar"><i style="width:${x}%"></i></div></article>`).join("")
};

/* ==========================================================
   V6.1.7 — SESSÃO DE REVISÃO INTELIGENTE AUTOMÁTICA
   ========================================================== */
let smartSessionV617 = {
  queue: [],
  current: 0,
  correct: 0,
  attempts: 0,
  initial: 0,
  currentError: null
};

function getPendingErrorsV617(){
  return (typeof getErrorsV60 === "function" ? getErrorsV60() : []).slice();
}

window.startSmartReviewSessionV617 = function(){
  const pending = getPendingErrorsV617();

  if(!pending.length){
    alert("🎯 Seu Caderno de Erros está em dia. Não há pendências para revisar.");
    return;
  }

  smartSessionV617 = {
    queue: pending,
    current: 0,
    correct: 0,
    attempts: 0,
    initial: pending.length,
    currentError: null,
    answeredCurrent: false,
    resolvedIds: new Set()
  };

  if(typeof logStudyEventV60 === "function"){
    logStudyEventV60("review","Revisão inteligente iniciada",`${pending.length} questão(ões) pendentes`);
  }

  showScreen("smartReviewSessionV617","navReview");
  renderSmartSessionQuestionV617();
  window.scrollTo(0,0);
};

function getQuestionForErrorV617(err){
  try{
    const lesson = getLessonData(Number(err.lessonNumber));
    return lesson?.quiz?.[Number(err.questionIndex)] || null;
  }catch(e){
    return null;
  }
}

function renderSmartSessionQuestionV617(){
  const pendingNow = getPendingErrorsV617();

  if(!pendingNow.length || smartSessionV617.current >= smartSessionV617.queue.length){
    finishSmartReviewSessionV617();
    return;
  }

  // Pula erros já resolvidos durante a própria sessão.
  let err = smartSessionV617.queue[smartSessionV617.current];
  while(err && !pendingNow.some(x=>x.id===err.id)){
    smartSessionV617.current++;
    err = smartSessionV617.queue[smartSessionV617.current];
  }

  if(!err){
    finishSmartReviewSessionV617();
    return;
  }

  const q = getQuestionForErrorV617(err);
  if(!q){
    smartSessionV617.current++;
    renderSmartSessionQuestionV617();
    return;
  }

  smartSessionV617.currentError = {err,q};
  smartSessionV617.answeredCurrent = false;

  const position = smartSessionV617.current + 1;
  const total = smartSessionV617.initial;
  const progress = total ? Math.round((smartSessionV617.correct / total) * 100) : 0;

  document.getElementById("v617SessionPosition").textContent = `${Math.min(position,total)}/${total}`;
  document.getElementById("v617SessionBar").style.width = `${progress}%`;
  document.getElementById("v617CorrectCount").textContent = `${smartSessionV617.correct} corrigido(s)`;
  document.getElementById("v617PendingCount").textContent = `${pendingNow.length} pendente(s)`;

  document.getElementById("v617SessionBody").innerHTML = `
    <article class="v617-session-question">
      <div class="question-number">AULA ${String(err.lessonNumber).padStart(2,"0")} • QUESTÃO ${Number(err.questionIndex)+1}</div>
      <h3>${q.question}</h3>
      <div class="answers">
        ${q.options.map((o,i)=>`
          <label class="answer-option">
            <input type="radio" name="v617-answer" value="${i}">
            <span>${o}</span>
          </label>`).join("")}
      </div>
      <button class="primary full" onclick="submitSmartSessionAnswerV617()">Conferir resposta</button>
      <div id="v617Feedback"></div>
    </article>`;
};

window.submitSmartSessionAnswerV617 = function(){
  const selected = document.querySelector('input[name="v617-answer"]:checked');
  if(!selected){
    alert("Marque uma alternativa antes de conferir.");
    return;
  }

  const item = smartSessionV617.currentError;
  if(!item) return;

  const {err,q} = item;

  // V6.2.0: impede contabilização duplicada por toque duplo/reenvio
  // depois que a questão já foi acertada.
  if(smartSessionV617.answeredCurrent) return;

  const answer = Number(selected.value);
  const ok = answer === q.answer;
  smartSessionV617.attempts++;

  const feedback = document.getElementById("v617Feedback");

  if(ok){
    smartSessionV617.answeredCurrent = true;

    // Usa a mesma lógica já aprovada na V6.1.6.
    removeError(Number(err.lessonNumber),Number(err.questionIndex));
    const reviewed = typeof getReviewedErrorsV616 === "function" ? getReviewedErrorsV616() : [];
    if(typeof setReviewedErrorsV616 === "function"){
      setReviewedErrorsV616([...reviewed,err.id]);
    }

    if(!smartSessionV617.resolvedIds.has(err.id)){
      smartSessionV617.resolvedIds.add(err.id);
      smartSessionV617.correct = smartSessionV617.resolvedIds.size;
    }

    if(typeof logStudyEventV60 === "function"){
      logStudyEventV60("review","Erro revisado",`Aula ${String(err.lessonNumber).padStart(2,"0")} • questão corrigida`);
    }

    feedback.innerHTML = `
      <div class="v617-session-feedback ok">
        <b>✅ Correto!</b>
        <p>Esta pendência foi resolvida.</p>
        <button class="primary full" onclick="nextSmartSessionQuestionV617()">Próxima questão</button>
      </div>`;

    if(typeof updateDashboard === "function") updateDashboard();
  }else{
    feedback.innerHTML = `
      <div class="v617-session-feedback no">
        <b>❌ Ainda não.</b>
        <p><strong>Explicação:</strong> ${q.explanation || err.explanation || "Revise o conteúdo e tente novamente."}</p>
        <p><strong>💡 Dica:</strong> ${q.tip || err.tip || "Compare cada alternativa com o conteúdo estudado."}</p>
        <p>Tente novamente antes de avançar.</p>
      </div>`;
  }
};

window.nextSmartSessionQuestionV617 = function(){
  smartSessionV617.current++;
  renderSmartSessionQuestionV617();
  window.scrollTo(0,0);
};

function finishSmartReviewSessionV617(){
  const total = smartSessionV617.initial;
  const attempts = smartSessionV617.attempts;
  const correct = Math.min(smartSessionV617.correct, total);
  const rate = attempts ? Math.round(correct/attempts*100) : 100;

  document.getElementById("v617DoneCorrect").textContent = correct;
  document.getElementById("v617DoneAttempts").textContent = attempts;
  document.getElementById("v617DoneRate").textContent = `${rate}%`;
  document.getElementById("v617DoneText").textContent =
    `Você corrigiu ${correct} de ${total} pendência(s) desta sessão.`;

  localStorage.setItem("pmmg_review_completed_v617", new Date().toISOString());

  if(typeof logStudyEventV60 === "function"){
    logStudyEventV60("review","Revisão inteligente concluída",`${correct}/${total} erros corrigidos • ${rate}% de precisão`);
  }

  showScreen("smartReviewDoneV617","navReview");
  if(typeof renderPreparationIndexV60 === "function") renderPreparationIndexV60();
  window.scrollTo(0,0);
}

window.exitSmartReviewSessionV617 = function(){
  if(smartSessionV617.correct > 0 || smartSessionV617.attempts > 0){
    if(!confirm("Sair da sessão? As questões já corrigidas continuarão salvas como resolvidas.")) return;
  }
  openErrorsProV60();
};

/* ==========================================================
   V6.1.8 — Integração visual da Revisão Automática
   ========================================================== */
function updateSmartReviewEntryV618(){
  const label = document.getElementById("smartReviewPendingV618");
  const btn = document.getElementById("startSmartReviewBtnV618");
  if(!label || !btn) return;

  const pending = typeof getErrorsV60 === "function" ? getErrorsV60().length : 0;

  if(pending > 0){
    label.textContent = `${pending} erro${pending===1?"":"s"} pendente${pending===1?"":"s"} • toque para começar`;
    btn.disabled = false;
    btn.classList.remove("is-empty");
  }else{
    label.textContent = "Nenhum erro pendente • revisão em dia";
    btn.disabled = true;
    btn.classList.add("is-empty");
  }
}

// Atualiza ao entrar/tocar na área Revisar e após mudanças no caderno.
document.addEventListener("click", function(e){
  const el = e.target.closest?.("#navReview, .v618-smart-review-btn, [onclick*='openErrorNotebook'], [onclick*='openErrorsProV60']");
  if(el) setTimeout(updateSmartReviewEntryV618, 80);
});

const _removeErrorV618 = typeof removeError === "function" ? removeError : null;
if(_removeErrorV618){
  removeError = function(...args){
    const result = _removeErrorV618.apply(this,args);
    setTimeout(updateSmartReviewEntryV618,0);
    return result;
  };
}

window.addEventListener("load", ()=>setTimeout(updateSmartReviewEntryV618,150));

/* ==========================================================
   V6.2.1 — SIMULADOS 2.0 / FASE 1
   Configuração + integração com Caderno de Erros
   ========================================================== */
let simConfigV621 = { count:10, minutes:15, type:"portugues" };

function getSimulationPoolV621(){
  const pool=[];
  if(typeof window.lessons!=="undefined"){
    Object.keys(window.lessons).forEach(k=>{
      const lesson=window.lessons[k];
      if(Array.isArray(lesson.quiz)){
        lesson.quiz.forEach((q,qi)=>{
          pool.push({
            lessonNumber:Number(k),
            lessonTitle:lesson.title,
            questionIndex:qi,
            question:q.question,
            options:q.options,
            answer:q.answer,
            explanation:q.explanation||"Revise o conteúdo relacionado a esta questão.",
            tip:q.tip||"Volte ao conteúdo e compare a regra com a resposta correta."
          });
        });
      }
    });
  }
  return pool;
}

window.startConfiguredSimulationV621=function(type="portugues"){
  const pool=getSimulationPoolV621();
  if(pool.length<5){
    alert("Ainda não há questões suficientes para montar o simulado.");
    return;
  }

  const count=Math.max(5,Number(document.getElementById("sim621QuestionCount")?.value||10));
  const minutes=Math.max(1,Number(document.getElementById("sim621Minutes")?.value||15));

  simConfigV621={count,minutes,type};
  localStorage.setItem("pmmg_sim_config_v621",JSON.stringify(simConfigV621));

  const shuffled=[...pool].sort(()=>Math.random()-.5);
  simQuestionsV510=shuffled.slice(0,Math.min(count,shuffled.length));
  simAnswersV510=new Array(simQuestionsV510.length).fill(null);
  simIndexV510=0;
  simSecondsV510=minutes*60;
  simStartedAtV510=Date.now();
  clearInterval(simTimerV510);

  document.getElementById("simTitleV510").textContent=
    type==="portugues"?"Português • Simulado 2.0":"Misto • Simulado 2.0";

  showScreen("simulationScreenV510","navTrain");
  renderSimulationQuestionV510();
  updateSimulationClockV510();

  simTimerV510=setInterval(()=>{
    simSecondsV510--;
    updateSimulationClockV510();
    if(simSecondsV510<=0){
      clearInterval(simTimerV510);
      simTimerV510=null;
      alert("⏱️ Tempo encerrado. O simulado será finalizado.");
      finishSimulationV510(true);
    }
  },1000);
};

function saveSimulationErrorsV621(){
  if(!Array.isArray(simQuestionsV510)||!Array.isArray(simAnswersV510)) return 0;

  let added=0;

  simQuestionsV510.forEach((q,i)=>{
    const selected=simAnswersV510[i];
    if(selected===q.answer) return;

    const id=`${q.lessonNumber}-${q.questionIndex}`;
    state.errors=state.errors.filter(e=>e.id!==id);

    state.errors.push({
      id,
      lessonNumber:q.lessonNumber,
      lessonTitle:q.lessonTitle||`Aula ${q.lessonNumber}`,
      questionIndex:q.questionIndex,
      question:q.question,
      selectedText:selected===null?"Não respondida":q.options[selected],
      correctText:q.options[q.answer],
      explanation:q.explanation||"",
      tip:q.tip||"",
      addedAt:Date.now(),
      source:"simulado"
    });
    added++;
  });

  if(added){
    saveState();
    if(typeof updateDashboard==="function") updateDashboard();
  }
  return added;
}

// Captura a finalização sem alterar o motor antigo já testado.
const finishSimulationV621Base = finishSimulationV510;
finishSimulationV510=function(force=false){
  const unanswered=simAnswersV510.filter(x=>x===null).length;
  if(!force && unanswered>0){
    if(!confirm(`Você deixou ${unanswered} questão(ões) sem resposta. Finalizar mesmo assim?`)) return;
  }

  const wrongBefore=(state.errors||[]).length;
  const result=finishSimulationV621Base(true);
  const added=saveSimulationErrorsV621();

  if(typeof simLastResultV510!=="undefined" && simLastResultV510){
    simLastResultV510.config={
      questions:simQuestionsV510.length,
      minutes:simConfigV621.minutes,
      type:simConfigV621.type
    };
    simLastResultV510.errorsAdded=added;

    // Regrava a última entrada com os novos metadados.
    let hist=[];
    try{hist=JSON.parse(localStorage.getItem("pmmg_sim_history_v510")||"[]");}catch(e){hist=[];}
    if(hist.length){
      hist[0].questions=simQuestionsV510.length;
      hist[0].minutes=simConfigV621.minutes;
      hist[0].type=simConfigV621.type;
      hist[0].errorsAdded=added;
      localStorage.setItem("pmmg_sim_history_v510",JSON.stringify(hist));
    }

    const text=document.getElementById("simResultTextV510");
    if(text && added>0){
      text.textContent += ` ${added} erro${added===1?" foi":"s foram"} enviado${added===1?"":"s"} ao Caderno de Erros 2.0.`;
    }
  }

  return result;
};

// Histórico 2.0 com formato do simulado.
window.renderSimulationHistoryV510=function(){
  const box=document.getElementById("simHistoryV510");
  const count=document.getElementById("simHistoryCountV510");
  if(!box||!count)return;

  let hist=[];
  try{hist=JSON.parse(localStorage.getItem("pmmg_sim_history_v510")||"[]");}catch(e){hist=[];}
  count.textContent=`${hist.length} ${hist.length===1?"simulado":"simulados"}`;

  if(!hist.length){
    box.innerHTML='<div class="empty-state"><b>Nenhum simulado realizado</b><br>Seu histórico aparecerá aqui.</div>';
    return;
  }

  box.innerHTML=hist.map(h=>`
    <article class="sim510-history-item sim621-history-item">
      <div>
        <strong>${new Date(h.date).toLocaleDateString("pt-BR")} • ${h.type==="misto"?"Misto":"Português"}</strong>
        <span>${h.correct}/${h.total} acertos • ${formatSecondsV510(h.used)}${h.errorsAdded?` • ${h.errorsAdded} erro(s) ao Caderno 2.0`:""}</span>
      </div>
      <b>${h.score}%</b>
    </article>`).join("");
};

// Restaura a última configuração escolhida.
document.addEventListener("DOMContentLoaded",()=>{
  try{
    const cfg=JSON.parse(localStorage.getItem("pmmg_sim_config_v621")||"null");
    if(cfg){
      const q=document.getElementById("sim621QuestionCount");
      const m=document.getElementById("sim621Minutes");
      if(q && [...q.options].some(o=>o.value===String(cfg.count))) q.value=String(cfg.count);
      if(m && [...m.options].some(o=>o.value===String(cfg.minutes))) m.value=String(cfg.minutes);
    }
  }catch(e){}
});

/* ==========================================================
   V6.2.2 — CORREÇÃO DE INÍCIO DOS SIMULADOS 2.0
   ========================================================== */

function getSimulationPoolV622(){
  const pool=[];

  // Caminho 1: banco global atual.
  try{
    if(window.lessons && typeof window.lessons==="object"){
      Object.keys(window.lessons).forEach(k=>{
        const lesson=window.lessons[k];
        if(!lesson || !Array.isArray(lesson.quiz)) return;
        lesson.quiz.forEach((q,qi)=>{
          if(!q || !Array.isArray(q.options)) return;
          pool.push({
            lessonNumber:Number(k),
            lessonTitle:lesson.title || `Aula ${k}`,
            questionIndex:qi,
            question:q.question,
            options:q.options,
            answer:Number(q.answer),
            explanation:q.explanation || "Revise o conteúdo relacionado a esta questão.",
            tip:q.tip || "Compare a alternativa com a regra estudada."
          });
        });
      });
    }
  }catch(e){
    console.warn("Pool global V6.2.2:",e);
  }

  // Caminho 2: funções do próprio app, caso o banco global mude no futuro.
  if(!pool.length){
    try{
      const nums=typeof getLessonNumbers==="function" ? getLessonNumbers() : [];
      nums.forEach(n=>{
        const lesson=typeof getLessonData==="function" ? getLessonData(n) : null;
        if(!lesson || !Array.isArray(lesson.quiz)) return;
        lesson.quiz.forEach((q,qi)=>{
          if(!q || !Array.isArray(q.options)) return;
          pool.push({
            lessonNumber:Number(n),
            lessonTitle:lesson.title || `Aula ${n}`,
            questionIndex:qi,
            question:q.question,
            options:q.options,
            answer:Number(q.answer),
            explanation:q.explanation || "Revise o conteúdo relacionado a esta questão.",
            tip:q.tip || "Compare a alternativa com a regra estudada."
          });
        });
      });
    }catch(e){
      console.warn("Pool fallback V6.2.2:",e);
    }
  }

  return pool;
}

window.startConfiguredSimulationV622=function(type="portugues"){
  try{
    const pool=getSimulationPoolV622();

    if(!pool.length){
      alert("⚠️ O banco de questões não foi carregado. Atualize a página e tente novamente.");
      return;
    }

    const countEl=document.getElementById("sim621QuestionCount");
    const timeEl=document.getElementById("sim621Minutes");
    const count=Math.max(1,Number(countEl?.value || 10));
    const minutes=Math.max(1,Number(timeEl?.value || 15));

    simConfigV621={count,minutes,type};
    localStorage.setItem("pmmg_sim_config_v621",JSON.stringify(simConfigV621));

    // Fisher-Yates: embaralhamento confiável.
    const shuffled=[...pool];
    for(let i=shuffled.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
    }

    simQuestionsV510=shuffled.slice(0,Math.min(count,shuffled.length));
    simAnswersV510=new Array(simQuestionsV510.length).fill(null);
    simIndexV510=0;
    simSecondsV510=minutes*60;
    simStartedAtV510=Date.now();

    if(simTimerV510){
      clearInterval(simTimerV510);
      simTimerV510=null;
    }

    const title=document.getElementById("simTitleV510");
    const screen=document.getElementById("simulationScreenV510");
    const card=document.getElementById("simQuestionCardV510");

    if(!screen || !card){
      alert("⚠️ A tela do simulado não foi encontrada. Recarregue o site.");
      return;
    }

    if(title){
      title.textContent=type==="portugues"
        ? "Português • Simulado 2.0"
        : "Misto • Simulado 2.0";
    }

    showScreen("simulationScreenV510","navTrain");
    renderSimulationQuestionV510();
    updateSimulationClockV510();
    window.scrollTo(0,0);

    simTimerV510=setInterval(()=>{
      simSecondsV510=Math.max(0,simSecondsV510-1);
      updateSimulationClockV510();

      if(simSecondsV510<=0){
        clearInterval(simTimerV510);
        simTimerV510=null;
        alert("⏱️ Tempo encerrado. O simulado será finalizado.");
        finishSimulationV510(true);
      }
    },1000);

  }catch(e){
    console.error("Falha ao iniciar Simulado 2.0:",e);
    alert("⚠️ Não foi possível iniciar o simulado. Atualize a página e tente novamente.");
  }
};

// Mantém compatibilidade com a função da V6.2.1.
window.startConfiguredSimulationV621=window.startConfiguredSimulationV622;

// Event listeners diretos: funcionam mesmo se o onclick do navegador falhar.
document.addEventListener("DOMContentLoaded",()=>{
  const pt=document.getElementById("sim622StartPortuguese");
  const mixed=document.getElementById("sim622StartMixed");

  if(pt){
    pt.addEventListener("click",(e)=>{
      e.preventDefault();
      e.stopPropagation();
      startConfiguredSimulationV622("portugues");
    });
    pt.onclick=null;
  }

  if(mixed){
    mixed.addEventListener("click",(e)=>{
      e.preventDefault();
      e.stopPropagation();
      startConfiguredSimulationV622("misto");
    });
    mixed.onclick=null;
  }
});

/* ==========================================================
   V6.2.3 — CORREÇÃO DETALHADA DO SIMULADO 2.0
   ========================================================== */
let simCorrectionFilterV623="todos";

function getSimCorrectionDataV623(){
  if(!simLastResultV510) return [];
  return simLastResultV510.questions.map((q,i)=>{
    const selected=simLastResultV510.answers[i];
    const ok=selected===q.answer;
    return {q,i,selected,ok};
  });
}

window.setSimCorrectionFilterV623=function(filter){
  simCorrectionFilterV623=filter;
  renderSimulationCorrectionV623();
};

function renderSimulationCorrectionV623(){
  if(!simLastResultV510) return;
  const box=document.getElementById("simCorrectionV510");
  const summary=document.getElementById("simCorrectionSummaryV623");
  if(!box||!summary) return;

  const data=getSimCorrectionDataV623();
  const correct=data.filter(x=>x.ok).length;
  const wrong=data.length-correct;
  const unanswered=data.filter(x=>x.selected===null).length;
  const rate=data.length?Math.round(correct/data.length*100):0;

  summary.innerHTML=`
    <div class="sim623-head">
      <div><span class="kicker">CORREÇÃO DETALHADA</span><h3>Veja exatamente onde melhorar</h3></div>
      <strong>${rate}%</strong>
    </div>
    <div class="sim623-mini-stats">
      <article><b>${correct}</b><small>Acertos</small></article>
      <article><b>${wrong}</b><small>Erros</small></article>
      <article><b>${unanswered}</b><small>Em branco</small></article>
    </div>
    <div class="sim623-filters">
      <button class="${simCorrectionFilterV623==='todos'?'active':''}" onclick="setSimCorrectionFilterV623('todos')">Todas</button>
      <button class="${simCorrectionFilterV623==='erros'?'active':''}" onclick="setSimCorrectionFilterV623('erros')">Erros</button>
      <button class="${simCorrectionFilterV623==='acertos'?'active':''}" onclick="setSimCorrectionFilterV623('acertos')">Acertos</button>
    </div>`;
  summary.classList.remove("hidden");

  let filtered=data;
  if(simCorrectionFilterV623==="erros") filtered=data.filter(x=>!x.ok);
  if(simCorrectionFilterV623==="acertos") filtered=data.filter(x=>x.ok);

  box.innerHTML=filtered.length?filtered.map(({q,i,selected,ok})=>{
    const errId=`${q.lessonNumber}-${q.questionIndex}`;
    const pending=(typeof getErrorsV60==='function'?getErrorsV60():[]).some(e=>e.id===errId);
    const subject=q.lessonTitle||`Aula ${q.lessonNumber||''}`;
    return `<article class="sim510-correction-item sim623-item ${ok?'ok':'bad'}">
      <div class="sim623-item-top">
        <strong>Questão ${i+1} • ${ok?'✅ Acertou':'❌ Errou'}</strong>
        <small>${subject}</small>
      </div>
      <h4>${q.question}</h4>
      <p class="sim623-answer ${ok?'good':'badans'}"><b>Sua resposta:</b> ${selected===null?'Não respondida':q.options[selected]}</p>
      ${!ok?`<p class="good"><b>Resposta correta:</b> ${q.options[q.answer]}</p>`:''}
      <div class="sim623-explain"><b>Por quê?</b><p>${q.explanation||'Revise o conteúdo relacionado a esta questão.'}</p></div>
      <div class="sim623-tip"><b>💡 Dica</b><p>${q.tip||'Compare cada alternativa com a regra estudada.'}</p></div>
      ${!ok&&pending?`<button class="secondary-btn sim623-review-btn" onclick="startSmartErrorReviewV616('${errId}')">🧠 Revisar este erro agora</button>`:''}
      ${!ok&&!pending?`<small class="sim623-resolved">✅ Este erro já foi resolvido no Caderno 2.0.</small>`:''}
    </article>`;
  }).join(""):'<div class="empty-state"><strong>Nenhuma questão neste filtro.</strong></div>';
  box.classList.remove("hidden");
}

// Substitui a correção antiga pela versão detalhada.
window.reviewSimulationV510=function(){
  if(!simLastResultV510) return;
  simCorrectionFilterV623="todos";
  renderSimulationCorrectionV623();
  const summary=document.getElementById("simCorrectionSummaryV623");
  if(summary) summary.scrollIntoView({behavior:"smooth",block:"start"});
};

/* ==========================================================
   V6.2.5 — EVOLUÇÃO UNIFICADA DOS SIMULADOS
   A fonte oficial passa a ser pmmg_sim_history_v510.
   Isso impede resultado, correção e Evolução de divergirem.
   ========================================================== */
function getSimStatsV625(){
  const hist=v60Read("pmmg_sim_history_v510",[]).filter(x=>Number.isFinite(Number(x.total))&&Number(x.total)>0);
  const attempts=hist.length;
  const questions=hist.reduce((a,x)=>a+Number(x.total||0),0);
  const correct=hist.reduce((a,x)=>a+Number(x.correct||0),0);
  const wrong=Math.max(0,questions-correct);
  const scores=hist.map(x=>Number(x.score||0));
  const best=scores.length?Math.max(...scores):0;
  const last=scores.length?scores[0]:0;
  const accuracy=questions?Math.round(correct/questions*100):0;
  const avg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0;
  return {attempts,questions,correct,wrong,best,last,accuracy,avg};
}
function getSimulationComponentV624(){ return getSimStatsV625().avg; }

// Migração leve: mantém a chave antiga sincronizada para qualquer tela legada.
function syncSimStatsV625(){
  const s=getSimStatsV625();
  localStorage.setItem("pmmg_sim_stats_v624",JSON.stringify({
    attempts:s.attempts,questions:s.questions,correct:s.correct,wrong:s.wrong,
    best:s.best,last:s.last,totalSeconds:0
  }));
}

function injectSimulationEvolutionV625(){
  syncSimStatsV625();
  const s=getSimStatsV625();
  // A maior parte das telas V6.1.3/V6.0 já lê o histórico oficial.
  // Este reforço mantém componentes legados coerentes sem recalcular respostas.
  document.querySelectorAll("article").forEach(card=>{
    const txt=(card.textContent||"").trim();
    if(txt.includes("Simulados") && txt.includes("realizados")){
      const strong=card.querySelector("strong");
      if(strong) strong.textContent=String(s.attempts);
    }
  });
}
const obsV625=new MutationObserver(()=>injectSimulationEvolutionV625());
document.addEventListener("DOMContentLoaded",()=>{
  injectSimulationEvolutionV625();
  obsV625.observe(document.body,{childList:true,subtree:true});
});


/* ==========================================================
   V6.2.6 — ÍNDICE DE PREPARO PMMG 2.0
   Evita distorção por repetição de questões.
   ========================================================== */

function getUniqueQuestionPerformanceV626(){
  const attempts = v60Read("pmmg_question_history_v613",[]);
  const latestByKey = new Map();

  attempts.forEach(a=>{
    const lesson = Number(a.lessonNumber||a.lesson||0);
    const total = Number(a.total||0);
    const correct = Number(a.correct||0);
    const score = Number(a.score|| (total ? Math.round(correct/total*100) : 0));
    const key = `${lesson}`;
    latestByKey.set(key,{score,total,correct});
  });

  const arr=[...latestByKey.values()];
  if(!arr.length) return {score:0,attempts:0};

  // Cada aula pesa uma vez, usando o resultado mais recente.
  const avg=Math.round(arr.reduce((s,x)=>s+x.score,0)/arr.length);
  return {score:avg,attempts:arr.length};
}

function getSimulationPerformanceV626(){
  // Fonte unificada das versões 6.2.4/6.2.5.
  let hist=[];
  try{hist=JSON.parse(localStorage.getItem("pmmg_sim_history_v510")||"[]");}catch(e){hist=[];}
  if(!hist.length) return {score:0,count:0,best:0};

  // Considera os 5 simulados mais recentes, com peso maior para os últimos.
  const recent=hist.slice(0,5);
  let weighted=0,totalWeight=0;
  recent.forEach((h,i)=>{
    const w=recent.length-i;
    weighted += Number(h.score||0)*w;
    totalWeight += w;
  });
  return {
    score: totalWeight ? Math.round(weighted/totalWeight) : 0,
    count: hist.length,
    best: Math.max(...hist.map(h=>Number(h.score||0)))
  };
}

function getErrorRecoveryV626(){
  const pending = typeof getErrorsV60==="function" ? getErrorsV60().length : 0;
  const resolved = typeof getReviewedErrorsV616==="function" ? getReviewedErrorsV616().length : v60Read("pmmg_reviewed_errors_v60",[]).length;
  const worked=pending+resolved;

  if(!worked) return {score:100,pending,resolved};

  // Mede resolução real, sem contar o mesmo erro várias vezes.
  const score=Math.round((resolved/worked)*100);
  return {score,pending,resolved};
}

function getConsistencyV626(){
  const streak=Math.max(1,Number(state?.streak||localStorage.getItem("pmmg_streak")||1));
  const history=v60Read("pmmg_history_v60",[]);
  const days=new Set(
    history
      .map(e=>String(e.date||"").slice(0,10))
      .filter(Boolean)
  );

  // Combina sequência atual + dias únicos com atividade.
  const streakScore=Math.min(100,streak*12.5);
  const activityScore=Math.min(100,days.size*10);
  return Math.round(streakScore*0.6+activityScore*0.4);
}

function getReviewActivityV626(){
  const revisions=v60Read("pmmg_revisions_v60",[]);
  const completed = revisions.filter(r=>r.done).length;
  const scheduled = revisions.length;

  const smartDone = !!localStorage.getItem("pmmg_review_completed_v617");
  let score=0;
  if(scheduled) score=Math.round((completed/scheduled)*80);
  if(smartDone) score=Math.min(100,score+20);
  return score;
}

function getPreparationMetricsV626(){
  const lessons = typeof getLessonNumbers==="function" ? getLessonNumbers() : [1,2];
  const completed = Array.isArray(state?.completedLessons) ? state.completedLessons.length : 0;
  const content = lessons.length ? Math.min(100,Math.round(completed/lessons.length*100)) : 0;

  const lessonPerf=getUniqueQuestionPerformanceV626();
  const simPerf=getSimulationPerformanceV626();
  const errors=getErrorRecoveryV626();
  const review=getReviewActivityV626();
  const consistency=getConsistencyV626();

  // Índice 2.0:
  // conteúdo 25 | aulas 25 | simulados 20 | erros 15 | revisão 10 | constância 5
  const score=Math.round(
    content*0.25 +
    lessonPerf.score*0.25 +
    simPerf.score*0.20 +
    errors.score*0.15 +
    review*0.10 +
    consistency*0.05
  );

  return {
    score,
    content,
    lessonPerformance:lessonPerf.score,
    simulationPerformance:simPerf.score,
    errorRecovery:errors.score,
    review,
    consistency,
    simCount:simPerf.count,
    simBest:simPerf.best,
    pendingErrors:errors.pending,
    resolvedErrors:errors.resolved
  };
}

function getPreparationLevelV626(score){
  if(score>=95) return {name:"Pronto para a missão 🎯",message:"Seu índice está em nível máximo. Mantenha constância e revise pontos específicos."};
  if(score>=85) return {name:"Nível competitivo",message:"Seu desempenho já está em faixa competitiva. Priorize estabilidade e simulados."};
  if(score>=70) return {name:"Preparação avançada",message:"Boa base. Agora o foco é transformar erros recorrentes em acertos consistentes."};
  if(score>=50) return {name:"Preparação intermediária",message:"A base está crescendo. Continue avançando no conteúdo e corrigindo erros."};
  if(score>=30) return {name:"Em treinamento",message:"Você já saiu do início. A prioridade é ganhar consistência em provas e revisões."};
  return {name:"Recruta",message:"Fase inicial. Construa base com aulas, questões e revisão dos erros."};
}

function getPreparationInsightV626(m){
  const metrics=[
    ["Conteúdo",m.content],
    ["Aulas",m.lessonPerformance],
    ["Simulados",m.simulationPerformance],
    ["Erros",m.errorRecovery],
    ["Revisão",m.review],
    ["Constância",m.consistency]
  ];
  const sorted=[...metrics].sort((a,b)=>b[1]-a[1]);
  return {strength:sorted[0][0],priority:sorted[sorted.length-1][0]};
}

window.renderPreparationIndexV60=function(){
  const m=getPreparationMetricsV626();
  const level=getPreparationLevelV626(m.score);
  const insight=getPreparationInsightV626(m);

  const set=(id,val)=>{
    const el=document.getElementById(id);
    if(el) el.textContent=val;
  };

  // Mantém compatibilidade visual com a tela antiga.
  set("prepIndexValueV60",m.score);
  set("prepIndexLabelV60",level.name);
  set("prepIndexTextV60","Índice 2.0: usa desempenho recente e evita que repetir a mesma questão distorça sua preparação.");

  // Novo card
  set("prep626Score",m.score);
  set("prep626Level",level.name);
  set("prep626Message",level.message);
  set("prep626Strength",insight.strength);
  set("prep626Priority",insight.priority);

  const scale=document.getElementById("prep626ScaleFill");
  if(scale) scale.style.width=`${m.score}%`;

  const parts=[
    ["Conteúdo concluído",m.content],
    ["Desempenho nas aulas",m.lessonPerformance],
    ["Simulados recentes",m.simulationPerformance],
    ["Erros resolvidos",m.errorRecovery],
    ["Revisão ativa",m.review],
    ["Constância",m.consistency]
  ];

  const box=document.getElementById("prepBreakdownV60");
  if(box){
    box.innerHTML=parts.map(([n,v])=>`
      <article class="v60-progress-item">
        <header><strong>${n}</strong><span>${v}%</span></header>
        <div class="bar"><i style="width:${v}%"></i></div>
      </article>`).join("");
  }
};

window.openPreparationIndexV60=function(){
  showScreen("preparationIndexScreenV60","navEvolution");
  renderPreparationIndexV60();
  window.scrollTo(0,0);
};

/* V6.2.7 Histórico de Simulados */
function simHist627(){try{return JSON.parse(localStorage.getItem("pmmg_sim_history_v510")||"[]")}catch(e){return[]}}
function simNorm627(x){let t=Number(x.total||x.questions||x.questionCount||0),c=Number(x.correct||x.hits||0);return{score:Number(x.score??(t?Math.round(c/t*100):0)),total:t,correct:c,errors:Number(x.errors??(t-c)),date:x.date||x.createdAt||x.finishedAt||"",sec:Number(x.elapsedSeconds||x.timeUsed||x.seconds||0)}}
function simDate627(v){if(!v)return"Data não registrada";let d=new Date(v);return isNaN(d)?String(v).slice(0,10):d.toLocaleDateString("pt-BR")}
function simTime627(s){return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")}
function renderSimHistory627(){let d=simHist627().map(simNorm627),r=d.slice(0,5),q=id=>document.getElementById(id);q("hBest").textContent=(d.length?Math.max(...d.map(x=>x.score)):0)+"%";q("hAvg").textContent=(r.length?Math.round(r.reduce((s,x)=>s+x.score,0)/r.length):0)+"%";q("hCount").textContent=d.length;q("hChart").innerHTML=r.length?[...r].reverse().map((x,i)=>`<div class="hb"><b>${x.score}%</b><div><i style="height:${Math.max(4,x.score)}%"></i></div><small>${i+1}</small></div>`).join(""):`<p>Nenhum simulado ainda.</p>`;q("hList").innerHTML=d.length?d.map((x,i)=>`<article class="hi"><strong>${x.score}%</strong><div><b>Simulado ${d.length-i}</b><span>${x.total||"—"} questões • ${x.correct} acertos • ${x.errors} erros</span><small>${simDate627(x.date)}${x.sec?" • "+simTime627(x.sec):""}</small></div></article>`).join(""):`<article class="hi">Faça seu primeiro simulado para criar o histórico.</article>`}
function openSimHistory627(){showScreen("simHistory627","navEvolution");renderSimHistory627();scrollTo(0,0)}
window.openSimHistory627=openSimHistory627;
function wireHist627(){document.querySelectorAll("article,button,.card,.menu-card").forEach(e=>{let t=(e.textContent||"").trim().toLowerCase();if((t.startsWith("histórico")||t.includes("histórico de simulados"))&&!e.closest("#simHistory627")){e.style.cursor="pointer";e.onclick=openSimHistory627}})}
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",wireHist627):wireHist627();

/* ==========================================================
   V6.2.8 — CORREÇÃO DO ACESSO AO HISTÓRICO DE SIMULADOS
   ========================================================== */
function fixEvolutionHistoryCardsV628(){
  const evo=document.getElementById("evolutionScreen");
  if(!evo) return;

  evo.querySelectorAll("article").forEach(card=>{
    const txt=(card.textContent||"").trim().toLowerCase();

    if(txt.includes("histórico de simulados")){
      card.onclick=openSimHistory627;
      card.style.cursor="pointer";
    }

    if(txt.includes("atividade de estudos")){
      card.onclick=openStudyHistoryV60;
      card.style.cursor="pointer";
    }
  });
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",fixEvolutionHistoryCardsV628);
}else{
  fixEvolutionHistoryCardsV628();
}

/* V6.2.9 — Estatísticas avançadas */
function getStatsHistory629(){
  // V6.3.0: usa EXATAMENTE a mesma fonte do Histórico de Simulados.
  try{
    const a = simHist627();
    return Array.isArray(a) ? a : [];
  }catch(e){
    try{
      const a=JSON.parse(localStorage.getItem("pmmg_sim_history_v510")||"[]");
      return Array.isArray(a) ? a : [];
    }catch(err){ return []; }
  }
}
function score629(x){
  const s=Number(x.score??x.percent??x.percentage??x.nota);
  if(Number.isFinite(s))return Math.max(0,Math.min(100,s));
  const h=hits629(x),t=total629(x); return t?Math.round(h*100/t):0;
}
function hits629(x){return Number(x.correct??x.hits??x.acertos??0)||0}
function total629(x){
  const t=Number(x.total??x.questions??x.questoes);
  if(Number.isFinite(t)&&t>0)return t;
  return hits629(x)+(Number(x.errors??x.wrong??x.erros??0)||0);
}
function renderStats629(){
  const d=getStatsHistory629(), tq=d.reduce((s,x)=>s+total629(x),0), h=d.reduce((s,x)=>s+hits629(x),0), e=Math.max(0,tq-h), acc=tq?Math.round(h*100/tq):0;
  document.getElementById("s629acc").textContent=acc+"%";
  document.getElementById("s629total").textContent=tq;
  document.getElementById("s629hits").textContent=h;
  document.getElementById("s629errors").textContent=e;
  const scores=d.slice(0,5).map(score629);
  let title="Sem tendência ainda",txt="Complete mais simulados para comparar sua evolução.",level=acc;
  if(scores.length>=2){
    const cut=Math.max(1,Math.floor(scores.length/2)), a=scores.slice(0,cut), b=scores.slice(cut);
    const old=a.reduce((x,y)=>x+y,0)/a.length, now=b.reduce((x,y)=>x+y,0)/b.length, delta=Math.round(now-old); level=Math.round(now);
    if(delta>=5){title="📈 Você está melhorando";txt="Sua média recente subiu cerca de "+delta+" pontos percentuais."}
    else if(delta<=-5){title="📉 Atenção à queda recente";txt="Sua média recente caiu cerca de "+Math.abs(delta)+" pontos percentuais. Priorize o Caderno de Erros."}
    else{title="➡️ Desempenho estável";txt="Sua média recente está estável. Continue treinando para romper esse patamar."}
  }
  document.getElementById("s629trend").textContent=title;
  document.getElementById("s629trendtext").textContent=txt;
  document.getElementById("s629bar").style.width=Math.max(0,Math.min(100,level))+"%";
  document.getElementById("s629recent").innerHTML=scores.length?scores.map((s,i)=>`<div class="s629mini"><b>${s}%</b><i style="height:${Math.max(6,s)}%"></i><small>${i+1}</small></div>`).join(""):"<p>Nenhum simulado registrado.</p>";
}
function openAdvancedStats629(){showScreen("advancedStats629","navEvolution");renderStats629()}

/* V6.3.1 — Análise de Pontos Fracos */
function weakLessonName631(n){
  try{const d=getLessonData(Number(n));if(d&&d.title)return d.title}catch(e){}
  return Number(n)===1?"Interpretação de texto":Number(n)===2?"Ideia principal e inferência":`Aula ${String(n).padStart(2,"0")}`;
}
function getWeakData631(){
  const attempts=v60Read("pmmg_question_history_v613",[]).filter(x=>Number.isFinite(Number(x.lesson))&&Number(x.total)>0);
  const errors=(state&&Array.isArray(state.errors)?state.errors:[]);
  const map={};
  attempts.forEach(x=>{const k=Number(x.lesson);map[k]??={lesson:k,correct:0,total:0,pending:0};map[k].correct+=Number(x.correct)||0;map[k].total+=Number(x.total)||0});
  errors.forEach(e=>{const k=Number(e.lessonNumber);if(!Number.isFinite(k))return;map[k]??={lesson:k,correct:0,total:0,pending:0};map[k].pending++});
  [1,2].forEach(k=>map[k]??={lesson:k,correct:0,total:0,pending:0});
  return Object.values(map).map(x=>{const accuracy=x.total?Math.round(x.correct/x.total*100):null;const weakness=accuracy===null?Math.min(100,x.pending*15):Math.min(100,Math.round((100-accuracy)*.75+Math.min(25,x.pending*4)));return {...x,name:weakLessonName631(x.lesson),accuracy,weakness}}).sort((a,b)=>b.weakness-a.weakness||b.pending-a.pending);
}
function renderWeakPoints631(){
  const data=getWeakData631(),rank=document.getElementById("w631ranking"),recs=document.getElementById("w631recs");if(!rank||!recs)return;
  const measured=data.filter(x=>x.total>0||x.pending>0),top=measured[0];
  document.getElementById("w631title").textContent=top?`Prioridade atual: ${top.name}`:"Ainda faltam dados para o diagnóstico";
  document.getElementById("w631text").textContent=top?`${top.pending} erro(s) pendente(s) neste assunto. Foque nele antes de aumentar a dificuldade dos simulados.`:"Conclua aulas e simulados para o sistema descobrir seus pontos fracos automaticamente.";
  rank.innerHTML=measured.length?measured.map((x,i)=>`<article><div class="weak631top"><b>${i+1}. ${x.name}</b><strong>${x.accuracy===null?"—":x.accuracy+"%"}</strong></div><div class="weak631bar"><i style="width:${x.accuracy===null?0:x.accuracy}%"></i></div><small>${x.total} questão(ões) contabilizada(s) • ${x.pending} erro(s) pendente(s)</small></article>`).join(""):'<div class="empty-state">Faça sua primeira atividade para gerar o ranking.</div>';
  recs.innerHTML=measured.length?measured.slice(0,3).map((x,i)=>`<article><span>${i===0?'🎯':i===1?'🧠':'📘'}</span><div><b>${x.name}</b><small>${i===0?'Prioridade ALTA — revise os erros e refaça questões.':i===1?'Prioridade MÉDIA — faça uma revisão curta e treine.':'Mantenha este assunto no ciclo de revisão.'}</small></div><button onclick="openLesson(${x.lesson})">Estudar</button></article>`).join(""):'<div class="empty-state">As recomendações aparecerão conforme você estudar.</div>';
}
function openWeakPoints631(){showScreen("weakPoints631","navEvolution");renderWeakPoints631();scrollTo(0,0)}


/* V6.3.2 — Plano de Estudos Inteligente */
function getSmartPlan632(){
  const data=getWeakData631().filter(x=>x.total>0||x.pending>0);
  const top=data[0]||{lesson:1,name:"Interpretação de texto",accuracy:0,pending:0};
  const reviewCount=Math.max(1,Math.min(5,top.pending||3));
  return {top,reviewCount,goal:70};
}
function renderSmartPlan632(){
  const {top,reviewCount,goal}=getSmartPlan632();
  const title=document.getElementById("p632title"), text=document.getElementById("p632text"), steps=document.getElementById("p632steps"), bar=document.getElementById("p632bar"), prog=document.getElementById("p632progress"), goalEl=document.getElementById("p632goal");
  if(!title||!steps)return;
  title.textContent=`Fortalecer: ${top.name}`;
  text.textContent=`Seu desempenho atual neste assunto é ${top.accuracy===null?"ainda não medido":top.accuracy+"%"}. A missão prioriza estudo, revisão e treino direcionado.`;
  goalEl.textContent=`Meta: atingir pelo menos ${goal}% em ${top.name}.`;
  const studied=(top.accuracy!==null&&top.accuracy>=goal);
  const reviewed=top.pending===0;
  const done=(studied?1:0)+(reviewed?1:0);
  bar.style.width=Math.round(done/3*100)+"%"; prog.textContent=`${done} de 3 etapas concluídas`;
  steps.innerHTML=`
    <article><span>📘</span><div><b>1. Estudar ${top.name}</b><small>Reforce a teoria antes de aumentar a dificuldade.</small></div><button onclick="openLesson(${top.lesson})">Estudar</button></article>
    <article><span>🧠</span><div><b>2. Revisar ${reviewCount} erro(s)</b><small>Use o Caderno de Erros para atacar as falhas recentes.</small></div><button onclick="openErrorNotebook()">Revisar</button></article>
    <article><span>🎯</span><div><b>3. Fazer questões direcionadas</b><small>Faça um treino e busque pelo menos ${goal}% de acerto.</small></div><button onclick="startSimulationV510('rapido')">Treinar</button></article>`;
}
function openSmartPlan632(){showScreen("smartPlan632","navEvolution");renderSmartPlan632();scrollTo(0,0)}
window.openSmartPlan632=openSmartPlan632;


/* V6.3.3 — Perfil pessoal local */
function getProfile633(){try{return JSON.parse(localStorage.getItem('pmmg_profile_v633')||'{}')}catch(e){return {}}}
function saveProfile633(){const old=getProfile633();const p={name:(document.getElementById('profileName633')?.value||'').trim(),nickname:(document.getElementById('profileNick633')?.value||'').trim(),goal:(document.getElementById('profileGoal633')?.value||'').trim(),city:(document.getElementById('profileCity633')?.value||'').trim(),photo:old.photo||''};localStorage.setItem('pmmg_profile_v633',JSON.stringify(p));renderProfile633();alert('Perfil salvo neste aparelho.');}
function renderProfile633(){const p=getProfile633();const map={profileName633:p.name||'',profileNick633:p.nickname||'',profileGoal633:p.goal||'Aprovação PMMG',profileCity633:p.city||''};Object.entries(map).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.value=v});const img=document.getElementById('profilePhoto633'),ph=document.getElementById('profilePlaceholder633'),topImg=document.getElementById('profileTopPhoto633'),topPh=document.getElementById('profileTopPlaceholder633');if(img&&ph){if(p.photo){img.src=p.photo;img.style.display='block';ph.style.display='none'}else{img.removeAttribute('src');img.style.display='none';ph.style.display='grid'}}if(topImg&&topPh){if(p.photo){topImg.src=p.photo;topImg.style.display='block';topPh.style.display='none'}else{topImg.removeAttribute('src');topImg.style.display='none';topPh.style.display='grid'}}const label=document.getElementById('profileHeaderLabel633');if(label)label.textContent=p.nickname||p.name||'Perfil';}
function chooseProfilePhoto633(){document.getElementById('profileFile633')?.click()}
function profilePhotoChanged633(ev){const file=ev.target.files&&ev.target.files[0];if(!file)return;if(!file.type.startsWith('image/')){alert('Escolha uma imagem.');return}const reader=new FileReader();reader.onload=()=>{const p=getProfile633();p.photo=reader.result;localStorage.setItem('pmmg_profile_v633',JSON.stringify(p));renderProfile633()};reader.readAsDataURL(file);}
function openProfile633(){showScreen('profileScreen633','');renderProfile633();scrollTo(0,0)}
window.openProfile633=openProfile633;window.saveProfile633=saveProfile633;window.chooseProfilePhoto633=chooseProfilePhoto633;window.profilePhotoChanged633=profilePhotoChanged633;document.addEventListener('DOMContentLoaded',renderProfile633);


/* V6.3.5 — Central de Progresso */
function renderProgressCenter635(){
  const m=getPreparationMetricsV626();
  const level=getPreparationLevelV626(m.score);
  const weak=getWeakData631().filter(x=>x.total>0||x.pending>0);
  const top=weak[0];
  const hist=getStatsHistory629();
  const recent=hist.slice(0,5).map(score629);
  const recentAvg=recent.length?Math.round(recent.reduce((a,b)=>a+b,0)/recent.length):0;
  let totalLessons=2, completed=0;
  try{ completed=[1,2].filter(n=>state?.completedLessons?.includes?.(n)).length; }catch(e){}
  const set=(id,val)=>{const e=document.getElementById(id);if(e)e.textContent=val};
  set('pc635Index',m.score); set('pc635Level',level.name); set('pc635Message',level.message);
  set('pc635Content',Math.round(m.content)+'%'); set('pc635Lessons',completed+' de '+totalLessons+' aulas');
  set('pc635Recent',recentAvg+'%'); set('pc635Errors',m.pendingErrors||0); set('pc635Sims',hist.length);
  if(top){set('pc635Priority',top.name);set('pc635PriorityText',`${top.pending} erro(s) pendente(s) • ${top.accuracy===null?'desempenho ainda não medido':top.accuracy+'% de acerto'}. Esta é a prioridade recomendada agora.`)}
  else{set('pc635Priority','Gerar seu diagnóstico');set('pc635PriorityText','Conclua uma aula ou simulado para o sistema identificar automaticamente sua prioridade.')}
}
function openProgressCenter635(){showScreen('progressCenter635','navEvolution');renderProgressCenter635();scrollTo(0,0)}
window.openProgressCenter635=openProgressCenter635;

/* V6.3.6 — Metas de Estudo */
function getStudyGoals636(){try{return Object.assign({questions:20,reviews:1,lessons:1},JSON.parse(localStorage.getItem('pmmg_study_goals_v636')||'{}'))}catch(e){return {questions:20,reviews:1,lessons:1}}}
function getTodayProgress636(){
  const today=dateKey(); let questions=0,reviews=0,lessons=0;
  try{
    const h=v60Read('pmmg_question_history_v613',[]);
    questions=h.filter(x=>x&&x.date&&dateKey(new Date(x.date))===today).reduce((s,x)=>s+(Number(x.total)||0),0);
  }catch(e){}
  try{
    const hist=v60Read('pmmg_history_v60',[]).filter(x=>x&&x.date&&dateKey(new Date(x.date))===today);
    reviews=hist.filter(x=>x.type==='review').length;
    lessons=hist.filter(x=>x.type==='lesson').length;
    if(localStorage.getItem('pmmg_review_completed_'+today)==='1') reviews=Math.max(reviews,1);
  }catch(e){}
  return {questions,reviews,lessons};
}
function renderStudyGoals636(){
  const g=getStudyGoals636(),p=getTodayProgress636(),set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
  [['Questions',g.questions],['Reviews',g.reviews],['Lessons',g.lessons]].forEach(x=>{const e=document.getElementById('g636'+x[0]);if(e)e.value=x[1]});
  let sum=0,done=0;
  [['Q',p.questions,g.questions],['R',p.reviews,g.reviews],['L',p.lessons,g.lessons]].forEach(x=>{
    const raw=Math.round(x[1]/Math.max(1,x[2])*100),pct=Math.min(100,raw); sum+=pct; if(x[1]>=x[2])done++;
    const extra=raw>200?'  ✓ Meta superada':raw>100?'  ✓ +'+(raw-100)+'%':'';
    set('g636'+x[0]+'Now',x[1]+' / '+x[2]+extra);
    const b=document.getElementById('g636'+x[0]+'Bar');if(b)b.style.width=pct+'%';
  });
  const o=Math.round(sum/3);set('g636Overall',o+'%');const b=document.getElementById('g636MainBar');if(b)b.style.width=o+'%';
  set('g636Status',done===3?'🏆 Missão diária concluída!':done===2?'🔥 Falta só 1 meta!':done===1?'💪 1 de 3 metas concluída':'🎯 Missão em andamento');
  set('g636Summary',done===3?'Todas as metas de hoje foram alcançadas. Continue a sequência!':`${done} de 3 metas concluídas hoje. O progresso considera somente atividades feitas hoje.`);
}
function saveStudyGoals636(){const v=id=>Math.max(1,Number(document.getElementById(id)?.value)||1);localStorage.setItem('pmmg_study_goals_v636',JSON.stringify({questions:v('g636Questions'),reviews:v('g636Reviews'),lessons:v('g636Lessons')}));renderStudyGoals636();alert('Metas salvas! 🎯')}
function openStudyGoals636(){showScreen('studyGoals636','navEvolution');renderStudyGoals636();scrollTo(0,0)}
window.openStudyGoals636=openStudyGoals636;window.saveStudyGoals636=saveStudyGoals636;

/* V6.3.8 — Reiniciar toda a preparação */
function resetPreparation638(){
  const first=confirm('⚠️ Reiniciar toda a preparação?\n\nIsso apagará o progresso das matérias, aulas, simulados, revisões, caderno de erros, estatísticas, XP e sequência.\n\nSua foto e seus dados pessoais serão preservados.');
  if(!first) return;
  const second=confirm('🚨 CONFIRMAÇÃO FINAL\n\nDeseja realmente voltar ao início da preparação? Esta ação não pode ser desfeita.');
  if(!second) return;

  const preserved={};
  ['pmmg_profile_v633','pmmg_study_goals_v636','pmmg_daily_goal','pmmg_exam_date'].forEach(k=>{
    const v=localStorage.getItem(k); if(v!==null) preserved[k]=v;
  });

  const remove=[];
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(k && (k==='missaoPMMGState' || k==='errorNotebook' || k==='xp' || k.startsWith('bestScore') || k.startsWith('pmmg_'))) remove.push(k);
  }
  remove.forEach(k=>localStorage.removeItem(k));
  Object.entries(preserved).forEach(([k,v])=>localStorage.setItem(k,v));

  const fresh=defaultState();
  Object.keys(state).forEach(k=>delete state[k]);
  Object.assign(state,fresh);
  saveState();
  renderProfile633();
  updateDashboard();
  alert('✅ Preparação reiniciada!\n\nSeu perfil foi mantido e seus estudos voltaram ao início.');
  goHome();
}
window.resetPreparation638=resetPreparation638;

/* V6.4.3 — conclusão especial de Português */
(function(){
  const baseRegister=window.registerResult || (typeof registerResult==='function'?registerResult:null);
  if(baseRegister){
    window.registerResult=function(lessonNumber,score,approved){
      const r=baseRegister(lessonNumber,score,approved);
      if(Number(lessonNumber)===24 && approved){
        localStorage.setItem('pmmg_portuguese_completed','1');
        setTimeout(()=>alert('🏆 PARABÉNS! Língua Portuguesa concluída com aprovação na Prova Final.'),250);
      }
      return r;
    };
  }
})();

/* V6.4.4 — progresso de Literatura */
function updateLiteratureProgressV644(){
  const nums=getLessonNumbers("Literatura");
  if(!nums.length) return;
  const done=nums.filter(n=>isLessonCompleted(n)).length;
  const pct=Math.round(done/nums.length*100);
  const bar=document.getElementById("literatureProgressBar");
  if(bar) bar.style.width=pct+"%";
}
document.addEventListener("DOMContentLoaded",updateLiteratureProgressV644);
const _saveStateV644=saveState;
saveState=function(){_saveStateV644();setTimeout(updateLiteratureProgressV644,0);}

/* V6.4.4.2 — acesso robusto à Literatura */
document.addEventListener("DOMContentLoaded",()=>{
  const card=document.getElementById("literatureSubjectCard");
  if(card){
    card.addEventListener("click",openLiterature);
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openLiterature();}});
  }
});


/* ==========================================================
   V6.4.5 — LITERATURA EM ARQUIVO PRÓPRIO
   literatura.js usa numeração 1–7 sem IDs 101–107.
   ========================================================== */
function renderLiteratureTrailV645(){
  currentSubject="Literatura";
  const nums=getLessonNumbers("Literatura");
  const box=document.getElementById("literatureLessonListV6443");
  if(!box) return;
  if(!nums.length){
    box.innerHTML='<div class="empty-state"><strong>Literatura não carregou.</strong><br>Atualize a página e tente novamente.</div>';
    return;
  }

  if(!Array.isArray(state.literatureUnlocked)) state.literatureUnlocked=[1];
  if(!state.literatureUnlocked.includes(1)) state.literatureUnlocked.push(1);

  nums.forEach((n,i)=>{
    const score=Number(state.literatureScores?.[n]);
    const passed=(Number.isFinite(score)&&score>=PASS_SCORE)||state.literatureCompleted.includes(n);
    const next=nums[i+1];
    if(passed&&next&&!state.literatureUnlocked.includes(next)) state.literatureUnlocked.push(next);
  });
  saveState();

  const done=nums.filter(n=>state.literatureCompleted.includes(n)).length;
  const pct=Math.round(done/nums.length*100);
  const p=document.getElementById("litProgressTextV6443");
  const d=document.getElementById("litDoneTextV6443");
  if(p)p.textContent=pct+"%";
  if(d)d.textContent=`${done}/${nums.length}`;

  box.innerHTML=nums.map(n=>{
    const l=window.literaturaLessons[n];
    const unlocked=n===1||state.literatureUnlocked.includes(n);
    const completed=state.literatureCompleted.includes(n);
    const score=state.literatureScores?.[n];
    const display=n===7?"🏆":String(n).padStart(2,"0");
    return `<article class="lesson-card ${!unlocked?"locked":""} ${completed?"completed":""}" ${unlocked?`onclick="openLiteratureLessonV645(${n})"`:""}>
      <div class="lesson-number">${display}</div>
      <div class="lesson-card-content">
        <h3>${l.title}</h3>
        <p>${l.subtitle} • ${l.time}</p>
        <p>${completed?"Concluída":unlocked?"Disponível":"Bloqueada"}</p>
        ${typeof score==="number"?`<span class="score-badge">Melhor nota: ${score}%</span>`:""}
        ${!unlocked?'<div class="lock-message">Atinga 70% na aula anterior.</div>':""}
      </div>
      <div class="lesson-card-status">${completed?"✓":unlocked?"›":"🔒"}</div>
    </article>`;
  }).join("");
}

window.openLiteratureLessonV645=function(n){
  currentSubject="Literatura";
  openLesson(n);
};

window.openLiteratureV6443=function(){
  currentSubject="Literatura";
  renderLiteratureTrailV645();
  showScreen("literatureTrailScreenV6443","navStudy");
  window.scrollTo(0,0);
};
window.openLiterature=window.openLiteratureV6443;

document.addEventListener("click",e=>{
  const card=e.target.closest?.("#literatureSubjectCard");
  if(card){
    e.preventDefault();
    e.stopPropagation();
    window.openLiteratureV6443();
  }
},true);

function renderEnglishTrailV646(){currentSubject="Inglês";const nums=getLessonNumbers("Inglês"),box=document.getElementById("englishLessonListV646");if(!box)return;if(!state.englishUnlocked.includes(1))state.englishUnlocked.push(1);nums.forEach((n,i)=>{const s=Number(state.englishScores[n]);if(((Number.isFinite(s)&&s>=70)||state.englishCompleted.includes(n))&&nums[i+1]&&!state.englishUnlocked.includes(nums[i+1]))state.englishUnlocked.push(nums[i+1]);});saveState();box.innerHTML=nums.map(n=>{const l=window.inglesLessons[n],u=n===1||state.englishUnlocked.includes(n),c=state.englishCompleted.includes(n);return `<article class="lesson-card ${!u?"locked":""} ${c?"completed":""}" ${u?`onclick="openEnglishLessonV646(${n})"`:""}><div class="lesson-number">${n===13?"🏆":String(n).padStart(2,"0")}</div><div class="lesson-card-content"><h3>${l.title}</h3><p>${l.subtitle} • ${l.time}</p><p>${c?"Concluída":u?"Disponível":"Bloqueada"}</p>${!u?'<div class="lock-message">Atinga 70% na aula anterior.</div>':""}</div><div class="lesson-card-status">${c?"✓":u?"›":"🔒"}</div></article>`}).join("")}
window.openEnglishLessonV646=n=>{currentSubject="Inglês";openLesson(n)};window.openEnglishV646=()=>{currentSubject="Inglês";renderEnglishTrailV646();showScreen("englishTrailScreenV646","navStudy");scrollTo(0,0)};

/* V6.4.8 — Direito e Direitos Humanos em arquivo independente */
function renderLawTrailV648(){
  currentSubject="Direito";
  const nums=getLessonNumbers("Direito"),box=document.getElementById("lawLessonListV648");
  if(!box)return;
  if(!Array.isArray(state.lawUnlocked))state.lawUnlocked=[1];
  if(!state.lawUnlocked.includes(1))state.lawUnlocked.push(1);
  nums.forEach((n,i)=>{
    const s=Number(state.lawScores?.[n]);
    const passed=(Number.isFinite(s)&&s>=PASS_SCORE)||state.lawCompleted.includes(n);
    if(passed&&nums[i+1]&&!state.lawUnlocked.includes(nums[i+1]))state.lawUnlocked.push(nums[i+1]);
  });
  saveState();
  const done=nums.filter(n=>state.lawCompleted.includes(n)).length,pct=nums.length?Math.round(done/nums.length*100):0;
  const p=document.getElementById("lawProgressTextV648"),d=document.getElementById("lawDoneTextV648");
  if(p)p.textContent=pct+"%"; if(d)d.textContent=`${done}/${nums.length}`;
  box.innerHTML=nums.map(n=>{
    const l=window.direitoLessons[n],u=n===1||state.lawUnlocked.includes(n),c=state.lawCompleted.includes(n),score=state.lawScores?.[n];
    return `<article class="lesson-card ${!u?"locked":""} ${c?"completed":""}" ${u?`onclick="openLawLessonV648(${n})"`:""}>
      <div class="lesson-number">${n===13?"🏆":String(n).padStart(2,"0")}</div>
      <div class="lesson-card-content"><h3>${l.title}</h3><p>${l.subtitle} • ${l.time}</p><p>${c?"Concluída":u?"Disponível":"Bloqueada"}</p>${typeof score==="number"?`<span class="score-badge">Melhor nota: ${score}%</span>`:""}${!u?'<div class="lock-message">Atinga 70% na aula anterior.</div>':""}</div>
      <div class="lesson-card-status">${c?"✓":u?"›":"🔒"}</div></article>`;
  }).join("");
}
window.openLawLessonV648=n=>{currentSubject="Direito";openLesson(n)};
window.openLawV648=()=>{currentSubject="Direito";renderLawTrailV648();showScreen("lawTrailScreenV648","navStudy");scrollTo(0,0)};

/* ==========================================================
   V6.4.9.3 — TELA DE LOGIN PRIVADA (SITE ESTÁTICO)
   ========================================================== */
const PMMG_LOGIN_6493 = "35997772422";
const PMMG_PASSWORD_6493 = "Luana09";
const PMMG_AUTH_KEY_6493 = "pmmg_auth_v6493";

function setLoginGate6493(show){
  const gate=document.getElementById("loginGate6493");
  if(!gate)return;
  gate.classList.toggle("is-hidden",!show);
  gate.style.display=show?"block":"none";
  gate.setAttribute("aria-hidden",show?"false":"true");
  document.documentElement.classList.toggle("login6493-locked",show);
  document.body.classList.toggle("login6493-locked",show);
  if(show){
    setTimeout(()=>document.getElementById("login6493User")?.focus(),120);
  }
}
function login6493Submit(ev){
  ev?.preventDefault();
  const user=(document.getElementById("login6493User")?.value||"").trim();
  const pass=document.getElementById("login6493Pass")?.value||"";
  const err=document.getElementById("login6493Error");
  if(user===PMMG_LOGIN_6493 && pass===PMMG_PASSWORD_6493){
    localStorage.setItem(PMMG_AUTH_KEY_6493,"1");
    sessionStorage.setItem(PMMG_AUTH_KEY_6493,"1");
    if(err)err.textContent="";
    setLoginGate6493(false);
    requestAnimationFrame(()=>{
      const gate=document.getElementById("loginGate6493");
      if(gate) gate.style.display="none";
    });
    return false;
  }
  if(err)err.textContent="Login ou senha incorretos.";
  const card=document.querySelector(".login6493-card");
  card?.classList.remove("login6493-shake");
  void card?.offsetWidth;
  card?.classList.add("login6493-shake");
  return false;
}
function togglePassword6493(){
  const p=document.getElementById("login6493Pass");
  if(p)p.type=p.type==="password"?"text":"password";
}
function logout6493(){
  localStorage.removeItem(PMMG_AUTH_KEY_6493); sessionStorage.removeItem(PMMG_AUTH_KEY_6493);
  setLoginGate6493(true);
  const p=document.getElementById("login6493Pass");
  if(p)p.value="";
  const u=document.getElementById("login6493User");
  if(u)u.value="";
  scrollTo(0,0);
}
function initLogin6493(){
  let ok=false;
  try{
    ok=localStorage.getItem(PMMG_AUTH_KEY_6493)==="1" ||
       sessionStorage.getItem(PMMG_AUTH_KEY_6493)==="1";
  }catch(e){}
  setLoginGate6493(!ok);
}
window.login6493Submit=login6493Submit;
window.togglePassword6493=togglePassword6493;
window.logout6493=logout6493;


/* V6.5.0 — Raciocínio Lógico-Matemático */
function renderMathTrailV650(){
  currentSubject="Matemática";
  const nums=getLessonNumbers("Matemática"),box=document.getElementById("mathLessonListV650");
  if(!box)return;
  if(!Array.isArray(state.mathUnlocked))state.mathUnlocked=[1];
  if(!state.mathUnlocked.includes(1))state.mathUnlocked.push(1);
  nums.forEach((n,i)=>{
    const s=Number(state.mathScores?.[n]);
    const passed=(Number.isFinite(s)&&s>=PASS_SCORE)||state.mathCompleted.includes(n);
    if(passed&&nums[i+1]&&!state.mathUnlocked.includes(nums[i+1]))state.mathUnlocked.push(nums[i+1]);
  });
  saveState();
  const done=nums.filter(n=>state.mathCompleted.includes(n)).length,pct=nums.length?Math.round(done/nums.length*100):0;
  const p=document.getElementById("mathProgressTextV650"),d=document.getElementById("mathDoneTextV650");
  if(p)p.textContent=pct+"%";if(d)d.textContent=`${done}/${nums.length}`;
  box.innerHTML=nums.map(n=>{
    const l=window.matematicaLessons[n],u=n===1||state.mathUnlocked.includes(n),c=state.mathCompleted.includes(n),score=state.mathScores?.[n];
    return `<article class="lesson-card ${!u?"locked":""} ${c?"completed":""}" ${u?`onclick="openMathLessonV650(${n})"`:""}>
      <div class="lesson-number">${n===31?"🏆":String(n).padStart(2,"0")}</div>
      <div class="lesson-card-content"><h3>${l.title}</h3><p>${l.subtitle} • ${l.time}</p><p>${c?"Concluída":u?"Disponível":"Bloqueada"}</p>${typeof score==="number"?`<span class="score-badge">Melhor nota: ${score}%</span>`:""}${!u?'<div class="lock-message">Atinga 70% na aula anterior.</div>':""}</div>
      <div class="lesson-card-status">${c?"✓":u?"›":"🔒"}</div></article>`;
  }).join("");
}
window.openMathLessonV650=n=>{currentSubject="Matemática";openLesson(n)};
window.openMathV650=()=>{currentSubject="Matemática";renderMathTrailV650();showScreen("mathTrailScreenV650","navStudy");scrollTo(0,0)};

document.addEventListener("DOMContentLoaded",()=>{
  try{ initLogin6493(); }catch(e){ setLoginGate6493(true); }
});

/* V6.5.0.2 — fix definitivo do card de Matemática */
function updateMathSubjectCardV6502(){
  const total=Object.keys(window.matematicaLessons||{}).length;
  const done=(state.mathCompleted||[]).length;
  const pct=total?Math.round(done/total*100):0;
  const bar=document.getElementById("mathProgressBarV650");
  if(bar)bar.style.width=pct+"%";
}
document.addEventListener("DOMContentLoaded",()=>{
  const card=document.getElementById("mathSubjectCard");
  if(card){
    card.addEventListener("keydown",e=>{
      if(e.key==="Enter"||e.key===" "){e.preventDefault();openMathV650();}
    });
  }
  updateMathSubjectCardV6502();
});


/* ============================================================
   MISSÃO PMMG V7.0.0 — PAINEL GLOBAL + SIMULADO + REVISÃO
   ============================================================ */
const V7_SUBJECTS = [
  {name:"Português",source:()=>window.lessons||{},completed:"completedLessons",scores:"scores",icon:"📘"},
  {name:"Literatura",source:()=>window.literaturaLessons||{},completed:"literatureCompleted",scores:"literatureScores",icon:"📚"},
  {name:"Inglês",source:()=>window.inglesLessons||{},completed:"englishCompleted",scores:"englishScores",icon:"🇬🇧"},
  {name:"Direito",source:()=>window.direitoLessons||{},completed:"lawCompleted",scores:"lawScores",icon:"⚖️"},
  {name:"Matemática",source:()=>window.matematicaLessons||{},completed:"mathCompleted",scores:"mathScores",icon:"🧮"}
];

function v7SubjectStats(def){
  const src=def.source(), nums=Object.keys(src).map(Number).filter(Number.isFinite);
  const completed=(state[def.completed]||[]).filter(n=>src[n]).length;
  const scores=Object.values(state[def.scores]||{}).filter(v=>typeof v==="number"&&Number.isFinite(v));
  const avg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0;
  return {name:def.name,icon:def.icon,total:nums.length,completed,avg,pct:nums.length?Math.round(completed/nums.length*100):0,scores};
}
function v7AllStats(){
  const subs=V7_SUBJECTS.map(v7SubjectStats);
  return {
    subs,
    total:subs.reduce((a,s)=>a+s.total,0),
    completed:subs.reduce((a,s)=>a+s.completed,0),
    allScores:V7_SUBJECTS.flatMap(d=>Object.values(state[d.scores]||{}).filter(v=>typeof v==="number"&&Number.isFinite(v)))
  };
}
function getAverageScoreV7(){
  const vals=v7AllStats().allScores;
  return vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;
}

const updateDashboardLegacyV7 = updateDashboard;
updateDashboard = function(){
  const g=v7AllStats(), progress=g.total?Math.round(g.completed/g.total*100):0, avg=getAverageScoreV7();
  setText("streakValue",state.streak);
  setText("xpValue",`${state.xp} XP`);
  setText("globalProgressText",`${progress}%`);
  setText("averageScoreValue",`${avg}%`);
  setText("completedLessonsValue",g.completed);
  setText("errorCountValue",state.errors.length);
  setText("progressSubtitle",`${g.completed} de ${g.total} etapas concluídas`);
  const pt=g.subs[0];
  setText("portugueseProgressText",`${pt.completed} de ${pt.total} etapas concluídas`);
  setWidth("globalProgressBar",progress); setWidth("portugueseProgressBar",pt.pct); setWidth("portugueseProgressBar2",pt.pct);

  const home=document.getElementById("v7HomeSubjects");
  if(home) home.innerHTML=g.subs.map(s=>`<article><div><span>${s.icon}</span><b>${s.name}</b></div><strong>${s.pct}%</strong><small>${s.completed}/${s.total}</small><div class="bar"><i style="width:${s.pct}%"></i></div></article>`).join("");

  updateDailyMissionV7();
  if(typeof updateMathSubjectCardV6502==="function") updateMathSubjectCardV6502();
};
window.updateDashboard=updateDashboard;

function updateDailyMissionV7(){
  const title=document.getElementById("dailyMissionTitle"), text=document.getElementById("dailyMissionText");
  if(!title||!text)return;
  if(state.errors.length>=5){
    title.textContent="Ataque seus pontos fracos";
    text.textContent=`Revise ${Math.min(10,state.errors.length)} questões do Caderno de Erros`;
    return;
  }
  for(const d of V7_SUBJECTS){
    const src=d.source(), nums=Object.keys(src).map(Number).sort((a,b)=>a-b);
    const done=state[d.completed]||[];
    const n=nums.find(x=>!done.includes(x));
    if(n){
      title.textContent=`Avance em ${d.name}`;
      text.textContent=`${d.icon} Aula/etapa ${String(n).padStart(2,"0")} • teoria • vídeo • questões`;
      return;
    }
  }
  title.textContent="Preparação completa 🏆";
  text.textContent="Use simulados e revisões para manter o nível.";
}

const renderPerformanceLegacyV7=renderPerformance;
renderPerformance=function(){
  updateDashboard();
  setText("perfAverage",getAverageScoreV7()+"%");
  setText("perfErrors",state.errors.length);setText("perfXp",state.xp);setText("perfStreak",state.streak);
  const g=v7AllStats(), box=document.getElementById("v7SubjectPerformance");
  if(box) box.innerHTML=g.subs.map(s=>`
    <article><div><span>${s.icon}</span><div><b>${s.name}</b><small>${s.completed}/${s.total} etapas</small></div></div>
    <strong>${s.avg}%</strong><div class="bar"><i style="width:${s.pct}%"></i></div><p>${s.pct}% da trilha concluída</p></article>`).join("");
  const scored=g.subs.filter(s=>s.scores.length);
  const weak=scored.sort((a,b)=>a.avg-b.avg)[0];
  setText("v7WeakestSubject",weak?`${weak.icon} ${weak.name} está com a menor média registrada (${weak.avg}%). Priorize revisão e questões dessa matéria.`:"Faça provas para gerar seu diagnóstico por matéria.");

  const history=document.getElementById("scoreHistory");
  if(history){
    const rows=[];
    for(const d of V7_SUBJECTS){
      const src=d.source(), scores=state[d.scores]||{};
      Object.keys(scores).map(Number).sort((a,b)=>a-b).forEach(n=>{
        if(src[n])rows.push({subject:d.name,icon:d.icon,n,title:src[n].title,score:scores[n]});
      });
    }
    history.innerHTML=rows.length?rows.map(r=>`<div class="score-row"><span>${r.icon} ${r.subject} • ${String(r.n).padStart(2,"0")} • ${r.title}</span><strong>${r.score}%</strong></div>`).join(""):`<div class="empty-state"><strong>Nenhuma prova registrada</strong>Suas melhores notas aparecerão aqui.</div>`;
  }
};
window.renderPerformance=renderPerformance;

/* Caderno de erros: IDs únicos para todas as matérias */
function v7SubjectCode(s){return s==="Português"?"P":s==="Literatura"?"L":s==="Inglês"?"I":s==="Direito"?"D":"M";}
addError=function(lessonNumber,questionIndex,selectedIndex){
  const lesson=getLessonData(lessonNumber),q=lesson?.quiz?.[questionIndex]; if(!lesson||!q)return;
  const id=`${v7SubjectCode(currentSubject)}-${lessonNumber}-${questionIndex}`;
  state.errors=state.errors.filter(e=>e.id!==id);
  state.errors.push({id,subject:currentSubject,lessonNumber,lessonTitle:lesson.title,questionIndex,question:q.question,
    selectedText:q.options[selectedIndex],correctText:q.options[q.answer],explanation:q.explanation||"",tip:q.tip||"",addedAt:Date.now()});
  saveState();
};
removeError=function(lessonNumber,questionIndex){
  const id=`${v7SubjectCode(currentSubject)}-${lessonNumber}-${questionIndex}`;
  state.errors=state.errors.filter(e=>e.id!==id);saveState();
};
window.addError=addError;window.removeError=removeError;

let v7ErrorFilter="Todos";
function setErrorFilterV7(subject,btn){
  v7ErrorFilter=subject;
  document.querySelectorAll(".v7-error-filters button").forEach(b=>b.classList.remove("active"));
  btn?.classList.add("active");renderErrorNotebook();
}
window.setErrorFilterV7=setErrorFilterV7;
renderErrorNotebook=function(){
  const el=document.getElementById("errorNotebookList"), counter=document.getElementById("errorNotebookCounter");if(!el)return;
  const all=state.errors||[], list=v7ErrorFilter==="Todos"?all:all.filter(e=>e.subject===v7ErrorFilter);
  if(counter)counter.textContent=`${list.length} ${list.length===1?"questão":"questões"}`;
  if(!list.length){el.innerHTML=`<div class="empty-state"><strong>Nenhuma questão aqui 🎯</strong>${v7ErrorFilter==="Todos"?"Seu caderno está limpo.":"Nenhum erro registrado em "+v7ErrorFilter+"."}</div>`;return;}
  el.innerHTML=[...list].sort((a,b)=>b.addedAt-a.addedAt).map(e=>`
    <article class="error-card"><div class="error-meta">${e.subject.toUpperCase()} • AULA ${String(e.lessonNumber).padStart(2,"0")} • ${e.lessonTitle}</div>
    <h3>${e.question}</h3><div class="wrong-answer"><strong>Sua resposta:</strong> ${e.selectedText}</div>
    <div class="correct-answer"><strong>Correta:</strong> ${e.correctText}</div>
    ${e.explanation?`<div class="error-explanation"><strong>Por quê?</strong> ${e.explanation}</div>`:""}
    ${e.tip?`<div class="mini-tip"><strong>💡 Dica:</strong> ${e.tip}</div>`:""}</article>`).join("");
};
window.renderErrorNotebook=renderErrorNotebook;

/* Pool global de questões */
function getSimulationPoolV7(subject="Todos"){
  const pool=[];
  for(const d of V7_SUBJECTS){
    if(subject!=="Todos"&&subject!==d.name)continue;
    const src=d.source();
    Object.keys(src).forEach(k=>{
      const lesson=src[k];
      (lesson.quiz||[]).forEach((q,qi)=>pool.push({
        subject:d.name,lessonNumber:Number(k),lessonTitle:lesson.title,questionIndex:qi,
        question:q.question,options:[...q.options],answer:q.answer,explanation:q.explanation||"",tip:q.tip||""
      }));
    });
  }
  return pool;
}
getSimulationPoolV510=function(){return getSimulationPoolV7("Todos")};
window.getSimulationPoolV510=getSimulationPoolV510;

function v7ShuffleQuestion(q){
  const tagged=q.options.map((text,i)=>({text,correct:i===q.answer})).sort(()=>Math.random()-.5);
  return {...q,options:tagged.map(x=>x.text),answer:tagged.findIndex(x=>x.correct)};
}
function startGeneralSimulationV7(){
  const pool=getSimulationPoolV7("Todos");
  if(pool.length<50){alert("Ainda não há 50 questões disponíveis.");return;}
  simQuestionsV510=[...pool].sort(()=>Math.random()-.5).slice(0,50).map(v7ShuffleQuestion);
  simAnswersV510=new Array(50).fill(null);simIndexV510=0;simSecondsV510=5400;simStartedAtV510=Date.now();
  clearInterval(simTimerV510);setText("simTitleV510","Simulado Geral PMMG");showScreen("simulationScreenV510","navTrain");
  renderSimulationQuestionV510();updateSimulationClockV510();
  simTimerV510=setInterval(()=>{simSecondsV510--;updateSimulationClockV510();if(simSecondsV510<=0){clearInterval(simTimerV510);simTimerV510=null;finishSimulationV510(true)}},1000);
}
window.startGeneralSimulationV7=startGeneralSimulationV7;

function openQuestionBankV7(){
  const total=getSimulationPoolV7("Todos").length;setText("v7BankTotal",`${total} questões disponíveis`);
  showScreen("questionBankV7","navTrain");scrollTo(0,0);
}
function startQuestionBankV7(){
  const subject=document.getElementById("v7BankSubject")?.value||"Todos",count=Number(document.getElementById("v7BankCount")?.value||10);
  const pool=getSimulationPoolV7(subject);
  if(!pool.length){alert("Sem questões nessa matéria.");return;}
  simQuestionsV510=[...pool].sort(()=>Math.random()-.5).slice(0,Math.min(count,pool.length)).map(v7ShuffleQuestion);
  simAnswersV510=new Array(simQuestionsV510.length).fill(null);simIndexV510=0;simSecondsV510=Math.max(300,simQuestionsV510.length*90);simStartedAtV510=Date.now();
  clearInterval(simTimerV510);setText("simTitleV510",subject==="Todos"?"Banco misto":`Banco • ${subject}`);
  showScreen("simulationScreenV510","navTrain");renderSimulationQuestionV510();updateSimulationClockV510();
  simTimerV510=setInterval(()=>{simSecondsV510--;updateSimulationClockV510();if(simSecondsV510<=0){clearInterval(simTimerV510);simTimerV510=null;finishSimulationV510(true)}},1000);
}
window.openQuestionBankV7=openQuestionBankV7;window.startQuestionBankV7=startQuestionBankV7;

/* Configurado 2.0 agora usa todas as matérias quando "misto" */
if(typeof startConfiguredSimulationV622==="function"){
  const oldStartConfiguredV7=startConfiguredSimulationV622;
  startConfiguredSimulationV622=function(type){
    if(type==="portugues")return oldStartConfiguredV7(type);
    const count=Number(document.getElementById("sim621QuestionCount")?.value||10);
    const mins=Number(document.getElementById("sim621Minutes")?.value||15);
    const pool=getSimulationPoolV7("Todos");
    simQuestionsV510=[...pool].sort(()=>Math.random()-.5).slice(0,Math.min(count,pool.length)).map(v7ShuffleQuestion);
    simAnswersV510=new Array(simQuestionsV510.length).fill(null);simIndexV510=0;simSecondsV510=mins*60;simStartedAtV510=Date.now();
    clearInterval(simTimerV510);setText("simTitleV510","Misto • Todas as matérias");showScreen("simulationScreenV510","navTrain");
    renderSimulationQuestionV510();updateSimulationClockV510();
    simTimerV510=setInterval(()=>{simSecondsV510--;updateSimulationClockV510();if(simSecondsV510<=0){clearInterval(simTimerV510);simTimerV510=null;finishSimulationV510(true)}},1000);
  };
  window.startConfiguredSimulationV622=startConfiguredSimulationV622;
}

/* Reset V7: mantém perfil + LOGIN + preferências */
resetPreparation638=function(){
  if(!confirm("⚠️ Reiniciar toda a preparação?\n\nProgresso, notas, XP, sequência, simulados, revisões e erros serão apagados.\n\nPerfil, foto e acesso serão preservados."))return;
  if(!confirm("🚨 CONFIRMAÇÃO FINAL\n\nDeseja realmente voltar ao início dos estudos?"))return;
  const keepKeys=["pmmg_profile_v633","pmmg_study_goals_v636","pmmg_daily_goal","pmmg_exam_date","pmmg_auth_v6493"];
  const preserved={};keepKeys.forEach(k=>{const v=localStorage.getItem(k);if(v!==null)preserved[k]=v});
  const remove=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&(k==="missaoPMMGState"||k==="errorNotebook"||k==="xp"||k.startsWith("bestScore")||k.startsWith("pmmg_")))remove.push(k)}
  remove.forEach(k=>localStorage.removeItem(k));Object.entries(preserved).forEach(([k,v])=>localStorage.setItem(k,v));
  const fresh=defaultState();Object.keys(state).forEach(k=>delete state[k]);Object.assign(state,fresh);saveState();
  if(typeof renderProfile633==="function")renderProfile633();updateDashboard();alert("✅ Preparação reiniciada. Perfil e login foram mantidos.");goHome();
};
window.resetPreparation638=resetPreparation638;

document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{updateDashboard();if(document.getElementById("v7BankTotal"))setText("v7BankTotal",`${getSimulationPoolV7("Todos").length} questões disponíveis`)},80)});


/* ============================================================
   MISSÃO PMMG V7.1.0 — MOTOR ADAPTATIVO, REVISÃO E BACKUP
   ============================================================ */
const V71_REVIEW_KEY="pmmg_spaced_reviews_v71";
const V71_REVIEW_LOG_KEY="pmmg_review_log_v71";

function v71Read(key,fallback){
  try{const x=JSON.parse(localStorage.getItem(key));return x??fallback}catch(e){return fallback}
}
function v71Write(key,value){localStorage.setItem(key,JSON.stringify(value))}
function v71Today(d=new Date()){
  const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function v71DatePlus(days){
  const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+Number(days||0));return v71Today(d);
}
function v71SubjectDef(name){return (typeof V7_SUBJECTS!=="undefined"?V7_SUBJECTS:[]).find(x=>x.name===name)}
function v71Source(name){return v71SubjectDef(name)?.source?.()||{}}
function v71Scores(name){const d=v71SubjectDef(name);return d?(state[d.scores]||{}):{}}
function v71Completed(name){const d=v71SubjectDef(name);return d?(state[d.completed]||[]):[]}

/* ---------- Diagnóstico por assunto/aula ---------- */
function getWeakDataV71(){
  const rows=[];
  (typeof V7_SUBJECTS!=="undefined"?V7_SUBJECTS:[]).forEach(def=>{
    const src=def.source(),scores=state[def.scores]||{},completed=state[def.completed]||[];
    Object.keys(src).map(Number).filter(Number.isFinite).forEach(n=>{
      const lesson=src[n],score=typeof scores[n]==="number"?Number(scores[n]):null;
      const errs=(state.errors||[]).filter(e=>e.subject===def.name&&Number(e.lessonNumber)===n);
      const reviewed=v71Read("pmmg_reviewed_errors_v60",[]);
      const pending=errs.filter(e=>!reviewed.includes(e.id)).length;
      const attempts=score===null?0:1;
      let weakness=0;
      if(score!==null) weakness += Math.max(0,100-score)*0.72;
      if(pending) weakness += Math.min(28,pending*7);
      if(score===null && !pending) weakness=-1;
      rows.push({
        subject:def.name,icon:def.icon,lesson:n,title:lesson.title,
        score,attempts,pending,completed:completed.includes(n),
        weakness:Math.round(Math.max(-1,Math.min(100,weakness)))
      });
    });
  });
  return rows.sort((a,b)=>b.weakness-a.weakness||b.pending-a.pending||((a.score??101)-(b.score??101)));
}
getWeakData631=getWeakDataV71;
window.getWeakData631=getWeakDataV71;

function openSubjectLessonV71(subject,n){
  currentSubject=subject;
  if(subject==="Português"){openPortuguese();setTimeout(()=>openLesson(n),10);return}
  if(subject==="Literatura"){openLiterature();setTimeout(()=>window.openLiteratureLessonV6443?openLiteratureLessonV6443(n):openLesson(n),10);return}
  if(subject==="Inglês"){window.openEnglishV646?.();setTimeout(()=>window.openEnglishLessonV646?openEnglishLessonV646(n):openLesson(n),10);return}
  if(subject==="Direito"){window.openLawV648?.();setTimeout(()=>window.openLawLessonV648?openLawLessonV648(n):openLesson(n),10);return}
  if(subject==="Matemática"){window.openMathV650?.();setTimeout(()=>window.openMathLessonV650?openMathLessonV650(n):openLesson(n),10)}
}
window.openSubjectLessonV71=openSubjectLessonV71;

renderWeakPoints631=function(){
  const data=getWeakDataV71();
  const measured=data.filter(x=>x.score!==null||x.pending>0);
  const top=measured[0];
  const rank=document.getElementById("w631ranking"),recs=document.getElementById("w631recs");
  if(!rank||!recs)return;
  setText("w631title",top?`Prioridade: ${top.subject} • ${top.title}`:"Ainda faltam dados para o diagnóstico");
  setText("w631text",top?`${top.pending} erro(s) pendente(s) • melhor nota ${top.score===null?"não registrada":top.score+"%"}.`:"Faça provas para o sistema encontrar assuntos específicos que precisam de reforço.");
  rank.innerHTML=measured.length?measured.slice(0,15).map((x,i)=>`
    <article><div class="weak631top"><b>${i+1}. ${x.icon} ${x.subject} • ${x.title}</b><strong>${x.score===null?"—":x.score+"%"}</strong></div>
    <div class="weak631bar"><i style="width:${x.score===null?0:x.score}%"></i></div>
    <small>${x.pending} erro(s) pendente(s) • prioridade ${x.weakness>=55?"ALTA":x.weakness>=30?"MÉDIA":"BAIXA"}</small></article>`).join(""):'<div class="empty-state">Faça atividades para gerar seu ranking por assunto.</div>';
  recs.innerHTML=measured.length?measured.slice(0,5).map((x,i)=>`
    <article><span>${i===0?"🎯":i===1?"🧠":"📘"}</span><div><b>${x.subject} • ${x.title}</b><small>${x.score===null?"Sem nota":x.score+"%"} • ${x.pending} pendência(s)</small></div>
    <button onclick='openSubjectLessonV71(${JSON.stringify(x.subject)},${x.lesson})'>Estudar</button></article>`).join(""):'<div class="empty-state">As recomendações aparecerão conforme você estudar.</div>';
};
window.renderWeakPoints631=renderWeakPoints631;

/* ---------- Treino automático de pontos fracos ---------- */
function getWeakQuestionPoolV71(){
  const weak=getWeakDataV71().filter(x=>x.score!==null||x.pending>0).slice(0,8);
  const keys=new Set(weak.map(x=>`${x.subject}|${x.lesson}`));
  let pool=getSimulationPoolV7("Todos").filter(q=>keys.has(`${q.subject}|${q.lessonNumber}`));
  // Erros pendentes têm prioridade extra
  const pendingIds=new Set((state.errors||[]).map(e=>`${e.subject}|${e.lessonNumber}|${e.questionIndex}`));
  const priority=pool.filter(q=>pendingIds.has(`${q.subject}|${q.lessonNumber}|${q.questionIndex}`));
  const rest=pool.filter(q=>!pendingIds.has(`${q.subject}|${q.lessonNumber}|${q.questionIndex}`));
  return [...priority,...rest];
}
function trainWeakPointsV71(){
  let pool=getWeakQuestionPoolV71();
  if(!pool.length){alert("Ainda faltam resultados para montar um treino de pontos fracos. Faça algumas provas primeiro.");return}
  pool=[...pool].sort(()=>Math.random()-.5);
  const count=Math.min(15,pool.length);
  simQuestionsV510=pool.slice(0,count).map(v7ShuffleQuestion);
  simAnswersV510=new Array(count).fill(null);simIndexV510=0;simSecondsV510=Math.max(600,count*90);simStartedAtV510=Date.now();
  clearInterval(simTimerV510);setText("simTitleV510","Treino • Pontos Fracos");showScreen("simulationScreenV510","navTrain");
  renderSimulationQuestionV510();updateSimulationClockV510();
  simTimerV510=setInterval(()=>{simSecondsV510--;updateSimulationClockV510();if(simSecondsV510<=0){clearInterval(simTimerV510);simTimerV510=null;finishSimulationV510(true)}},1000);
}
window.trainWeakPointsV71=trainWeakPointsV71;

/* ---------- Revisão espaçada automática 1-7-30 ---------- */
function ensureSpacedReviewsV71(subject,lesson,title,score){
  if(!subject||!lesson)return;
  let list=v71Read(V71_REVIEW_KEY,[]);
  const now=Date.now();
  [1,7,30].forEach((days,idx)=>{
    const key=`${subject}|${lesson}|${days}`;
    if(!list.some(r=>r.key===key&&r.status!=="deleted")){
      list.push({id:now+idx,key,subject,lesson:Number(lesson),title:title||`Aula ${lesson}`,days,due:v71DatePlus(days),done:false,created:now,score:Number(score)||0});
    }
  });
  v71Write(V71_REVIEW_KEY,list);
}
function populateRevisionLessonsV71(){
  const subject=document.getElementById("revisionSubjectV71")?.value||"Português";
  const sel=document.getElementById("revisionLessonV60");if(!sel)return;
  const src=v71Source(subject);
  sel.innerHTML=Object.keys(src).map(Number).sort((a,b)=>a-b).map(n=>`<option value="${n}">Aula ${String(n).padStart(2,"0")} • ${src[n].title}</option>`).join("");
}
window.populateRevisionLessonsV71=populateRevisionLessonsV71;

function scheduleRevisionV71(){
  const subject=document.getElementById("revisionSubjectV71")?.value||"Português";
  const lesson=Number(document.getElementById("revisionLessonV60")?.value);
  const delay=Number(document.getElementById("revisionDelayV60")?.value||1);
  const src=v71Source(subject),title=src[lesson]?.title||`Aula ${lesson}`;
  let list=v71Read(V71_REVIEW_KEY,[]);
  list.push({id:Date.now(),key:`manual|${Date.now()}`,subject,lesson,title,days:delay,due:v71DatePlus(delay),done:false,created:Date.now(),score:null});
  v71Write(V71_REVIEW_KEY,list);renderRevisionScheduleV60();
  if(typeof logStudyEventV60==="function")logStudyEventV60("review","Revisão agendada",`${subject} • ${title} • ${delay} dia(s)`);
}
window.scheduleRevisionV71=scheduleRevisionV71;

renderRevisionScheduleV60=function(){
  populateRevisionLessonsV71();
  const box=document.getElementById("revisionListV60");if(!box)return;
  let list=v71Read(V71_REVIEW_KEY,[]).filter(r=>r.status!=="deleted").sort((a,b)=>(a.done-b.done)||a.due.localeCompare(b.due));
  const today=v71Today(),in7=v71DatePlus(7);
  setText("v71ReviewDue",list.filter(r=>!r.done&&r.due<=today).length);
  setText("v71ReviewWeek",list.filter(r=>!r.done&&r.due>today&&r.due<=in7).length);
  setText("v71ReviewDone",list.filter(r=>r.done).length);
  box.innerHTML=list.length?list.map(r=>{
    const due=r.due<=today&&!r.done;
    return `<article class="v60-list-item ${due?"v71-due":""}"><span class="icon">${r.done?"✅":due?"🔴":"🧠"}</span><div class="copy">
      <strong>${r.subject} • ${r.title}</strong><p>${r.done?"Concluída":"Revisar em "+new Date(r.due+"T12:00:00").toLocaleDateString("pt-BR")}</p>
      <em>${r.days?`ciclo ${r.days} dia(s)`:"manual"}</em></div>
      <button onclick="completeSpacedReviewV71(${r.id})">${r.done?"Reabrir":"Concluir"}</button></article>`;
  }).join(""):'<div class="empty-state">Nenhuma revisão programada. Ao fazer provas, o ciclo 1-7-30 será criado automaticamente.</div>';
};
window.renderRevisionScheduleV60=renderRevisionScheduleV60;

function completeSpacedReviewV71(id){
  let list=v71Read(V71_REVIEW_KEY,[]),r=list.find(x=>Number(x.id)===Number(id));if(!r)return;
  r.done=!r.done;r.completedAt=r.done?Date.now():null;v71Write(V71_REVIEW_KEY,list);
  if(r.done){
    const log=v71Read(V71_REVIEW_LOG_KEY,[]);log.unshift({subject:r.subject,lesson:r.lesson,title:r.title,date:Date.now(),cycle:r.days});v71Write(V71_REVIEW_LOG_KEY,log.slice(0,500));
    if(typeof logStudyEventV60==="function")logStudyEventV60("review","Revisão espaçada concluída",`${r.subject} • ${r.title}`);
  }
  renderRevisionScheduleV60();updateDashboard();
}
window.completeSpacedReviewV71=completeSpacedReviewV71;

// Hook results AFTER all previous result wrappers
const registerResultV71Base=registerResult;
registerResult=function(lessonNumber,score,approved){
  const subject=currentSubject,lesson=getLessonData(lessonNumber);
  const result=registerResultV71Base(lessonNumber,score,approved);
  // Toda prova cria o ciclo; notas baixas continuam aparecendo como ponto fraco.
  ensureSpacedReviewsV71(subject,lessonNumber,lesson?.title,score);
  return result;
};
window.registerResult=registerResult;

/* ---------- Missão diária adaptativa ---------- */
updateDailyMissionV7=function(){
  const title=document.getElementById("dailyMissionTitle"),text=document.getElementById("dailyMissionText");if(!title||!text)return;
  const reviews=v71Read(V71_REVIEW_KEY,[]),today=v71Today();
  const due=reviews.filter(r=>!r.done&&r.due<=today);
  if(due.length){
    title.textContent="Revisões vencidas para hoje";
    text.textContent=`🧠 ${due.length} revisão(ões) • priorize o ciclo antes de avançar`;
    return;
  }
  const weak=getWeakDataV71().find(x=>x.weakness>=40);
  if(weak){
    title.textContent=`Fortaleça ${weak.subject}`;
    text.textContent=`🎯 ${weak.title} • ${weak.score===null?"sem nota":weak.score+"%"} • ${weak.pending} erro(s)`;
    return;
  }
  for(const d of V7_SUBJECTS){
    const src=d.source(),nums=Object.keys(src).map(Number).sort((a,b)=>a-b),done=state[d.completed]||[];
    const n=nums.find(x=>!done.includes(x));
    if(n){title.textContent=`Avance em ${d.name}`;text.textContent=`${d.icon} ${src[n].title} • teoria • vídeo • questões`;return}
  }
  title.textContent="Preparação completa 🏆";text.textContent="Mantenha simulados e revisões em dia.";
};
window.updateDailyMissionV7=updateDailyMissionV7;

/* ---------- Índice de preparo V7.1 ---------- */
function getPreparationIndexV71(){
  const g=v7AllStats(),progress=g.total?g.completed/g.total*100:0;
  const lessonAvg=getAverageScoreV7();
  const sims=v71Read("pmmg_sim_history_v510",[]);
  const simRecent=sims.slice(0,10),simAvg=simRecent.length?simRecent.reduce((s,x)=>s+Number(x.score||0),0)/simRecent.length:0;
  const reviewed=v71Read("pmmg_reviewed_errors_v60",[]);
  const totalErrors=(state.errors||[]).length,reviewedErrors=(state.errors||[]).filter(e=>reviewed.includes(e.id)).length;
  const errorRecovery=totalErrors?Math.round(reviewedErrors/totalErrors*100):(g.completed?100:0);
  const rev=v71Read(V71_REVIEW_KEY,[]),today=v71Today(),due=rev.filter(r=>r.due<=today),doneDue=due.filter(r=>r.done).length;
  const reviewScore=due.length?Math.round(doneDue/due.length*100):(rev.length?100:0);
  const score=Math.round(progress*.25+lessonAvg*.25+simAvg*.20+errorRecovery*.15+reviewScore*.15);
  return {score,progress:Math.round(progress),lessonAvg,simAvg:Math.round(simAvg),errorRecovery,reviewScore};
}
function renderPreparationIndexV71(){
  const x=getPreparationIndexV71();
  setText("prepIndexValueV60",x.score);setText("preparationIndex",x.score);
  let label=x.score>=85?"Nível competitivo":x.score>=70?"Preparação avançada":x.score>=50?"Em evolução":x.score>=25?"Base em construção":"Início da preparação";
  setText("prepIndexLabelV60",label);
  setText("prepIndexTextV60","Índice de estudo: combina progresso, notas, simulados, recuperação de erros e revisões. Não é previsão de aprovação.");
  const box=document.getElementById("prepBreakdownV60");
  if(box)box.innerHTML=[
    ["Conteúdo concluído",x.progress],["Desempenho nas aulas",x.lessonAvg],["Simulados recentes",x.simAvg],
    ["Recuperação de erros",x.errorRecovery],["Revisões em dia",x.reviewScore]
  ].map(([n,v])=>`<article><div><b>${n}</b><strong>${v}%</strong></div><div class="bar"><i style="width:${v}%"></i></div></article>`).join("");
}
renderPreparationIndexV60=renderPreparationIndexV71;
window.renderPreparationIndexV60=renderPreparationIndexV71;

/* ---------- Plano inteligente V7.1 ---------- */
renderSmartPlan632=function(){
  const weak=getWeakDataV71().filter(x=>x.score!==null||x.pending>0)[0];
  const title=document.getElementById("p632title"),text=document.getElementById("p632text"),steps=document.getElementById("p632steps"),
        bar=document.getElementById("p632bar"),prog=document.getElementById("p632progress"),goalEl=document.getElementById("p632goal");
  if(!title||!steps)return;
  if(!weak){
    title.textContent="Comece pela primeira aula";
    text.textContent="Ainda faltam dados para personalizar o plano.";
    goalEl.textContent="Meta: criar sua primeira base de desempenho.";
    bar.style.width="0%";prog.textContent="0 de 3 etapas concluídas";
    steps.innerHTML='<article><span>📘</span><div><b>Estudar Português • Aula 01</b><small>Comece a gerar dados para o plano adaptativo.</small></div><button onclick="openSubjectLessonV71(\'Português\',1)">Estudar</button></article>';
    return;
  }
  title.textContent=`Fortalecer: ${weak.subject} • ${weak.title}`;
  text.textContent=`Melhor nota ${weak.score===null?"não registrada":weak.score+"%"} • ${weak.pending} erro(s) pendente(s).`;
  goalEl.textContent=`Meta: atingir 70%+ e zerar pendências neste assunto.`;
  const scoreOk=(weak.score??0)>=70,pendingOk=weak.pending===0;
  const done=(scoreOk?1:0)+(pendingOk?1:0);bar.style.width=Math.round(done/3*100)+"%";prog.textContent=`${done} de 3 etapas concluídas`;
  steps.innerHTML=`
    <article><span>📘</span><div><b>1. Reestudar ${weak.title}</b><small>Volte à teoria e à videoaula.</small></div><button onclick='openSubjectLessonV71(${JSON.stringify(weak.subject)},${weak.lesson})'>Estudar</button></article>
    <article><span>🧠</span><div><b>2. Corrigir erros pendentes</b><small>${weak.pending} item(ns) deste assunto ainda registrados.</small></div><button onclick="openErrorsProV60()">Revisar</button></article>
    <article><span>🎯</span><div><b>3. Treino adaptativo</b><small>Questões selecionadas dos seus assuntos mais fracos.</small></div><button onclick="trainWeakPointsV71()">Treinar</button></article>`;
};
window.renderSmartPlan632=renderSmartPlan632;

/* ---------- Caderno canônico: filtros por matéria + status ---------- */
let v71ProFilter="todos";
function filterErrorsProV60(filter,btn){
  v71ProFilter=filter;
  document.querySelectorAll("#errorsProScreenV60 .v60-filter-row button").forEach(b=>b.classList.remove("active"));btn?.classList.add("active");
  renderErrorsProV60(filter);
}
window.filterErrorsProV60=filterErrorsProV60;

function rebuildErrorFilterButtonsV71(){
  const row=document.querySelector("#errorsProScreenV60 .v60-filter-row");if(!row)return;
  row.innerHTML=`<button class="active" onclick="filterErrorsProV60('todos',this)">Todos</button>
    <button onclick="filterErrorsProV60('Português',this)">Português</button><button onclick="filterErrorsProV60('Literatura',this)">Literatura</button>
    <button onclick="filterErrorsProV60('Inglês',this)">Inglês</button><button onclick="filterErrorsProV60('Direito',this)">Direito</button>
    <button onclick="filterErrorsProV60('Matemática',this)">Matemática</button><button onclick="filterErrorsProV60('revisados',this)">Revisados</button>`;
}
renderErrorsProV60=function(filter=v71ProFilter){
  const all=(state.errors||[]),reviewed=v71Read("pmmg_reviewed_errors_v60",[]);
  const box=document.getElementById("errorsProListV60"),stats=document.getElementById("errorsProStatsV60");if(!box||!stats)return;
  let list=all;if(filter==="revisados")list=all.filter(e=>reviewed.includes(e.id));else if(filter!=="todos")list=all.filter(e=>e.subject===filter);
  const revisedCount=all.filter(e=>reviewed.includes(e.id)).length;
  stats.innerHTML=`<article><strong>${all.length}</strong><small>Total</small></article><article><strong>${revisedCount}</strong><small>Revisados</small></article><article><strong>${all.length-revisedCount}</strong><small>Pendentes</small></article>`;
  box.innerHTML=list.length?list.map(e=>`<article class="v60-list-item"><span class="icon">${reviewed.includes(e.id)?"✅":"❌"}</span><div class="copy">
    <strong>${e.subject||"Português"} • ${e.question||"Questão"}</strong><p><b>Sua resposta:</b> ${e.selectedText||""}</p><p><b>Correta:</b> ${e.correctText||""}</p>
    <em>Aula ${String(e.lessonNumber||"").padStart(2,"0")}</em></div><button onclick="toggleReviewedErrorV60('${e.id}')">${reviewed.includes(e.id)?"Pendente":"Revisado"}</button></article>`).join(""):'<div class="empty-state">Nenhuma questão neste filtro.</div>';
  const pending=all.length-revisedCount;setText("smartReviewPendingV619",pending?`${pending} erro(s) pendente(s)`:"Nenhuma pendência 🎯");
};
window.renderErrorsProV60=renderErrorsProV60;

/* ---------- Backup e restauração ---------- */
function exportBackupV71(){
  const data={format:"missao-pmmg-backup",version:"7.1.0",exportedAt:new Date().toISOString(),localStorage:{}};
  for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k)data.localStorage[k]=localStorage.getItem(k)}
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`missao-pmmg-backup-${v71Today()}.json`;
  document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);
}
window.exportBackupV71=exportBackupV71;

function importBackupV71(ev){
  const file=ev.target.files?.[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const data=JSON.parse(reader.result);
      if(data?.format!=="missao-pmmg-backup"||!data.localStorage||typeof data.localStorage!=="object")throw new Error("Formato inválido");
      if(!confirm("Importar este backup? Os dados atuais da preparação serão substituídos."))return;
      Object.keys(data.localStorage).forEach(k=>localStorage.setItem(k,String(data.localStorage[k])));
      alert("✅ Backup importado. A página será recarregada.");location.reload();
    }catch(e){alert("Não foi possível importar. Selecione um backup válido do Missão PMMG.")}
  };
  reader.readAsText(file);ev.target.value="";
}
window.importBackupV71=importBackupV71;

/* ---------- Atualização do painel ---------- */
const updateDashboardV71Base=updateDashboard;
updateDashboard=function(){
  updateDashboardV71Base();
  const x=getPreparationIndexV71();setText("preparationIndex",x.score);
  const reviews=v71Read(V71_REVIEW_KEY,[]),today=v71Today(),due=reviews.filter(r=>!r.done&&r.due<=today).length;
  const err=document.getElementById("errorCountValue");
  if(err)err.textContent=(state.errors||[]).length + (due?` +${due}`:"");
};
window.updateDashboard=updateDashboard;

/* Inicialização canônica */
document.addEventListener("DOMContentLoaded",()=>{
  setTimeout(()=>{
    rebuildErrorFilterButtonsV71();
    populateRevisionLessonsV71();
    updateDashboard();
  },120);
});


/* ============================================================
   MISSÃO PMMG V7.2.0 — SIMULADO REALISTA + RELATÓRIO PÓS-PROVA
   ============================================================ */
const V72_SIM_KEY="pmmg_sim_history_v72";
let v72LastSimulationMeta=null;

function v72Read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch(e){return fallback}}
function v72Write(key,val){localStorage.setItem(key,JSON.stringify(val))}

function v72StartExam(){
  const pool=getSimulationPoolV7("Todos");
  if(!pool.length){alert("Banco de questões indisponível.");return}
  // 50 questões balanceadas entre as cinco disciplinas existentes no projeto.
  // É um modo de treino PMMG do aplicativo; não afirma reproduzir um edital específico.
  const subjects=["Português","Literatura","Inglês","Direito","Matemática"];
  const target={Português:14,Literatura:6,Inglês:8,Direito:10,Matemática:12};
  let selected=[];
  subjects.forEach(s=>{
    const arr=pool.filter(q=>q.subject===s).sort(()=>Math.random()-.5);
    selected.push(...arr.slice(0,Math.min(target[s],arr.length)));
  });
  if(selected.length<50){
    const used=new Set(selected.map(q=>`${q.subject}|${q.lessonNumber}|${q.questionIndex}`));
    const extra=pool.filter(q=>!used.has(`${q.subject}|${q.lessonNumber}|${q.questionIndex}`)).sort(()=>Math.random()-.5);
    selected.push(...extra.slice(0,50-selected.length));
  }
  simQuestionsV510=selected.slice(0,50).map(v7ShuffleQuestion);
  simAnswersV510=new Array(simQuestionsV510.length).fill(null);
  simIndexV510=0;
  simSecondsV510=3*60*60; // janela de treino de 3h
  simStartedAtV510=Date.now();
  v72LastSimulationMeta={mode:"Simulado PMMG • 50 questões",startedAt:Date.now(),count:simQuestionsV510.length};
  clearInterval(simTimerV510);
  setText("simTitleV510","Simulado PMMG • Modo Prova");
  showScreen("simulationScreenV510","navTrain");
  renderSimulationQuestionV510();updateSimulationClockV510();
  simTimerV510=setInterval(()=>{
    simSecondsV510--;updateSimulationClockV510();
    if(simSecondsV510<=0){clearInterval(simTimerV510);simTimerV510=null;finishSimulationV510(true)}
  },1000);
}
window.v72StartExam=v72StartExam;

// Point the existing "general" simulation entry to the enhanced exam.
startGeneralSimulationV7=v72StartExam;
window.startGeneralSimulationV7=v72StartExam;

function v72AnalyzeSimulation(){
  const total=simQuestionsV510.length;
  if(!total)return null;
  const rows=simQuestionsV510.map((q,i)=>{
    const ans=simAnswersV510[i];
    const correct=ans===q.correct;
    return {...q,selected:ans,correctAnswer:q.correct,isCorrect:correct};
  });
  const correct=rows.filter(r=>r.isCorrect).length;
  const elapsed=Math.max(0,Math.round((Date.now()-(simStartedAtV510||Date.now()))/1000));
  const bySubject={};
  const byTopic={};
  rows.forEach(r=>{
    const s=r.subject||"Outros";
    bySubject[s]??={total:0,correct:0};
    bySubject[s].total++; if(r.isCorrect)bySubject[s].correct++;
    const topic=`${s}|${r.lessonNumber}|${r.lessonTitle||"Aula "+r.lessonNumber}`;
    byTopic[topic]??={subject:s,lesson:r.lessonNumber,title:r.lessonTitle||`Aula ${r.lessonNumber}`,total:0,correct:0};
    byTopic[topic].total++; if(r.isCorrect)byTopic[topic].correct++;
  });
  Object.values(bySubject).forEach(x=>x.pct=Math.round(x.correct/x.total*100));
  const topics=Object.values(byTopic).map(x=>({...x,pct:Math.round(x.correct/x.total*100)}))
    .sort((a,b)=>a.pct-b.pct||b.total-a.total);
  return {total,correct,wrong:total-correct,pct:Math.round(correct/total*100),elapsed,bySubject,topics,rows};
}

function v72FmtTime(sec){
  const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=sec%60;
  return h?`${h}h ${String(m).padStart(2,"0")}min`:`${m}min ${String(s).padStart(2,"0")}s`;
}

function v72SaveReport(r){
  const hist=v72Read(V72_SIM_KEY,[]);
  hist.unshift({
    id:Date.now(),date:new Date().toISOString(),mode:v72LastSimulationMeta?.mode||"Simulado",
    total:r.total,correct:r.correct,pct:r.pct,elapsed:r.elapsed,bySubject:r.bySubject,
    weakTopics:r.topics.slice(0,5)
  });
  v72Write(V72_SIM_KEY,hist.slice(0,100));
}

function v72RenderReport(r){
  let screen=document.getElementById("simulationReportV72");
  if(!screen){
    screen=document.createElement("section");
    screen.id="simulationReportV72";
    screen.className="screen";
    document.querySelector("main")?.appendChild(screen) || document.body.appendChild(screen);
  }
  const subjects=Object.entries(r.bySubject).sort((a,b)=>a[0].localeCompare(b[0]));
  const weak=r.topics.filter(x=>x.pct<70).slice(0,5);
  const unanswered=r.rows.filter(x=>x.selected===null||typeof x.selected==="undefined").length;
  screen.innerHTML=`
    <div class="v72-report-head">
      <button class="back" onclick="openTrainingHubV53?.()">←</button>
      <div><span class="kicker">RELATÓRIO PÓS-PROVA</span><h2>Simulado PMMG</h2></div>
    </div>
    <div class="v72-score-card">
      <span>DESEMPENHO GERAL</span><strong>${r.pct}%</strong>
      <p>${r.correct} acertos • ${r.wrong} erros${unanswered?` • ${unanswered} sem resposta`:""} • ${v72FmtTime(r.elapsed)}</p>
      <div class="v72-score-bar"><i style="width:${r.pct}%"></i></div>
    </div>
    <h3 class="v72-title">Desempenho por matéria</h3>
    <div class="v72-subject-grid">
      ${subjects.map(([name,x])=>`<article><b>${name}</b><strong>${x.pct}%</strong><small>${x.correct}/${x.total} acertos</small><div><i style="width:${x.pct}%"></i></div></article>`).join("")}
    </div>
    <h3 class="v72-title">Prioridades após a prova</h3>
    <div class="v72-priority-list">
      ${weak.length?weak.map((x,i)=>`<article><span>${i+1}</span><div><b>${x.subject} • ${x.title}</b><small>${x.correct}/${x.total} • ${x.pct}% de acerto</small></div><button onclick='openSubjectLessonV71(${JSON.stringify(x.subject)},${x.lesson})'>Reestudar</button></article>`).join(""):'<article class="v72-good">🏆 Nenhum assunto abaixo de 70% neste simulado.</article>'}
    </div>
    <div class="v72-report-actions">
      <button onclick="v72TrainFromLastReport()">🎯 Treinar erros deste simulado</button>
      <button onclick="openErrorsProV60()">📓 Abrir Caderno de Erros</button>
      <button onclick="v72StartExam()">🔄 Novo simulado</button>
    </div>
    <p class="v72-disclaimer">Este modo é uma ferramenta de treino do Missão PMMG. A distribuição usada no aplicativo não deve ser interpretada como reprodução de um edital específico.</p>`;
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  screen.classList.add("active");
}

function v72TrainFromLastReport(){
  const r=window.v72LastReport;
  if(!r)return;
  let wrong=r.rows.filter(x=>!x.isCorrect);
  if(!wrong.length){alert("Você não teve erros neste simulado. Excelente!");return}
  simQuestionsV510=wrong.slice(0,20).map(q=>v7ShuffleQuestion(q));
  simAnswersV510=new Array(simQuestionsV510.length).fill(null);simIndexV510=0;
  simSecondsV510=Math.max(600,simQuestionsV510.length*90);simStartedAtV510=Date.now();
  v72LastSimulationMeta={mode:"Treino dos erros do último simulado",startedAt:Date.now(),count:simQuestionsV510.length};
  clearInterval(simTimerV510);setText("simTitleV510","Treino • Erros do Simulado");
  showScreen("simulationScreenV510","navTrain");renderSimulationQuestionV510();updateSimulationClockV510();
  simTimerV510=setInterval(()=>{simSecondsV510--;updateSimulationClockV510();if(simSecondsV510<=0){clearInterval(simTimerV510);simTimerV510=null;finishSimulationV510(true)}},1000);
}
window.v72TrainFromLastReport=v72TrainFromLastReport;

// Wrap the final simulation completion function at the very end of the app.
const finishSimulationV72Base=finishSimulationV510;
finishSimulationV510=function(auto=false){
  const report=v72AnalyzeSimulation();
  // Let the original engine register its normal history/errors first.
  const originalResult=finishSimulationV72Base(auto);
  if(report){
    window.v72LastReport=report;
    v72SaveReport(report);
    setTimeout(()=>v72RenderReport(report),30);
  }
  return originalResult;
};
window.finishSimulationV510=finishSimulationV510;

function openSimulationHistoryV72(){
  const hist=v72Read(V72_SIM_KEY,[]);
  let screen=document.getElementById("simulationHistoryV72");
  if(!screen){
    screen=document.createElement("section");screen.id="simulationHistoryV72";screen.className="screen";
    document.querySelector("main")?.appendChild(screen)||document.body.appendChild(screen);
  }
  screen.innerHTML=`<div class="v72-report-head"><button class="back" onclick="openTrainingHubV53?.()">←</button><div><span class="kicker">EVOLUÇÃO</span><h2>Histórico de simulados</h2></div></div>
  <div class="v72-history">${hist.length?hist.map(x=>`<article><div><b>${new Date(x.date).toLocaleDateString("pt-BR")} • ${x.mode}</b><small>${x.correct}/${x.total} acertos • ${v72FmtTime(x.elapsed)}</small></div><strong>${x.pct}%</strong></article>`).join(""):'<div class="empty-state">Faça seu primeiro simulado para criar o histórico.</div>'}</div>`;
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));screen.classList.add("active");
}
window.openSimulationHistoryV72=openSimulationHistoryV72;

document.addEventListener("DOMContentLoaded",()=>{
  setTimeout(()=>{
    // Add history shortcut to training screen without duplicating if already present.
    const area=document.querySelector("#trainingHubV53 .tools, #trainingHubV53 .v53-grid, #trainHubV53 .tools, #trainHubV53 .v53-grid");
    if(area && !document.getElementById("v72HistoryShortcut")){
      /* V7.2.3: usa ARTICLE igual aos outros cards da grade.
         Assim o Histórico herda exatamente o mesmo tamanho, padding e tipografia. */
      const card=document.createElement("article");
      card.id="v72HistoryShortcut";
      card.setAttribute("role","button");
      card.setAttribute("tabindex","0");
      card.onclick=openSimulationHistoryV72;
      card.onkeydown=(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openSimulationHistoryV72();}};
      card.innerHTML="<b>📊 Histórico de simulados</b><p>Acompanhe sua evolução.</p>";
      area.appendChild(card);
    }
  },150);
});


/* V7.5.0 — CRONOGRAMA INTELIGENTE */
function v750Due(){
  let a=[];try{a=JSON.parse(localStorage.getItem("pmmg_spaced_reviews_v71")||"[]");if(!Array.isArray(a))a=[]}catch(e){}
  const t=new Date().toISOString().slice(0,10);return a.filter(x=>!x.done&&x.due&&x.due<=t)
}
function v750Weak(){try{return (typeof getWeakDataV71==="function"?getWeakDataV71():getWeakData631()).filter(x=>x.score!==null||x.pending>0)}catch(e){return []}}
function v750Next(){
  const o=[];(typeof V7_SUBJECTS!=="undefined"?V7_SUBJECTS:[]).forEach(d=>{
    const s=d.source?d.source():{}, ns=Object.keys(s).map(Number).sort((a,b)=>a-b), done=Array.isArray(state?.[d.completed])?state[d.completed].map(Number):[];
    const n=ns.find(x=>!done.includes(x));if(n)o.push({type:"lesson",subject:d.name,icon:d.icon||"📘",lesson:n,title:s[n]?.title||`Aula ${n}`,label:"Próxima aula",p:20})
  });return o
}
function v760SubjectScore(subject){
  const rows=v750Weak().filter(x=>x.subject===subject), scores=rows.map(x=>Number(x.score)).filter(Number.isFinite);
  return scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):null;
}
function v750Plan(){
  let a=[];
  v750Due().forEach(x=>{
    const days=x.due?Math.max(0,Math.floor((Date.now()-new Date(x.due+"T00:00:00").getTime())/86400000)):0;
    a.push({type:"review",subject:x.subject||"Revisão",icon:"🧠",lesson:+x.lesson||1,title:x.title||"Revisão programada",label:days?`Revisão vencida há ${days} dia(s)`:"Revisão para hoje",p:120+Math.min(days,30)});
  });
  v750Weak().forEach(x=>{
    const score=Number(x.score), weakness=Number.isFinite(score)?Math.max(0,100-score):(Number(x.weakness)||40);
    a.push({type:"weak",subject:x.subject,icon:x.icon||"🎯",lesson:x.lesson,title:x.title,label:Number.isFinite(score)?`Ponto fraco • ${score}%`:"Ponto fraco pendente",p:75+weakness});
  });
  v750Next().forEach(x=>{
    const avg=v760SubjectScore(x.subject), boost=Number.isFinite(avg)?Math.max(0,70-avg)/5:0;
    a.push({...x,p:25+boost});
  });
  a.sort((x,y)=>y.p-x.p);
  const seen=new Set(),out=[];
  for(const x of a){const k=x.subject+"|"+x.lesson;if(seen.has(k))continue;seen.add(k);out.push(x)}
  return out;
}
function v750Open(s,l,t){
  if(t==="review"&&typeof openRevisionScheduleV60==="function"){openRevisionScheduleV60();return}
  if(typeof openSubjectLessonV71==="function"){openSubjectLessonV71(s,l);return}
}
window.v750Open=v750Open;
function renderScheduleV750(){
  const p=v750Plan(),due=v750Due().length,weak=v750Weak().length;
  const title=document.getElementById("v750DailyTitle"),text=document.getElementById("v750DailyText"),steps=document.getElementById("v750DailySteps"),q=document.getElementById("v750Queue");if(!steps||!q)return;
  title.textContent=due?"Prioridade: revisões":weak?"Prioridade: pontos fracos":"Prioridade: avançar";
  text.textContent=due?`${due} revisão(ões) vencida(s). Elas vêm antes do conteúdo novo.`:weak?"O plano priorizou os assuntos com menor desempenho.":"Sem pendências críticas. Continue nas próximas aulas.";
  steps.innerHTML=p.slice(0,3).map((x,i)=>`<article><span class="v750-order">${i+1}</span><div><b>${x.icon} ${x.subject} • ${x.title}</b><small>${x.label}</small></div><button onclick='v750Open(${JSON.stringify(x.subject)},${x.lesson},${JSON.stringify(x.type)})'>Abrir</button></article>`).join("")||'<div class="empty-state">Nenhuma prioridade pendente.</div>';
  q.innerHTML=p.slice(3,9).map(x=>`<article><span>${x.icon}</span><div><b>${x.subject} • ${x.title}</b><small>${x.label}</small></div><button onclick='v750Open(${JSON.stringify(x.subject)},${x.lesson},${JSON.stringify(x.type)})'>→</button></article>`).join("")||'<div class="empty-state">Fila vazia.</div>'
}
window.renderScheduleV750=renderScheduleV750;
const v750Base=window.renderSmartPlan632;
if(typeof v750Base==="function"){window.renderSmartPlan632=function(){const r=v750Base.apply(this,arguments);try{renderScheduleV750()}catch(e){}return r};renderSmartPlan632=window.renderSmartPlan632}
document.addEventListener("DOMContentLoaded",()=>setTimeout(()=>{try{renderScheduleV750()}catch(e){}},180));

/* V7.6 — explicação segura do cronograma */
function renderPlanExplanationV760(){
  const due=v750Due().length,weak=v750Weak().length,next=v750Next().length;
  const put=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
  put("v760DueBadge",`${due} ${due===1?"revisão":"revisões"}`);
  put("v760WeakBadge",`${weak} ${weak===1?"ponto fraco":"pontos fracos"}`);
  put("v760NextBadge",`${next} ${next===1?"próxima aula":"próximas aulas"}`);
  let reason="Sem pendências críticas: o plano está priorizando avanço nas próximas aulas.";
  if(due)reason=`Há ${due} revisão(ões) vencida(s); elas recebem prioridade máxima antes de conteúdo novo.`;
  else if(weak)reason=`Há ${weak} ponto(s) fraco(s); as menores notas recebem prioridade primeiro.`;
  put("v760PlanReason",reason);
}
window.renderPlanExplanationV760=renderPlanExplanationV760;
const renderScheduleV760Base=window.renderScheduleV750;
if(typeof renderScheduleV760Base==="function"){
  window.renderScheduleV750=function(){const r=renderScheduleV760Base.apply(this,arguments);try{renderPlanExplanationV760()}catch(e){}return r};
  renderScheduleV750=window.renderScheduleV750;
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(()=>{try{renderPlanExplanationV760()}catch(e){}},220));


/* ============================================================
   MISSÃO PMMG V7.7.0 — MISSÃO SEMANAL
   Somente leitura dos dados já existentes. Não altera navegação.
   ============================================================ */
function v770ParseArray(key){
  try{const x=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(x)?x:[]}catch(e){return []}
}
function v770DateOf(x){
  const raw=x?.date||x?.createdAt||x?.timestamp||x?.finishedAt||x?.completedAt;
  const d=raw?new Date(raw):null;
  return d && Number.isFinite(d.getTime()) ? d : null;
}
function v770StartOfWeek(){
  const d=new Date(), day=(d.getDay()+6)%7;
  d.setHours(0,0,0,0); d.setDate(d.getDate()-day); return d;
}
function renderWeeklyMissionV770(){
  const start=v770StartOfWeek().getTime();

  // Activities recorded by the site's existing history.
  const hist=v770ParseArray("pmmg_history_v60");
  const weekActivities=hist.filter(x=>{const d=v770DateOf(x);return d&&d.getTime()>=start}).length;
  const studyDone=Math.min(3,weekActivities);

  // Simulations recorded by the existing V7.2 history.
  const sims=v770ParseArray("pmmg_sim_history_v72");
  const weekSims=sims.filter(x=>{const d=v770DateOf(x);return d&&d.getTime()>=start}).length;
  const simDone=Math.min(1,weekSims);

  // Existing adaptive schedule already knows overdue reviews.
  let due=0;
  try{due=typeof v750Due==="function"?v750Due().length:0}catch(e){}
  const reviewDone=due===0?1:0;

  const points=studyDone+simDone+reviewDone;
  const total=5;
  const pct=Math.round(points/total*100);
  const put=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};

  put("v770WeekPct",pct+"%");
  put("v770StudyGoal",`${studyDone}/3 concluída${studyDone===1?"":"s"}`);
  put("v770SimGoal",`${simDone}/1 concluído`);
  put("v770ReviewGoal",due===0?"Nenhuma revisão vencida":`${due} revisão(ões) vencida(s)`);
  put("v770StudyCheck",studyDone>=3?"✓":"○");
  put("v770SimCheck",simDone>=1?"✓":"○");
  put("v770ReviewCheck",reviewDone?"✓":"○");

  const bar=document.getElementById("v770WeekBar");
  if(bar)bar.style.width=pct+"%";

  let msg="Comece pelas prioridades do Plano de hoje.";
  if(pct===100)msg="Missão semanal concluída. Continue mantendo a preparação em dia.";
  else if(due>0)msg="Há revisão vencida: ela é a prioridade para avançar na missão semanal.";
  else if(studyDone<3)msg=`Faltam ${3-studyDone} atividade(s) de estudo para a meta semanal.`;
  else if(simDone<1)msg="Sua próxima meta semanal é realizar 1 simulado.";
  put("v770WeekMessage",msg);
}
window.renderWeeklyMissionV770=renderWeeklyMissionV770;

const renderScheduleV770Base=window.renderScheduleV750;
if(typeof renderScheduleV770Base==="function"){
  window.renderScheduleV750=function(){
    const r=renderScheduleV770Base.apply(this,arguments);
    try{renderWeeklyMissionV770()}catch(e){}
    return r;
  };
  renderScheduleV750=window.renderScheduleV750;
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(()=>{try{renderWeeklyMissionV770()}catch(e){}},260));


/* ============================================================
   MISSÃO PMMG V7.8.0 — MISSÃO DIÁRIA + SEQUÊNCIA AUTOMÁTICA
   Apenas leitura dos históricos existentes. Não altera navegação.
   ============================================================ */
function v780DayKey(d){
  const x=new Date(d); if(!Number.isFinite(x.getTime())) return "";
  const y=x.getFullYear(),m=String(x.getMonth()+1).padStart(2,"0"),day=String(x.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function v780TodayKey(){return v780DayKey(new Date())}
function v780HistoryArrays(){
  const keys=["pmmg_history_v60","pmmg_sim_history_v72"];
  const out=[];
  keys.forEach(k=>{try{const a=JSON.parse(localStorage.getItem(k)||"[]");if(Array.isArray(a))out.push(...a)}catch(e){}});
  return out;
}
function v780ItemDate(x){
  const raw=x?.date||x?.createdAt||x?.timestamp||x?.finishedAt||x?.completedAt;
  const d=raw?new Date(raw):null; return d&&Number.isFinite(d.getTime())?d:null;
}
function v780TodayActivity(){
  const today=v780TodayKey(), hist=v780HistoryArrays();
  const todays=hist.filter(x=>{const d=v780ItemDate(x);return d&&v780DayKey(d)===today});
  let study=false, practice=false;
  todays.forEach(x=>{
    const s=JSON.stringify(x).toLowerCase();
    if(s.includes("simulad")||s.includes("treino")||s.includes("quest")) practice=true;
    else study=true;
  });
  // A simulação registrada hoje conta como prática.
  try{
    const sims=JSON.parse(localStorage.getItem("pmmg_sim_history_v72")||"[]");
    if(Array.isArray(sims)&&sims.some(x=>{const d=v780ItemDate(x);return d&&v780DayKey(d)===today})) practice=true;
  }catch(e){}
  return {study,practice,any:study||practice};
}
function v780Streak(){
  const days=new Set();
  v780HistoryArrays().forEach(x=>{const d=v780ItemDate(x);if(d)days.add(v780DayKey(d))});
  let d=new Date(), streak=0;
  // Se ainda não houve atividade hoje, a sequência válida pode terminar ontem.
  if(!days.has(v780DayKey(d))) d.setDate(d.getDate()-1);
  while(days.has(v780DayKey(d))){
    streak++; d.setDate(d.getDate()-1);
  }
  return streak;
}
function renderDailyMissionV780(){
  const act=v780TodayActivity();
  let due=0;try{due=typeof v750Due==="function"?v750Due().length:0}catch(e){}
  const review=due===0;
  const done=(act.study?1:0)+(act.practice?1:0)+(review?1:0);
  const pct=Math.round(done/3*100);
  const put=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
  put("v780TodayPct",pct+"%");
  put("v780StudyToday",act.study?"Concluído hoje":"Pendente hoje");
  put("v780PracticeToday",act.practice?"Concluído hoje":"Pendente hoje");
  put("v780ReviewToday",review?"Revisões em dia":`${due} revisão(ões) vencida(s)`);
  put("v780StudyTodayCheck",act.study?"✓":"○");
  put("v780PracticeTodayCheck",act.practice?"✓":"○");
  put("v780ReviewTodayCheck",review?"✓":"○");
  const streak=v780Streak();
  put("v780StreakText",`${streak} ${streak===1?"dia":"dias"} de sequência`);
  const bar=document.getElementById("v780TodayBar");if(bar)bar.style.width=pct+"%";
  let msg="Comece pelo Plano de hoje para avançar na missão diária.";
  if(pct===100) msg="Missão de hoje concluída. Excelente: estudo, prática e revisão estão em dia.";
  else if(due>0) msg="Há revisão vencida. Resolva-a para completar a parte de revisão da missão.";
  else if(!act.study) msg="Sua próxima meta é registrar uma atividade de estudo hoje.";
  else if(!act.practice) msg="Estudo registrado. Agora falta uma atividade de prática.";
  put("v780TodayMessage",msg);
}
window.renderDailyMissionV780=renderDailyMissionV780;

const renderScheduleV780Base=window.renderScheduleV750;
if(typeof renderScheduleV780Base==="function"){
  window.renderScheduleV750=function(){
    const r=renderScheduleV780Base.apply(this,arguments);
    try{renderDailyMissionV780()}catch(e){}
    return r;
  };
  renderScheduleV750=window.renderScheduleV750;
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(()=>{try{renderDailyMissionV780()}catch(e){}},300));


/* ============================================================
   MISSÃO PMMG V7.9.0 — PROGRESSÃO, XP E PATENTES
   Calculado automaticamente a partir dos dados já registrados.
   ============================================================ */
function v790Array(key){
  try{const a=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(a)?a:[]}catch(e){return []}
}
function v790CompletedLessons(){
  let total=0;
  try{
    (typeof V7_SUBJECTS!=="undefined"?V7_SUBJECTS:[]).forEach(d=>{
      const a=state?.[d.completed]; if(Array.isArray(a)) total+=new Set(a.map(Number)).size;
    });
  }catch(e){}
  return total;
}
function v790ActiveDays(){
  const days=new Set();
  try{
    if(typeof v780HistoryArrays==="function"){
      v780HistoryArrays().forEach(x=>{
        const d=typeof v780ItemDate==="function"?v780ItemDate(x):null;
        if(d&&typeof v780DayKey==="function")days.add(v780DayKey(d));
      });
    }
  }catch(e){}
  return days.size;
}
function v790Stats(){
  const lessons=v790CompletedLessons();
  const sims=v790Array("pmmg_sim_history_v72").length;
  const days=v790ActiveDays();
  const xp=lessons*50+sims*25+days*10;
  return {lessons,sims,days,xp};
}
function v790RankFor(xp){
  const ranks=[
    {min:0,name:"Recruta",icon:"🛡️"},
    {min:250,name:"Aluno em formação",icon:"🎖️"},
    {min:600,name:"Preparação firme",icon:"⭐"},
    {min:1200,name:"Candidato avançado",icon:"🏅"},
    {min:2000,name:"Pronto para a missão",icon:"🚔"}
  ];
  let idx=0;for(let i=0;i<ranks.length;i++)if(xp>=ranks[i].min)idx=i;
  const cur=ranks[idx],next=ranks[idx+1]||null;
  return {cur,next,level:idx+1};
}
function renderProgressionV790(){
  const s=v790Stats(),r=v790RankFor(s.xp);
  const put=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
  put("v790Level",`Nível ${r.level}`);
  put("v790RankIcon",r.cur.icon);
  put("v790RankName",r.cur.name);
  put("v790TotalXp",`${s.xp} XP`);
  let pct=100,msg="Patente máxima de preparação alcançada.";
  if(r.next){
    const span=r.next.min-r.cur.min, earned=s.xp-r.cur.min;
    pct=Math.max(0,Math.min(100,Math.round(earned/span*100)));
    msg=`Faltam ${Math.max(0,r.next.min-s.xp)} XP para ${r.next.name}.`;
  }
  put("v790RankNext",msg);
  const bar=document.getElementById("v790XpBar");if(bar)bar.style.width=pct+"%";

  // Keep the existing header XP synchronized with the automatic calculation when possible.
  try{
    const xpEls=[...document.querySelectorAll(".xp-pill, [data-xp], #xpValue, #xpCount")];
    xpEls.forEach(e=>{if(e&&/xp/i.test(e.textContent||""))e.textContent=`⭐ ${s.xp} XP`});
  }catch(e){}
}
window.renderProgressionV790=renderProgressionV790;

const renderScheduleV790Base=window.renderScheduleV750;
if(typeof renderScheduleV790Base==="function"){
  window.renderScheduleV750=function(){
    const r=renderScheduleV790Base.apply(this,arguments);
    try{renderProgressionV790()}catch(e){}
    return r;
  };
  renderScheduleV750=window.renderScheduleV750;
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(()=>{try{renderProgressionV790()}catch(e){}},340));
