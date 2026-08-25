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
   QUESTÕES — AULA 05
========================================================= */

const quiz5 = [
  {
    q: "Na frase 'Os candidatos chegaram cedo', a palavra 'candidatos' pertence a qual classe gramatical?",
    a: [
      "Substantivo",
      "Adjetivo",
      "Pronome",
      "Advérbio"
    ],
    c: 0,
    e: "Candidatos é substantivo, pois nomeia os seres de quem se fala."
  },

  {
    q: "Na frase 'O candidato dedicado estudou bastante', a palavra 'dedicado' é:",
    a: [
      "Substantivo",
      "Adjetivo",
      "Verbo",
      "Preposição"
    ],
    c: 1,
    e: "Dedicado caracteriza o substantivo candidato, portanto é um adjetivo."
  },

  {
    q: "Na frase 'Ela estudou muito', a palavra 'ela' é:",
    a: [
      "Artigo",
      "Pronome",
      "Numeral",
      "Conjunção"
    ],
    c: 1,
    e: "Ela é um pronome pessoal que substitui ou representa um nome."
  },

  {
    q: "Qual alternativa apresenta um numeral?",
    a: [
      "Bonito",
      "Dois",
      "Rapidamente",
      "Embora"
    ],
    c: 1,
    e: "Dois é numeral porque indica quantidade."
  },

  {
    q: "Na frase 'O policial agiu rapidamente', a palavra 'rapidamente' é:",
    a: [
      "Advérbio",
      "Adjetivo",
      "Substantivo",
      "Artigo"
    ],
    c: 0,
    e: "Rapidamente modifica o sentido do verbo agiu, funcionando como advérbio."
  },

  {
    q: "Na frase 'Estudei para a prova', a palavra 'para' é:",
    a: [
      "Pronome",
      "Preposição",
      "Adjetivo",
      "Interjeição"
    ],
    c: 1,
    e: "Para é uma preposição que estabelece relação entre termos."
  },

  {
    q: "Na frase 'Estudou muito, mas não conseguiu aprovação', a palavra 'mas' é:",
    a: [
      "Conjunção",
      "Preposição",
      "Numeral",
      "Substantivo"
    ],
    c: 0,
    e: "Mas é uma conjunção que estabelece ideia de oposição."
  },

  {
    q: "Qual das palavras abaixo é uma interjeição?",
    a: [
      "Porque",
      "Nossa!",
      "Durante",
      "Aquele"
    ],
    c: 1,
    e: "Nossa! pode expressar emoção ou surpresa, funcionando como interjeição."
  },

  {
    q: "Em 'A jovem policial chegou', a palavra 'jovem' funciona como:",
    a: [
      "Adjetivo",
      "Verbo",
      "Artigo",
      "Preposição"
    ],
    c: 0,
    e: "Jovem caracteriza o substantivo policial e, nesse contexto, funciona como adjetivo."
  },

  {
    q: "Para identificar corretamente a classe gramatical de uma palavra, é importante observar:",
    a: [
      "Somente sua aparência",
      "Somente seu tamanho",
      "Sua função no contexto",
      "A quantidade de letras"
    ],
    c: 2,
    e: "Uma mesma palavra pode exercer funções diferentes. Por isso, o contexto é fundamental."
  }
];
/* =========================================================
   QUESTÕES — AULA 06
========================================================= */

