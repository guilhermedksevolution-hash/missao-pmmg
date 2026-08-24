/* =========================================================
   MISSÃO PMMG v0.5
   SISTEMA DE ESTUDOS
========================================================= */


/* =========================================================
   AULA 01 — INTERPRETAÇÃO DE TEXTO
========================================================= */

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
    e: "A interpretação deve ser sustentada pelas informações presentes no texto."
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
    e: "A ideia principal representa o núcleo da mensagem desenvolvida pelo texto."
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
    e: "A única conclusão diretamente sustentada é que houve queda de temperatura."
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
    e: "Voltar ao texto ajuda a verificar se a alternativa realmente possui fundamento."
  },

  {
    q: "Qual atitude pode causar erro de interpretação?",
    a: [
      "Identificar palavras-chave",
      "Ler o comando",
      "Responder pela opinião pessoal sem conferir o texto",
      "Procurar a ideia central"
    ],
    c: 2,
    e: "A opinião pessoal não substitui aquilo que o texto efetivamente apresenta."
  }
];


/* =========================================================
   AULA 02 — IDEIA PRINCIPAL E INFERÊNCIA
========================================================= */

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
    e: "A ideia principal organiza o sentido central desenvolvido pelo texto."
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
    e: "Inferência é uma conclusão construída a partir de informações e pistas presentes no texto."
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
    e: "A presença das ruas molhadas e dos guarda-chuvas sustenta a hipótese de chuva."
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
    e: "Uma inferência válida precisa possuir sustentação nas informações fornecidas."
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
    e: "Perguntar qual mensagem o texto desenvolve ajuda a identificar sua ideia central."
  }
];


/* =========================================================
   AULA 03 — TIPOS E GÊNEROS TEXTUAIS
   15 QUESTÕES
========================================================= */

