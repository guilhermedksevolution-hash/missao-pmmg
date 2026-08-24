/* =========================================================
   MISSÃO PMMG v0.7
   SISTEMA PRINCIPAL
========================================================= */


/* =========================================================
   QUESTÕES — AULA 01
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
    q: "Uma informação explícita é aquela que:",
    a: [
      "Precisa ser imaginada pelo leitor",
      "Aparece diretamente no texto",
      "Só pode ser descoberta por conhecimento externo",
      "Nunca pode ser localizada"
    ],
    c: 1,
    e: "Informação explícita é aquela apresentada diretamente."
  },

  {
    q: "Inferir significa:",
    a: [
      "Inventar detalhes",
      "Construir uma conclusão a partir de pistas",
      "Ignorar o texto",
      "Escolher a alternativa mais longa"
    ],
    c: 1,
    e: "Inferência é uma conclusão sustentada pelas pistas do texto."
  },

  {
    q: "Qual alternativa representa uma extrapolação?",
    a: [
      "Conclusão sustentada pelo texto",
      "Informação escrita diretamente",
      "Conclusão que ultrapassa o que o texto permite",
      "Identificação da ideia principal"
    ],
    c: 2,
    e: "Extrapolar é ir além das informações que o texto fornece."
  },

  {
    q: "Ao identificar a ideia principal, o candidato deve procurar:",
    a: [
      "A mensagem central",
      "Sempre a primeira frase",
      "A palavra mais repetida",
      "O exemplo mais longo"
    ],
    c: 0,
    e: "A ideia principal representa o núcleo da mensagem."
  },

  {
    q: "Palavras como “sempre”, “nunca” e “todos” podem ser perigosas porque:",
    a: [
      "Não existem em provas",
      "Podem tornar a alternativa mais absoluta do que o texto permite",
      "São sempre corretas",
      "Indicam necessariamente inferência"
    ],
    c: 1,
    e: "Essas palavras podem ampliar ou absolutizar indevidamente uma afirmação."
  },

  {
    q: "Antes de marcar uma resposta de interpretação, é recomendável:",
    a: [
      "Confirmar a alternativa no texto",
      "Responder pela opinião pessoal",
      "Ignorar o comando",
      "Escolher rapidamente"
    ],
    c: 0,
    e: "Voltar ao texto ajuda a confirmar se a alternativa realmente possui fundamento."
  },

  {
    q: "Uma alternativa pode estar errada mesmo sendo verdadeira na vida real quando:",
    a: [
      "Não está sustentada pelo texto",
      "É curta",
      "Tem verbo",
      "Possui pontuação"
    ],
    c: 0,
    e: "Em interpretação, o critério principal é o que o texto sustenta."
  },

  {
    q: "A finalidade de um texto corresponde:",
    a: [
      "Ao número de parágrafos",
      "Ao objetivo comunicativo",
      "À quantidade de verbos",
      "Ao tamanho do título"
    ],
    c: 1,
    e: "Finalidade é o objetivo comunicativo desempenhado pelo texto."
  },

  {
    q: "Qual atitude reduz erros de interpretação?",
    a: [
      "Acrescentar conhecimento externo sem necessidade",
      "Separar informação central de detalhes",
      "Ignorar palavras negativas no comando",
      "Responder apenas pelo título"
    ],
    c: 1,
    e: "Distinguir a mensagem central dos detalhes ajuda a compreender melhor o texto."
  },

  {
    q: "Se uma questão pede a alternativa INCORRETA, o candidato deve:",
    a: [
      "Ignorar a palavra incorreta",
      "Prestar atenção ao valor negativo do comando",
      "Escolher a primeira alternativa",
      "Responder como se pedisse a correta"
    ],
    c: 1,
    e: "Palavras negativas no comando alteram completamente o que precisa ser selecionado."
  },

  {
    q: "O título de um texto:",
    a: [
      "Sempre é a ideia principal",
      "Pode ajudar, mas não necessariamente reproduz a ideia principal",
      "Deve ser ignorado sempre",
      "Nunca possui relação com o texto"
    ],
    c: 1,
    e: "O título pode orientar a leitura, mas não deve ser tomado automaticamente como ideia central."
  },

  {
    q: "Qual situação representa uma inferência segura?",
    a: [
      "Inventar um horário não informado",
      "Concluir algo sustentado por várias pistas do texto",
      "Escolher uma possibilidade sem evidência",
      "Adicionar informações externas"
    ],
    c: 1,
    e: "Inferências seguras são sustentadas por evidências presentes no texto."
  },

  {
    q: "Informações secundárias geralmente:",
    a: [
      "Podem explicar, exemplificar ou detalhar a ideia principal",
      "São sempre inúteis",
      "Sempre aparecem no título",
      "São obrigatoriamente falsas"
    ],
    c: 0,
    e: "Informações secundárias ajudam a desenvolver a mensagem central."
  },

  {
    q: "A estratégia mais segura em interpretação é:",
    a: [
      "Texto → comando → alternativas → confirmação",
      "Opinião pessoal → alternativa",
      "Título → resposta",
      "Conhecimento externo → resposta"
    ],
    c: 0,
    e: "A resposta deve ser construída a partir do texto e do comando da questão."
  }
];


/* =========================================================
   QUESTÕES — AULA 02
========================================================= */

