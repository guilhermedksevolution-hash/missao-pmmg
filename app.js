/* =========================================================
   MISSÃO PMMG v0.6
   SISTEMA PRINCIPAL
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
    e: "A queda da temperatura é a única conclusão diretamente sustentada pelo trecho."
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
    e: "Voltar ao texto ajuda a verificar se a alternativa possui fundamento."
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
    e: "A opinião pessoal não substitui as informações efetivamente apresentadas pelo texto."
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
    e: "As ruas molhadas e os guarda-chuvas sustentam a hipótese de chuva."
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
========================================================= */

const quiz3 = [
  {
    q: "A respeito de tipologia textual e gênero textual, assinale a alternativa correta:",
    a: [
      "São expressões completamente sinônimas",
      "Tipologia refere-se à organização textual; gênero corresponde às formas concretas de comunicação",
      "Gênero textual existe apenas em textos literários",
      "Tipologia depende exclusivamente do tamanho do texto"
    ],
    c: 1,
    e: "Tipologia textual está relacionada à organização predominante do texto. Gênero textual corresponde às formas concretas de comunicação, como notícia, receita e reportagem."
  },

  {
    q: "Um trecho que apresenta uma sequência de acontecimentos tende a possuir caráter predominantemente:",
    a: [
      "Descritivo",
      "Narrativo",
      "Injuntivo",
      "Expositivo"
    ],
    c: 1,
    e: "A narração caracteriza-se pela apresentação de acontecimentos, ações ou transformações."
  },

  {
    q: "Leia: “O corredor era estreito, silencioso, pouco iluminado e possuía paredes antigas.” A tipologia predominante é:",
    a: [
      "Narrativa",
      "Argumentativa",
      "Descritiva",
      "Injuntiva"
    ],
    c: 2,
    e: "O trecho apresenta características do corredor. Portanto, predomina a descrição."
  },

  {
    q: "Em qual alternativa predomina uma sequência narrativa?",
    a: [
      "A casa era antiga e possuía grandes janelas.",
      "Abra a embalagem e retire cuidadosamente o produto.",
      "Pedro saiu cedo, pegou o ônibus e chegou ao trabalho às sete horas.",
      "A atividade física contribui para diversos aspectos da saúde."
    ],
    c: 2,
    e: "Existe sucessão de ações: sair, pegar o ônibus e chegar."
  },

  {
    q: "Um texto cujo objetivo principal é apresentar ou explicar informações é predominantemente:",
    a: [
      "Expositivo",
      "Narrativo",
      "Injuntivo",
      "Descritivo"
    ],
    c: 0,
    e: "A exposição apresenta, organiza ou explica informações e conceitos."
  },

  {
    q: "“A prática regular da leitura deve ser incentivada, pois contribui para o desenvolvimento da compreensão textual.” Nesse trecho predomina:",
    a: [
      "Descrição",
      "Argumentação",
      "Narração",
      "Injunção"
    ],
    c: 1,
    e: "Existe uma posição acompanhada de uma justificativa, característica da argumentação."
  },

  {
    q: "Em um texto argumentativo, a tese corresponde:",
    a: [
      "Ao título obrigatório",
      "À ideia ou posição central defendida",
      "A qualquer exemplo apresentado",
      "À descrição física dos personagens"
    ],
    c: 1,
    e: "A tese é o posicionamento central que os argumentos procuram sustentar."
  },

  {
    q: "“Pressione o botão por três segundos, aguarde o sinal luminoso e reinicie o aparelho.” A sequência é predominantemente:",
    a: [
      "Argumentativa",
      "Narrativa",
      "Injuntiva",
      "Descritiva"
    ],
    c: 2,
    e: "O trecho orienta diretamente o leitor sobre ações a serem realizadas."
  },

  {
    q: "Qual alternativa apresenta um gênero textual, e não uma tipologia?",
    a: [
      "Descrição",
      "Narração",
      "Notícia",
      "Argumentação"
    ],
    c: 2,
    e: "Notícia é gênero textual. As demais alternativas representam formas de organização textual."
  },

  {
    q: "Sobre a presença de diferentes tipologias em um mesmo texto:",
    a: [
      "Todo texto possui obrigatoriamente apenas uma tipologia",
      "Um texto pode combinar diferentes sequências, embora uma possa predominar",
      "A mistura ocorre somente em romances",
      "A descrição impede a existência de narração"
    ],
    c: 1,
    e: "Textos reais podem combinar diferentes sequências textuais."
  },

  {
    q: "Uma reportagem apresenta dados e depois relata o depoimento de uma pessoa. Isso demonstra que:",
    a: [
      "Um gênero pode combinar diferentes tipologias",
      "Reportagens são exclusivamente narrativas",
      "Todo texto jornalístico é descritivo",
      "Tipologia e gênero são sinônimos"
    ],
    c: 0,
    e: "Um mesmo gênero pode utilizar diferentes sequências textuais."
  },

  {
    q: "Para identificar a tipologia predominante, o candidato deve principalmente:",
    a: [
      "Procurar uma única palavra",
      "Observar a função e a organização predominantes",
      "Contar quantas linhas existem",
      "Escolher narração sempre que houver verbos"
    ],
    c: 1,
    e: "A classificação depende do funcionamento do conjunto, e não de uma palavra isolada."
  },

  {
    q: "“O equipamento possui estrutura metálica, acabamento preto e uma pequena tela frontal.” Predomina:",
    a: [
      "Descrição",
      "Argumentação",
      "Narração",
      "Injunção"
    ],
    c: 0,
    e: "O trecho enumera características do equipamento."
  },

  {
    q: "Em relação à injunção, é correto afirmar:",
    a: [
      "Apresenta necessariamente acontecimentos passados",
      "Busca exclusivamente caracterizar objetos",
      "Pode orientar, recomendar, ordenar ou ensinar procedimentos",
      "Tem obrigatoriamente a finalidade de defender uma tese"
    ],
    c: 2,
    e: "A injunção está relacionada à orientação de ações ou procedimentos."
  },

  {
    q: "Para identificar a tipologia predominante de um trecho, a estratégia mais adequada é:",
    a: [
      "Classificar apenas pelo título",
      "Observar finalidade, estrutura e funcionamento predominantes",
      "Escolher a alternativa mais longa",
      "Analisar somente a primeira frase"
    ],
    c: 1,
    e: "A finalidade e a organização do conjunto devem orientar a classificação."
  }
];