const quiz3 = [

  /* 01 */

  {
    q: "A respeito de tipologia textual e gênero textual, assinale a alternativa correta:",
    a: [
      "São expressões completamente sinônimas",
      "Tipologia refere-se à organização textual, enquanto gênero está ligado às formas concretas de comunicação",
      "Gênero textual existe apenas em textos literários",
      "Tipologia depende exclusivamente do tamanho do texto"
    ],
    c: 1,
    e: "Tipologia textual diz respeito à forma predominante de organização do texto. Gênero textual corresponde às formas concretas de comunicação, como notícia, receita, manual e reportagem."
  },


  /* 02 */

  {
    q: "Um trecho que apresenta uma sequência de acontecimentos tende a possuir caráter predominantemente:",
    a: [
      "Descritivo",
      "Narrativo",
      "Injuntivo",
      "Expositivo"
    ],
    c: 1,
    e: "A narração caracteriza-se pela apresentação de acontecimentos, ações ou transformações dentro de determinada sequência."
  },


  /* 03 */

  {
    q: "Leia: “O corredor era estreito, silencioso, pouco iluminado e possuía paredes antigas.” A tipologia predominante é:",
    a: [
      "Narrativa",
      "Argumentativa",
      "Descritiva",
      "Injuntiva"
    ],
    c: 2,
    e: "O trecho apresenta características do corredor. Não existe uma sequência relevante de acontecimentos, portanto predomina a descrição."
  },


  /* 04 */

  {
    q: "Em qual alternativa predomina uma sequência narrativa?",
    a: [
      "A casa era antiga e possuía grandes janelas.",
      "Abra a embalagem e retire cuidadosamente o produto.",
      "Pedro saiu cedo, pegou o ônibus e chegou ao trabalho às sete horas.",
      "A atividade física contribui para diversos aspectos da saúde."
    ],
    c: 2,
    e: "Na alternativa correta existe uma sucessão de ações: sair, pegar o ônibus e chegar."
  },


  /* 05 */

  {
    q: "Um texto cujo objetivo principal é apresentar ou explicar informações sobre determinado assunto é predominantemente:",
    a: [
      "Expositivo",
      "Narrativo",
      "Injuntivo",
      "Descritivo"
    ],
    c: 0,
    e: "A exposição tem como função predominante apresentar, organizar ou explicar informações e conceitos."
  },


  /* 06 */

  {
    q: "Considere: “A prática regular da leitura deve ser incentivada, pois contribui para o desenvolvimento da compreensão textual.” Nesse trecho predomina:",
    a: [
      "Descrição",
      "Argumentação",
      "Narração",
      "Injunção"
    ],
    c: 1,
    e: "O trecho apresenta uma posição — incentivar a leitura — acompanhada de uma justificativa. Isso caracteriza argumentação."
  },


  /* 07 */

  {
    q: "Em um texto argumentativo, a tese corresponde:",
    a: [
      "Ao título obrigatório do texto",
      "À ideia ou posição central que se pretende defender",
      "A qualquer exemplo apresentado",
      "À descrição física dos personagens"
    ],
    c: 1,
    e: "A tese é o posicionamento central defendido. Os argumentos são utilizados para sustentá-la."
  },


  /* 08 */

  {
    q: "Leia: “Pressione o botão por três segundos, aguarde o sinal luminoso e reinicie o aparelho.” A sequência é predominantemente:",
    a: [
      "Argumentativa",
      "Narrativa",
      "Injuntiva",
      "Descritiva"
    ],
    c: 2,
    e: "O trecho orienta diretamente o leitor sobre ações a serem realizadas. Essa é uma característica da injunção."
  },


  /* 09 */

  {
    q: "Qual alternativa apresenta um gênero textual, e não uma tipologia?",
    a: [
      "Descrição",
      "Narração",
      "Notícia",
      "Argumentação"
    ],
    c: 2,
    e: "Notícia é um gênero textual. Narração, descrição e argumentação correspondem a formas de organização textual."
  },


  /* 10 */

  {
    q: "Sobre a presença de diferentes tipologias em um mesmo texto, é correto afirmar:",
    a: [
      "Todo texto deve possuir obrigatoriamente apenas uma tipologia",
      "Um texto pode combinar diferentes sequências, embora uma delas possa ser predominante",
      "A mistura de tipologias ocorre somente em romances",
      "A presença de descrição impede a existência de narração"
    ],
    c: 1,
    e: "Textos reais podem combinar narração, descrição, exposição, argumentação e outras sequências. A questão pode pedir justamente a tipologia predominante."
  },


  /* 11 */

  {
    q: "Uma reportagem apresenta inicialmente dados sobre determinado problema e depois relata o depoimento de uma pessoa envolvida. Essa situação demonstra que:",
    a: [
      "Um gênero textual pode combinar diferentes tipologias",
      "Reportagens são sempre exclusivamente narrativas",
      "Todo texto jornalístico é exclusivamente descritivo",
      "Tipologia e gênero são exatamente a mesma coisa"
    ],
    c: 0,
    e: "Um mesmo gênero pode utilizar diferentes sequências textuais de acordo com a finalidade de cada trecho."
  },


  /* 12 */

  {
    q: "Ao tentar identificar a tipologia predominante de um texto, o candidato deve principalmente:",
    a: [
      "Procurar uma única palavra e decidir por ela",
      "Observar a função e a organização predominantes do conjunto",
      "Contar quantas linhas o texto possui",
      "Escolher sempre narração quando houver verbos"
    ],
    c: 1,
    e: "A classificação não deve ser feita por uma palavra isolada. É necessário observar a função desempenhada pelo conjunto do trecho."
  },


  /* 13 */

  {
    q: "Leia: “O equipamento possui estrutura metálica, acabamento preto e uma pequena tela frontal.” Predomina nesse trecho:",
    a: [
      "Descrição",
      "Argumentação",
      "Narração",
      "Injunção"
    ],
    c: 0,
    e: "O trecho enumera características do equipamento, o que caracteriza uma sequência descritiva."
  },


  /* 14 */

  {
    q: "Em relação à injunção, assinale a alternativa correta:",
    a: [
      "Sua principal característica é apresentar uma sequência de acontecimentos passados",
      "Busca exclusivamente caracterizar objetos",
      "Pode orientar, recomendar, ordenar ou ensinar procedimentos",
      "Tem obrigatoriamente a finalidade de defender uma tese"
    ],
    c: 2,
    e: "A injunção está ligada à orientação do comportamento ou à execução de procedimentos."
  },


  /* 15 */

  {
    q: "Em uma questão que pede a tipologia predominante de determinado trecho, a estratégia mais adequada é:",
    a: [
      "Classificar o texto apenas pelo título",
      "Observar sua finalidade, estrutura e funcionamento predominantes",
      "Escolher a alternativa com maior quantidade de palavras",
      "Ignorar o comando e analisar somente a primeira frase"
    ],
    c: 1,
    e: "Para identificar a tipologia predominante, analise a finalidade do trecho, sua organização e as marcas linguísticas relevantes."
  }

];


