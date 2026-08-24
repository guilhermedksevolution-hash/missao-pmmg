const quiz1 = [
  {
    q: "Em uma questão de interpretação, a resposta deve se apoiar principalmente em:",
    a: [
      "Sua opinião pessoal",
      "O texto apresentado",
      "A alternativa mais longa",
      "O que outras pessoas pensam"
    ],
    c: 1,
    e: "A interpretação deve ser sustentada pelo texto."
  },
  {
    q: "A ideia principal de um texto é:",
    a: [
      "A mensagem central desenvolvida",
      "Sempre a primeira frase",
      "A palavra mais repetida",
      "A opinião do leitor"
    ],
    c: 0,
    e: "A ideia principal representa o núcleo da mensagem."
  },
  {
    q: "O texto diz: “Marina levou casaco porque a temperatura caiu.” O que é seguro concluir?",
    a: [
      "Marina comprou o casaco hoje",
      "A temperatura estava mais baixa",
      "Marina odeia frio",
      "Era madrugada"
    ],
    c: 1,
    e: "Somente a queda da temperatura está sustentada pela frase."
  },
  {
    q: "Antes de marcar uma alternativa, uma boa estratégia é:",
    a: [
      "Inventar detalhes",
      "Confirmar a resposta no texto",
      "Escolher rapidamente",
      "Ignorar o enunciado"
    ],
    c: 1,
    e: "Voltar ao texto ajuda a evitar conclusões sem fundamento."
  },
  {
    q: "Qual atitude pode causar erro de interpretação?",
    a: [
      "Identificar palavras-chave",
      "Ler o comando",
      "Responder pela própria opinião sem conferir o texto",
      "Procurar a ideia central"
    ],
    c: 2,
    e: "A opinião pessoal não substitui as informações fornecidas pelo texto."
  }
];

const quiz2 = [
  {
    q: "A ideia principal de um texto corresponde:",
    a: [
      "Ao detalhe menos importante",
      "À mensagem central",
      "Sempre ao título",
      "À opinião do leitor"
    ],
    c: 1,
    e: "A ideia principal organiza o sentido central do texto."
  },
  {
    q: "Inferir significa:",
    a: [
      "Copiar uma frase",
      "Inventar uma informação",
      "Concluir algo a partir de pistas do texto",
      "Ignorar o contexto"
    ],
    c: 2,
    e: "Inferência é uma conclusão baseada em evidências do texto."
  },
  {
    q: "“As ruas estavam molhadas e as pessoas carregavam guarda-chuvas.” Uma inferência possível é:",
    a: [
      "Provavelmente choveu",
      "Era meio-dia",
      "Todos estavam atrasados",
      "As ruas foram lavadas"
    ],
    c: 0,
    e: "A chuva é a conclusão mais diretamente sustentada pelas pistas."
  },
  {
    q: "Uma inferência correta precisa:",
    a: [
      "Ser baseada no texto",
      "Ser criativa",
      "Ser sempre explícita",
      "Contradizer o autor"
    ],
    c: 0,
    e: "Inferências válidas partem de pistas e contexto fornecidos."
  },
  {
    q: "Para localizar a ideia principal, ajuda perguntar:",
    a: [
      "Qual palavra é mais longa?",
      "Qual é a mensagem central?",
      "Quantas linhas há?",
      "Quem publicou primeiro?"
    ],
    c: 1,
    e: "Perguntar pela mensagem central ajuda a encontrar a ideia principal."
  }
];

let currentLesson = 1;
let questions = [];
let qi = 0;
let score = 0;
let errors = [];
let answered = false;
let lastPassed = false;
let lastPct = 0;

/* =========================
   NAVEGAÇÃO
========================= */

function show(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }

  document.querySelectorAll("nav button").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === id
    );
  });

  /* Atualiza os dados sempre que abrir progresso */
  if (id === "progressPage") {
    sync();
  }

  window.scrollTo(0, 0);
}

