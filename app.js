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