/* =========================================================
   VARIÁVEIS
========================================================= */

let currentLesson = 1;

let questions = [];

let qi = 0;

let score = 0;

let errors = [];

let answered = false;

let lastPassed = false;

let lastPct = 0;


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function show(id) {

  document
    .querySelectorAll(".page")
    .forEach(page => {

      page.classList.remove("active");

    });


  const target =
    document.getElementById(id);


  if (target) {

    target.classList.add("active");

  }


  document
    .querySelectorAll("nav button")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.page === id
      );

    });


  if (
    id === "home" ||
    id === "subjects" ||
    id === "progressPage"
  ) {

    sync();

  }


  if (id === "lesson3") {

    updateReading3();

  }


  window.scrollTo(
    {
      top: 0,
      behavior: "smooth"
    }
  );

}


/* =========================================================
   DEFINIR A MISSÃO ATUAL
========================================================= */

function updateMainMission() {

  const p1 =
    !!localStorage.getItem("passed1");

  const p2 =
    !!localStorage.getItem("passed2");

  const p3 =
    !!localStorage.getItem("passed3");


  const title =
    document.getElementById(
      "mainMissionTitle"
    );


  const topic =
    document.getElementById(
      "mainMissionTopic"
    );


  const time =
    document.getElementById(
      "mainMissionTime"
    );


  const button =
    document.getElementById(
      "mainMissionBtn"
    );


  if (
    !title ||
    !topic ||
    !button
  ) {

    return;

  }


  /* =========================
     AULA 01
  ========================= */

  if (!p1) {

    title.textContent =
      "📖 Português";

    topic.textContent =
      "Interpretação de texto • Aula 01";

    if (time) {

      time.textContent =
        "⏱ 30–45 min";

    }


    button.textContent =
      "COMEÇAR MISSÃO ▶";


    button.disabled =
      false;


    button.onclick =
      () => show("lesson1");


    return;

  }


  /* =========================
     AULA 02
  ========================= */

  if (!p2) {

    title.textContent =
      "📖 Português";


    topic.textContent =
      "Ideia principal e inferência • Aula 02";


    if (time) {

      time.textContent =
        "⏱ 30–45 min";

    }


    button.textContent =
      "COMEÇAR MISSÃO ▶";


    button.disabled =
      false;


    button.onclick =
      () => show("lesson2");


    return;

  }


  /* =========================
     AULA 03
  ========================= */

  if (!p3) {

    title.textContent =
      "📚 Português";


    topic.textContent =
      "Tipos e gêneros textuais • Aula 03";


    if (time) {

      time.textContent =
        "⏱ 45–60 min";

    }


    button.textContent =
      "COMEÇAR LEITURA ▶";


    button.disabled =
      false;


    button.onclick =
      () => show("lesson3");


    return;

  }


  /* =========================
     AULAS DISPONÍVEIS CONCLUÍDAS
  ========================= */

  title.textContent =
    "✅ Português";


  topic.textContent =
    "Aulas disponíveis concluídas";


  if (time) {

    time.textContent =
      "📚 aguardando próxima aula";

  }


  button.textContent =
    "PRÓXIMA AULA EM PREPARAÇÃO";


  button.disabled =
    true;


  button.onclick =
    null;

}


/* =========================================================
   PRÓXIMA MISSÃO
========================================================= */

function updateNextMission() {

  const p1 =
    !!localStorage.getItem("passed1");

  const p2 =
    !!localStorage.getItem("passed2");

  const p3 =
    !!localStorage.getItem("passed3");


  const title =
    document.getElementById(
      "nextMissionTitle"
    );


  const text =
    document.getElementById(
      "nextMissionText"
    );


  const button =
    document.getElementById(
      "nextMissionBtn"
    );


  if (
    !title ||
    !text ||
    !button
  ) {

    return;

  }


  if (!p1) {

    title.textContent =
      "🔒 Aula 02 bloqueada";


    text.textContent =
      "Acerte pelo menos 70% na Aula 01 para desbloquear.";


    button.textContent =
      "BLOQUEADA";


    button.disabled =
      true;


    return;

  }


  if (!p2) {

    title.textContent =
      "🔒 Aula 03 bloqueada";


    text.textContent =
      "Conclua a Aula 02 com pelo menos 70% para avançar.";


    button.textContent =
      "BLOQUEADA";


    button.disabled =
      true;


    return;

  }


  if (!p3) {

    title.textContent =
      "🔒 Aula 04 bloqueada";


    text.textContent =
      "Conclua a leitura e a prova da Aula 03 para avançar.";


    button.textContent =
      "BLOQUEADA";


    button.disabled =
      true;


    return;

  }


  title.textContent =
    "🚧 Aula 04 em preparação";


  text.textContent =
    "Você concluiu todo o conteúdo disponível até agora.";


  button.textContent =
    "EM BREVE";


  button.disabled =
    true;

}


