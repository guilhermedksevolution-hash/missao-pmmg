/* =========================================================
   MISSÃO PMMG
   SISTEMA PRINCIPAL — AULAS 01 A 10
   Base reorganizada a partir do projeto atual
========================================================= */

const TOTAL_LESSONS = 10;
const MIN_SCORE = 70;
const XP_PER_LESSON = 100;

const LESSON_TITLES = {
  1: "Interpretação de texto",
  2: "Ideia principal e inferência",
  3: "Tipos e gêneros textuais",
  4: "Coesão e coerência textuais",
  5: "Classes de palavras",
  6: "Verbos: tempos, modos e formas nominais",
  7: "Concordância verbal e nominal",
  8: "Regência verbal e nominal",
  9: "Crase",
  10: "Pontuação e efeitos de sentido"
};

/* =========================================================
   QUESTÕES — AULA 01
========================================================= */
const quiz1 = [
  {
    q: "Em uma questão de interpretação, a resposta deve se apoiar principalmente em:",
    a: ["Sua opinião pessoal", "O texto apresentado", "A alternativa mais longa", "O que outras pessoas pensam"],
    c: 1,
    e: "A interpretação deve ser sustentada pelas informações presentes no texto."
  },
  {
    q: "Uma informação explícita é aquela que:",
    a: ["Precisa ser imaginada", "Aparece diretamente no texto", "Depende de conhecimento externo", "Nunca pode ser localizada"],
    c: 1,
    e: "Informação explícita é apresentada diretamente no texto."
  },
  {
    q: "Inferir significa:",
    a: ["Inventar detalhes", "Construir uma conclusão a partir de pistas", "Ignorar o texto", "Escolher a alternativa maior"],
    c: 1,
    e: "Inferência é uma conclusão sustentada por pistas do texto."
  },
  {
    q: "Extrapolação ocorre quando a alternativa:",
    a: ["Repete exatamente o texto", "Ultrapassa aquilo que o texto permite concluir", "Identifica uma informação explícita", "Resume corretamente o texto"],
    c: 1,
    e: "Extrapolar é ir além das informações que o texto oferece."
  },
  {
    q: "A ideia principal representa:",
    a: ["A mensagem central", "Sempre a primeira frase", "A palavra mais repetida", "O exemplo mais longo"],
    c: 0,
    e: "A ideia principal corresponde ao núcleo da mensagem."
  },
  {
    q: "Termos como 'sempre', 'nunca' e 'todos' merecem atenção porque:",
    a: ["São sempre errados", "Podem tornar a alternativa absoluta demais", "Nunca aparecem em provas", "Indicam sempre inferência"],
    c: 1,
    e: "Termos absolutos podem ampliar indevidamente uma afirmação."
  },
  {
    q: "Antes de marcar uma resposta de interpretação, é recomendável:",
    a: ["Confirmá-la no texto", "Responder pela opinião pessoal", "Ignorar o comando", "Escolher rapidamente"],
    c: 0,
    e: "Voltar ao texto ajuda a confirmar se a alternativa possui fundamento."
  },
  {
    q: "Uma alternativa pode ser verdadeira na vida real e ainda estar errada quando:",
    a: ["Não está sustentada pelo texto", "É curta", "Possui verbo", "Tem pontuação"],
    c: 0,
    e: "Em interpretação, o critério principal é o que o texto sustenta."
  },
  {
    q: "A finalidade de um texto corresponde:",
    a: ["Ao número de parágrafos", "Ao objetivo comunicativo", "À quantidade de verbos", "Ao tamanho do título"],
    c: 1,
    e: "Finalidade é o objetivo comunicativo desempenhado pelo texto."
  },
  {
    q: "Se a questão pede a alternativa INCORRETA, o candidato deve:",
    a: ["Ignorar a palavra incorreta", "Prestar atenção ao valor negativo do comando", "Escolher a primeira", "Responder como se pedisse a correta"],
    c: 1,
    e: "Palavras negativas alteram completamente o que precisa ser selecionado."
  }
];

/* =========================================================
   QUESTÕES — AULA 02
========================================================= */
const quiz2 = [
  {
    q: "A ideia principal de um texto corresponde:",
    a: ["À mensagem central", "Ao menor detalhe", "Sempre ao título", "À opinião do leitor"],
    c: 0,
    e: "A ideia principal representa o núcleo da mensagem."
  },
  {
    q: "Uma informação secundária pode:",
    a: ["Explicar ou exemplificar a ideia central", "Eliminar a ideia principal", "Nunca aparecer no texto", "Ser sempre mais importante"],
    c: 0,
    e: "Informações secundárias desenvolvem, ilustram ou explicam a ideia central."
  },
  {
    q: "O tópico frasal:",
    a: ["Pode apresentar a ideia central de um parágrafo", "Sempre é a última frase", "É obrigatoriamente o título", "Nunca aparece no início"],
    c: 0,
    e: "O tópico frasal pode apresentar ou sintetizar a ideia principal do parágrafo."
  },
  {
    q: "Uma inferência correta é:",
    a: ["Conclusão construída a partir de pistas", "Informação inventada", "Cópia literal obrigatória", "Opinião sem base"],
    c: 0,
    e: "A inferência precisa encontrar apoio nas informações fornecidas."
  },
  {
    q: "'João voltou a estudar.' A construção pressupõe que:",
    a: ["João já estudava anteriormente", "João nunca estudou", "João foi aprovado", "João estudou ontem"],
    c: 0,
    e: "O verbo 'voltou' pressupõe uma atividade anterior."
  },
  {
    q: "Quanto mais distante a conclusão estiver das pistas do texto:",
    a: ["Maior o risco de extrapolação", "Mais segura ela será", "Mais explícita se torna", "Menos contexto será necessário"],
    c: 0,
    e: "Conclusões distantes das evidências têm maior chance de extrapolar."
  },
  {
    q: "Qual pergunta ajuda a testar uma inferência?",
    a: ["Qual pista do texto sustenta essa conclusão?", "Essa resposta parece bonita?", "Isso acontece na vida real?", "A alternativa é longa?"],
    c: 0,
    e: "Uma inferência segura precisa possuir apoio textual."
  },
  {
    q: "Uma conclusão possível, mas sem evidência textual, é:",
    a: ["Uma suposição", "Sempre uma inferência", "Informação explícita", "Tópico frasal"],
    c: 0,
    e: "Ser possível não basta para caracterizar uma inferência."
  },
  {
    q: "Um detalhe verdadeiro pode ser resposta errada quando:",
    a: ["A questão pede a ideia principal", "Possui verbo", "Está no texto", "É curto"],
    c: 0,
    e: "Uma informação pode ser verdadeira e ainda não responder ao comando."
  },
  {
    q: "Ao analisar uma inferência, devemos evitar:",
    a: ["Acrescentar informação inexistente", "Procurar pistas", "Comparar alternativas", "Revisar o contexto"],
    c: 0,
    e: "Informações não fornecidas podem transformar uma inferência em extrapolação."
  }
];

