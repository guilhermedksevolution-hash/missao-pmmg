const PASS_SCORE = 70;
const XP_PER_APPROVAL = 100;

let currentLessonNumber = 1;
let currentQuiz = null;
let lastResult = null;

const state = loadState();

function defaultState(){
  return {
    unlockedLessons:[1],
    completedLessons:[],
    scores:{},
    xp:0,
    streak:0,
    lastStudyDate:null,
    errors:[]
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
      errors:Array.isArray(parsed.errors)?parsed.errors:[]
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
function openPortuguese(){renderLessonList();updateDashboard();showScreen("lessonsScreen","navStudy");}
function openTips(){showScreen("tipsScreen");}
function openPerformance(){renderPerformance();showScreen("performanceScreen");}

function continueStudy(){
  const nums=getLessonNumbers();
  const firstPending=nums.find(n=>isLessonUnlocked(n)&&!isLessonCompleted(n));
  openLesson(firstPending || nums[nums.length-1] || 1);
}

function getLessonData(n){return typeof window.lessons!=="undefined"&&window.lessons[n]?window.lessons[n]:null;}
function getLessonNumbers(){return typeof window.lessons==="undefined"?[]:Object.keys(window.lessons).map(Number).filter(Number.isFinite).sort((a,b)=>a-b);}
function isLessonUnlocked(n){return n===1||state.unlockedLessons.includes(n);}
function isLessonCompleted(n){return state.completedLessons.includes(n);}

function renderLessonList(){
  const el=document.getElementById("lessonList");
  if(!el) return;
  el.innerHTML=getLessonNumbers().map(n=>{
    const l=getLessonData(n), unlocked=isLessonUnlocked(n), completed=isLessonCompleted(n), score=state.scores[n];
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

function startQuiz(){
  const lesson=getLessonData(currentLessonNumber);
  if(!lesson||!Array.isArray(lesson.quiz)||!lesson.quiz.length){alert("Esta aula ainda não possui prova.");return;}
  currentQuiz=lesson.quiz;
  document.getElementById("quizTitle").textContent=`Prova da Aula ${String(currentLessonNumber).padStart(2,"0")}`;
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
  const lesson=getLessonData(lessonNumber), q=lesson.quiz[questionIndex], id=`${lessonNumber}-${questionIndex}`;
  state.errors=state.errors.filter(e=>e.id!==id);
  state.errors.push({
    id,lessonNumber,lessonTitle:lesson.title,questionIndex,question:q.question,
    selectedText:q.options[selectedIndex],correctText:q.options[q.answer],
    explanation:q.explanation||"",tip:q.tip||"",addedAt:Date.now()
  });
  saveState();
}

function removeError(lessonNumber,questionIndex){
  const id=`${lessonNumber}-${questionIndex}`;
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
      <div class="error-meta">AULA ${String(e.lessonNumber).padStart(2,"0")} • ${e.lessonTitle}</div>
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
  const previous=typeof state.scores[lessonNumber]==="number"?state.scores[lessonNumber]:null;
  const firstApproval=approved&&!state.completedLessons.includes(lessonNumber);

  if(previous===null||score>previous) state.scores[lessonNumber]=score;

  if(approved){
    if(!state.completedLessons.includes(lessonNumber)) state.completedLessons.push(lessonNumber);
    if(firstApproval) state.xp+=XP_PER_APPROVAL;
    unlockNextLesson(lessonNumber);
  }

  saveState();updateDashboard();
}

function unlockNextLesson(n){
  const nums=getLessonNumbers(),idx=nums.indexOf(n),next=nums[idx+1];
  if(next&&!state.unlockedLessons.includes(next)) state.unlockedLessons.push(next);
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
        nav: getActiveNavV591()
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
// V5.9.2 — VOLTAR ESTÁVEL
// Usa uma rota-pai explícita para cada tela e fica disponível
// diretamente no window para funcionar com onclick no celular.
// ============================================================
window.goBackSmart = function(){
  const active = document.querySelector(".screen.active");
  const id = active ? active.id : "";

  const parentMap = {
    "subjectsScreen": ["homeScreen","navHome"],
    "lessonsScreen": ["subjectsScreen","navStudy"],
    "lessonScreen": ["lessonsScreen","navStudy"],
    "quizScreen": ["lessonScreen","navStudy"],
    "resultScreen": ["quizScreen","navTrain"],
    "correctionScreen": ["resultScreen","navTrain"],
    "errorsScreen": ["reviewHubV53","navReview"],
    "tipsScreen": ["studyHubV53","navStudy"],
    "performanceScreen": ["evolutionHubV53","navEvolution"],
    "studyHubScreen": ["homeScreen","navHome"],
    "professorScreen": ["homeScreen","navHome"],
    "trainingScreen": ["trainingHubV53","navTrain"],
    "simulationsScreen": ["trainingHubV53","navTrain"],
    "planScreen": ["studyHubV53","navStudy"],
    "quickReviewScreen": ["reviewHubV53","navReview"],
    "favoritesScreen": ["studyHubV53","navStudy"],
    "achievementsScreen": ["evolutionHubV53","navEvolution"],
    "searchScreen": ["studyHubV53","navStudy"],

    "studyHubV53": ["homeScreen","navHome"],
    "trainingHubV53": ["homeScreen","navHome"],
    "reviewHubV53": ["homeScreen","navHome"],
    "evolutionHubV53": ["homeScreen","navHome"],
    "utilityHubV53": ["studyHubV53","navStudy"],

    "summaryScreenV57": ["studyHubV53","navStudy"],
    "quickReviewScreenV58": ["reviewHubV53","navReview"],
    "achievementsScreenV59": ["evolutionHubV53","navEvolution"]
  };

  const target = parentMap[id] || ["homeScreen","navHome"];
  const screenId = target[0];
  const navId = target[1];

  // Mostra a tela diretamente sem depender da pilha antiga.
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const next = document.getElementById(screenId);

  if(next){
    next.classList.add("active");
  }else{
    const home = document.getElementById("homeScreen");
    if(home) home.classList.add("active");
  }

  if(typeof setMainNavActive === "function"){
    setMainNavActive(navId || "navHome");
  }

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
  // Usa o mesmo estado que alimenta a tela inicial.
  if(typeof updateDashboard === "function"){
    updateDashboard();
  }

  const nums = (typeof getLessonNumbers === "function") ? getLessonNumbers() : [];
  const validLessons = nums.filter(n => typeof getLessonData !== "function" || !!getLessonData(n));

  const completed = Array.isArray(state.completedLessons)
    ? state.completedLessons.filter(n => validLessons.includes(Number(n))).length
    : 0;

  const total = validLessons.length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  const scores = state && state.scores
    ? Object.values(state.scores).map(Number).filter(Number.isFinite)
    : [];

  const bestScore = scores.length ? Math.max(...scores) : 0;
  const xp = Number(state?.xp || 0);
  const streak = Math.max(1, Number(state?.streak || localStorage.getItem("pmmg_streak") || 1));

  const set = (id, value) => {
    const el = document.getElementById(id);
    if(el) el.textContent = value;
  };

  set("evoProgressV612", `${progress}%`);
  set("evoProgressSubV612", `${completed} de ${total} ${total === 1 ? "aula" : "aulas"}`);
  set("evoBestScoreV612", `${bestScore}%`);
  set("evoXpV612", String(xp));
  set("evoStreakV612", `${streak}🔥`);
  set("evoStreakSubV612", streak === 1 ? "dia ativo" : "dias ativos");
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