/* =========================================================
   AULA 04 — COESÃO E COERÊNCIA TEXTUAIS
   15 QUESTÕES
========================================================= */

const quiz4 = [
  {
    q: "A diferença fundamental entre coesão e coerência está corretamente apresentada em:",
    a: [
      "Coesão trata exclusivamente de ortografia; coerência trata de pontuação",
      "Coesão relaciona mecanismos linguísticos de ligação; coerência relaciona a construção de sentido",
      "Coesão e coerência são exatamente a mesma coisa",
      "Coerência existe somente em textos argumentativos"
    ],
    c: 1,
    e: "Coesão envolve mecanismos linguísticos que conectam partes do texto. Coerência diz respeito à construção global de sentido."
  },

  {
    q: "Leia: “Mariana comprou um livro. Ela começou a lê-lo naquela noite.” O pronome “ela” retoma:",
    a: [
      "Livro",
      "Noite",
      "Mariana",
      "Nenhum termo"
    ],
    c: 2,
    e: "O pronome “ela” retoma Mariana, estabelecendo uma relação de coesão referencial."
  },

  {
    q: "No trecho anterior, a forma “lo”, presente em “lê-lo”, refere-se a:",
    a: [
      "Mariana",
      "Livro",
      "Noite",
      "Leitura"
    ],
    c: 1,
    e: "A forma pronominal “lo” retoma o substantivo “livro”."
  },

  {
    q: "Leia: “Marcos estudou durante toda a semana. Ele queria melhorar seu desempenho.” A relação estabelecida por “ele” é um exemplo de:",
    a: [
      "Catáfora",
      "Anáfora",
      "Contradição",
      "Elipse"
    ],
    c: 1,
    e: "Há anáfora porque “ele” retoma uma informação já apresentada: Marcos."
  },

  {
    q: "Leia: “Só desejo isto: que você continue estudando.” O termo “isto” realiza:",
    a: [
      "Anáfora",
      "Catáfora",
      "Elipse",
      "Oposição"
    ],
    c: 1,
    e: "A palavra “isto” antecipa uma informação que será apresentada depois, caracterizando catáfora."
  },

  {
    q: "Em “Pedro estudou Português; Mariana, Matemática”, a ausência do verbo “estudou” na segunda parte exemplifica:",
    a: [
      "Catáfora",
      "Elipse",
      "Ambiguidade obrigatória",
      "Incoerência"
    ],
    c: 1,
    e: "O verbo foi omitido, mas pode ser recuperado pelo contexto. Esse recurso é denominado elipse."
  },

  {
    q: "Leia: “O trânsito estava intenso. Mesmo assim, Paulo chegou no horário.” A expressão “mesmo assim” estabelece principalmente:",
    a: [
      "Adição",
      "Contraste com uma expectativa",
      "Explicação",
      "Enumeração"
    ],
    c: 1,
    e: "O trânsito intenso poderia sugerir atraso, mas o resultado foi diferente. Há contraste com a expectativa."
  },

  {
    q: "Em “Choveu intensamente, por isso algumas ruas ficaram alagadas”, “por isso” estabelece uma relação de:",
    a: [
      "Consequência",
      "Oposição",
      "Comparação",
      "Condição"
    ],
    c: 0,
    e: "As ruas alagadas são apresentadas como consequência da chuva intensa."
  },

  {
    q: "Leia: “O candidato estudou bastante, mas não conseguiu administrar bem o tempo.” O conectivo “mas” estabelece:",
    a: [
      "Adição",
      "Causa",
      "Oposição ou contraste",
      "Conclusão"
    ],
    c: 2,
    e: "O conectivo “mas” introduz uma ideia contrastante em relação à informação anterior."
  },

  {
    q: "Qual conectivo poderia, em muitos contextos, introduzir uma conclusão?",
    a: [
      "Porém",
      "Portanto",
      "Embora",
      "Enquanto"
    ],
    c: 1,
    e: "“Portanto” é frequentemente utilizado para introduzir uma conclusão decorrente de informações anteriores."
  },

  {
    q: "Leia: “João encontrou Pedro depois da aula. Ele estava preocupado.” Sem outras informações, o principal problema do trecho é:",
    a: [
      "Ausência de verbo",
      "Possível ambiguidade do referente de “ele”",
      "Falta obrigatória de pontuação",
      "Uso incorreto de substantivo próprio"
    ],
    c: 1,
    e: "Como João e Pedro são possíveis referentes masculinos, o pronome “ele” pode produzir ambiguidade."
  },

  {
    q: "Leia: “Rafael afirmou que nunca havia saído de Minas Gerais. Logo depois, contou detalhes da viagem que fizera a Recife no mês anterior.” Consideradas literalmente e sem contexto adicional, as informações apresentam:",
    a: [
      "Uma relação de adição perfeitamente neutra",
      "Uma possível quebra de coerência por contradição",
      "Uma catáfora",
      "Uma elipse verbal"
    ],
    c: 1,
    e: "Dizer que nunca saiu de Minas Gerais entra em conflito com a afirmação de uma viagem anterior a Recife, se não houver outra explicação contextual."
  },

  {
    q: "Ao substituir um conectivo por outro em uma questão de prova, o candidato deve verificar principalmente:",
    a: [
      "Se as duas palavras têm o mesmo número de letras",
      "Se a relação de sentido original é preservada",
      "Se o novo conectivo é mais formal",
      "Se aparece mais vezes no texto"
    ],
    c: 1,
    e: "A substituição só pode ser considerada adequada quando preserva a relação lógica e o sentido relevantes no contexto."
  },

  {
    q: "Leia: “Os candidatos chegaram cedo. Eles aguardaram a abertura dos portões.” O pronome “eles” contribui para:",
    a: [
      "Criar necessariamente incoerência",
      "Retomar “os candidatos” e estabelecer coesão",
      "Eliminar o sujeito da primeira oração",
      "Introduzir uma conclusão"
    ],
    c: 1,
    e: "O pronome retoma “os candidatos”, evitando repetição desnecessária e contribuindo para a coesão."
  },

  {
    q: "Para resolver uma questão sobre o referente de um pronome, a estratégia mais adequada é:",
    a: [
      "Escolher sempre o substantivo imediatamente anterior",
      "Analisar o pronome isoladamente",
      "Verificar o contexto, a estrutura sintática e a compatibilidade de sentido",
      "Ignorar as frases anteriores"
    ],
    c: 2,
    e: "O referente precisa ser identificado pelo conjunto do contexto, da estrutura e das relações de sentido."
  }
];