const quiz2 = [
  {
    q: "A ideia principal de um texto corresponde:",
    a: [
      "À mensagem central",
      "Ao menor detalhe",
      "Sempre ao título",
      "À opinião do leitor"
    ],
    c: 0,
    e: "A ideia principal representa o núcleo da mensagem."
  },

  {
    q: "Uma informação secundária pode:",
    a: [
      "Explicar ou exemplificar a ideia central",
      "Ser sempre mais importante que a mensagem principal",
      "Nunca aparecer no texto",
      "Eliminar a ideia principal"
    ],
    c: 0,
    e: "Informações secundárias desenvolvem, ilustram ou explicam a ideia central."
  },

  {
    q: "O tópico frasal:",
    a: [
      "Pode apresentar a ideia central de um parágrafo",
      "Sempre é a última frase",
      "É obrigatoriamente o título",
      "Nunca aparece no início"
    ],
    c: 0,
    e: "O tópico frasal pode apresentar ou sintetizar a ideia central do parágrafo."
  },

  {
    q: "Inferência é:",
    a: [
      "Conclusão construída a partir de pistas",
      "Informação inventada",
      "Cópia literal",
      "Opinião sem base"
    ],
    c: 0,
    e: "Inferência é uma conclusão que encontra apoio nas informações fornecidas."
  },

  {
    q: "“Paulo entrou em casa ensopado e deixou o guarda-chuva aberto.” Uma inferência possível é:",
    a: [
      "Provavelmente esteve exposto à chuva",
      "Comprou o guarda-chuva naquele dia",
      "Saiu às 14h",
      "Foi ao supermercado"
    ],
    c: 0,
    e: "As pistas permitem inferir contato com chuva, mas não os outros detalhes."
  },

  {
    q: "Inferência e suposição diferem porque:",
    a: [
      "A inferência precisa de sustentação textual",
      "A suposição é sempre verdadeira",
      "Inferência não depende do texto",
      "São exatamente iguais"
    ],
    c: 0,
    e: "Inferência precisa ser sustentada; suposição pode ser apenas uma possibilidade."
  },

  {
    q: "“João voltou a estudar.” A construção pressupõe que:",
    a: [
      "João já estudava anteriormente",
      "João nunca estudou",
      "João mudou de cidade",
      "João fez prova ontem"
    ],
    c: 0,
    e: "O verbo “voltou” pressupõe uma atividade anterior que havia sido interrompida."
  },

  {
    q: "Quanto mais distante a conclusão estiver das pistas do texto:",
    a: [
      "Maior o risco de extrapolação",
      "Mais segura ela é",
      "Mais explícita se torna",
      "Menor a necessidade de contexto"
    ],
    c: 0,
    e: "Conclusões distantes das evidências têm maior chance de extrapolar."
  },

  {
    q: "Ao localizar a ideia principal, é útil:",
    a: [
      "Separar exemplos e detalhes",
      "Escolher sempre a primeira frase",
      "Ignorar o encerramento",
      "Olhar apenas a palavra mais repetida"
    ],
    c: 0,
    e: "Separar detalhes da mensagem central ajuda a identificar a ideia principal."
  },

  {
    q: "Qual pergunta ajuda a testar uma inferência?",
    a: [
      "Qual pista do texto sustenta essa conclusão?",
      "Essa resposta parece bonita?",
      "Essa possibilidade existe no mundo?",
      "A alternativa é longa?"
    ],
    c: 0,
    e: "A inferência precisa ser sustentada por uma ou mais pistas textuais."
  },

  {
    q: "Uma conclusão plausível, porém sem evidência textual, é:",
    a: [
      "Uma suposição",
      "Sempre uma inferência correta",
      "Informação explícita",
      "Tópico frasal"
    ],
    c: 0,
    e: "Ser possível não basta; é necessário haver sustentação textual."
  },

  {
    q: "A ideia principal:",
    a: [
      "Precisa representar o conjunto do texto",
      "Pode ser qualquer detalhe verdadeiro",
      "Sempre aparece em negrito",
      "Nunca pode ser inferida"
    ],
    c: 0,
    e: "A ideia principal deve representar o sentido central desenvolvido pelo conjunto."
  },

  {
    q: "Um detalhe verdadeiro pode ser alternativa errada quando:",
    a: [
      "A questão pede a ideia principal",
      "Possui verbo",
      "É curto",
      "Aparece no texto"
    ],
    c: 0,
    e: "Uma informação verdadeira pode não responder ao que o comando está pedindo."
  },

  {
    q: "Pressuposto é:",
    a: [
      "Informação assumida pela própria construção",
      "Qualquer opinião do leitor",
      "Sempre uma informação falsa",
      "Uma regra de pontuação"
    ],
    c: 0,
    e: "Certas construções linguísticas pressupõem informações que servem de base ao enunciado."
  },

  {
    q: "Ao analisar inferência, o candidato deve evitar:",
    a: [
      "Acrescentar informação inexistente",
      "Procurar pistas",
      "Comparar alternativas",
      "Revisar o contexto"
    ],
    c: 0,
    e: "Acrescentar informações não fornecidas transforma a inferência em extrapolação."
  }
];


