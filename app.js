const PASS_SCORE = 70;
const XP_PER_APPROVAL = 100;

let currentLessonNumber = 1;
let currentQuiz = null;

const state = loadState();

function defaultState() {
  return {
    unlockedLessons: [1],
    completedLessons: [],
    scores: {},
    xp: 0,
    streak: 0,
    lastStudyDate: null,
    errors: []
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem("missaoPMMGState");
    if (!raw) return defaultState();

    const parsed = JSON.parse(raw);

    return {
      ...defaultState(),
      ...parsed,
      unlockedLessons: Array.isArray(parsed.unlockedLessons) ? parsed.unlockedLessons : [1],
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      scores: parsed.scores || {},
      errors: Array.isArray(parsed.errors) ? parsed.errors : []
    };
  } catch (e) {
    console.error("Erro ao carregar progresso:", e);
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem("missaoPMMGState", JSON.stringify(state));
}

function showScreen(id, nav = "") {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));

  const screen = document.getElementById(id);
  if (screen) screen.classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  if (nav) {
    const btn = document.getElementById(nav);
    if (btn) btn.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  updateDashboard();
  showScreen("homeScreen", "navHome");
}

function openSubjects() {
  updateDashboard();
  showScreen("subjectsScreen", "navSubjects");
}

function openPortuguese() {
  renderLessonList();
  updateDashboard();
  showScreen("lessonsScreen", "navMission");
}

function openErrorNotebook() {
  renderErrorNotebook();
  updateDashboard();
  showScreen("errorsScreen", "navErrors");
}

function getLessonData(n) {
  return (typeof window.lessons !== "undefined" && window.lessons[n])
    ? window.lessons[n]
    : null;
}

function getLessonNumbers() {
  if (typeof window.lessons === "undefined") return [];
  return Object.keys(window.lessons).map(Number).filter(Number.isFinite).sort((a,b) => a-b);
}

function isLessonUnlocked(n) {
  return n === 1 || state.unlockedLessons.includes(n);
}

function isLessonCompleted(n) {
  return state.completedLessons.includes(n);
}

function renderLessonList() {
  const el = document.getElementById("lessonList");
  if (!el) return;

  const numbers = getLessonNumbers();

  el.innerHTML = numbers.map(n => {
    const lesson = getLessonData(n);
    const unlocked = isLessonUnlocked(n);
    const completed = isLessonCompleted(n);
    const score = state.scores[n];

    return `
      <div class="lesson-card ${!unlocked ? "locked" : ""} ${completed ? "completed" : ""}"
           ${unlocked ? `onclick="openLesson(${n})"` : ""}>
        <div class="lesson-number">${String(n).padStart(2,"0")}</div>
        <div class="lesson-card-content">
          <h3>${lesson.title}</h3>
          <p>${lesson.subtitle} • ${lesson.time}</p>
          <p>${completed ? "Concluída" : unlocked ? "Disponível" : "Bloqueada"}</p>
          ${typeof score === "number" ? `<span class="score-badge">Melhor nota: ${score}%</span>` : ""}
          ${!unlocked ? `<div class="lock-message">Atinga 70% na aula anterior para liberar.</div>` : ""}
        </div>
        <div class="lesson-card-status">${completed ? "✓" : unlocked ? "›" : "🔒"}</div>
      </div>
    `;
  }).join("");
}

function openLesson(n) {
  if (!isLessonUnlocked(n)) return;

  const lesson = getLessonData(n);
  if (!lesson) {
    alert(`Conteúdo da Aula ${n} não encontrado.`);
    return;
  }

  currentLessonNumber = n;
  currentQuiz = null;

  document.getElementById("lessonSubtitle").textContent = lesson.subtitle;
  document.getElementById("lessonTitle").textContent = lesson.title;
  document.getElementById("lessonTime").textContent = lesson.time;
  document.getElementById("lessonContent").innerHTML = lesson.content;

  updateStudyStreak();
  saveState();
  updateDashboard();

  showScreen("lessonScreen", "navMission");
}

function backToCurrentLesson() {
  openLesson(currentLessonNumber);
}