const quiz6 = [
  {
    q: "O verbo é uma classe de palavras que pode indicar:",
    a: [
      "Apenas ação",
      "Ação, estado, mudança de estado ou fenômeno",
      "Somente características",
      "Somente nomes"
    ],
    c: 1,
    e: "O verbo pode expressar ação, estado, mudança de estado, fenômeno e outros valores conforme o contexto."
  },

  {
    q: "Na frase 'Os candidatos estudaram para a prova', o verbo está em qual tempo?",
    a: [
      "Presente",
      "Pretérito",
      "Futuro",
      "Infinitivo"
    ],
    c: 1,
    e: "Estudaram indica uma ação ocorrida no passado, portanto está no pretérito."
  },

  {
    q: "Na frase 'Os candidatos estudarão amanhã', o verbo indica:",
    a: [
      "Uma ação passada",
      "Uma ação presente",
      "Uma ação futura",
      "Uma ordem"
    ],
    c: 2,
    e: "Estudarão indica uma ação que acontecerá posteriormente, portanto está no futuro."
  },

  {
    q: "Qual alternativa apresenta um verbo no infinitivo?",
    a: [
      "Estudando",
      "Estudado",
      "Estudar",
      "Estudou"
    ],
    c: 2,
    e: "Estudar está no infinitivo. O infinitivo normalmente apresenta terminações -ar, -er ou -ir."
  },

  {
    q: "Na expressão 'está estudando', temos:",
    a: [
      "Uma locução verbal",
      "Um substantivo",
      "Um adjetivo",
      "Uma conjunção"
    ],
    c: 0,
    e: "Está estudando é uma locução verbal formada por verbo auxiliar e verbo principal."
  },

  {
    q: "Em 'Se eu estudasse mais, teria melhores resultados', a forma 'estudasse' está relacionada principalmente a:",
    a: [
      "Certeza absoluta",
      "Hipótese ou condição",
      "Uma ordem direta",
      "Um fato necessariamente futuro"
    ],
    c: 1,
    e: "O modo subjuntivo é frequentemente empregado para expressar hipótese, possibilidade ou condição."
  },

  {
    q: "Na frase 'Estude para a prova!', o verbo expressa principalmente:",
    a: [
      "Uma ordem ou orientação",
      "Uma hipótese",
      "Um acontecimento passado",
      "Uma descrição"
    ],
    c: 0,
    e: "Estude está no modo imperativo, utilizado para ordem, pedido, conselho ou orientação."
  },

  {
    q: "Na frase 'Ela tinha estudado antes da prova', a expressão 'tinha estudado' é:",
    a: [
      "Uma locução verbal",
      "Um substantivo composto",
      "Uma conjunção",
      "Um pronome"
    ],
    c: 0,
    e: "Tinha estudado apresenta dois verbos funcionando conjuntamente na construção verbal."
  },

  {
    q: "Qual das formas abaixo está no gerúndio?",
    a: [
      "Estudar",
      "Estudado",
      "Estudando",
      "Estudará"
    ],
    c: 2,
    e: "Estudando é uma forma nominal do verbo denominada gerúndio."
  },

  {
    q: "Qual das formas abaixo está no particípio?",
    a: [
      "Estudar",
      "Estudando",
      "Estudado",
      "Estudarei"
    ],
    c: 2,
    e: "Estudado é o particípio do verbo estudar."
  },

  {
    q: "Na frase 'Você poderia me ajudar?', o futuro do pretérito contribui para produzir ideia de:",
    a: [
      "Cortesia",
      "Ordem obrigatória",
      "Ação concluída",
      "Proibição"
    ],
    c: 0,
    e: "O futuro do pretérito pode ser empregado para suavizar um pedido e produzir efeito de cortesia."
  },

  {
    q: "Para analisar corretamente uma forma verbal em uma questão, deve-se:",
    a: [
      "Observar somente a terminação",
      "Ignorar o restante da oração",
      "Analisar sua função e o contexto",
      "Considerar apenas o tamanho da palavra"
    ],
    c: 2,
    e: "O contexto é essencial, pois formas verbais podem assumir valores diferentes conforme a construção."
  }
];
/* =========================================================
   QUESTÕES — AULA 07
========================================================= */