/* =========================================================
   QUESTÕES — AULA 03
========================================================= */

const quiz3 = [
  {
    q: "Tipologia textual e gênero textual:",
    a: [
      "São exatamente iguais",
      "Representam conceitos diferentes",
      "Só existem em textos literários",
      "Dependem do tamanho do texto"
    ],
    c: 1,
    e: "Tipologia refere-se à organização textual; gênero corresponde a formas concretas de comunicação."
  },

  {
    q: "Qual alternativa representa um gênero textual?",
    a: [
      "Notícia",
      "Narração",
      "Descrição",
      "Argumentação"
    ],
    c: 0,
    e: "Notícia é gênero textual. As demais são tipologias ou sequências textuais."
  },

  {
    q: "Sequência de acontecimentos caracteriza predominantemente:",
    a: [
      "Narração",
      "Descrição",
      "Exposição",
      "Injunção"
    ],
    c: 0,
    e: "A narração apresenta acontecimentos ou ações organizadas em sequência."
  },

  {
    q: "Predomínio de características indica:",
    a: [
      "Descrição",
      "Argumentação",
      "Narração",
      "Injunção"
    ],
    c: 0,
    e: "A descrição apresenta características de pessoas, objetos, lugares ou situações."
  },

  {
    q: "Texto que explica determinado conceito tende a ser:",
    a: [
      "Expositivo",
      "Narrativo",
      "Injuntivo",
      "Descritivo"
    ],
    c: 0,
    e: "A exposição tem como função apresentar e explicar informações."
  },

  {
    q: "Defesa de uma ideia com justificativas caracteriza:",
    a: [
      "Argumentação",
      "Descrição",
      "Narração",
      "Injunção"
    ],
    c: 0,
    e: "Argumentação envolve tese e argumentos."
  },

  {
    q: "Texto que orienta como executar uma ação é:",
    a: [
      "Injuntivo",
      "Narrativo",
      "Descritivo",
      "Expositivo"
    ],
    c: 0,
    e: "A injunção orienta, recomenda ou instrui."
  },

  {
    q: "Um mesmo gênero textual:",
    a: [
      "Pode combinar diferentes tipologias",
      "Só pode ter uma tipologia",
      "Nunca pode narrar",
      "Não pode descrever"
    ],
    c: 0,
    e: "Textos reais frequentemente combinam diferentes sequências."
  },

  {
    q: "“A sala era ampla e silenciosa.” Predomina:",
    a: [
      "Descrição",
      "Narração",
      "Injunção",
      "Argumentação"
    ],
    c: 0,
    e: "O trecho apresenta características do ambiente."
  },

  {
    q: "“Abra o aplicativo e informe a senha.” Predomina:",
    a: [
      "Injunção",
      "Descrição",
      "Narração",
      "Exposição"
    ],
    c: 0,
    e: "O trecho orienta a execução de ações."
  },

  {
    q: "“Pedro saiu, entrou no ônibus e chegou ao trabalho.” Predomina:",
    a: [
      "Narração",
      "Descrição",
      "Exposição",
      "Argumentação"
    ],
    c: 0,
    e: "Existe sucessão de acontecimentos."
  },

  {
    q: "A tipologia predominante deve ser identificada:",
    a: [
      "Pela função principal do conjunto",
      "Por uma única palavra",
      "Sempre pelo título",
      "Pelo tamanho do texto"
    ],
    c: 0,
    e: "É necessário observar o funcionamento predominante do trecho."
  },

  {
    q: "A tese é:",
    a: [
      "A posição central defendida",
      "O personagem principal",
      "A descrição de um ambiente",
      "Uma instrução"
    ],
    c: 0,
    e: "A tese é a ideia ou posicionamento que os argumentos procuram sustentar."
  },

  {
    q: "Uma reportagem pode apresentar:",
    a: [
      "Exposição, narração e descrição",
      "Somente narração",
      "Somente descrição",
      "Nenhuma tipologia"
    ],
    c: 0,
    e: "Um gênero pode combinar diferentes sequências textuais."
  },

  {
    q: "Para identificar um gênero textual, é importante observar:",
    a: [
      "Finalidade e contexto de circulação",
      "Apenas a quantidade de palavras",
      "Somente os verbos",
      "Apenas o título"
    ],
    c: 0,
    e: "Gêneros estão relacionados à finalidade, contexto, público e forma de circulação."
  }
];