/* =========================================================
   QUESTÕES — AULA 03
========================================================= */
const quiz3 = [
  {
    q: "Tipologia textual e gênero textual:",
    a: ["São conceitos diferentes", "São exatamente iguais", "Existem apenas em literatura", "Dependem apenas do tamanho"],
    c: 0,
    e: "Tipologia e gênero são conceitos relacionados, porém diferentes."
  },
  {
    q: "Qual alternativa apresenta um gênero textual?",
    a: ["Notícia", "Narração", "Descrição", "Argumentação"],
    c: 0,
    e: "Notícia é um gênero textual."
  },
  {
    q: "Uma sequência de acontecimentos caracteriza:",
    a: ["Narração", "Descrição", "Exposição", "Injunção"],
    c: 0,
    e: "A narração apresenta acontecimentos organizados em sequência."
  },
  {
    q: "Predomínio de características corresponde principalmente à:",
    a: ["Descrição", "Argumentação", "Narração", "Injunção"],
    c: 0,
    e: "A descrição apresenta características."
  },
  {
    q: "Um texto que explica determinado conceito tende a ser:",
    a: ["Expositivo", "Narrativo", "Injuntivo", "Descritivo"],
    c: 0,
    e: "A exposição apresenta e explica informações."
  },
  {
    q: "A defesa de uma ideia com argumentos caracteriza:",
    a: ["Argumentação", "Descrição", "Narração", "Injunção"],
    c: 0,
    e: "Argumentação envolve tese e argumentos."
  },
  {
    q: "Um texto que ensina como executar determinada ação é:",
    a: ["Injuntivo", "Narrativo", "Descritivo", "Expositivo"],
    c: 0,
    e: "A injunção orienta ou instrui o leitor."
  },
  {
    q: "Um mesmo gênero textual:",
    a: ["Pode combinar diferentes tipologias", "Possui somente uma tipologia", "Nunca pode narrar", "Nunca pode descrever"],
    c: 0,
    e: "Textos reais frequentemente combinam diferentes sequências."
  },
  {
    q: "'A sala era ampla, limpa e silenciosa.' Predomina:",
    a: ["Descrição", "Narração", "Argumentação", "Injunção"],
    c: 0,
    e: "O trecho apresenta características do ambiente."
  },
  {
    q: "Para identificar um gênero textual, devemos observar:",
    a: ["Finalidade e contexto de circulação", "Apenas o tamanho", "Somente os verbos", "Somente o título"],
    c: 0,
    e: "Gêneros estão relacionados à finalidade, público e contexto."
  }
];

/* =========================================================
   QUESTÕES — AULA 04
========================================================= */
const quiz4 = [
  {
    q: "A diferença básica entre coesão e coerência é:",
    a: ["Coesão liga elementos; coerência relaciona-se ao sentido", "São exatamente iguais", "Coesão é ortografia", "Coerência é apenas pontuação"],
    c: 0,
    e: "Coesão está ligada aos mecanismos linguísticos; coerência, à construção global de sentido."
  },
  {
    q: "'Maria comprou um livro. Ela começou a lê-lo.' O pronome 'ela' retoma:",
    a: ["Maria", "Livro", "Leitura", "Nenhum termo"],
    c: 0,
    e: "'Ela' retoma Maria."
  },
  {
    q: "Quando um termo retoma uma informação anterior, temos:",
    a: ["Anáfora", "Catáfora", "Elipse", "Descrição"],
    c: 0,
    e: "Anáfora é a retomada de uma informação anterior."
  },
  {
    q: "Quando um termo antecipa uma informação posterior, temos:",
    a: ["Catáfora", "Anáfora", "Elipse", "Injunção"],
    c: 0,
    e: "Catáfora aponta para uma informação que aparecerá depois."
  },
  {
    q: "A omissão de um termo recuperável pelo contexto recebe o nome de:",
    a: ["Elipse", "Anáfora", "Catáfora", "Ambiguidade"],
    c: 0,
    e: "Elipse é a omissão de um elemento recuperável pelo contexto."
  },
  {
    q: "O conectivo 'mas' normalmente estabelece:",
    a: ["Oposição", "Adição", "Conclusão", "Causa"],
    c: 0,
    e: "'Mas' normalmente introduz oposição ou contraste."
  },
  {
    q: "'Portanto' normalmente indica:",
    a: ["Conclusão", "Oposição", "Adição", "Descrição"],
    c: 0,
    e: "'Portanto' costuma introduzir conclusão."
  },
  {
    q: "'João encontrou Pedro. Ele estava preocupado.' O problema possível é:",
    a: ["Ambiguidade de referente", "Ausência de verbo", "Erro obrigatório de ortografia", "Ausência de substantivo"],
    c: 0,
    e: "O pronome 'ele' pode retomar João ou Pedro."
  },
  {
    q: "Um texto gramaticalmente correto pode ainda ser:",
    a: ["Incoerente", "Sempre coerente", "Sempre coeso", "Sempre argumentativo"],
    c: 0,
    e: "Correção gramatical não garante coerência."
  },
  {
    q: "Ao substituir um conectivo, devemos verificar:",
    a: ["Se a relação de sentido foi preservada", "Se possui o mesmo número de letras", "Se é maior", "Se aparece no título"],
    c: 0,
    e: "A troca de conectivo pode alterar a relação lógica do texto."
  }
];