/* =========================================================
   ESTADO DO SISTEMA
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
   UTILIDADES
========================================================= */

function isPassed(lesson) {
  return !!localStorage.getItem(`passed${lesson}`);
}

function isReadingDone(lesson) {
  return !!localStorage.getItem(`reading${lesson}Done`);
}

function getXP() {
  return Number(localStorage.getItem("xp") || 0);
}

function setXP(value) {
  localStorage.setItem("xp", String(value));
}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

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
    id === "progressPage"
  ) {
    sync();
  }

  if (id === "lesson3") {
    updateReading3();
  }

  window.scrollTo(0, 0);
}


/* =========================================================
   ABRIR AULA DINÂMICA
   A PARTIR DA AULA 04
========================================================= */

function openLesson(lessonNumber) {
  if (
    typeof lessons === "undefined" ||
    !lessons[lessonNumber]
  ) {
    alert("Conteúdo da aula não encontrado.");
    return;
  }

  const lesson = lessons[lessonNumber];

  currentLesson = lessonNumber;

  const subtitle = document.getElementById(
    "dynamicLessonSubtitle"
  );

  const title = document.getElementById(
    "dynamicLessonTitle"
  );

  const content = document.getElementById(
    "dynamicLessonContent"
  );

  if (subtitle) {
    subtitle.textContent = lesson.subtitle || "";
  }

  if (title) {
    title.textContent = lesson.title || "";
  }

  if (content) {
    content.innerHTML = lesson.content || "";
  }

  show("dynamicLesson");

  updateDynamicReading(lessonNumber);

  window.scrollTo(0, 0);
}


