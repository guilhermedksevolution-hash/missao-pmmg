
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
    lastStudyDate: null
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem("missaoPMMGState");
    if (!saved) return defaultState();

    const parsed = JSON.parse(saved);

    return {
      ...defaultState(),
      ...parsed,
      unlockedLessons: Array.isArray(parsed.unlockedLessons)
        ? parsed.unlockedLessons
        : [1],
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      scores: parsed.scores || {}
    };
  } catch (error) {
    console.error("Erro ao carregar progresso:", error);
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(
    "missaoPMMGState",
    JSON.stringify(state)
  );
}

function getAllScreens() {
  return document.querySelectorAll(".screen");
}

function showScreen(screenId) {
  getAllScreens().forEach((screen) => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(screenId);

  if (target) {
    target.classList.add("active");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}

function goHome() {
  updateDashboard();
  showScreen("homeScreen");
}

function openSubjects() {
  updateDashboard();
  showScreen("subjectsScreen");
}

function openPortuguese() {
  renderLessonList();
  updateDashboard();
  showScreen("lessonsScreen");
}

function getLessonData(lessonNumber) {
  if (
    typeof window.lessons !== "undefined" &&
    window.lessons[lessonNumber]
  ) {
    return window.lessons[lessonNumber];
  }

  return null;
}

function getLessonNumbers() {
  if (typeof window.lessons === "undefined") {
    return [];
  }

  return Object.keys(window.lessons)
    .map(Number)
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
}

function isLessonUnlocked(lessonNumber) {
  return (
    lessonNumber === 1 ||
    state.unlockedLessons.includes(lessonNumber)
  );
}

function isLessonCompleted(lessonNumber) {
  return state.completedLessons.includes(lessonNumber);
}

function renderLessonList() {
  const lessonList = document.getElementById("lessonList");

  if (!lessonList) return;

  const numbers = getLessonNumbers();

  if (numbers.length === 0) {
    lessonList.innerHTML = `
      <div class="lesson-card">
        <div class="lesson-card-content">
          <h3>Nenhuma aula encontrada</h3>
          <p>Verifique o arquivo lessons.js.</p>
        </div>
      </div>
    `;
    return;
  }

  lessonList.innerHTML = numbers.map((lessonNumber) => {
    const lesson = getLessonData(lessonNumber);
    const unlocked = isLessonUnlocked(lessonNumber);
    const completed = isLessonCompleted(lessonNumber);
    const score = state.scores[lessonNumber];

    let statusIcon = "🔒";

    if (completed) {
      statusIcon = "✅";
    } else if (unlocked) {
      statusIcon = "▶️";
    }

    const classes = [
      "lesson-card",
      !unlocked ? "locked" : "",
      completed ? "completed" : ""
    ].filter(Boolean).join(" ");

    const click = unlocked
      ? `onclick="openLesson(${lessonNumber})"`
      : "";

    let statusText = "Bloqueada";

    if (completed) {
      statusText = "Concluída";
    } else if (unlocked) {
      statusText = "Disponível";
    }

    const scoreBadge = typeof score === "number"
      ? `<span class="score-badge">Melhor nota: ${score}%</span>`
      : "";

    const lockMessage = !unlocked
      ? `<div class="lock-message">Atinga 70% na aula anterior para liberar.</div>`
      : "";

    return `
      <div class="${classes}" ${click}>
        <div class="lesson-number">
          ${String(lessonNumber).padStart(2, "0")}
        </div>

        <div class="lesson-card-content">
          <h3>${lesson.title}</h3>
          <p>${lesson.subtitle} • ${lesson.time}</p>
          <p>${statusText}</p>
          ${scoreBadge}
          ${lockMessage}
        </div>

        <div class="lesson-card-status">
          ${statusIcon}
        </div>
      </div>
    `;
  }).join("");
}

function openLesson(lessonNumber) {
  if (!isLessonUnlocked(lessonNumber)) {
    alert(
      `A Aula ${lessonNumber} ainda está bloqueada. ` +
      `Você precisa atingir pelo menos ${PASS_SCORE}% na aula anterior.`
    );
    return;
  }

  const lesson = getLessonData(lessonNumber);

  if (!lesson) {
    alert(
      `Conteúdo da Aula ${lessonNumber} não encontrado no lessons.js.`
    );
    return;
  }

  currentLessonNumber = lessonNumber;
  currentQuiz = null;

  const subtitle = document.getElementById("lessonSubtitle");
  const title = document.getElementById("lessonTitle");
  const time = document.getElementById("lessonTime");
  const content = document.getElementById("lessonContent");

  if (subtitle) subtitle.textContent = lesson.subtitle;
  if (title) title.textContent = lesson.title;
  if (time) time.textContent = lesson.time;
  if (content) content.innerHTML = lesson.content;

  updateStudyStreak();
  saveState();
  updateDashboard();

  showScreen("lessonScreen");
}

function backToCurrentLesson() {
  openLesson(currentLessonNumber);
}

function startQuiz() {
  const lesson = getLessonData(currentLessonNumber);

  if (
    !lesson ||
    !Array.isArray(lesson.quiz) ||
    lesson.quiz.length === 0
  ) {
    alert("Esta aula ainda não possui prova cadastrada.");
    return;
  }

  currentQuiz = lesson.quiz;

  const quizTitle = document.getElementById("quizTitle");
  const quizForm = document.getElementById("quizForm");

  if (quizTitle) {
    quizTitle.textContent =
      `Prova da Aula ${String(currentLessonNumber).padStart(2, "0")}`;
  }

  if (!quizForm) return;

  quizForm.innerHTML = currentQuiz.map((question, index) => {
    const options = question.options.map((option, optionIndex) => `
      <label class="answer-option">
        <input
          type="radio"
          name="question-${index}"
          value="${optionIndex}"
        >
        <span>${option}</span>
      </label>
    `).join("");

    return `
      <div class="question-card">
        <p class="question-number">
          QUESTÃO ${String(index + 1).padStart(2, "0")}
        </p>

        <h3>${question.question}</h3>

        <div class="answers">
          ${options}
        </div>
      </div>
    `;
  }).join("");

  showScreen("quizScreen");
}

function submitQuiz() {
  if (!currentQuiz || currentQuiz.length === 0) {
    alert("Nenhuma prova foi carregada.");
    return;
  }

  let correctAnswers = 0;
  let answered = 0;

  currentQuiz.forEach((question, index) => {
    const selected = document.querySelector(
      `input[name="question-${index}"]:checked`
    );

    if (selected) {
      answered += 1;

      if (Number(selected.value) === question.answer) {
        correctAnswers += 1;
      }
    }
  });

  if (answered < currentQuiz.length) {
    const unanswered = currentQuiz.length - answered;

    alert(
      `Você ainda deixou ${unanswered} ` +
      `${unanswered === 1 ? "questão" : "questões"} sem resposta.`
    );

    return;
  }

  const score = Math.round(
    (correctAnswers / currentQuiz.length) * 100
  );

  const approved = score >= PASS_SCORE;

  registerResult(
    currentLessonNumber,
    score,
    approved
  );

  showResult(
    score,
    correctAnswers,
    currentQuiz.length,
    approved
  );
}

function registerResult(
  lessonNumber,
  score,
  approved
) {
  const previousScore =
    typeof state.scores[lessonNumber] === "number"
      ? state.scores[lessonNumber]
      : null;

  const firstApproval =
    approved &&
    !state.completedLessons.includes(lessonNumber);

  if (
    previousScore === null ||
    score > previousScore
  ) {
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
  const lessonNumbers = getLessonNumbers();
  const currentIndex = lessonNumbers.indexOf(currentNumber);

  if (currentIndex === -1) return;

  const nextLesson = lessonNumbers[currentIndex + 1];

  if (
    nextLesson &&
    !state.unlockedLessons.includes(nextLesson)
  ) {
    state.unlockedLessons.push(nextLesson);
  }
}

function showResult(
  score,
  correct,
  total,
  approved
) {
  const icon = document.getElementById("resultIcon");
  const title = document.getElementById("resultTitle");
  const scoreEl = document.getElementById("resultScore");
  const message = document.getElementById("resultMessage");
  const stats = document.getElementById("resultStats");
  const buttons = document.getElementById("resultButtons");

  if (icon) {
    icon.textContent = approved ? "🏆" : "📚";
  }

  if (title) {
    title.textContent = approved
      ? "Missão cumprida!"
      : "Continue treinando";
  }

  if (scoreEl) {
    scoreEl.textContent = `${score}%`;
  }

  if (message) {
    message.textContent = approved
      ? `Você atingiu a meta de ${PASS_SCORE}% e concluiu esta aula.`
      : `Você precisa de pelo menos ${PASS_SCORE}% para concluir a aula. Revise o conteúdo e tente novamente.`;
  }

  if (stats) {
    stats.innerHTML = `
      <div class="result-stat">
        <strong>${correct}/${total}</strong>
        <span>Acertos</span>
      </div>

      <div class="result-stat">
        <strong>${score}%</strong>
        <span>Nota</span>
      </div>
    `;
  }

  if (buttons) {
    if (approved) {
      const nextLesson = getNextLessonNumber(
        currentLessonNumber
      );

      const nextButton = nextLesson
        ? `
          <button
            class="primary-btn full"
            onclick="openLesson(${nextLesson})"
          >
            Ir para a próxima aula
          </button>
        `
        : `
          <button
            class="primary-btn full"
            onclick="openPortuguese()"
          >
            Voltar para as aulas
          </button>
        `;

      buttons.innerHTML = `
        ${nextButton}

        <button
          class="secondary-btn"
          onclick="openLesson(${currentLessonNumber})"
        >
          Rever esta aula
        </button>

        <button
          class="secondary-btn"
          onclick="startQuiz()"
        >
          Refazer prova
        </button>
      `;
    } else {
      buttons.innerHTML = `
        <button
          class="primary-btn full"
          onclick="openLesson(${currentLessonNumber})"
        >
          Revisar conteúdo
        </button>

        <button
          class="secondary-btn"
          onclick="startQuiz()"
        >
          Refazer prova
        </button>

        <button
          class="secondary-btn"
          onclick="openPortuguese()"
        >
          Voltar para as aulas
        </button>
      `;
    }
  }

  showScreen("resultScreen");
}

function getNextLessonNumber(lessonNumber) {
  const numbers = getLessonNumbers();
  const index = numbers.indexOf(lessonNumber);

  if (index === -1) return null;

  return numbers[index + 1] || null;
}

function updateStudyStreak() {
  const today = new Date();
  const todayKey = toDateKey(today);

  if (!state.lastStudyDate) {
    state.streak = 1;
    state.lastStudyDate = todayKey;
    return;
  }

  if (state.lastStudyDate === todayKey) {
    return;
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = toDateKey(yesterday);

  if (state.lastStudyDate === yesterdayKey) {
    state.streak += 1;
  } else {
    state.streak = 1;
  }

  state.lastStudyDate = todayKey;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function updateDashboard() {
  const totalLessons = getLessonNumbers().length;
  const completed = state.completedLessons.filter(
    (lessonNumber) =>
      getLessonData(lessonNumber)
  );

  const completedCount = completed.length;

  const progress = totalLessons > 0
    ? Math.round(
        (completedCount / totalLessons) * 100
      )
    : 0;

  const approvedScores = completed
    .map((lessonNumber) => state.scores[lessonNumber])
    .filter((score) => typeof score === "number");

  const averageScore = approvedScores.length > 0
    ? Math.round(
        approvedScores.reduce(
          (sum, score) => sum + score,
          0
        ) / approvedScores.length
      )
    : 0;

  setText(
    "streakValue",
    state.streak
  );

  setText(
    "xpValue",
    `${state.xp} XP`
  );

  setText(
    "globalProgressText",
    `${progress}%`
  );

  setWidth(
    "globalProgressBar",
    progress
  );

  setText(
    "completedLessonsValue",
    completedCount
  );

  setText(
    "approvedTestsValue",
    completedCount
  );

  setText(
    "averageScoreValue",
    `${averageScore}%`
  );

  setText(
    "portugueseProgressText",
    `${completedCount} de ${totalLessons} aulas concluídas`
  );

  setWidth(
    "portugueseProgressBar",
    progress
  );
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function setWidth(id, percent) {
  const element = document.getElementById(id);

  if (element) {
    element.style.width =
      `${Math.min(100, Math.max(0, percent))}%`;
  }
}

function resetProgress() {
  const confirmed = confirm(
    "Tem certeza que deseja apagar todo o progresso da Missão PMMG?"
  );

  if (!confirmed) return;

  localStorage.removeItem("missaoPMMGState");
  location.reload();
}

function initializeApp() {
  if (
    typeof window.lessons === "undefined"
  ) {
    console.error(
      "O arquivo lessons.js não foi carregado corretamente."
    );
  }

  updateDashboard();
  renderLessonList();
  showScreen("homeScreen");
}

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);
