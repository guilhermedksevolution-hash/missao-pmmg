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
function openSubjects(){updateDashboard();showScreen("subjectsScreen","navSubjects");}
function openPortuguese(){renderLessonList();updateDashboard();showScreen("lessonsScreen","navMission");}
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
  showScreen("lessonScreen","navMission");
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
  showScreen("quizScreen","navMission");
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