/* =========================================================
   QUESTÕES — AULA 05
========================================================= */
const quiz5 = [
  {
    q: "Na frase 'Os candidatos chegaram cedo', 'candidatos' é:",
    a: ["Substantivo", "Adjetivo", "Pronome", "Advérbio"],
    c: 0,
    e: "'Candidatos' nomeia os seres de quem se fala."
  },
  {
    q: "Na frase 'O candidato dedicado estudou', 'dedicado' é:",
    a: ["Substantivo", "Adjetivo", "Verbo", "Preposição"],
    c: 1,
    e: "'Dedicado' caracteriza o substantivo 'candidato'."
  },
  {
    q: "Na frase 'Ela estudou muito', 'ela' é:",
    a: ["Artigo", "Pronome", "Numeral", "Conjunção"],
    c: 1,
    e: "'Ela' é pronome pessoal."
  },
  {
    q: "Qual alternativa apresenta um numeral?",
    a: ["Bonito", "Dois", "Rapidamente", "Embora"],
    c: 1,
    e: "'Dois' indica quantidade."
  },
  {
    q: "Na frase 'O policial agiu rapidamente', 'rapidamente' é:",
    a: ["Advérbio", "Adjetivo", "Substantivo", "Artigo"],
    c: 0,
    e: "A palavra modifica o verbo e indica modo."
  },
  {
    q: "Na frase 'Estudei para a prova', 'para' é:",
    a: ["Pronome", "Preposição", "Adjetivo", "Interjeição"],
    c: 1,
    e: "'Para' estabelece relação entre termos."
  },
  {
    q: "Em 'Estudou, mas não passou', 'mas' é:",
    a: ["Conjunção", "Preposição", "Numeral", "Substantivo"],
    c: 0,
    e: "'Mas' é conjunção adversativa."
  },
  {
    q: "Qual palavra pode funcionar como interjeição?",
    a: ["Porque", "Nossa!", "Durante", "Aquele"],
    c: 1,
    e: "'Nossa!' pode expressar surpresa ou emoção."
  },
  {
    q: "Em 'O jovem chegou cedo', 'jovem' funciona como:",
    a: ["Substantivo", "Preposição", "Advérbio", "Conjunção"],
    c: 0,
    e: "Nesse contexto, 'jovem' nomeia uma pessoa."
  },
  {
    q: "A classe gramatical de uma palavra deve ser analisada considerando:",
    a: ["Sua função no contexto", "Somente sua terminação", "Somente o tamanho", "A quantidade de letras"],
    c: 0,
    e: "O contexto é essencial para classificar corretamente uma palavra."
  }
];

/* =========================================================
   QUESTÕES — AULA 06
========================================================= */
const quiz6 = [
  {
    q: "O verbo pode expressar:",
    a: ["Ação, estado ou fenômeno", "Apenas ação", "Somente características", "Somente nomes"],
    c: 0,
    e: "Verbos podem apresentar diferentes valores."
  },
  {
    q: "'Estudar' pertence à:",
    a: ["Primeira conjugação", "Segunda conjugação", "Terceira conjugação", "Nenhuma conjugação"],
    c: 0,
    e: "Verbos terminados em -ar pertencem à primeira conjugação."
  },
  {
    q: "Em 'Talvez ele estude', 'estude' está no:",
    a: ["Indicativo", "Subjuntivo", "Imperativo", "Infinitivo"],
    c: 1,
    e: "O subjuntivo pode indicar hipótese ou possibilidade."
  },
  {
    q: "Em 'Estude agora!', o verbo está no:",
    a: ["Indicativo", "Subjuntivo", "Imperativo", "Gerúndio"],
    c: 2,
    e: "O imperativo pode indicar ordem ou orientação."
  },
  {
    q: "Qual alternativa apresenta um infinitivo?",
    a: ["Estudar", "Estudando", "Estudado", "Estudou"],
    c: 0,
    e: "'Estudar' está no infinitivo."
  },
  {
    q: "Qual alternativa apresenta gerúndio?",
    a: ["Estudar", "Estudando", "Estudado", "Estudará"],
    c: 1,
    e: "'Estudando' é gerúndio."
  },
  {
    q: "Qual alternativa apresenta particípio?",
    a: ["Estudar", "Estudando", "Estudado", "Estudarei"],
    c: 2,
    e: "'Estudado' é particípio."
  },
  {
    q: "Em 'Ele vai estudar amanhã', temos:",
    a: ["Locução verbal", "Conjunção", "Pronome", "Oração sem verbo"],
    c: 0,
    e: "'Vai estudar' forma uma locução verbal."
  },
  {
    q: "Em 'O relatório foi preenchido pelo policial', temos:",
    a: ["Voz ativa", "Voz passiva", "Voz reflexiva", "Infinitivo"],
    c: 1,
    e: "O sujeito sofre a ação, caracterizando voz passiva."
  },
  {
    q: "A mudança de tempo ou modo verbal:",
    a: ["Pode alterar o sentido", "Nunca altera o sentido", "Só muda a ortografia", "Não interfere na interpretação"],
    c: 0,
    e: "Tempo e modo verbal podem alterar relações temporais e valores de certeza ou hipótese."
  }
];