/* =========================================================
   QUESTÕES — AULA 04
========================================================= */

const quiz4 = [
  {
    q: "A diferença correta entre coesão e coerência é:",
    a: [
      "Coesão liga linguisticamente; coerência constrói sentido",
      "São exatamente iguais",
      "Coesão é ortografia",
      "Coerência é pontuação"
    ],
    c: 0,
    e: "Coesão envolve mecanismos de ligação; coerência envolve a construção global de sentido."
  },

  {
    q: "“Mariana comprou um livro. Ela começou a lê-lo.” O pronome “ela” retoma:",
    a: [
      "Mariana",
      "Livro",
      "Leitura",
      "Nenhum termo"
    ],
    c: 0,
    e: "“Ela” retoma Mariana."
  },

  {
    q: "No mesmo trecho, “lo” retoma:",
    a: [
      "Livro",
      "Mariana",
      "Noite",
      "Nenhum termo"
    ],
    c: 0,
    e: "“Lo” retoma o livro."
  },

  {
    q: "Quando um elemento retoma uma informação anterior, temos:",
    a: [
      "Anáfora",
      "Catáfora",
      "Elipse",
      "Incoerência"
    ],
    c: 0,
    e: "Anáfora é a retomada de informação anterior."
  },

  {
    q: "Quando um elemento antecipa informação posterior, temos:",
    a: [
      "Catáfora",
      "Anáfora",
      "Elipse",
      "Descrição"
    ],
    c: 0,
    e: "Catáfora aponta para uma informação que aparecerá depois."
  },

  {
    q: "Omissão de termo recuperável pelo contexto é:",
    a: [
      "Elipse",
      "Anáfora",
      "Catáfora",
      "Ambiguidade"
    ],
    c: 0,
    e: "A elipse omite um elemento que pode ser recuperado pelo contexto."
  },

  {
    q: "O conectivo “mas” geralmente estabelece:",
    a: [
      "Oposição ou contraste",
      "Adição",
      "Conclusão",
      "Causa"
    ],
    c: 0,
    e: "“Mas” normalmente introduz contraste."
  },

  {
    q: "“Por isso” pode introduzir:",
    a: [
      "Consequência",
      "Oposição",
      "Descrição",
      "Comparação"
    ],
    c: 0,
    e: "“Por isso” frequentemente marca consequência."
  },

  {
    q: "“Portanto” costuma indicar:",
    a: [
      "Conclusão",
      "Oposição",
      "Adição",
      "Descrição"
    ],
    c: 0,
    e: "“Portanto” costuma introduzir uma conclusão."
  },

  {
    q: "“João encontrou Pedro. Ele estava preocupado.” Pode haver:",
    a: [
      "Ambiguidade de referente",
      "Ausência de verbo",
      "Erro ortográfico obrigatório",
      "Catáfora obrigatória"
    ],
    c: 0,
    e: "O pronome “ele” pode retomar João ou Pedro, dependendo do contexto."
  },

  {
    q: "Um texto pode estar gramaticalmente correto e ainda ser:",
    a: [
      "Incoerente",
      "Obrigatoriamente coerente",
      "Sempre coeso",
      "Sempre argumentativo"
    ],
    c: 0,
    e: "Correção gramatical não garante construção lógica de sentido."
  },

  {
    q: "Ao trocar um conectivo, é necessário verificar:",
    a: [
      "Se a relação de sentido é preservada",
      "Se possui o mesmo número de letras",
      "Se é mais longo",
      "Se aparece no título"
    ],
    c: 0,
    e: "Substituições só são adequadas se preservarem a relação lógica relevante."
  },

  {
    q: "“Os candidatos chegaram cedo. Eles aguardaram.” O pronome “eles”:",
    a: [
      "Retoma os candidatos",
      "Cria necessariamente incoerência",
      "Elimina o sujeito anterior",
      "Indica conclusão"
    ],
    c: 0,
    e: "O pronome retoma “os candidatos”, estabelecendo coesão referencial."
  },

  {
    q: "Para encontrar o referente de um pronome, deve-se:",
    a: [
      "Analisar contexto e compatibilidade de sentido",
      "Escolher sempre o substantivo mais próximo",
      "Ignorar a frase anterior",
      "Olhar apenas o pronome"
    ],
    c: 0,
    e: "O referente é identificado pelo contexto, estrutura e sentido."
  },

  {
    q: "Uma contradição sem explicação contextual pode gerar:",
    a: [
      "Quebra de coerência",
      "Coesão perfeita",
      "Catáfora",
      "Descrição"
    ],
    c: 0,
    e: "Informações incompatíveis podem prejudicar a coerência."
  }
];


