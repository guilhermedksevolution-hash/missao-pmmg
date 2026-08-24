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

const quiz3 = [
  {
    q: "Qual alternativa apresenta corretamente a diferença entre tipo textual e gênero textual?",
    a: [
      "Tipo e gênero são exatamente a mesma coisa",
      "Tipo é a forma de organização do texto; gênero é a forma concreta usada na comunicação",
      "Gênero existe apenas em textos literários",
      "Tipo textual depende apenas do tamanho do texto"
    ],
    c: 1,
    e: "Tipo textual é a estrutura predominante; gênero textual é a forma concreta de comunicação."
  },
  {
    q: "Um texto que apresenta uma sequência de acontecimentos é predominantemente:",
    a: [
      "Descritivo",
      "Injuntivo",
      "Narrativo",
      "Expositivo"
    ],
    c: 2,
    e: "A narração apresenta acontecimentos, ações e normalmente uma sequência de fatos."
  },
  {
    q: "O trecho “A sala era ampla, silenciosa e bem iluminada” é predominantemente:",
    a: [
      "Narrativo",
      "Descritivo",
      "Argumentativo",
      "Injuntivo"
    ],
    c: 1,
    e: "O trecho apresenta características da sala, portanto predomina a descrição."
  },
  {
    q: "Um manual que ensina passo a passo como utilizar um equipamento apresenta principalmente tipologia:",
    a: [
      "Injuntiva",
      "Narrativa",
      "Descritiva",
      "Argumentativa"
    ],
    c: 0,
    e: "A injunção apresenta instruções, orientações, ordens ou procedimentos."
  },
  {
    q: "No texto argumentativo, o autor procura principalmente:",
    a: [
      "Apresentar apenas características físicas",
      "Contar fatos sem apresentar ponto de vista",
      "Defender uma ideia utilizando argumentos",
      "Ensinar obrigatoriamente uma receita"
    ],
    c: 2,
    e: "A argumentação apresenta e sustenta uma posição, opinião ou tese."
  },
  {
    q: "Qual dos exemplos abaixo é um gênero textual?",
    a: [
      "Narração",
      "Descrição",
      "Notícia",
      "Argumentação"
    ],
    c: 2,
    e: "Notícia é um gênero textual. Narração, descrição e argumentação são tipos textuais."
  },
  {
    q: "Um texto pode apresentar mais de um tipo textual?",
    a: [
      "Não, nunca",
      "Sim, embora normalmente exista um tipo predominante",
      "Somente se tiver mais de dez páginas",
      "Apenas textos jornalísticos"
    ],
    c: 1,
    e: "Um texto pode combinar diferentes tipos, mas geralmente há uma estrutura predominante."
  },
  {
    q: "Um texto cujo objetivo principal é explicar determinado assunto tende a ser:",
    a: [
      "Expositivo",
      "Narrativo",
      "Injuntivo",
      "Descritivo"
    ],
    c: 0,
    e: "O texto expositivo apresenta, esclarece ou desenvolve informações e conceitos."
  },
  {
    q: "Qual pergunta ajuda a identificar um texto injuntivo?",
    a: [
      "O texto apresenta instruções ou orientações?",
      "O texto descreve exclusivamente uma paisagem?",
      "Há necessariamente um personagem principal?",
      "O autor está sempre contando uma lembrança?"
    ],
    c: 0,
    e: "Textos injuntivos orientam o leitor a realizar determinada ação."
  },
  {
    q: "Uma reportagem pode conter trechos narrativos, descritivos e expositivos?",
    a: [
      "Não",
      "Sim",
      "Somente se for uma reportagem policial",
      "Somente se estiver em um livro"
    ],
    c: 1,
    e: "Um mesmo gênero textual pode combinar diferentes tipos textuais."
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

  if (
    id === "home" ||
    id === "subjects" ||
    id === "progressPage" ||
    id === "lesson3"
  ) {
    sync();
  }

  if (id === "lesson3") {
    updateReadingUI();
  }

  window.scrollTo(0, 0);
}

/* =========================
   MISSÃO PRINCIPAL
========================= */

function updateMainMission() {
  const p1 = !!localStorage.getItem("passed1");
  const p2 = !!localStorage.getItem("passed2");
  const p3 = !!localStorage.getItem("passed3");

  const title = document.getElementById("mainMissionSubject");
  const topic = document.getElementById("mainMissionTopic");
  const button = document.getElementById("mainMissionBtn");
  const time = document.getElementById("mainMissionTime");

  if (!title || !topic || !button) return;

  if (!p1) {
    title.textContent = "📖 Português";
    topic.textContent = "Interpretação de texto • Aula 01";
    if (time) time.textContent = "⏱ 30–45 min";

    button.textContent = "COMEÇAR MISSÃO ▶";
    button.disabled = false;
    button.onclick = () => show("lesson1");

    return;
  }

  if (!p2) {
    title.textContent = "📖 Português";
    topic.textContent = "Ideia principal e inferência • Aula 02";
    if (time) time.textContent = "⏱ 30–45 min";

    button.textContent = "COMEÇAR MISSÃO ▶";
    button.disabled = false;
    button.onclick = () => show("lesson2");

    return;
  }

  if (!p3) {
    title.textContent = "📚 Português";
    topic.textContent = "Tipos e gêneros textuais • Aula 03";
    if (time) time.textContent = "⏱ 45–60 min";

    button.textContent = "COMEÇAR LEITURA ▶";
    button.disabled = false;
    button.onclick = () => show("lesson3");

    return;
  }

  title.textContent = "✅ Português";
  topic.textContent = "Aulas 01, 02 e 03 concluídas";
  if (time) time.textContent = "📚 trilha atual concluída";

  button.textContent = "PRÓXIMA AULA EM PREPARAÇÃO";
  button.disabled = true;
  button.onclick = null;
}

/* =========================
   PRÓXIMA MISSÃO
========================= */

function updateNextMission() {
  const p1 = !!localStorage.getItem("passed1");
  const p2 = !!localStorage.getItem("passed2");
  const p3 = !!localStorage.getItem("passed3");

  const title = document.getElementById("nextMissionTitle");
  const text = document.getElementById("nextMissionText");
  const button = document.getElementById("nextMissionBtn");

  if (!title || !text || !button) return;

  if (!p1) {
    title.textContent = "🔒 Aula 02 bloqueada";
    text.textContent = "Conclua a Aula 01 com pelo menos 70%.";
    button.textContent = "BLOQUEADA";
    button.disabled = true;
    return;
  }

  if (!p2) {
    title.textContent = "🔒 Aula 03 bloqueada";
    text.textContent = "Conclua a Aula 02 com pelo menos 70%.";
    button.textContent = "BLOQUEADA";
    button.disabled = true;
    return;
  }

  if (!p3) {
    title.textContent = "🔒 Aula 04 bloqueada";
    text.textContent = "Leia a Aula 03 e consiga pelo menos 70% na prova.";
    button.textContent = "BLOQUEADA";
    button.disabled = true;
    return;
  }

  title.textContent = "🚧 Aula 04 em preparação";
  text.textContent = "Você concluiu todo o conteúdo disponível até agora.";
  button.textContent = "EM BREVE";
  button.disabled = true;
}

/* =========================
   LEITURA DA AULA 03
========================= */

function finishReading(lesson) {
  if (lesson !== 3) return;

  localStorage.setItem("reading3Done", "1");

  updateReadingUI();

  const quizBtn = document.getElementById("quiz3Btn");

  if (quizBtn) {
    quizBtn.disabled = false;
    quizBtn.textContent = "📝 INICIAR PROVA DA AULA 03";
    quizBtn.classList.remove("secondary");
  }

  const finishBtn = document.getElementById("finishReadingBtn");

  if (finishBtn) {
    finishBtn.textContent = "✅ LEITURA CONCLUÍDA";
    finishBtn.disabled = true;
  }

  const readerAchievement = document.getElementById("aReader");

  if (readerAchievement) {
    readerAchievement.textContent =
      "✅ Completei minha primeira aula em modo leitura";
  }
}

function updateReadingUI() {
  const done = !!localStorage.getItem("reading3Done");

  const percent = document.getElementById("readingPercent");
  const bar = document.getElementById("readingBar");
  const status = document.getElementById("readingStatus");
  const quizBtn = document.getElementById("quiz3Btn");
  const finishBtn = document.getElementById("finishReadingBtn");

  if (done) {
    if (percent) percent.textContent = "100%";
    if (bar) bar.style.width = "100%";

    if (status) {
      status.textContent =
        "✅ Leitura concluída. A prova está liberada.";
    }

    if (quizBtn) {
      quizBtn.disabled = false;
      quizBtn.textContent = "📝 INICIAR PROVA DA AULA 03";
      quizBtn.classList.remove("secondary");
    }

    if (finishBtn) {
      finishBtn.disabled = true;
      finishBtn.textContent = "✅ LEITURA CONCLUÍDA";
    }
  } else {
    if (percent) percent.textContent = "0%";
    if (bar) bar.style.width = "0%";

    if (status) {
      status.textContent =
        "Leia os capítulos e conclua a leitura no final.";
    }

    if (quizBtn) {
      quizBtn.disabled = true;
      quizBtn.textContent = "🔒 PROVA BLOQUEADA";
    }
  }
}

/* Barra de leitura conforme rolagem */

window.addEventListener("scroll", () => {
  const lesson3 = document.getElementById("lesson3");

  if (
    !lesson3 ||
    !lesson3.classList.contains("active") ||
    localStorage.getItem("reading3Done")
  ) {
    return;
  }

  const rect = lesson3.getBoundingClientRect();

  const pageHeight =
    lesson3.scrollHeight - window.innerHeight;

  if (pageHeight <= 0) return;

  const traveled =
    Math.max(0, -rect.top);

  const pct =
    Math.min(
      99,
      Math.round((traveled / pageHeight) * 100)
    );

  const percent =
    document.getElementById("readingPercent");

  const bar =
    document.getElementById("readingBar");

  if (percent) {
    percent.textContent = `${pct}%`;
  }

  if (bar) {
    bar.style.width = `${pct}%`;
  }
});

/* =========================
   QUIZ
========================= */

function startQuiz(lesson) {
  if (
    lesson === 3 &&
    !localStorage.getItem("reading3Done")
  ) {
    alert("Conclua a leitura antes de fazer a prova.");
    return;
  }

  currentLesson = lesson;

  if (lesson === 1) questions = quiz1;
  if (lesson === 2) questions = quiz2;
  if (lesson === 3) questions = quiz3;

  qi = 0;
  score = 0;
  errors = [];
  answered = false;

  show("quiz");
  renderQ();
}

function backToLesson() {
  if (currentLesson === 1) show("lesson1");
  if (currentLesson === 2) show("lesson2");
  if (currentLesson === 3) show("lesson3");
}

function renderQ() {
  answered = false;

  const q = questions[qi];

  document.getElementById("qnum").textContent =
    `QUESTÃO ${qi + 1} DE ${questions.length}`;

  document.getElementById("scoreNow").textContent =
    `${score} acertos`;

  document.getElementById("qbar").style.width =
    `${((qi + 1) / questions.length) * 100}%`;

  document.getElementById("qtext").textContent =
    q.q;

  const box =
    document.getElementById("answers");

  box.innerHTML = "";

  q.a.forEach((text, index) => {
    const button =
      document.createElement("button");

    button.className = "answer";

    button.textContent =
      `${String.fromCharCode(65 + index)}. ${text}`;

    button.onclick =
      () => answer(index, button);

    box.appendChild(button);
  });

  document.getElementById("feedback")
    .classList.add("hidden");

  document.getElementById("next")
    .classList.add("hidden");

  document.getElementById("next").textContent =
    qi === questions.length - 1
      ? "VER RESULTADO"
      : "PRÓXIMA";
}

function answer(index, button) {
  if (answered) return;

  answered = true;

  const q = questions[qi];

  const buttons =
    [...document.querySelectorAll(".answer")];

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

  document.getElementById("feedback").textContent =
    q.e;

  document.getElementById("feedback")
    .classList.remove("hidden");

  document.getElementById("next")
    .classList.remove("hidden");

  document.getElementById("scoreNow").textContent =
    `${score} acertos`;
}

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
   HISTÓRICO / ERROS
========================= */

function saveAttempt() {
  let attempts = [];

  try {
    attempts =
      JSON.parse(
        localStorage.getItem("attemptHistory") || "[]"
      );
  } catch {
    attempts = [];
  }

  attempts.unshift({
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
  });

  attempts =
    attempts.slice(0, 20);

  localStorage.setItem(
    "attemptHistory",
    JSON.stringify(attempts)
  );

  let storedErrors = [];

  try {
    storedErrors =
      JSON.parse(
        localStorage.getItem("errors") || "[]"
      );
  } catch {
    storedErrors = [];
  }

  storedErrors = [
    ...errors,
    ...storedErrors
  ].slice(0, 40);

  localStorage.setItem(
    "errors",
    JSON.stringify(storedErrors)
  );
}

/* =========================
   RESULTADO
========================= */

function renderResult() {
  document.getElementById("resultPct").textContent =
    `${lastPct}%`;

  document.getElementById("resultScore").textContent =
    `${score}/${questions.length}`;

  const circle =
    document.querySelector(".circle");

  circle.className = "circle";

  if (lastPassed) {
    document.getElementById("resultTitle").textContent =
      "Missão aprovada 🟢";

    document.getElementById("resultMsg").textContent =
      "Você atingiu o mínimo de 70% e pode avançar.";

    document.getElementById("mastery").textContent =
      "DOMÍNIO: aprovado";

    document.getElementById("resultAction").textContent =
      "CONCLUIR E RECEBER XP";
  } else {
    circle.classList.add(
      lastPct >= 50
        ? "warn"
        : "fail"
    );

    document.getElementById("resultTitle").textContent =
      lastPct >= 50
        ? "Quase lá 🟠"
        : "Vamos reforçar a base 🔴";

    document.getElementById("resultMsg").textContent =
      "Você ainda não atingiu 70%. Seus erros foram salvos para revisão.";

    document.getElementById("mastery").textContent =
      "DOMÍNIO: refazer conteúdo";

    document.getElementById("resultAction").textContent =
      "REVISAR E TENTAR NOVAMENTE";
  }
}

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
  } catch {
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
      storedErrors.map((item, index) => `
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
      `).join("");
  }

  show("review");
}