function startQuiz() {
  const lesson = getLessonData(currentLessonNumber);
  if (!lesson || !Array.isArray(lesson.quiz) || lesson.quiz.length === 0) {
    alert("Esta aula ainda não possui prova.");
    return;
  }

  currentQuiz = lesson.quiz;
  document.getElementById("quizTitle").textContent =
    `Prova da Aula ${String(currentLessonNumber).padStart(2,"0")}`;

  document.getElementById("quizForm").innerHTML = currentQuiz.map((q, i) => `
    <div class="question-card">
      <div class="question-number">QUESTÃO ${String(i+1).padStart(2,"0")}</div>
      <h3>${q.question}</h3>
      <div class="answers">
        ${q.options.map((opt, oi) => `
          <label class="answer-option">
            <input type="radio" name="question-${i}" value="${oi}">
            <span>${opt}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `).join("");

  showScreen("quizScreen", "navMission");
}

function submitQuiz() {
  if (!currentQuiz) return;

  let correct = 0;
  let answered = 0;

  currentQuiz.forEach((q, i) => {
    const selected = document.querySelector(`input[name="question-${i}"]:checked`);
    if (!selected) return;

    answered++;
    const selectedIndex = Number(selected.value);

    if (selectedIndex === q.answer) {
      correct++;
      removeError(currentLessonNumber, i);
    } else {
      addError(currentLessonNumber, i, selectedIndex);
    }
  });

  if (answered < currentQuiz.length) {
    alert(`Você ainda deixou ${currentQuiz.length - answered} questão(ões) sem resposta.`);
    return;
  }

  const score = Math.round((correct / currentQuiz.length) * 100);
  const approved = score >= PASS_SCORE;

  registerResult(currentLessonNumber, score, approved);
  showResult(score, correct, currentQuiz.length, approved);
}

function addError(lessonNumber, questionIndex, selectedIndex) {
  const lesson = getLessonData(lessonNumber);
  if (!lesson) return;

  const q = lesson.quiz[questionIndex];

  const id = `${lessonNumber}-${questionIndex}`;

  state.errors = state.errors.filter(e => e.id !== id);

  state.errors.push({
    id,
    lessonNumber,
    lessonTitle: lesson.title,
    questionIndex,
    question: q.question,
    selectedIndex,
    selectedText: q.options[selectedIndex],
    correctIndex: q.answer,
    correctText: q.options[q.answer],
    addedAt: Date.now()
  });

  saveState();
}

function removeError(lessonNumber, questionIndex) {
  const id = `${lessonNumber}-${questionIndex}`;
  state.errors = state.errors.filter(e => e.id !== id);
  saveState();
}

function renderErrorNotebook() {
  const el = document.getElementById("errorNotebookList");
  if (!el) return;

  if (!state.errors.length) {
    el.innerHTML = `
      <div class="empty-state">
        <strong>Seu caderno está limpo 🎯</strong>
        Continue fazendo provas. As questões erradas aparecerão aqui automaticamente.
      </div>
    `;
    return;
  }

  const sorted = [...state.errors].sort((a,b) => b.addedAt - a.addedAt);

  el.innerHTML = sorted.map(e => `
    <article class="error-card">
      <div class="error-meta">
        AULA ${String(e.lessonNumber).padStart(2,"0")} • ${e.lessonTitle}
      </div>

      <h3>${e.question}</h3>

      <div class="wrong-answer">
        <strong>Sua resposta:</strong> ${e.selectedText}
      </div>

      <div class="correct-answer">
        <strong>Resposta correta:</strong> ${e.correctText}
      </div>
    </article>
  `).join("");
}

function registerResult(lessonNumber, score, approved) {
  const previousScore = typeof state.scores[lessonNumber] === "number"
    ? state.scores[lessonNumber]
    : null;

  const firstApproval = approved && !state.completedLessons.includes(lessonNumber);

  if (previousScore === null || score > previousScore) {
    state.scores[lessonNumber] = score;
  }

  if (approved) {
    if (!state.completedLessons.includes(lessonNumber)) {
      state.completedLessons.push(lessonNumber);
    }

    if (firstApproval) {
      state.xp += XP_PER_APPROVAL;
    }

    unlockNextLesson(lessonNumber);
  }

  saveState();
  updateDashboard();
}

function unlockNextLesson(currentNumber) {
  const nums = getLessonNumbers();
  const idx = nums.indexOf(currentNumber);
  const next = nums[idx + 1];

  if (next && !state.unlockedLessons.includes(next)) {
    state.unlockedLessons.push(next);
  }
}

function showResult(score, correct, total, approved) {
  document.getElementById("resultIcon").textContent = approved ? "🏆" : "📚";
  document.getElementById("resultTitle").textContent =
    approved ? "Missão cumprida!" : "Continue treinando";

  document.getElementById("resultScore").textContent = `${score}%`;

  document.getElementById("resultMessage").textContent = approved
    ? "Você atingiu a meta e concluiu a aula. A próxima etapa foi liberada."
    : "Você precisa de pelo menos 70%. Revise o conteúdo e tente novamente.";

  document.getElementById("resultStats").innerHTML = `
    <div class="result-stat">
      <strong>${correct}/${total}</strong>
      <span>Acertos</span>
    </div>
    <div class="result-stat">
      <strong>${state.errors.length}</strong>
      <span>No caderno de erros</span>
    </div>
  `;

  const next = getNextLessonNumber(currentLessonNumber);

  document.getElementById("resultButtons").innerHTML = approved
    ? `
      ${next ? `<button class="btn btn-primary full-width" onclick="openLesson(${next})">Próxima aula</button>` : ""}
      <button class="secondary-btn" onclick="openErrorNotebook()">Abrir Caderno de Erros</button>
      <button class="secondary-btn" onclick="openLesson(${currentLessonNumber})">Rever aula</button>
      <button class="secondary-btn" onclick="startQuiz()">Refazer prova</button>
    `
    : `
      <button class="btn btn-primary full-width" onclick="openLesson(${currentLessonNumber})">Revisar conteúdo</button>
      <button class="secondary-btn" onclick="openErrorNotebook()">Abrir Caderno de Erros</button>
      <button class="secondary-btn" onclick="startQuiz()">Refazer prova</button>
    `;

  showScreen("resultScreen", "navMission");
}

function getNextLessonNumber(n) {
  const nums = getLessonNumbers();
  const idx = nums.indexOf(n);
  return idx >= 0 ? (nums[idx + 1] || null) : null;
}

function updateStudyStreak() {
  const today = toDateKey(new Date());

  if (!state.lastStudyDate) {
    state.streak = 1;
    state.lastStudyDate = today;
    return;
  }

  if (state.lastStudyDate === today) return;

  const y = new Date();
  y.setDate(y.getDate() - 1);

  state.streak = state.lastStudyDate === toDateKey(y)
    ? state.streak + 1
    : 1;

  state.lastStudyDate = today;
}

function toDateKey(d) {
  return [
    d.getFullYear(),
    String(d.getMonth()+1).padStart(2,"0"),
    String(d.getDate()).padStart(2,"0")
  ].join("-");
}

function updateDashboard() {
  const total = getLessonNumbers().length;
  const completed = state.completedLessons.filter(n => !!getLessonData(n));
  const count = completed.length;
  const progress = total ? Math.round((count / total) * 100) : 0;

  const scoreValues = Object.values(state.scores).filter(v => typeof v === "number");
  const average = scoreValues.length
    ? Math.round(scoreValues.reduce((a,b) => a+b, 0) / scoreValues.length)
    : 0;

  setText("streakValue", state.streak);
  setText("xpValue", `${state.xp} XP`);
  setText("globalProgressText", `${progress}%`);
  setText("averageScoreValue", `${average}%`);
  setText("completedLessonsValue", count);
  setText("errorCountValue", state.errors.length);
  setText("progressSubtitle", `${count} de ${total} aulas concluídas`);
  setText("portugueseProgressText", `${count} de ${total} aulas concluídas`);

  setWidth("globalProgressBar", progress);
  setWidth("portugueseProgressBar", progress);
  setWidth("portugueseProgressBar2", progress);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setWidth(id, value) {
  const el = document.getElementById(id);
  if (el) el.style.width = `${Math.max(0, Math.min(100, value))}%`;
}

function initializeApp() {
  updateDashboard();
  renderLessonList();
  showScreen("homeScreen", "navHome");
}

document.addEventListener("DOMContentLoaded", initializeApp);