/* =========================
   INICIAR PROVA
========================= */

function startQuiz(lesson) {
  currentLesson = lesson;

  questions =
    lesson === 1
      ? quiz1
      : quiz2;

  qi = 0;
  score = 0;
  errors = [];
  answered = false;

  show("quiz");

  renderQ();
}

function backToLesson() {
  show(
    currentLesson === 1
      ? "lesson1"
      : "lesson2"
  );
}

/* =========================
   MOSTRAR QUESTÃO
========================= */

function renderQ() {
  answered = false;

  const q = questions[qi];

  const qnum =
    document.getElementById("qnum");

  const scoreNow =
    document.getElementById("scoreNow");

  const qbar =
    document.getElementById("qbar");

  const qtext =
    document.getElementById("qtext");

  const answersBox =
    document.getElementById("answers");

  const feedback =
    document.getElementById("feedback");

  const next =
    document.getElementById("next");

  qnum.textContent =
    `QUESTÃO ${qi + 1} DE ${questions.length}`;

  scoreNow.textContent =
    `${score} acertos`;

  qbar.style.width =
    `${((qi + 1) / questions.length) * 100}%`;

  qtext.textContent =
    q.q;

  answersBox.innerHTML = "";

  q.a.forEach((text, index) => {
    const button =
      document.createElement("button");

    button.className =
      "answer";

    button.textContent =
      `${String.fromCharCode(65 + index)}. ${text}`;

    button.onclick =
      () => answer(index, button);

    answersBox.appendChild(button);
  });

  feedback.classList.add("hidden");

  next.classList.add("hidden");

  next.textContent =
    qi === questions.length - 1
      ? "VER RESULTADO"
      : "PRÓXIMA";
}

/* =========================
   RESPONDER
========================= */

function answer(index, button) {
  if (answered) return;

  answered = true;

  const q =
    questions[qi];

  const buttons = [
    ...document.querySelectorAll(".answer")
  ];

  buttons.forEach(btn => {
    btn.disabled = true;
  });

  if (index === q.c) {
    score++;

    button.classList.add("ok");
  } else {
    button.classList.add("no");

    if (buttons[q.c]) {
      buttons[q.c].classList.add("ok");
    }

    errors.push({
      lesson: currentLesson,
      q: q.q,
      exp: q.e
    });
  }

  document.getElementById("feedback")
    .textContent = q.e;

  document.getElementById("feedback")
    .classList.remove("hidden");

  document.getElementById("next")
    .classList.remove("hidden");

  document.getElementById("scoreNow")
    .textContent = `${score} acertos`;
}

/* =========================
   PRÓXIMA QUESTÃO
========================= */

function nextQ() {
  if (qi < questions.length - 1) {
    qi++;

    renderQ();

    return;
  }

  lastPct =
    Math.round(
      (score / questions.length) * 100
    );

  lastPassed =
    lastPct >= 70;

  saveAttempt();

  renderResult();

  show("result");
}

/* =========================
   SALVAR TENTATIVA
========================= */

function saveAttempt() {
  let attempts = [];

  try {
    attempts =
      JSON.parse(
        localStorage.getItem("attemptHistory") || "[]"
      );
  } catch (error) {
    attempts = [];
  }

  const attempt = {
    lesson: currentLesson,
    pct: lastPct,
    score: score,
    total: questions.length,
    passed: lastPassed,
    date: new Date().toLocaleDateString("pt-BR"),
    time: new Date().toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    )
  };

  attempts.unshift(attempt);

  attempts =
    attempts.slice(0, 15);

  localStorage.setItem(
    "attemptHistory",
    JSON.stringify(attempts)
  );

  /* Salvar erros */

  let storedErrors = [];

  try {
    storedErrors =
      JSON.parse(
        localStorage.getItem("errors") || "[]"
      );
  } catch (error) {
    storedErrors = [];
  }

  storedErrors = [
    ...errors,
    ...storedErrors
  ].slice(0, 30);

  localStorage.setItem(
    "errors",
    JSON.stringify(storedErrors)
  );
}