/* =========================================================
   ESTADO
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

function getQuiz(lesson) {
  if (lesson === 1) return quiz1;
  if (lesson === 2) return quiz2;
  if (lesson === 3) return quiz3;
  if (lesson === 4) return quiz4;

  return [];
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

  window.scrollTo(0, 0);
}


/* =========================================================
   ABRIR QUALQUER AULA
========================================================= */

function openLesson(lessonNumber) {
  if (
    typeof lessons === "undefined" ||
    !lessons[lessonNumber]
  ) {
    alert("Conteúdo da aula não encontrado.");
    return;
  }

  currentLesson = lessonNumber;

  const lesson = lessons[lessonNumber];

  const subtitle =
    document.getElementById("dynamicLessonSubtitle");

  const title =
    document.getElementById("dynamicLessonTitle");

  const content =
    document.getElementById("dynamicLessonContent");

  if (subtitle) {
    subtitle.textContent =
      lesson.subtitle || "";
  }

  if (title) {
    title.textContent =
      lesson.title || "";
  }

  if (content) {
    content.innerHTML =
      lesson.content || "";
  }

  show("dynamicLesson");

  updateDynamicReading(
    lessonNumber
  );

  window.scrollTo(0, 0);
}


/* =========================================================
   COMPLETAR LEITURA
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
    `📚 Leitura da Aula ${lessonNumber} concluída!\n\nA prova foi liberada.`
  );
}


/* =========================================================
   ATUALIZAR LEITURA
========================================================= */