const quiz7 = [
  {
    q: "Assinale a alternativa em que a concordância verbal está correta:",
    a: [
      "Os candidatos chegou cedo.",
      "Os candidatos chegaram cedo.",
      "Os candidato chegaram cedo.",
      "Os candidatos chegava cedo."
    ],
    c: 1,
    e: "O sujeito 'os candidatos' está no plural, portanto o verbo deve concordar: 'chegaram'."
  },

  {
    q: "Na frase 'A maioria dos candidatos chegou cedo', a forma verbal 'chegou' concorda com:",
    a: [
      "Candidatos",
      "Maioria",
      "Cedo",
      "Dos"
    ],
    c: 1,
    e: "O núcleo do sujeito é 'maioria', que está no singular."
  },

  {
    q: "Assinale a alternativa correta:",
    a: [
      "Fazem dois anos que estudo.",
      "Faz dois anos que estudo.",
      "Fizeram dois anos que estudo.",
      "Fazem dois ano que estudo."
    ],
    c: 1,
    e: "Quando indica tempo decorrido, o verbo 'fazer' é impessoal e permanece na terceira pessoa do singular."
  },

  {
    q: "Assinale a alternativa correta quanto ao verbo haver:",
    a: [
      "Haviam muitos candidatos na sala.",
      "Houveram muitos problemas.",
      "Havia muitos candidatos na sala.",
      "Haviam ocorrido um problema."
    ],
    c: 2,
    e: "Com sentido de existir, o verbo 'haver' é impessoal e permanece no singular."
  },

  {
    q: "Em 'Deve haver muitos candidatos', por que o verbo auxiliar permanece no singular?",
    a: [
      "Porque candidatos está no plural",
      "Porque a locução contém o verbo haver impessoal",
      "Porque todo verbo auxiliar é singular",
      "Porque haver é sempre um substantivo"
    ],
    c: 1,
    e: "Quando 'haver' tem sentido de existir, sua impessoalidade é transmitida à locução verbal."
  },

  {
    q: "Assinale a frase com concordância nominal correta:",
    a: [
      "As candidatas estavam preparado.",
      "As candidatas estavam preparadas.",
      "As candidata estavam preparadas.",
      "As candidatas estava preparada."
    ],
    c: 1,
    e: "O adjetivo 'preparadas' concorda em gênero e número com 'candidatas'."
  },

  {
    q: "Complete corretamente: 'Seguem _____ as documentações solicitadas.'",
    a: [
      "anexo",
      "anexa",
      "anexos",
      "anexas"
    ],
    c: 3,
    e: "'Anexas' concorda com 'documentações', palavra feminina e plural."
  },

  {
    q: "Assinale a alternativa correta:",
    a: [
      "É proibido a entrada.",
      "É proibida a entrada.",
      "É proibidas a entrada.",
      "São proibido a entrada."
    ],
    c: 1,
    e: "Com o substantivo determinado pelo artigo 'a', o adjetivo concorda com ele: 'É proibida a entrada'."
  },

  {
    q: "Na frase 'Existem boas oportunidades', o verbo 'existir':",
    a: [
      "É sempre impessoal",
      "Concorda com o sujeito",
      "Deve permanecer sempre no singular",
      "Não possui sujeito"
    ],
    c: 1,
    e: "Diferentemente de 'haver' com sentido de existir, o verbo 'existir' é pessoal e concorda com seu sujeito."
  },

  {
    q: "Assinale a alternativa correta:",
    a: [
      "Existe muitos candidatos.",
      "Existem muitos candidatos.",
      "Há muitos candidatos existem.",
      "Haviam muitos candidatos."
    ],
    c: 1,
    e: "O sujeito de 'existir' é 'muitos candidatos'; como está no plural, usamos 'existem'."
  },

  {
    q: "Em uma questão de concordância verbal, qual deve ser um dos primeiros passos?",
    a: [
      "Localizar o sujeito e seu núcleo",
      "Contar as palavras da oração",
      "Procurar apenas os adjetivos",
      "Ignorar o sujeito"
    ],
    c: 0,
    e: "Identificar o sujeito e seu núcleo ajuda a determinar com qual termo o verbo deve concordar."
  },

  {
    q: "Qual alternativa apresenta corretamente o verbo fazer indicando tempo decorrido?",
    a: [
      "Faz três meses que ele estuda.",
      "Fazem três meses que ele estuda.",
      "Fizeram três meses que ele estuda.",
      "Fazem três mês que ele estuda."
    ],
    c: 0,
    e: "Indicando tempo decorrido, 'fazer' é impessoal: 'Faz três meses'."
  }
];
/* =========================================================
   QUESTÕES — AULA 08
========================================================= */