/* =========================================================
   QUESTÕES — AULA 07
========================================================= */
const quiz7 = [
  {
    q: "Assinale a frase correta:",
    a: ["Os candidatos chegaram cedo.", "Os candidatos chegou cedo.", "Os candidato chegou cedo.", "Os candidatos chegava cedo."],
    c: 0,
    e: "O verbo concorda com o sujeito no plural."
  },
  {
    q: "Assinale a alternativa correta:",
    a: ["Faz dois anos que estudo.", "Fazem dois anos que estudo.", "Fizeram dois anos que estudo.", "Fazem dois ano que estudo."],
    c: 0,
    e: "Indicando tempo decorrido, 'fazer' é impessoal."
  },
  {
    q: "Com sentido de existir, qual construção está correta?",
    a: ["Havia candidatos na sala.", "Haviam candidatos na sala.", "Houveram candidatos na sala.", "Haviam candidato na sala."],
    c: 0,
    e: "Com sentido de existir, 'haver' é impessoal."
  },
  {
    q: "Assinale a concordância nominal correta:",
    a: ["As candidatas estavam preparadas.", "As candidatas estavam preparado.", "As candidata estavam preparadas.", "As candidatas estava preparado."],
    c: 0,
    e: "'Preparadas' concorda com 'candidatas'."
  },
  {
    q: "Complete: 'Seguem _____ as documentações.'",
    a: ["anexas", "anexo", "anexa", "anexos"],
    c: 0,
    e: "'Anexas' concorda com 'documentações'."
  },
  {
    q: "Qual alternativa está correta?",
    a: ["Existem boas oportunidades.", "Existe boas oportunidades.", "Haviam boas oportunidades.", "Existe muitas oportunidades."],
    c: 0,
    e: "O verbo 'existir' concorda com seu sujeito."
  },
  {
    q: "Em 'A maioria dos candidatos chegou', o núcleo do sujeito é:",
    a: ["maioria", "candidatos", "dos", "chegou"],
    c: 0,
    e: "O núcleo é 'maioria'."
  },
  {
    q: "Qual construção está correta?",
    a: ["É proibida a entrada.", "É proibido a entrada.", "São proibido a entrada.", "É proibidas a entrada."],
    c: 0,
    e: "Com artigo determinando 'entrada', ocorre concordância."
  },
  {
    q: "Na análise de concordância verbal, devemos localizar primeiro:",
    a: ["O sujeito e seu núcleo", "A maior palavra", "A pontuação", "Somente o objeto"],
    c: 0,
    e: "O núcleo do sujeito é essencial para a concordância."
  },
  {
    q: "Qual construção apresenta corretamente o verbo fazer indicando tempo?",
    a: ["Faz três meses.", "Fazem três meses.", "Fizeram três meses.", "Fazem três mês."],
    c: 0,
    e: "Indicando tempo decorrido, usamos 'faz'."
  }
];
/* =========================================================
   QUESTÕES — AULA 08 — REGÊNCIA
========================================================= */
const quiz8 = [
  {
    q: "Regência verbal estuda principalmente:",
    a: ["A relação entre o verbo e seus complementos", "Somente pontuação", "Somente concordância", "A formação de palavras"],
    c: 0,
    e: "A regência observa as relações entre o verbo e seus complementos."
  },
  {
    q: "Na norma-padrão, assinale a forma adequada:",
    a: ["Assisti ao filme.", "Assisti o filme.", "Assisti no filme.", "Assisti pelo filme."],
    c: 0,
    e: "No sentido de ver, 'assistir' rege a preposição 'a'."
  },
  {
    q: "Assinale a alternativa correta:",
    a: ["Obedeceu ao regulamento.", "Obedeceu o regulamento.", "Obedeceu no regulamento.", "Obedeceu pelo regulamento."],
    c: 0,
    e: "'Obedecer' rege a preposição 'a'."
  },
  {
    q: "Na norma-padrão, a construção recomendada é:",
    a: ["Prefiro estudar a trabalhar.", "Prefiro estudar do que trabalhar.", "Prefiro mais estudar.", "Prefiro estudar que trabalhar."],
    c: 0,
    e: "A estrutura tradicional é 'preferir uma coisa a outra'."
  },
  {
    q: "No sentido de desejar, assinale a opção correta:",
    a: ["Aspirava a um cargo melhor.", "Aspirava um cargo melhor.", "Aspirava de um cargo.", "Aspirava com um cargo."],
    c: 0,
    e: "No sentido de desejar, 'aspirar' rege a preposição 'a'."
  },
  {
    q: "Assinale a alternativa adequada na norma-padrão:",
    a: ["Cheguei à escola.", "Cheguei na escola.", "Cheguei pela escola.", "Cheguei da escola, indicando destino."],
    c: 0,
    e: "Indicando destino, a norma-padrão tradicional recomenda 'chegar a'."
  },
  {
    q: "Em 'Referiu-se ao edital', a preposição aparece porque:",
    a: ["'Referir-se' rege a preposição a", "Todo verbo exige a", "Todo substantivo exige a", "Edital está no singular"],
    c: 0,
    e: "'Referir-se' exige complemento introduzido por 'a'."
  },
  {
    q: "Assinale a construção adequada:",
    a: ["Favorável à proposta.", "Favorável com a proposta.", "Favorável pela proposta.", "Favorável na proposta."],
    c: 0,
    e: "'Favorável' rege a preposição 'a'."
  },
  {
    q: "Regência nominal observa:",
    a: ["A relação entre um nome e seu complemento", "Somente dois verbos", "Apenas sujeito e predicado", "Somente pontuação"],
    c: 0,
    e: "Substantivos, adjetivos e advérbios podem exercer regência."
  },
  {
    q: "Em uma questão de regência, devemos identificar:",
    a: ["O termo regente e a preposição exigida", "A maior palavra", "Somente o sujeito", "Somente o tempo verbal"],
    c: 0,
    e: "Identificar o termo regente é essencial."
  }
];