function updateDynamicReading(lessonNumber) {
  const done =
    isReadingDone(lessonNumber);

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
  } else {
    if (pct) {
      pct.textContent = "0%";
    }

    if (bar) {
      bar.style.width = "0%";
    }
  }

  const quizButton =
    document.getElementById(
      `quiz${lessonNumber}Btn`
    );

  const lockText =
    document.getElementById(
      `quiz${lessonNumber}LockText`
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


/* =========================================================
   PROGRESSO DA LEITURA
========================================================= */

window.addEventListener(
  "scroll",
  () => {
    const dynamicLesson =
      document.getElementById(
        "dynamicLesson"
      );

    if (
      !dynamicLesson ||
      !dynamicLesson.classList.contains("active")
    ) {
      return;
    }

    if (
      isReadingDone(currentLesson)
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
      dynamicLesson.getBoundingClientRect();

    const total =
      dynamicLesson.scrollHeight -
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
);


/* =========================================================
   COMEÇAR PROVA
========================================================= */

function startQuiz(lesson) {
  if (
    !isReadingDone(lesson)
  ) {
    alert(
      `📚 Conclua a leitura da Aula ${lesson} antes de fazer a prova.`
    );

    return;
  }

  currentLesson = lesson;

  questions =
    getQuiz(lesson);

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
  openLesson(
    currentLesson
  );
}


/* =========================================================
   QUESTÃO
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
          () => answer(
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
   RESPONDER
========================================================= */

function answer(index, button) {
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
            hour:
              "2-digit",

            minute:
              "2-digit"
          }
        )
  });

  attempts =
    attempts.slice(
      0,
      40
    );

  localStorage.setItem(
    "attemptHistory",
    JSON.stringify(
      attempts
    )
  );


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
    100
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
    circle.className =
      "circle";
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
   HISTÓRICO
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
        attempt => `
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
        `
      )
      .join("");
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
   PAINEL PRINCIPAL
========================================================= */