const quiz8 = [
  {
    q: "Assinale a alternativa em que o uso da crase está correto:",
    a: [
      "Vou à escola.",
      "Vou á escola.",
      "Vou a à escola.",
      "Vou à estudar."
    ],
    c: 0,
    e: "Em 'vou à escola', ocorre a união da preposição 'a', exigida pelo verbo ir, com o artigo feminino 'a'."
  },

  {
    q: "A crase é representada pelo acento grave e ocorre, em regra, quando há:",
    a: [
      "Encontro de duas consoantes",
      "Fusão de dois sons ou formas 'a'",
      "Qualquer palavra feminina",
      "Um verbo no infinitivo"
    ],
    c: 1,
    e: "A crase normalmente resulta da fusão da preposição 'a' com o artigo feminino 'a' ou com determinados pronomes."
  },

  {
    q: "Assinale a alternativa em que NÃO ocorre crase:",
    a: [
      "Cheguei à escola.",
      "Entreguei o documento à candidata.",
      "Começou a estudar.",
      "Referiu-se à professora."
    ],
    c: 2,
    e: "Antes de verbo, em regra, não se usa crase. Portanto: 'começou a estudar'."
  },

  {
    q: "Em qual alternativa o uso da crase está correto?",
    a: [
      "Entreguei o documento à ela.",
      "Entreguei o documento à candidata.",
      "Entreguei à documento.",
      "Entreguei o documento à você."
    ],
    c: 1,
    e: "Em 'à candidata', há preposição 'a' exigida pelo verbo e artigo feminino 'a' diante de 'candidata'."
  },

  {
    q: "Qual frase está correta?",
    a: [
      "O candidato ficou frente à frente com o avaliador.",
      "O candidato ficou frente a frente com o avaliador.",
      "O candidato ficou frente á frente com o avaliador.",
      "O candidato ficou à frente à frente com o avaliador."
    ],
    c: 1,
    e: "Em expressões formadas por palavras repetidas, como 'frente a frente', normalmente não ocorre crase."
  },

  {
    q: "Assinale a alternativa correta:",
    a: [
      "A prova começará às oito horas.",
      "A prova começará as oito horas.",
      "A prova começará ás oito horas.",
      "A prova começará à oito horas."
    ],
    c: 0,
    e: "Na indicação de horas determinadas, normalmente ocorre crase: 'às oito horas'."
  },

  {
    q: "Na frase 'Refiro-me àquela candidata', ocorre crase porque:",
    a: [
      "Toda palavra feminina exige crase",
      "Há preposição 'a' antes do pronome demonstrativo 'aquela'",
      "Existe um verbo no infinitivo",
      "A palavra candidata está no singular"
    ],
    c: 1,
    e: "O verbo 'referir-se' exige a preposição 'a', que se funde com o 'a' inicial de 'aquela': àquela."
  },

  {
    q: "Qual alternativa NÃO admite crase?",
    a: [
      "À noite",
      "À medida que",
      "À direita",
      "À estudar"
    ],
    c: 3,
    e: "Não se usa crase antes de verbo. O correto é 'a estudar'."
  },

  {
    q: "Um teste útil para verificar a crase diante de palavra feminina é substituir essa palavra por uma masculina e observar se aparece:",
    a: [
      "ao",
      "um",
      "de",
      "por"
    ],
    c: 0,
    e: "Se na substituição por termo masculino surgir 'ao', há forte indicação de que, no feminino, ocorrerá 'à'."
  },

  {
    q: "Em 'O policial dirigiu-se à delegacia', o acento grave ocorre porque:",
    a: [
      "Delegacia é qualquer palavra feminina",
      "O verbo exige preposição 'a' e delegacia admite artigo 'a'",
      "Todo verbo exige crase",
      "Delegacia está no singular"
    ],
    c: 1,
    e: "Temos a preposição 'a' exigida por 'dirigir-se' mais o artigo 'a': a + a = à."
  },

  {
    q: "Assinale a alternativa correta quanto ao uso da crase:",
    a: [
      "Ele começou à estudar cedo.",
      "Ele começou a estudar cedo.",
      "Ele começou á estudar cedo.",
      "Ele começou às estudar cedo."
    ],
    c: 1,
    e: "Antes de verbo no infinitivo não ocorre crase: 'começou a estudar'."
  },

  {
    q: "Ao resolver uma questão de crase, o candidato deve verificar principalmente:",
    a: [
      "Se a palavra possui muitas letras",
      "Se existe preposição 'a' e se o termo seguinte admite outro 'a'",
      "Se toda a oração está no plural",
      "Se existe algum verbo no passado"
    ],
    c: 1,
    e: "O ponto central é verificar a exigência da preposição 'a' e a possibilidade de outro 'a' no termo seguinte."
  }
];
/* =========================================================
   QUESTÕES — AULA 09
========================================================= */