/* =========================================================
   MISSÃO PRINCIPAL
========================================================= */

function updateMainMission() {
  const p1 = isPassed(1);
  const p2 = isPassed(2);
  const p3 = isPassed(3);
  const p4 = isPassed(4);

  const title = document.getElementById(
    "mainMissionTitle"
  );

  const topic = document.getElementById(
    "mainMissionTopic"
  );

  const time = document.getElementById(
    "mainMissionTime"
  );

  const button = document.getElementById(
    "mainMissionBtn"
  );

  if (!title || !topic || !button) return;

  if (!p1) {
    title.textContent = "📖 Português";
    topic.textContent =
      "Interpretação de texto • Aula 01";

    if (time) {
      time.textContent = "⏱ 30–45 min";
    }

    button.textContent = "COMEÇAR MISSÃO ▶";
    button.disabled = false;
    button.onclick = () => show("lesson1");

    return;
  }

  if (!p2) {
    title.textContent = "📖 Português";
    topic.textContent =
      "Ideia principal e inferência • Aula 02";

    if (time) {
      time.textContent = "⏱ 30–45 min";
    }

    button.textContent = "COMEÇAR MISSÃO ▶";
    button.disabled = false;
    button.onclick = () => show("lesson2");

    return;
  }

  if (!p3) {
    title.textContent = "📚 Português";
    topic.textContent =
      "Tipos e gêneros textuais • Aula 03";

    if (time) {
      time.textContent = "⏱ 45–60 min";
    }

    button.textContent = "COMEÇAR LEITURA ▶";
    button.disabled = false;
    button.onclick = () => show("lesson3");

    return;
  }

  if (!p4) {
    title.textContent = "📗 Português";
    topic.textContent =
      "Coesão e coerência textuais • Aula 04";

    if (time) {
      time.textContent =
        lessons &&
        lessons[4] &&
        lessons[4].time
          ? `⏱ ${lessons[4].time}`
          : "⏱ 50–70 min";
    }

    button.textContent = "COMEÇAR LEITURA ▶";
    button.disabled = false;
    button.onclick = () => openLesson(4);

    return;
  }

  title.textContent = "✅ Português";
  topic.textContent =
    "Aulas disponíveis concluídas";

  if (time) {
    time.textContent =
      "📚 aguardando próxima aula";
  }

  button.textContent =
    "PRÓXIMA AULA EM PREPARAÇÃO";

  button.disabled = true;
  button.onclick = null;
}


/* =========================================================
   PRÓXIMA MISSÃO
========================================================= */

function updateNextMission() {
  const p1 = isPassed(1);
  const p2 = isPassed(2);
  const p3 = isPassed(3);
  const p4 = isPassed(4);

  const title = document.getElementById(
    "nextMissionTitle"
  );

  const text = document.getElementById(
    "nextMissionText"
  );

  const button = document.getElementById(
    "nextMissionBtn"
  );

  if (!title || !text || !button) return;

  button.disabled = true;
  button.onclick = null;

  if (!p1) {
    title.textContent = "🔒 Aula 02 bloqueada";
    text.textContent =
      "Acerte pelo menos 70% na Aula 01 para desbloquear.";
    button.textContent = "BLOQUEADA";
    return;
  }

  if (!p2) {
    title.textContent = "🔒 Aula 03 bloqueada";
    text.textContent =
      "Conclua a Aula 02 com pelo menos 70% para avançar.";
    button.textContent = "BLOQUEADA";
    return;
  }

  if (!p3) {
    title.textContent = "🔒 Aula 04 bloqueada";
    text.textContent =
      "Conclua a Aula 03 com pelo menos 70% para avançar.";
    button.textContent = "BLOQUEADA";
    return;
  }

  if (!p4) {
    title.textContent = "🔒 Aula 05 bloqueada";
    text.textContent =
      "Estude a Aula 04 e consiga pelo menos 70% na avaliação.";
    button.textContent = "BLOQUEADA";
    return;
  }

  title.textContent =
    "🚧 Aula 05 em preparação";

  text.textContent =
    "Você concluiu todo o conteúdo disponível até agora.";

  button.textContent = "EM BREVE";
}