/* =========================
   RESULTADO
========================= */

function renderResult() {
  document.getElementById("resultPct")
    .textContent =
    `${lastPct}%`;

  document.getElementById("resultScore")
    .textContent =
    `${score}/${questions.length}`;

  const circle =
    document.querySelector(".circle");

  circle.className =
    "circle";

  if (lastPassed) {
    document.getElementById("resultTitle")
      .textContent =
      "Missão aprovada 🟢";

    document.getElementById("resultMsg")
      .textContent =
      "Você atingiu o mínimo de 70% e pode avançar.";

    document.getElementById("mastery")
      .textContent =
      "DOMÍNIO: aprovado";

    document.getElementById("resultAction")
      .textContent =
      "CONCLUIR E RECEBER XP";
  } else {
    circle.classList.add(
      lastPct >= 50
        ? "warn"
        : "fail"
    );

    document.getElementById("resultTitle")
      .textContent =
      lastPct >= 50
        ? "Quase lá 🟠"
        : "Vamos reforçar a base 🔴";

    document.getElementById("resultMsg")
      .textContent =
      "Você ainda não atingiu 70%. Seus erros foram salvos para revisão.";

    document.getElementById("mastery")
      .textContent =
      "DOMÍNIO: refazer conteúdo";

    document.getElementById("resultAction")
      .textContent =
      "REVISAR E TENTAR NOVAMENTE";
  }
}

/* =========================
   FINALIZAR RESULTADO
========================= */

function finishResult() {
  if (lastPassed) {
    const key =
      `passed${currentLesson}`;

    if (!localStorage.getItem(key)) {
      const currentXP =
        Number(
          localStorage.getItem("xp") || 0
        );

      localStorage.setItem(
        "xp",
        currentXP + 100
      );

      localStorage.setItem(
        key,
        "1"
      );
    }

    if (currentLesson === 1) {
      localStorage.setItem(
        "lesson2Unlocked",
        "1"
      );
    }

    sync();

    show("progressPage");
  } else {
    sync();

    showReview();
  }
}

/* =========================
   CADERNO DE ERROS
========================= */

function showReview() {
  let storedErrors = [];

  try {
    storedErrors =
      JSON.parse(
        localStorage.getItem("errors") || "[]"
      );
  } catch (error) {
    storedErrors = [];
  }

  const reviewList =
    document.getElementById("reviewList");

  if (!reviewList) return;

  if (!storedErrors.length) {
    reviewList.innerHTML =
      '<div class="card">Nenhum erro registrado.</div>';
  } else {
    reviewList.innerHTML =
      storedErrors
        .map((item, index) => {
          return `
            <div class="card reviewItem">

              <b>
                ${index + 1}. ${item.q}
              </b>

              <p class="muted">
                📚 Aula ${item.lesson}
              </p>

              <p class="muted">
                ${item.exp}
              </p>

            </div>
          `;
        })
        .join("");
  }

  show("review");
}

/* =========================
   ATUALIZAR PROGRESSO
========================= */