/* =========================
   SINCRONIZAÇÃO
========================= */

function sync() {
  const xp =
    Number(
      localStorage.getItem("xp") || 0
    );

  const p1 =
    !!localStorage.getItem("passed1");

  const p2 =
    !!localStorage.getItem("passed2");

  const p3 =
    !!localStorage.getItem("passed3");

  const passedCount =
    (p1 ? 1 : 0) +
    (p2 ? 1 : 0) +
    (p3 ? 1 : 0);

  const progress =
    passedCount * 20;

  const xpEl =
    document.getElementById("xp");

  if (xpEl) {
    xpEl.textContent = xp;
  }

  const missions =
    document.getElementById("missions");

  if (missions) {
    missions.textContent =
      passedCount;
  }

  const general =
    document.getElementById("general");

  if (general) {
    general.textContent =
      `${progress}%`;
  }

  const pPct =
    document.getElementById("pPct");

  if (pPct) {
    pPct.textContent =
      `${progress}%`;
  }

  const pbar =
    document.getElementById("pbar");

  if (pbar) {
    pbar.style.width =
      `${progress}%`;
  }

  /* Status */

  const status1 =
    document.getElementById("status1");

  const status2 =
    document.getElementById("status2");

  const status3 =
    document.getElementById("status3");

  const status4 =
    document.getElementById("status4");

  if (status1) {
    status1.textContent =
      p1
        ? "✅ Concluída"
        : "▶ Atual";
  }

  if (status2) {
    status2.textContent =
      p2
        ? "✅ Concluída"
        : p1
        ? "▶ Atual"
        : "🔒";
  }

  if (status3) {
    status3.textContent =
      p3
        ? "✅ Concluída"
        : p2
        ? "▶ Atual"
        : "🔒";
  }

  if (status4) {
    status4.textContent =
      p3
        ? "🚧 Em breve"
        : "🔒";
  }

  /* Conquistas */

  if (p1) {
    const el =
      document.getElementById("aPass");

    if (el) {
      el.textContent =
        "✅ Aprovado na primeira aula";
    }
  }

  if (p1) {
    const el =
      document.getElementById("aSecond");

    if (el) {
      el.textContent =
        "✅ Desbloqueei a Aula 02";
    }
  }

  if (p2) {
    const el =
      document.getElementById("aThird");

    if (el) {
      el.textContent =
        "✅ Desbloqueei a Aula 03";
    }
  }

  if (localStorage.getItem("reading3Done")) {
    const el =
      document.getElementById("aReader");

    if (el) {
      el.textContent =
        "✅ Completei minha primeira aula em modo leitura";
    }
  }

  /* Histórico */

  let attempts = [];

  try {
    attempts =
      JSON.parse(
        localStorage.getItem("attemptHistory") || "[]"
      );
  } catch {
    attempts = [];
  }

  const history =
    document.getElementById("history");

  if (history) {
    if (!attempts.length) {
      history.textContent =
        "Nenhuma tentativa registrada.";
    } else {
      history.innerHTML =
        attempts.map(attempt => `
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

            • ${attempt.score}/${attempt.total}

            <br>

            ${
              attempt.passed
                ? "✅ APROVADO"
                : "❌ REFAZER"
            }

            <br>

            <small>
              ${attempt.date}
              •
              ${attempt.time}
            </small>

          </div>
        `).join("");
    }
  }

  /* Erros */

  let storedErrors = [];

  try {
    storedErrors =
      JSON.parse(
        localStorage.getItem("errors") || "[]"
      );
  } catch {
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

  updateMainMission();
  updateNextMission();
  updateReadingUI();
}

sync();