/* =========================================================
   LIBERAR AULA 02 E 03 NA TELA MATÉRIAS
========================================================= */

function updateSubjects() {

  const p1 =
    !!localStorage.getItem("passed1");

  const p2 =
    !!localStorage.getItem("passed2");

  const p3 =
    !!localStorage.getItem("passed3");


  const subject2 =
    document.getElementById("subject2");


  const subject3 =
    document.getElementById("subject3");


  if (subject2) {

    if (p1) {

      subject2.onclick =
        () => show("lesson2");


      subject2.classList.remove(
        "locked"
      );

    } else {

      subject2.onclick =
        null;

    }

  }


  if (subject3) {

    if (p2) {

      subject3.onclick =
        () => show("lesson3");


      subject3.classList.remove(
        "locked"
      );

    } else {

      subject3.onclick =
        null;

    }

  }


  const status1 =
    document.getElementById("status1");


  const status2 =
    document.getElementById("status2");


  const status3 =
    document.getElementById("status3");


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

}


/* =========================================================
   LEITURA AULA 03
========================================================= */

function completeReading3() {

  localStorage.setItem(
    "reading3Done",
    "1"
  );


  updateReading3();


  sync();


  alert(
    "📚 Leitura concluída!\n\nA prova da Aula 03 foi liberada."
  );

}


/* =========================================================
   ATUALIZAR LEITURA 03
========================================================= */

function updateReading3() {

  const done =
    !!localStorage.getItem(
      "reading3Done"
    );


  const button =
    document.getElementById(
      "completeReading3Btn"
    );


  const quizButton =
    document.getElementById(
      "quiz3Btn"
    );


  const lockText =
    document.getElementById(
      "quiz3LockText"
    );


  const pct =
    document.getElementById(
      "readingPct3"
    );


  const bar =
    document.getElementById(
      "readingBar3"
    );


  if (done) {

    if (button) {

      button.textContent =
        "✅ LEITURA CONCLUÍDA";


      button.disabled =
        true;

    }


    if (quizButton) {

      quizButton.disabled =
        false;


      quizButton.textContent =
        "INICIAR PROVA ▶";


      quizButton.classList.remove(
        "secondary"
      );

    }


    if (lockText) {

      lockText.textContent =
        "✅ Leitura concluída. A prova está liberada.";

    }


    if (pct) {

      pct.textContent =
        "100%";

    }


    if (bar) {

      bar.style.width =
        "100%";

    }


    const achievement =
      document.getElementById(
        "aReader"
      );


    if (achievement) {

      achievement.textContent =
        "✅ Concluí a leitura da Aula 03";

    }

  } else {

    if (pct) {

      pct.textContent =
        "0%";

    }


    if (bar) {

      bar.style.width =
        "0%";

    }

  }

}


/* =========================================================
   PROGRESSO DE LEITURA POR ROLAGEM
========================================================= */

window.addEventListener(
  "scroll",
  function () {

    const lesson =
      document.getElementById(
        "lesson3"
      );


    if (
      !lesson ||
      !lesson.classList.contains(
        "active"
      )
    ) {

      return;

    }


    if (
      localStorage.getItem(
        "reading3Done"
      )
    ) {

      return;

    }


    const pctEl =
      document.getElementById(
        "readingPct3"
      );


    const bar =
      document.getElementById(
        "readingBar3"
      );


    if (
      !pctEl ||
      !bar
    ) {

      return;

    }


    const rect =
      lesson.getBoundingClientRect();


    const total =
      lesson.scrollHeight -
      window.innerHeight;


    if (
      total <= 0
    ) {

      return;

    }


    const traveled =
      Math.max(
        0,
        -rect.top
      );


    let percent =
      Math.round(
        traveled /
        total *
        100
      );


    percent =
      Math.min(
        99,
        Math.max(
          0,
          percent
        )
      );


    pctEl.textContent =
      `${percent}%`;


    bar.style.width =
      `${percent}%`;

  }
);