function updateMainMission() {
  let current = 1;

  while (
    current <= 4 &&
    isPassed(current)
  ) {
    current++;
  }

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

  if (current <= 4) {
    const lesson =
      lessons[current];

    title.textContent =
      `📚 Português`;

    topic.textContent =
      `${lesson.title} • Aula ${String(
        current
      ).padStart(2, "0")}`;

    if (time) {
      time.textContent =
        `⏱ ${lesson.time}`;
    }

    button.textContent =
      "COMEÇAR LEITURA ▶";

    button.disabled =
      false;

    button.onclick =
      () =>
        openLesson(
          current
        );

    return;
  }

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
  let current = 1;

  while (
    current <= 4 &&
    isPassed(current)
  ) {
    current++;
  }

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

  button.disabled = true;

  if (current < 4) {
    title.textContent =
      `🔒 Aula ${String(
        current + 1
      ).padStart(2, "0")} bloqueada`;

    text.textContent =
      `Conclua a Aula ${String(
        current
      ).padStart(2, "0")} com pelo menos 70% para avançar.`;

    button.textContent =
      "BLOQUEADA";

    return;
  }

  if (current === 4) {
    title.textContent =
      "🔒 Aula 05 bloqueada";

    text.textContent =
      "Conclua a Aula 04 com pelo menos 70% para avançar.";

    button.textContent =
      "BLOQUEADA";

    return;
  }

  title.textContent =
    "🚧 Aula 05 em preparação";

  text.textContent =
    "Você concluiu todo o conteúdo disponível até agora.";

  button.textContent =
    "EM BREVE";
}


/* =========================================================
   MATÉRIAS
========================================================= */

function updateSubjects() {
  for (
    let lessonNumber = 1;
    lessonNumber <= 4;
    lessonNumber++
  ) {
    const subject =
      document.getElementById(
        `subject${lessonNumber}`
      );

    const status =
      document.getElementById(
        `status${lessonNumber}`
      );

    if (!subject) continue;

    const unlocked =
      lessonNumber === 1 ||
      isPassed(
        lessonNumber - 1
      );

    if (unlocked) {
      subject.classList.remove(
        "locked"
      );

      subject.onclick =
        () =>
          openLesson(
            lessonNumber
          );
    } else {
      subject.classList.add(
        "locked"
      );

      subject.onclick =
        null;
    }

    if (status) {
      if (
        isPassed(
          lessonNumber
        )
      ) {
        status.textContent =
          "✅ Concluída";
      } else if (unlocked) {
        status.textContent =
          "▶ Atual";
      } else {
        status.textContent =
          "🔒";
      }
    }
  }
}


/* =========================================================
   CONQUISTAS
========================================================= */

function updateAchievements() {
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

  if (isPassed(1) && aPass) {
    aPass.textContent =
      "✅ Aprovado na primeira aula";
  }

  if (isPassed(1) && aSecond) {
    aSecond.textContent =
      "✅ Desbloqueei a Aula 02";
  }

  if (isPassed(2) && aThird) {
    aThird.textContent =
      "✅ Desbloqueei a Aula 03";
  }

  if (
    (
      isReadingDone(1) ||
      isReadingDone(2) ||
      isReadingDone(3) ||
      isReadingDone(4)
    ) &&
    aReader
  ) {
    aReader.textContent =
      "✅ Concluí uma aula em modo leitura";
  }

  if (
    isPassed(3) &&
    aThirdPass
  ) {
    aThirdPass.textContent =
      "✅ Aprovado na Aula 03";
  }

  if (
    isPassed(3) &&
    aFourth
  ) {
    aFourth.textContent =
      "✅ Desbloqueei a Aula 04";
  }

  if (
    isPassed(4) &&
    aFourthPass
  ) {
    aFourthPass.textContent =
      "✅ Aprovado na Aula 04";
  }
}


/* =========================================================
   SINCRONIZAR
========================================================= */

function sync() {
  let passedCount = 0;

  for (
    let i = 1;
    i <= 4;
    i++
  ) {
    if (isPassed(i)) {
      passedCount++;
    }
  }

  const progress =
    passedCount * 20;

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
  updateHistory();
  updateAchievements();
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

sync();