/* =========================================================
   QUESTÕES — AULA 09 — CRASE
========================================================= */
const quiz9 = [
  {
    q: "Em regra, a crase pode resultar da união de:",
    a: ["Preposição a + artigo a", "Dois verbos", "Artigo o + preposição de", "Duas consoantes"],
    c: 0,
    e: "A + a pode resultar em 'à'."
  },
  {
    q: "Assinale a alternativa correta:",
    a: ["Vou à escola.", "Vou à estudar.", "Vou à pé.", "Entreguei à ela."],
    c: 0,
    e: "Em 'à escola', há preposição e artigo feminino."
  },
  {
    q: "Antes de verbo, em regra:",
    a: ["Não ocorre crase", "Sempre ocorre crase", "A crase é obrigatória", "Sempre usamos às"],
    c: 0,
    e: "Verbos não admitem artigo feminino."
  },
  {
    q: "Assinale a alternativa correta:",
    a: ["A prova começará às oito horas.", "A prova começará as oito horas.", "A prova começará à oito horas.", "A prova começará ás oito horas."],
    c: 0,
    e: "Horas determinadas normalmente recebem crase."
  },
  {
    q: "Assinale a construção correta:",
    a: ["Referiu-se àquela candidata.", "Referiu-se aquela candidata.", "Referiu-se áquela candidata.", "Referiu-se à aquela candidata."],
    c: 0,
    e: "A preposição 'a' pode se fundir ao início de 'aquela'."
  },
  {
    q: "Qual expressão está correta?",
    a: ["Frente a frente", "Frente à frente", "Frente á frente", "Frente às frente"],
    c: 0,
    e: "Em expressões com palavras repetidas, normalmente não ocorre crase."
  },
  {
    q: "O teste do masculino consiste em verificar se no masculino aparece:",
    a: ["ao", "de", "um", "por"],
    c: 0,
    e: "Se aparece 'ao', é forte indicação de 'à' no feminino correspondente."
  },
  {
    q: "No teste de nomes de lugares, uma regra prática é:",
    a: ["Volto da → vou à", "Volto de → vou à sempre", "Todo lugar recebe crase", "Nenhum lugar recebe crase"],
    c: 0,
    e: "O teste 'volto da, vou à' ajuda a identificar a presença do artigo."
  },
  {
    q: "Assinale a alternativa correta:",
    a: ["Entreguei o documento a ela.", "Entreguei o documento à ela.", "Entreguei o documento á ela.", "Entreguei o documento às ela."],
    c: 0,
    e: "Em regra, não ocorre crase antes de pronome pessoal."
  },
  {
    q: "Para analisar crase, devemos verificar principalmente:",
    a: ["Regência e presença de artigo", "Somente se a palavra é feminina", "Somente a quantidade de letras", "Somente o verbo"],
    c: 0,
    e: "A análise depende especialmente da preposição exigida e da possibilidade de artigo."
  }
];

/* =========================================================
   QUESTÕES — AULA 10 — PONTUAÇÃO
========================================================= */
const quiz10 = [
  {
    q: "A pontuação serve para:",
    a: ["Organizar estruturas e contribuir para o sentido", "Apenas deixar o texto bonito", "Eliminar conectivos", "Substituir interpretação"],
    c: 0,
    e: "A pontuação participa da organização sintática e do sentido."
  },
  {
    q: "Qual frase apresenta vírgula inadequada?",
    a: ["Os candidatos, chegaram cedo.", "Candidato, leia a questão.", "Ontem, ele estudou.", "Sim, estou preparado."],
    c: 0,
    e: "Não devemos separar sujeito e verbo sem justificativa."
  },
  {
    q: "Em 'Pedro, feche a porta.', Pedro é:",
    a: ["Vocativo", "Objeto direto", "Predicado", "Advérbio"],
    c: 0,
    e: "'Pedro' representa a pessoa chamada."
  },
  {
    q: "O aposto explicativo costuma ser:",
    a: ["Isolado por vírgulas", "Sempre sem pontuação", "Sempre sujeito", "Sempre verbo"],
    c: 0,
    e: "O aposto explicativo costuma aparecer isolado."
  },
  {
    q: "Os dois-pontos podem introduzir:",
    a: ["Explicação ou enumeração", "Somente pergunta", "Somente sujeito", "Apenas uma negação"],
    c: 0,
    e: "Dois-pontos podem introduzir explicação, enumeração e outros desenvolvimentos."
  },
  {
    q: "O ponto e vírgula pode:",
    a: ["Separar partes relativamente independentes de um período", "Separar obrigatoriamente sujeito e verbo", "Marcar somente perguntas", "Substituir qualquer verbo"],
    c: 0,
    e: "O ponto e vírgula organiza estruturas mais complexas."
  },
  {
    q: "Qual sinal normalmente encerra uma pergunta direta?",
    a: ["Ponto de interrogação", "Vírgula", "Dois-pontos", "Ponto e vírgula"],
    c: 0,
    e: "Perguntas diretas normalmente recebem ponto de interrogação."
  },
  {
    q: "Orações adjetivas explicativas são normalmente:",
    a: ["Isoladas por vírgulas", "Sempre sem vírgulas", "Sempre verbos", "Sempre objetos"],
    c: 0,
    e: "A oração explicativa é isolada por vírgula ou vírgulas."
  },
  {
    q: "Orações adjetivas restritivas, em regra:",
    a: ["Não são isoladas por vírgulas", "São sempre isoladas", "Não possuem verbo", "São sempre vocativos"],
    c: 0,
    e: "A ausência das vírgulas ajuda a produzir o valor restritivo."
  },
  {
    q: "Uma mudança de pontuação:",
    a: ["Pode alterar o sentido", "Nunca altera o sentido", "Só altera o tamanho", "Não interfere na sintaxe"],
    c: 0,
    e: "Pontuação pode alterar estrutura e interpretação."
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
  const quizzes = {
    1: quiz1,
    2: quiz2,
    3: quiz3,
    4: quiz4,
    5: quiz5,
    6: quiz6,
    7: quiz7,
    8: quiz8,
    9: quiz9,
    10: quiz10
  };

  return quizzes[lesson] || [];
}

function getLessonData(lessonNumber) {
  if (
    typeof lessons !== "undefined" &&
    lessons[lessonNumber]
  ) {
    return lessons[lessonNumber];
  }

  return null;
}

function getLessonTitle(lessonNumber) {
  const data = getLessonData(lessonNumber);

  return (
    (data && data.title) ||
    LESSON_TITLES[lessonNumber] ||
    `Aula ${lessonNumber}`
  );
}

function getLessonTime(lessonNumber) {
  const data = getLessonData(lessonNumber);

  return (
    (data && data.time) ||
    "45–60 min"
  );
}

function firstPendingLesson() {
  for (
    let i = 1;
    i <= TOTAL_LESSONS;
    i++
  ) {
    if (!isPassed(i)) {
      return i;
    }
  }

  return null;
}

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

  window.scrollTo(0, 0);
}