/* =========================================================
   COMEÇAR PROVA
========================================================= */

function startQuiz(lesson) {

  if (
    lesson === 3 &&
    !localStorage.getItem(
      "reading3Done"
    )
  ) {

    alert(
      "📚 Conclua a leitura da Aula 03 antes de fazer a prova."
    );


    return;

  }


  currentLesson =
    lesson;


  if (
    lesson === 1
  ) {

    questions =
      quiz1;

  }


  if (
    lesson === 2
  ) {

    questions =
      quiz2;

  }


  if (
    lesson === 3
  ) {

    questions =
      quiz3;

  }


  qi = 0;

  score = 0;

  errors = [];

  answered =
    false;


  show("quiz");


  renderQ();

}


/* =========================================================
   VOLTAR PARA AULA
========================================================= */

function backToLesson() {

  if (
    currentLesson === 1
  ) {

    show("lesson1");

  }


  if (
    currentLesson === 2
  ) {

    show("lesson2");

  }


  if (
    currentLesson === 3
  ) {

    show("lesson3");

  }

}


/* =========================================================
   EXIBIR QUESTÃO
========================================================= */

function renderQ() {

  answered =
    false;


  const question =
    questions[qi];


  document
    .getElementById(
      "qnum"
    )
    .textContent =
    `QUESTÃO ${qi + 1} DE ${questions.length}`;


  document
    .getElementById(
      "scoreNow"
    )
    .textContent =
    `${score} acertos`;


  document
    .getElementById(
      "qbar"
    )
    .style.width =
    `${(
      (
        qi + 1
      ) /
      questions.length
    ) * 100}%`;


  document
    .getElementById(
      "qtext"
    )
    .textContent =
    question.q;


  const answersBox =
    document.getElementById(
      "answers"
    );


  answersBox.innerHTML =
    "";


  question.a.forEach(
    (
      text,
      index
    ) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "answer";


      button.textContent =
        `${String.fromCharCode(
          65 + index
        )}. ${text}`;


      button.onclick =
        () =>
          answer(
            index,
            button
          );


      answersBox.appendChild(
        button
      );

    }
  );


  document
    .getElementById(
      "feedback"
    )
    .classList.add(
      "hidden"
    );


  document
    .getElementById(
      "next"
    )
    .classList.add(
      "hidden"
    );


  document
    .getElementById(
      "next"
    )
    .textContent =
    qi ===
    questions.length - 1
      ? "VER RESULTADO"
      : "PRÓXIMA";

}


/* =========================================================
   RESPONDER
========================================================= */

function answer(
  index,
  button
) {

  if (
    answered
  ) {

    return;

  }


  answered =
    true;


  const question =
    questions[qi];


  const buttons =
    [
      ...document.querySelectorAll(
        ".answer"
      )
    ];


  buttons.forEach(
    btn => {

      btn.disabled =
        true;

    }
  );


  if (
    index ===
    question.c
  ) {

    score++;


    button.classList.add(
      "ok"
    );

  } else {

    button.classList.add(
      "no"
    );


    if (
      buttons[
        question.c
      ]
    ) {

      buttons[
        question.c
      ].classList.add(
        "ok"
      );

    }


    errors.push(
      {

        lesson:
          currentLesson,

        q:
          question.q,

        exp:
          question.e

      }
    );

  }


  const feedback =
    document.getElementById(
      "feedback"
    );


  feedback.innerHTML =
    `
      <b>
        ${
          index ===
          question.c
            ? "✅ Resposta correta"
            : "❌ Resposta incorreta"
        }
      </b>

      <br><br>

      ${question.e}
    `;


  feedback
    .classList.remove(
      "hidden"
    );


  document
    .getElementById(
      "next"
    )
    .classList.remove(
      "hidden"
    );


  document
    .getElementById(
      "scoreNow"
    )
    .textContent =
    `${score} acertos`;

}


/* =========================================================
   PRÓXIMA QUESTÃO
========================================================= */

function nextQ() {

  if (
    qi <
    questions.length - 1
  ) {

    qi++;


    renderQ();


    return;

  }


  lastPct =
    Math.round(
      score /
      questions.length *
      100
    );


  lastPassed =
    lastPct >= 70;


  saveAttempt();


  renderResult();


  show(
    "result"
  );

}