function sync() {
  const currentXP =
    Number(
      localStorage.getItem("xp") || 0
    );

  const passed1 =
    !!localStorage.getItem("passed1");

  const passed2 =
    !!localStorage.getItem("passed2");

  const lesson2Unlocked =
    !!localStorage.getItem("lesson2Unlocked");

  const passedCount =
    (passed1 ? 1 : 0) +
    (passed2 ? 1 : 0);

  const progress =
    passedCount * 20;

  /* XP */

  const xpEl =
    document.getElementById("xp");

  if (xpEl) {
    xpEl.textContent =
      currentXP;
  }

  /* Missões */

  const missionsEl =
    document.getElementById("missions");

  if (missionsEl) {
    missionsEl.textContent =
      passedCount;
  }

  /* Progresso geral */

  const generalEl =
    document.getElementById("general");

  if (generalEl) {
    generalEl.textContent =
      `${progress}%`;
  }

  /* Português */

  const pPctEl =
    document.getElementById("pPct");

  if (pPctEl) {
    pPctEl.textContent =
      `${progress}%`;
  }

  const pbar =
    document.getElementById("pbar");

  if (pbar) {
    pbar.style.width =
      `${progress}%`;
  }

  /* Status Aula 01 */

  const status1 =
    document.getElementById("status1");

  if (status1) {
    status1.textContent =
      passed1
        ? "✅ Aprovada"
        : "Em andamento";
  }

  /* Status Aula 02 */

  const status2 =
    document.getElementById("status2");

  if (status2) {
    status2.textContent =
      passed2
        ? "✅ Aprovada"
        : lesson2Unlocked
        ? "🔓 Liberada"
        : "🔒";
  }

  /* Próxima missão */

  const nextMissionTitle =
    document.getElementById(
      "nextMissionTitle"
    );

  const nextMissionText =
    document.getElementById(
      "nextMissionText"
    );

  const nextMissionBtn =
    document.getElementById(
      "nextMissionBtn"
    );

  if (nextMissionTitle) {
    nextMissionTitle.textContent =
      lesson2Unlocked
        ? "🔓 Aula 02 liberada"
        : "🔒 Aula 02 bloqueada";
  }

  if (nextMissionText) {
    nextMissionText.textContent =
      lesson2Unlocked
        ? "Ideia principal e inferência já está disponível."
        : "Acerte pelo menos 70% na Aula 01 para desbloquear.";
  }

  if (nextMissionBtn) {
    nextMissionBtn.disabled =
      !lesson2Unlocked;

    nextMissionBtn.textContent =
      lesson2Unlocked
        ? "COMEÇAR AULA 02"
        : "BLOQUEADA";
  }

  /* Conquistas */

  const aPass =
    document.getElementById("aPass");

  const aSecond =
    document.getElementById("aSecond");

  if (passed1) {
    if (aPass) {
      aPass.textContent =
        "✅ Aprovado na primeira aula";
    }

    if (aSecond) {
      aSecond.textContent =
        "✅ Desbloqueei a Aula 02";
    }
  }

  /* =========================
     HISTÓRICO
  ========================= */

  let attempts = [];

  try {
    attempts =
      JSON.parse(
        localStorage.getItem("attemptHistory") || "[]"
      );
  } catch (error) {
    attempts = [];
  }

  const historyBox =
    document.getElementById("history");

  if (historyBox) {
    if (!attempts.length) {
      historyBox.textContent =
        "Nenhuma tentativa registrada.";
    } else {
      historyBox.innerHTML =
        attempts
          .map(attempt => {
            const result =
              attempt.passed
                ? "✅ APROVADO"
                : "❌ REFAZER";

            return `
              <div style="
                padding:14px 0;
                border-bottom:1px solid #21382f;
              ">

                <b>
                  📚 Aula ${attempt.lesson}
                </b>

                <br><br>

                Nota:
                <b>${attempt.pct}%</b>

                •

                ${attempt.score}/${attempt.total}

                <br>

                ${result}

                <br>

                <small>
                  ${attempt.date}
                  •
                  ${attempt.time}
                </small>

              </div>
            `;
          })
          .join("");
    }
  }

  /* =========================
     ERROS
  ========================= */

  let storedErrors = [];

  try {
    storedErrors =
      JSON.parse(
        localStorage.getItem("errors") || "[]"
      );
  } catch (error) {
    storedErrors = [];
  }

  const errorBook =
    document.getElementById("errorBook");

  if (errorBook) {
    errorBook.textContent =
      storedErrors.length
        ? `${storedErrors.length} erro(s) salvo(s) para revisão.`
        : "Nenhum erro registrado.";
  }
}

/* =========================
   INICIALIZAÇÃO
========================= */

sync();