/* =========================================================
   AULA DINÂMICA
   Todas as aulas 01–10 usam o lessons.js
========================================================= */
function openLesson(lessonNumber) {
  if (
    lessonNumber < 1 ||
    lessonNumber > TOTAL_LESSONS
  ) {
    return;
  }

  if (
    lessonNumber > 1 &&
    !isPassed(lessonNumber - 1)
  ) {
    alert(
      `🔒 Conclua a Aula ${String(
        lessonNumber - 1
      ).padStart(2, "0")} com pelo menos ${MIN_SCORE}% para desbloquear esta aula.`
    );

    return;
  }

  const lesson =
    getLessonData(lessonNumber);

  if (!lesson) {
    alert(
      `Conteúdo da Aula ${lessonNumber} não encontrado no lessons.js.`
    );

    return;
  }

  currentLesson =
    lessonNumber;

  const subtitle =
    document.getElementById(
      "dynamicLessonSubtitle"
    );

  const title =
    document.getElementById(
      "dynamicLessonTitle"
    );

  const content =
    document.getElementById(
      "dynamicLessonContent"
    );

  if (subtitle) {
    subtitle.textContent =
      lesson.subtitle ||
      lesson.label ||
      `PORTUGUÊS • AULA ${String(
        lessonNumber
      ).padStart(2, "0")}`;
  }

  if (title) {
    title.textContent =
      lesson.title ||
      getLessonTitle(lessonNumber);
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

function backToLesson() {
  openLesson(currentLesson);
}

/* =========================================================
   LEITURA
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
    `📚 Leitura da Aula ${String(
      lessonNumber
    ).padStart(2, "0")} concluída!\n\n🎯 A prova foi liberada.`
  );
}

/* Compatibilidade com trechos antigos do index.html */
function completeReading3() {
  completeReading(3);
}

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

  const quizButton =
    document.getElementById(
      `quiz${lessonNumber}Btn`
    );

  const lockText =
    document.getElementById(
      `quiz${lessonNumber}LockText`
    );

  if (pct) {
    pct.textContent =
      done ? "100%" : "0%";
  }

  if (bar) {
    bar.style.width =
      done ? "100%" : "0%";
  }

  if (quizButton) {
    quizButton.disabled =
      !done;

    quizButton.textContent =
      done
        ? (
            isPassed(lessonNumber)
              ? "✅ REFAZER PROVA"
              : "INICIAR PROVA ▶"
          )
        : "🔒 PROVA BLOQUEADA";

    quizButton.classList.toggle(
      "secondary",
      !done
    );
  }

  if (lockText) {
    lockText.textContent =
      done
        ? (
            isPassed(lessonNumber)
              ? "✅ Aula aprovada. Você pode refazer a prova para revisar."
              : "✅ Leitura concluída. A prova está liberada."
          )
        : "Conclua a leitura antes de realizar a prova.";
  }
}

window.addEventListener(
  "scroll",
  () => {
    const dynamicLesson =
      document.getElementById(
        "dynamicLesson"
      );

    if (
      !dynamicLesson ||
      !dynamicLesson.classList.contains(
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

    if (
      !pctEl ||
      !bar
    ) {
      return;
    }

    const rect =
      dynamicLesson
        .getBoundingClientRect();

    const total =
      dynamicLesson.scrollHeight -
      window.innerHeight;

    if (total <= 0) {
      return;
    }

    const traveled =
      Math.max(
        0,
        -rect.top
      );

    let percent =
      Math.round(
        (
          traveled /
          total
        ) * 100
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
   PROVA
========================================================= */
function startQuiz(lessonNumber) {
  if (
    !isReadingDone(
      lessonNumber
    )
  ) {
    alert(
      `📚 Conclua a leitura da Aula ${String(
        lessonNumber
      ).padStart(2, "0")} antes de fazer a prova.`
    );

    return;
  }

  currentLesson =
    lessonNumber;

  questions =
    getQuiz(lessonNumber);

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
  lastPassed = false;
  lastPct = 0;

  show("quiz");

  renderQ();
}

function renderQ() {
  answered = false;

  const question =
    questions[qi];

  if (!question) {
    return;
  }

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
      `${
        (
          (qi + 1) /
          questions.length
        ) * 100
      }%`;
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
          `${
            String.fromCharCode(
              65 + index
            )
          }. ${text}`;

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

    feedback.innerHTML =
      "";
  }

  if (next) {
    next.classList.add(
      "hidden"
    );

    next.textContent =
      qi ===
      questions.length - 1
        ? "VER RESULTADO"
        : "PRÓXIMA";
  }
}

function answer(index, button) {
  if (answered) {
    return;
  }

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
              65 + question.c
            )}.
            ${question.a[question.c]}
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
      (
        score /
        questions.length
      ) * 100
    );

  lastPassed =
    lastPct >=
    MIN_SCORE;

  saveAttempt();

  renderResult();

  show("result");
}

/* =========================================================
   HISTÓRICO E CADERNO DE ERROS
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

  localStorage.setItem(
    "attemptHistory",
    JSON.stringify(
      attempts.slice(
        0,
        40
      )
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

  if (!history) {
    return;
  }

  if (!attempts.length) {
    history.textContent =
      "Nenhuma tentativa registrada.";

    return;
  }

  history.innerHTML =
    attempts
      .slice(
        0,
        15
      )
      .map(
        attempt => `
          <div style="padding:16px 0;border-bottom:1px solid #21382f;">
            <b>
              📚 Aula ${String(
                attempt.lesson
              ).padStart(
                2,
                "0"
              )}
            </b>

            <br><br>

            Nota:
            <b>${attempt.pct}%</b>
            •
            ${attempt.score}/${attempt.total}

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

  if (!reviewList) {
    return;
  }

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
              AULA ${String(
                item.lesson
              ).padStart(
                2,
                "0"
              )}
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

                    ${item.correctAnswer}
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

  /*
    APROVADO
  */

  if (lastPassed) {
    if (resultTitle) {
      resultTitle.textContent =
        "Missão aprovada 🟢";
    }

    if (resultMsg) {
      resultMsg.textContent =
        currentLesson <
        TOTAL_LESSONS
          ? `Você atingiu ${lastPct}% e pode avançar para a Aula ${String(
              currentLesson + 1
            ).padStart(
              2,
              "0"
            )}.`
          : `Você atingiu ${lastPct}% e concluiu o módulo com as ${TOTAL_LESSONS} aulas.`;
    }

    if (mastery) {
      mastery.textContent =
        lastPct === 100
          ? "DOMÍNIO: 100% 🏆"
          : "DOMÍNIO: APROVADO";
    }

    if (action) {
      action.textContent =
        currentLesson <
        TOTAL_LESSONS
          ? "CONCLUIR E LIBERAR PRÓXIMA AULA"
          : "CONCLUIR MÓDULO";
    }

    return;
  }

  /*
    REPROVADO
  */

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
      `Você fez ${lastPct}%. O mínimo para avançar é ${MIN_SCORE}%. Seus erros foram salvos para revisão.`;
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

function finishResult() {
  /*
    APROVADO
  */

  if (lastPassed) {
    const key =
      `passed${currentLesson}`;

    /*
      XP apenas na primeira aprovação.
    */

    if (
      !localStorage.getItem(
        key
      )
    ) {
      setXP(
        getXP() +
        XP_PER_LESSON
      );

      localStorage.setItem(
        key,
        "1"
      );
    }

    sync();

    /*
      Próxima aula.
    */

    if (
      currentLesson <
      TOTAL_LESSONS
    ) {
      openLesson(
        currentLesson + 1
      );
    }

    /*
      Terminou a Aula 10.
    */

    else {
      show(
        "progressPage"
      );
    }

    return;
  }

  /*
    REPROVADO
  */

  sync();

  showReview();
}

/* =========================================================
   PAINEL PRINCIPAL
========================================================= */
function updateMainMission() {
  const current =
    firstPendingLesson();

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

  /*
    TODAS AS AULAS CONCLUÍDAS
  */

  if (
    current === null
  ) {
    title.textContent =
      "🏆 Português concluído";

    topic.textContent =
      `Você concluiu as ${TOTAL_LESSONS} aulas deste módulo.`;

    if (time) {
      time.textContent =
        "✅ 100% concluído";
    }

    button.textContent =
      "VER PROGRESSO";

    button.disabled =
      false;

    button.onclick =
      () =>
        show(
          "progressPage"
        );

    return;
  }

  /*
    MISSÃO ATUAL
  */

  title.textContent =
    "📚 Português";

  topic.textContent =
    `${getLessonTitle(
      current
    )} • Aula ${String(
      current
    ).padStart(
      2,
      "0"
    )}`;

  if (time) {
    time.textContent =
      `⏱ ${getLessonTime(
        current
      )}`;
  }

  button.textContent =
    isReadingDone(
      current
    )
      ? "CONTINUAR MISSÃO ▶"
      : "COMEÇAR LEITURA ▶";

  button.disabled =
    false;

  button.onclick =
    () =>
      openLesson(
        current
      );
}

/* =========================================================
   PRÓXIMA MISSÃO
========================================================= */
function updateNextMission() {
  const current =
    firstPendingLesson();

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

  /*
    MÓDULO CONCLUÍDO
  */

  if (
    current === null
  ) {
    title.textContent =
      "🏆 Módulo concluído";

    text.textContent =
      `Você concluiu as ${TOTAL_LESSONS} aulas de Português.`;

    button.textContent =
      "VER PROGRESSO";

    button.disabled =
      false;

    button.onclick =
      () =>
        show(
          "progressPage"
        );

    return;
  }

  /*
    AULA 10
  */

  if (
    current ===
    TOTAL_LESSONS
  ) {
    title.textContent =
      "🏁 Última aula do módulo";

    text.textContent =
      `Conclua a Aula ${String(
        TOTAL_LESSONS
      ).padStart(
        2,
        "0"
      )} com pelo menos ${MIN_SCORE}% para finalizar Português.`;

    button.textContent =
      "BLOQUEADA";

    button.disabled =
      true;

    button.onclick =
      null;

    return;
  }

  /*
    PRÓXIMA AULA BLOQUEADA
  */

  const nextLesson =
    current + 1;

  title.textContent =
    `🔒 Aula ${String(
      nextLesson
    ).padStart(
      2,
      "0"
    )} bloqueada`;

  text.textContent =
    `Conclua a Aula ${String(
      current
    ).padStart(
      2,
      "0"
    )} com pelo menos ${MIN_SCORE}% para avançar.`;

  button.textContent =
    "BLOQUEADA";

  button.disabled =
    true;

  button.onclick =
    null;
}

/* =========================================================
   MATÉRIAS
   GERA AS 10 AULAS AUTOMATICAMENTE
========================================================= */
function updateSubjects() {
  const section =
    document.getElementById(
      "subjects"
    );

  if (!section) {
    return;
  }

  const oldCards = [
    ...section.querySelectorAll(
      ".subject"
    )
  ];

  oldCards.forEach(
    card => {
      card.remove();
    }
  );

  for (
    let lessonNumber = 1;
    lessonNumber <=
    TOTAL_LESSONS;
    lessonNumber++
  ) {
    const unlocked =
      lessonNumber === 1 ||
      isPassed(
        lessonNumber - 1
      );

    const card =
      document.createElement(
        "div"
      );

    card.className =
      `card subject${
        unlocked
          ? ""
          : " locked"
      }`;

    card.id =
      `subject${lessonNumber}`;

    const icon =
      lessonNumber === 1
        ? "📖"
        : lessonNumber === 2
          ? "📘"
          : lessonNumber === 3
            ? "📚"
            : lessonNumber === 4
              ? "📗"
              : "📕";

    const statusText =
      isPassed(
        lessonNumber
      )
        ? "✅ Concluída"
        : unlocked
          ? "▶ Atual"
          : "🔒";

    card.innerHTML = `
      <div>
        <b>
          ${icon}
          Aula ${String(
            lessonNumber
          ).padStart(
            2,
            "0"
          )}
        </b>

        <small>
          ${getLessonTitle(
            lessonNumber
          )}
        </small>
      </div>

      <strong id="status${lessonNumber}">
        ${statusText}
      </strong>
    `;

    if (unlocked) {
      card.onclick =
        () =>
          openLesson(
            lessonNumber
          );
    }

    section.appendChild(
      card
    );
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

  if (
    aPass &&
    isPassed(1)
  ) {
    aPass.textContent =
      "✅ Aprovado na primeira aula";
  }

  if (
    aSecond &&
    isPassed(1)
  ) {
    aSecond.textContent =
      "✅ Desbloqueei a Aula 02";
  }

  if (
    aThird &&
    isPassed(2)
  ) {
    aThird.textContent =
      "✅ Desbloqueei a Aula 03";
  }

  const anyReading =
    Array.from(
      {
        length:
          TOTAL_LESSONS
      },
      (_, i) =>
        i + 1
    ).some(
      isReadingDone
    );

  if (
    aReader &&
    anyReading
  ) {
    aReader.textContent =
      "✅ Concluí uma aula em modo leitura";
  }

  if (
    aThirdPass &&
    isPassed(3)
  ) {
    aThirdPass.textContent =
      "✅ Aprovado na Aula 03";
  }

  if (
    aFourth &&
    isPassed(3)
  ) {
    aFourth.textContent =
      "✅ Desbloqueei a Aula 04";
  }

  if (
    aFourthPass &&
    isPassed(4)
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
    i <=
    TOTAL_LESSONS;
    i++
  ) {
    if (
      isPassed(i)
    ) {
      passedCount++;
    }
  }

  const progress =
    Math.round(
      (
        passedCount /
        TOTAL_LESSONS
      ) * 100
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

  updateDynamicReading(
    currentLesson
  );
}

/* =========================================================
   REINICIAR CURSO
========================================================= */
function restartCourse() {
  const ok =
    confirm(
      "⚠️ Deseja realmente reiniciar o curso?\n\nIsso apagará aprovações, leituras, XP, histórico e caderno de erros."
    );

  if (!ok) {
    return;
  }

  for (
    let i = 1;
    i <=
    TOTAL_LESSONS;
    i++
  ) {
    localStorage.removeItem(
      `passed${i}`
    );

    localStorage.removeItem(
      `reading${i}Done`
    );
  }

  localStorage.removeItem(
    "xp"
  );

  localStorage.removeItem(
    "attemptHistory"
  );

  localStorage.removeItem(
    "errors"
  );

  currentLesson = 1;
  questions = [];
  qi = 0;
  score = 0;
  errors = [];
  answered = false;
  lastPassed = false;
  lastPct = 0;

  sync();

  show(
    "home"
  );

  alert(
    "✅ Curso reiniciado. Você voltou para a Aula 01."
  );
}

/* =========================================================
   INICIALIZAÇÃO
========================================================= */
function initApp() {
  sync();

  const active =
    document.querySelector(
      ".page.active"
    );

  if (!active) {
    show(
      "home"
    );
  }
}

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initApp
  );
} else {
  initApp();
}