/* =========================================================
   SALVAR TENTATIVA
========================================================= */

function saveAttempt() {

  let attempts =
    [];


  try {

    attempts =
      JSON.parse(
        localStorage.getItem(
          "attemptHistory"
        ) ||
        "[]"
      );

  } catch {

    attempts =
      [];

  }


  attempts.unshift(
    {

      lesson:
        currentLesson,

      pct:
        lastPct,

      score:
        score,

      total:
        questions.length,

      passed:
        lastPassed,

      date:
        new Date()
          .toLocaleDateString(
            "pt-BR"
          ),

      time:
        new Date()
          .toLocaleTimeString(
            "pt-BR",
            {
              hour:
                "2-digit",

              minute:
                "2-digit"
            }
          )

    }
  );


  attempts =
    attempts.slice(
      0,
      20
    );


  localStorage.setItem(
    "attemptHistory",
    JSON.stringify(
      attempts
    )
  );


  /* ERROS */


  let storedErrors =
    [];


  try {

    storedErrors =
      JSON.parse(
        localStorage.getItem(
          "errors"
        ) ||
        "[]"
      );

  } catch {

    storedErrors =
      [];

  }


  storedErrors =
    [
      ...errors,
      ...storedErrors
    ]
    .slice(
      0,
      50
    );


  localStorage.setItem(
    "errors",
    JSON.stringify(
      storedErrors
    )
  );

}


/* =========================================================
   RESULTADO
========================================================= */

function renderResult() {

  document
    .getElementById(
      "resultPct"
    )
    .textContent =
    `${lastPct}%`;


  document
    .getElementById(
      "resultScore"
    )
    .textContent =
    `${score}/${questions.length}`;


  const circle =
    document.querySelector(
      ".circle"
    );


  circle.className =
    "circle";


  if (
    lastPassed
  ) {

    document
      .getElementById(
        "resultTitle"
      )
      .textContent =
      "Missão aprovada 🟢";


    document
      .getElementById(
        "resultMsg"
      )
      .textContent =
      "Você atingiu o mínimo de 70% e pode avançar.";


    document
      .getElementById(
        "mastery"
      )
      .textContent =
      "DOMÍNIO: APROVADO";


    document
      .getElementById(
        "resultAction"
      )
      .textContent =
      "CONCLUIR E RECEBER XP";

  } else {

    circle.classList.add(
      lastPct >= 50
        ? "warn"
        : "fail"
    );


    document
      .getElementById(
        "resultTitle"
      )
      .textContent =
      lastPct >= 50
        ? "Quase lá 🟠"
        : "Vamos reforçar a base 🔴";


    document
      .getElementById(
        "resultMsg"
      )
      .textContent =
      "Você ainda não atingiu 70%. Revise seus erros e tente novamente.";


    document
      .getElementById(
        "mastery"
      )
      .textContent =
      "DOMÍNIO: REVISÃO NECESSÁRIA";


    document
      .getElementById(
        "resultAction"
      )
      .textContent =
      "REVISAR E TENTAR NOVAMENTE";

  }

}


/* =========================================================
   FINALIZAR RESULTADO
========================================================= */

function finishResult() {

  if (
    lastPassed
  ) {

    const key =
      `passed${currentLesson}`;


    if (
      !localStorage.getItem(
        key
      )
    ) {

      const currentXP =
        Number(
          localStorage.getItem(
            "xp"
          ) ||
          0
        );


      localStorage.setItem(
        "xp",
        currentXP +
        100
      );


      localStorage.setItem(
        key,
        "1"
      );

    }


    sync();


    show(
      "progressPage"
    );

  } else {

    sync();


    showReview();

  }

}


/* =========================================================
   CADERNO DE ERROS
========================================================= */

function showReview() {

  let storedErrors =
    [];


  try {

    storedErrors =
      JSON.parse(
        localStorage.getItem(
          "errors"
        ) ||
        "[]"
      );

  } catch {

    storedErrors =
      [];

  }


  const reviewList =
    document.getElementById(
      "reviewList"
    );


  if (
    !reviewList
  ) {

    return;

  }


  if (
    !storedErrors.length
  ) {

    reviewList.innerHTML =
      `
        <div class="card">
          Nenhum erro registrado.
        </div>
      `;

  } else {

    reviewList.innerHTML =
      storedErrors
        .map(
          (
            item,
            index
          ) => {

            return `
              <div class="card reviewItem">

                <b>
                  ${index + 1}.
                  ${item.q}
                </b>

                <p class="muted">
                  📚 Aula
                  ${item.lesson}
                </p>

                <p>
                  ${item.exp}
                </p>

              </div>
            `;

          }
        )
        .join("");

  }


  show(
    "review"
  );

}