const quiz9 = [
  {
    q: "Regência verbal é a relação estabelecida entre:",
    a: [
      "Um verbo e os termos que o complementam",
      "Dois substantivos apenas",
      "Dois adjetivos",
      "Somente sujeito e verbo"
    ],
    c: 0,
    e: "A regência verbal estuda a relação entre o verbo e seus complementos, inclusive a necessidade ou não de preposição."
  },

  {
    q: "Assinale a alternativa de acordo com a norma-padrão:",
    a: [
      "Assisti o filme ontem.",
      "Assisti ao filme ontem.",
      "Assisti no filme ontem.",
      "Assisti pelo filme ontem."
    ],
    c: 1,
    e: "No sentido de ver ou presenciar, o verbo 'assistir' exige a preposição 'a': assistir ao filme."
  },

  {
    q: "Assinale a alternativa correta:",
    a: [
      "Ele obedeceu o regulamento.",
      "Ele obedeceu ao regulamento.",
      "Ele obedeceu no regulamento.",
      "Ele obedeceu pelo regulamento."
    ],
    c: 1,
    e: "O verbo 'obedecer' rege a preposição 'a': obedecer ao regulamento."
  },

  {
    q: "Na norma-padrão, qual construção está correta?",
    a: [
      "Prefiro estudar do que trabalhar.",
      "Prefiro mais estudar que trabalhar.",
      "Prefiro estudar a trabalhar.",
      "Prefiro estudar do que a trabalhar."
    ],
    c: 2,
    e: "Na construção comparativa, o verbo 'preferir' segue normalmente a estrutura 'preferir uma coisa a outra'."
  },

  {
    q: "Assinale a frase correta quanto à regência:",
    a: [
      "O candidato aspirava um cargo melhor.",
      "O candidato aspirava a um cargo melhor.",
      "O candidato aspirava de um cargo melhor.",
      "O candidato aspirava com um cargo melhor."
    ],
    c: 1,
    e: "No sentido de desejar ou almejar, 'aspirar' rege a preposição 'a'."
  },

  {
    q: "Na frase 'O policial informou o fato ao superior', temos:",
    a: [
      "Um verbo sem complemento",
      "Complementos relacionados ao verbo informar",
      "Somente um sujeito composto",
      "Uma oração sem verbo"
    ],
    c: 1,
    e: "O verbo 'informar' pode estabelecer relação com aquilo que é informado e com a pessoa a quem se informa."
  },

  {
    q: "Assinale a alternativa correta:",
    a: [
      "Cheguei na escola cedo.",
      "Cheguei à escola cedo.",
      "Cheguei da escola cedo, no sentido de destino.",
      "Cheguei pela escola cedo."
    ],
    c: 1,
    e: "Na norma-padrão, indicando destino, o verbo 'chegar' rege a preposição 'a': chegar à escola."
  },

  {
    q: "Em 'Ele se referiu ao regulamento', a preposição 'a' ocorre porque:",
    a: [
      "Todo substantivo exige preposição",
      "O verbo 'referir-se' rege a preposição 'a'",
      "Todo verbo pronominal exige 'a'",
      "Regulamento é masculino"
    ],
    c: 1,
    e: "O verbo 'referir-se' exige a preposição 'a': referir-se a algo."
  },

  {
    q: "Assinale a alternativa correta quanto à regência nominal:",
    a: [
      "Ele está favorável com a proposta.",
      "Ele está favorável à proposta.",
      "Ele está favorável pela proposta.",
      "Ele está favorável na proposta."
    ],
    c: 1,
    e: "O adjetivo 'favorável' rege a preposição 'a': favorável a algo."
  },

  {
    q: "Em 'Tenho necessidade de apoio', a expressão 'de apoio' completa o sentido de:",
    a: [
      "Tenho",
      "Necessidade",
      "Eu, que está oculto",
      "Apoio"
    ],
    c: 1,
    e: "O substantivo 'necessidade' estabelece relação de regência com o complemento introduzido pela preposição 'de'."
  },

  {
    q: "Regência nominal analisa principalmente a relação entre:",
    a: [
      "Um nome e seu complemento",
      "Somente dois verbos",
      "Sujeito e predicado",
      "Artigo e substantivo"
    ],
    c: 0,
    e: "A regência nominal observa a relação de substantivos, adjetivos ou advérbios com seus complementos."
  },

  {
    q: "Em questões de regência, uma boa estratégia é:",
    a: [
      "Ignorar as preposições",
      "Identificar o termo regente e verificar qual preposição ele exige",
      "Escolher sempre a alternativa mais curta",
      "Analisar somente o sujeito"
    ],
    c: 1,
    e: "É fundamental identificar o termo regente e observar se ele exige preposição e qual preposição é adequada."
  }
];
/* =========================================================
   QUESTÕES — AULA 10
========================================================= */