/* =========================================================
   TELA MATÉRIAS
========================================================= */

function updateSubjects() {
  const p1 = isPassed(1);
  const p2 = isPassed(2);
  const p3 = isPassed(3);
  const p4 = isPassed(4);

  const subject1 =
    document.getElementById("subject1");

  const subject2 =
    document.getElementById("subject2");

  const subject3 =
    document.getElementById("subject3");

  const subject4 =
    document.getElementById("subject4");

  if (subject1) {
    subject1.onclick =
      () => show("lesson1");
  }

  if (subject2) {
    if (p1) {
      subject2.onclick =
        () => show("lesson2");

      subject2.classList.remove("locked");
    } else {
      subject2.onclick = null;
      subject2.classList.add("locked");
    }
  }

  if (subject3) {
    if (p2) {
      subject3.onclick =
        () => show("lesson3");

      subject3.classList.remove("locked");
    } else {
      subject3.onclick = null;
      subject3.classList.add("locked");
    }
  }

  if (subject4) {
    if (p3) {
      subject4.onclick =
        () => openLesson(4);

      subject4.classList.remove("locked");
    } else {
      subject4.onclick = null;
      subject4.classList.add("locked");
    }
  }

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
      p4
        ? "✅ Concluída"
        : p3
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


function updateReading3() {
  const done = isReadingDone(3);

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

      button.disabled = true;
    }

    if (quizButton) {
      quizButton.disabled = false;
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
      pct.textContent = "100%";
    }

    if (bar) {
      bar.style.width = "100%";
    }
  } else {
    if (pct) {
      pct.textContent = "0%";
    }

    if (bar) {
      bar.style.width = "0%";
    }

    if (quizButton) {
      quizButton.disabled = true;
      quizButton.textContent =
        "🔒 PROVA BLOQUEADA";

      quizButton.classList.add(
        "secondary"
      );
    }
  }
}


/* =========================================================
   LEITURA DINÂMICA
========================================================= */

function completeReading(lessonNumber) {
  localStorage.setItem(
    `reading${lessonNumber}Done`,
    "1"
  );

  updateDynamicReading(
    lessonNumber
  );

  sync();

  alert(
    `📚 Leitura da Aula ${lessonNumber} concluída!\n\nA avaliação foi liberada.`
  );
}