/* =========================================================
   HISTÓRICO
========================================================= */

function updateHistory() {

  let attempts =
    [];


  try {

    attempts =
      JSON.parse(
        localStorage.getItem(
          "attemptHistory"
        ) ||
        "[]"
      );

  } catch {

    attempts =
      [];

  }


  const history =
    document.getElementById(
      "history"
    );


  if (
    !history
  ) {

    return;

  }


  if (
    !attempts.length
  ) {

    history.textContent =
      "Nenhuma tentativa registrada.";


    return;

  }


  history.innerHTML =
    attempts
      .map(
        attempt => {

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
                📚 Aula
                ${attempt.lesson}
              </b>

              <br><br>

              Nota:
              <b>
                ${attempt.pct}%
              </b>

              •

              ${attempt.score}/
              ${attempt.total}

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

        }
      )
      .join("");

}


/* =========================================================
   PROGRESSO
========================================================= */

function sync() {

  const currentXP =
    Number(
      localStorage.getItem(
        "xp"
      ) ||
      0
    );


  const p1 =
    !!localStorage.getItem(
      "passed1"
    );


  const p2 =
    !!localStorage.getItem(
      "passed2"
    );


  const p3 =
    !!localStorage.getItem(
      "passed3"
    );


  const passedCount =
    (
      p1
        ? 1
        : 0
    ) +
    (
      p2
        ? 1
        : 0
    ) +
    (
      p3
        ? 1
        : 0
    );


  /*
    Por enquanto cada aula
    vale 20% da primeira trilha.
  */

  const progress =
    passedCount *
    20;


  /* XP */


  const xp =
    document.getElementById(
      "xp"
    );


  if (
    xp
  ) {

    xp.textContent =
      currentXP;

  }


  /* MISSÕES */


  const missions =
    document.getElementById(
      "missions"
    );


  if (
    missions
  ) {

    missions.textContent =
      passedCount;

  }


  /* PROGRESSO GERAL */


  const general =
    document.getElementById(
      "general"
    );


  if (
    general
  ) {

    general.textContent =
      `${progress}%`;

  }


  /* PORTUGUÊS */


  const pPct =
    document.getElementById(
      "pPct"
    );


  if (
    pPct
  ) {

    pPct.textContent =
      `${progress}%`;

  }


  const pbar =
    document.getElementById(
      "pbar"
    );


  if (
    pbar
  ) {

    pbar.style.width =
      `${progress}%`;

  }


  /* CONQUISTAS */


  if (
    p1
  ) {

    const aPass =
      document.getElementById(
        "aPass"
      );


    if (
      aPass
    ) {

      aPass.textContent =
        "✅ Aprovado na primeira aula";

    }


    const aSecond =
      document.getElementById(
        "aSecond"
      );


    if (
      aSecond
    ) {

      aSecond.textContent =
        "✅ Desbloqueei a Aula 02";

    }

  }


  if (
    p2
  ) {

    const aThird =
      document.getElementById(
        "aThird"
      );


    if (
      aThird
    ) {

      aThird.textContent =
        "✅ Desbloqueei a Aula 03";

    }

  }


  if (
    p3
  ) {

    const aThirdPass =
      document.getElementById(
        "aThirdPass"
      );


    if (
      aThirdPass
    ) {

      aThirdPass.textContent =
        "✅ Aprovado na Aula 03";

    }

  }


  /* CADERNO DE ERROS */


  let storedErrors =
    [];


  try {

    storedErrors =
      JSON.parse(
        localStorage.getItem(
          "errors"
        ) ||
        "[]"
      );

  } catch {

    storedErrors =
      [];

  }


  const errorBook =
    document.getElementById(
      "errorBook"
    );


  if (
    errorBook
  ) {

    errorBook.textContent =
      storedErrors.length
        ? `${storedErrors.length} erro(s) salvo(s) para revisão.`
        : "Nenhum erro registrado.";

  }


  /* ATUALIZAÇÕES */


  updateMainMission();


  updateNextMission();


  updateSubjects();


  updateReading3();


  updateHistory();

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

sync();