const quiz10 = [
  {
    q: "A pontuação tem como uma de suas principais funções:",
    a: [
      "Apenas deixar o texto mais bonito",
      "Organizar o texto e contribuir para a construção de sentido",
      "Substituir todas as conjunções",
      "Eliminar a necessidade de interpretação"
    ],
    c: 1,
    e: "A pontuação organiza a estrutura do texto e pode interferir diretamente na construção de sentido."
  },

  {
    q: "Assinale a alternativa em que a vírgula foi empregada corretamente:",
    a: [
      "Os candidatos, chegaram cedo.",
      "Os candidatos chegaram, cedo.",
      "João, entregue o documento.",
      "O policial analisou, cuidadosamente o documento."
    ],
    c: 2,
    e: "A vírgula é usada para isolar o vocativo. Na frase, 'João' é o termo usado para chamar o interlocutor."
  },

  {
    q: "Em qual alternativa a vírgula separa indevidamente o sujeito do verbo?",
    a: [
      "Os candidatos, chegaram cedo.",
      "Durante a prova, permaneça atento.",
      "Carlos, venha aqui.",
      "Sim, estou preparado."
    ],
    c: 0,
    e: "Não se deve, em regra, separar por vírgula o sujeito 'Os candidatos' do verbo 'chegaram'."
  },

  {
    q: "Na frase 'Pedro, feche a porta.', a vírgula foi utilizada para isolar:",
    a: [
      "O sujeito",
      "O vocativo",
      "O objeto direto",
      "O predicado"
    ],
    c: 1,
    e: "'Pedro' é um vocativo, pois representa a pessoa a quem a mensagem é dirigida."
  },

  {
    q: "Assinale a alternativa em que as vírgulas isolam uma explicação:",
    a: [
      "O candidato estudou português, matemática e direito.",
      "Carlos, venha imediatamente.",
      "A PMMG, instituição militar estadual, possui importante função pública.",
      "Ontem, ocorreu a prova."
    ],
    c: 2,
    e: "'Instituição militar estadual' apresenta uma explicação sobre o termo anterior e aparece isolada por vírgulas."
  },

  {
    q: "Os dois-pontos podem ser utilizados para:",
    a: [
      "Introduzir uma explicação ou enumeração",
      "Separar obrigatoriamente sujeito e verbo",
      "Substituir qualquer ponto final",
      "Indicar somente uma pergunta"
    ],
    c: 0,
    e: "Os dois-pontos podem introduzir explicações, enumerações, citações e outros elementos."
  },

  {
    q: "Em 'Leve os seguintes documentos: identidade, comprovante e formulário.', os dois-pontos introduzem:",
    a: [
      "Uma pergunta",
      "Uma enumeração",
      "Um vocativo",
      "Uma oposição"
    ],
    c: 1,
    e: "Os elementos posteriores aos dois-pontos formam uma enumeração dos documentos."
  },

  {
    q: "O ponto e vírgula pode ser empregado para:",
    a: [
      "Separar partes de um período que já apresentam vírgulas ou possuem certa independência",
      "Separar obrigatoriamente sujeito e verbo",
      "Marcar somente perguntas",
      "Substituir qualquer preposição"
    ],
    c: 0,
    e: "O ponto e vírgula pode organizar partes relativamente independentes de um período, especialmente quando já existem vírgulas internas."
  },

  {
    q: "Qual sinal de pontuação é utilizado normalmente no final de uma pergunta direta?",
    a: [
      "Ponto e vírgula",
      "Dois-pontos",
      "Ponto de interrogação",
      "Vírgula"
    ],
    c: 2,
    e: "O ponto de interrogação é utilizado para marcar uma pergunta direta."
  },

  {
    q: "Na frase 'Não, espere!', a vírgula depois de 'Não' contribui para:",
    a: [
      "Organizar a construção e separar o termo inicial",
      "Separar sujeito e verbo",
      "Criar obrigatoriamente uma pergunta",
      "Transformar 'espere' em substantivo"
    ],
    c: 0,
    e: "A pontuação organiza os elementos da oração e ajuda a representar adequadamente o sentido pretendido."
  },

  {
    q: "Uma mudança na pontuação pode:",
    a: [
      "Nunca alterar o sentido",
      "Alterar a interpretação de uma frase",
      "Alterar somente a quantidade de letras",
      "Eliminar todos os verbos"
    ],
    c: 1,
    e: "A posição dos sinais de pontuação pode modificar relações sintáticas e produzir diferenças de sentido."
  },

  {
    q: "Ao resolver uma questão de pontuação, o candidato deve analisar:",
    a: [
      "Apenas onde existe uma pausa na leitura",
      "A estrutura sintática e o sentido produzido",
      "Somente o tamanho da frase",
      "Apenas a primeira palavra"
    ],
    c: 1,
    e: "A pontuação não deve ser analisada apenas por pausas. É importante observar a estrutura da oração e o sentido."
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
  if (lesson === 5) return quiz5;
  if (lesson === 6) return quiz6;
  if (lesson === 7) return quiz7;
  if (lesson === 8) return quiz8;
  if (lesson === 9) return quiz9;
  if (lesson === 10) return quiz10;

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