function updateDynamicReading(
  lessonNumber
) {
  const done =
    isReadingDone(
      lessonNumber
    );

  const pct =
    document.getElementById(
      "dynamicReadingPct"
    );

  const bar =
    document.getElementById(
      "dynamicReadingBar"
    );

  if (done) {
    if (pct) {
      pct.textContent = "100%";
    }

    if (bar) {
      bar.style.width = "100%";
    }
  }

  if (lessonNumber === 4) {
    const quizButton =
      document.getElementById(
        "quiz4Btn"
      );

    const lockText =
      document.getElementById(
        "quiz4LockText"
      );

    if (done) {
      if (quizButton) {
        quizButton.disabled = false;
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
    } else {
      if (quizButton) {
        quizButton.disabled = true;
        quizButton.textContent =
          "🔒 PROVA BLOQUEADA";

        quizButton.classList.add(
          "secondary"
        );
      }

      if (lockText) {
        lockText.textContent =
          "Conclua a leitura antes de realizar a prova.";
      }
    }
  }
}


/* =========================================================
   PROGRESSO DA LEITURA POR ROLAGEM
========================================================= */

window.addEventListener(
  "scroll",
  () => {
    updateScrollReading3();
    updateScrollDynamicReading();
  }
);


function updateScrollReading3() {
  const lesson =
    document.getElementById(
      "lesson3"
    );

  if (
    !lesson ||
    !lesson.classList.contains("active") ||
    isReadingDone(3)
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

  if (!pctEl || !bar) return;

  const rect =
    lesson.getBoundingClientRect();

  const total =
    lesson.scrollHeight -
    window.innerHeight;

  if (total <= 0) return;

  const traveled =
    Math.max(
      0,
      -rect.top
    );

  let percent =
    Math.round(
      (traveled / total) * 100
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


function updateScrollDynamicReading() {
  const lesson =
    document.getElementById(
      "dynamicLesson"
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
    isReadingDone(
      currentLesson
    )
  ) {
    return;
  }

  const pctEl =
    document.getElementById(
      "dynamicReadingPct"
    );

  const bar =
    document.getElementById(
      "dynamicReadingBar"
    );

  if (!pctEl || !bar) return;

  const rect =
    lesson.getBoundingClientRect();

  const total =
    lesson.scrollHeight -
    window.innerHeight;

  if (total <= 0) return;

  const traveled =
    Math.max(
      0,
      -rect.top
    );

  let percent =
    Math.round(
      (traveled / total) *
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


/* =========================================================
   COMEÇAR QUIZ
========================================================= */

function startQuiz(lesson) {
  if (
    lesson === 3 &&
    !isReadingDone(3)
  ) {
    alert(
      "📚 Conclua a leitura da Aula 03 antes de fazer a prova."
    );

    return;
  }

  if (
    lesson >= 4 &&
    !isReadingDone(lesson)
  ) {
    alert(
      `📚 Conclua a leitura da Aula ${lesson} antes de fazer a prova.`
    );

    return;
  }

  currentLesson = lesson;

  if (lesson === 1) {
    questions = quiz1;
  }

  if (lesson === 2) {
    questions = quiz2;
  }

  if (lesson === 3) {
    questions = quiz3;
  }

  if (lesson === 4) {
    questions = quiz4;
  }

  if (!questions.length) {
    alert(
      "Questões desta aula ainda não foram cadastradas."
    );

    return;
  }

  qi = 0;
  score = 0;
  errors = [];
  answered = false;

  show("quiz");

  renderQ();
}


/* =========================================================
   VOLTAR À AULA
========================================================= */

function backToLesson() {
  if (currentLesson === 1) {
    show("lesson1");
    return;
  }

  if (currentLesson === 2) {
    show("lesson2");
    return;
  }

  if (currentLesson === 3) {
    show("lesson3");
    return;
  }

  if (currentLesson >= 4) {
    openLesson(
      currentLesson
    );
  }
}


/* =========================================================
   EXIBIR QUESTÃO
========================================================= */

function renderQ() {
  answered = false;

  const question =
    questions[qi];

  const qnum =
    document.getElementById(
      "qnum"
    );

  const scoreNow =
    document.getElementById(
      "scoreNow"
    );

  const qbar =
    document.getElementById(
      "qbar"
    );

  const qtext =
    document.getElementById(
      "qtext"
    );

  const answersBox =
    document.getElementById(
      "answers"
    );

  const feedback =
    document.getElementById(
      "feedback"
    );

  const next =
    document.getElementById(
      "next"
    );

  if (qnum) {
    qnum.textContent =
      `QUESTÃO ${qi + 1} DE ${questions.length}`;
  }

  if (scoreNow) {
    scoreNow.textContent =
      `${score} acertos`;
  }

  if (qbar) {
    qbar.style.width =
      `${((qi + 1) / questions.length) * 100}%`;
  }

  if (qtext) {
    qtext.textContent =
      question.q;
  }

  if (answersBox) {
    answersBox.innerHTML = "";

    question.a.forEach(
      (text, index) => {
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
  }

  if (feedback) {
    feedback.classList.add(
      "hidden"
    );
  }

  if (next) {
    next.classList.add(
      "hidden"
    );

    next.textContent =
      qi === questions.length - 1
        ? "VER RESULTADO"
        : "PRÓXIMA";
  }
}


/* =========================================================
   RESPONDER QUESTÃO
========================================================= */

function answer(
  index,
  button
) {
  if (answered) return;

  answered = true;

  const question =
    questions[qi];

  const buttons = [
    ...document.querySelectorAll(
      ".answer"
    )
  ];

  buttons.forEach(btn => {
    btn.disabled = true;
  });

  const correct =
    index === question.c;

  if (correct) {
    score++;

    button.classList.add(
      "ok"
    );
  } else {
    button.classList.add(
      "no"
    );

    if (buttons[question.c]) {
      buttons[
        question.c
      ].classList.add(
        "ok"
      );
    }

    errors.push({
      lesson:
        currentLesson,

      q:
        question.q,

      exp:
        question.e,

      correctAnswer:
        question.a[
          question.c
        ]
    });
  }

  const feedback =
    document.getElementById(
      "feedback"
    );

  if (feedback) {
    feedback.innerHTML = `
      <b>
        ${
          correct
            ? "✅ Resposta correta"
            : "❌ Resposta incorreta"
        }
      </b>

      <br><br>

      ${question.e}

      ${
        !correct
          ? `
            <br><br>
            <strong>
              Resposta correta:
            </strong>
            ${String.fromCharCode(
              65 +
              question.c
            )}.
            ${
              question.a[
                question.c
              ]
            }
          `
          : ""
      }
    `;

    feedback.classList.remove(
      "hidden"
    );
  }

  const next =
    document.getElementById(
      "next"
    );

  if (next) {
    next.classList.remove(
      "hidden"
    );
  }

  const scoreNow =
    document.getElementById(
      "scoreNow"
    );

  if (scoreNow) {
    scoreNow.textContent =
      `${score} acertos`;
  }
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
      (score /
        questions.length) *
        100
    );

  lastPassed =
    lastPct >= 70;

  saveAttempt();

  renderResult();

  show("result");
}


/* =========================================================
   SALVAR TENTATIVA
========================================================= */

function saveAttempt() {
  let attempts = [];

  try {
    attempts =
      JSON.parse(
        localStorage.getItem(
          "attemptHistory"
        ) || "[]"
      );
  } catch {
    attempts = [];
  }

  attempts.unshift({
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
            hour: "2-digit",
            minute: "2-digit"
          }
        )
  });

  attempts =
    attempts.slice(
      0,
      30
    );

  localStorage.setItem(
    "attemptHistory",
    JSON.stringify(
      attempts
    )
  );


  /* ERROS */

  let storedErrors = [];

  try {
    storedErrors =
      JSON.parse(
        localStorage.getItem(
          "errors"
        ) || "[]"
      );
  } catch {
    storedErrors = [];
  }

  storedErrors = [
    ...errors,
    ...storedErrors
  ].slice(
    0,
    80
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
  const resultPct =
    document.getElementById(
      "resultPct"
    );

  const resultScore =
    document.getElementById(
      "resultScore"
    );

  const resultTitle =
    document.getElementById(
      "resultTitle"
    );

  const resultMsg =
    document.getElementById(
      "resultMsg"
    );

  const mastery =
    document.getElementById(
      "mastery"
    );

  const action =
    document.getElementById(
      "resultAction"
    );

  const circle =
    document.querySelector(
      ".circle"
    );

  if (resultPct) {
    resultPct.textContent =
      `${lastPct}%`;
  }

  if (resultScore) {
    resultScore.textContent =
      `${score}/${questions.length}`;
  }

  if (circle) {
    circle.className = "circle";
  }

  if (lastPassed) {
    if (resultTitle) {
      resultTitle.textContent =
        "Missão aprovada 🟢";
    }

    if (resultMsg) {
      resultMsg.textContent =
        "Você atingiu o mínimo de 70% e pode avançar.";
    }

    if (mastery) {
      mastery.textContent =
        "DOMÍNIO: APROVADO";
    }

    if (action) {
      action.textContent =
        "CONCLUIR E RECEBER XP";
    }

    return;
  }

  if (circle) {
    circle.classList.add(
      lastPct >= 50
        ? "warn"
        : "fail"
    );
  }

  if (resultTitle) {
    resultTitle.textContent =
      lastPct >= 50
        ? "Quase lá 🟠"
        : "Vamos reforçar a base 🔴";
  }

  if (resultMsg) {
    resultMsg.textContent =
      "Você ainda não atingiu 70%. Seus erros foram salvos para revisão.";
  }

  if (mastery) {
    mastery.textContent =
      "DOMÍNIO: REVISÃO NECESSÁRIA";
  }

  if (action) {
    action.textContent =
      "REVISAR E TENTAR NOVAMENTE";
  }
}


/* =========================================================
   FINALIZAR RESULTADO
========================================================= */

function finishResult() {
  if (lastPassed) {
    const key =
      `passed${currentLesson}`;

    /*
      Só entrega XP
      na PRIMEIRA aprovação.
    */

    if (
      !localStorage.getItem(
        key
      )
    ) {
      setXP(
        getXP() + 100
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

    return;
  }

  sync();

  showReview();
}


/* =========================================================
   CADERNO DE ERROS
========================================================= */

function showReview() {
  let storedErrors = [];

  try {
    storedErrors =
      JSON.parse(
        localStorage.getItem(
          "errors"
        ) || "[]"
      );
  } catch {
    storedErrors = [];
  }

  const reviewList =
    document.getElementById(
      "reviewList"
    );

  if (!reviewList) return;

  if (!storedErrors.length) {
    reviewList.innerHTML = `
      <div class="card">
        Nenhum erro registrado.
      </div>
    `;

    show("review");
    return;
  }

  reviewList.innerHTML =
    storedErrors
      .map(
        (item, index) => `
          <div class="card reviewItem">

            <p class="label">
              AULA ${item.lesson}
            </p>

            <b>
              ${index + 1}.
              ${item.q}
            </b>

            ${
              item.correctAnswer
                ? `
                  <p>
                    <strong>
                      Resposta correta:
                    </strong>

                    ${
                      item.correctAnswer
                    }
                  </p>
                `
                : ""
            }

            <p class="muted">
              ${item.exp}
            </p>

          </div>
        `
      )
      .join("");

  show("review");
}


/* =========================================================
   HISTÓRICO DE TENTATIVAS
========================================================= */

function updateHistory() {
  let attempts = [];

  try {
    attempts =
      JSON.parse(
        localStorage.getItem(
          "attemptHistory"
        ) || "[]"
      );
  } catch {
    attempts = [];
  }

  const history =
    document.getElementById(
      "history"
    );

  if (!history) return;

  if (!attempts.length) {
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
              padding:16px 0;
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
   CONQUISTAS
========================================================= */

function updateAchievements() {
  const p1 = isPassed(1);
  const p2 = isPassed(2);
  const p3 = isPassed(3);
  const p4 = isPassed(4);

  const aPass =
    document.getElementById(
      "aPass"
    );

  const aSecond =
    document.getElementById(
      "aSecond"
    );

  const aThird =
    document.getElementById(
      "aThird"
    );

  const aReader =
    document.getElementById(
      "aReader"
    );

  const aThirdPass =
    document.getElementById(
      "aThirdPass"
    );

  const aFourth =
    document.getElementById(
      "aFourth"
    );

  const aFourthPass =
    document.getElementById(
      "aFourthPass"
    );

  if (p1 && aPass) {
    aPass.textContent =
      "✅ Aprovado na primeira aula";
  }

  if (p1 && aSecond) {
    aSecond.textContent =
      "✅ Desbloqueei a Aula 02";
  }

  if (p2 && aThird) {
    aThird.textContent =
      "✅ Desbloqueei a Aula 03";
  }

  if (
    (
      isReadingDone(3) ||
      isReadingDone(4)
    ) &&
    aReader
  ) {
    aReader.textContent =
      "✅ Concluí uma aula em modo leitura";
  }

  if (p3 && aThirdPass) {
    aThirdPass.textContent =
      "✅ Aprovado na Aula 03";
  }

  if (p3 && aFourth) {
    aFourth.textContent =
      "✅ Desbloqueei a Aula 04";
  }

  if (p4 && aFourthPass) {
    aFourthPass.textContent =
      "✅ Aprovado na Aula 04";
  }
}


/* =========================================================
   PROGRESSO
========================================================= */

function sync() {
  const p1 = isPassed(1);
  const p2 = isPassed(2);
  const p3 = isPassed(3);
  const p4 = isPassed(4);

  const passedCount =
    (p1 ? 1 : 0) +
    (p2 ? 1 : 0) +
    (p3 ? 1 : 0) +
    (p4 ? 1 : 0);

  /*
    Mantemos 20% por aula
    nesta primeira trilha.

    Aula 01 = 20%
    Aula 02 = 40%
    Aula 03 = 60%
    Aula 04 = 80%
    Aula 05 = 100%
  */

  const progress =
    Math.min(
      100,
      passedCount * 20
    );

  const xp =
    document.getElementById(
      "xp"
    );

  if (xp) {
    xp.textContent =
      getXP();
  }

  const missions =
    document.getElementById(
      "missions"
    );

  if (missions) {
    missions.textContent =
      passedCount;
  }

  const general =
    document.getElementById(
      "general"
    );

  if (general) {
    general.textContent =
      `${progress}%`;
  }

  const pPct =
    document.getElementById(
      "pPct"
    );

  if (pPct) {
    pPct.textContent =
      `${progress}%`;
  }

  const pbar =
    document.getElementById(
      "pbar"
    );

  if (pbar) {
    pbar.style.width =
      `${progress}%`;
  }


  /* CADERNO DE ERROS */

  let storedErrors = [];

  try {
    storedErrors =
      JSON.parse(
        localStorage.getItem(
          "errors"
        ) || "[]"
      );
  } catch {
    storedErrors = [];
  }

  const errorBook =
    document.getElementById(
      "errorBook"
    );

  if (errorBook) {
    errorBook.textContent =
      storedErrors.length
        ? `${storedErrors.length} erro(s) salvo(s) para revisão.`
        : "Nenhum erro registrado.";
  }


  updateMainMission();

  updateNextMission();

  updateSubjects();

  updateReading3();

  updateHistory();

  updateAchievements();
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

sync();
