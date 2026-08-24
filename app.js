const quiz1=[
{q:"Em uma questão de interpretação, a resposta deve se apoiar principalmente em:",a:["Sua opinião pessoal","O texto apresentado","A alternativa mais longa","O que outras pessoas pensam"],c:1,e:"A interpretação deve ser sustentada pelo texto."},
{q:"A ideia principal de um texto é:",a:["A mensagem central desenvolvida","Sempre a primeira frase","A palavra mais repetida","A opinião do leitor"],c:0,e:"A ideia principal representa o núcleo da mensagem."},
{q:"O texto diz: “Marina levou casaco porque a temperatura caiu.” O que é seguro concluir?",a:["Marina comprou o casaco hoje","A temperatura estava mais baixa","Marina odeia frio","Era madrugada"],c:1,e:"Somente a queda da temperatura está sustentada pela frase."},
{q:"Antes de marcar uma alternativa, uma boa estratégia é:",a:["Inventar detalhes","Confirmar a resposta no texto","Escolher rapidamente","Ignorar o enunciado"],c:1,e:"Voltar ao texto ajuda a evitar conclusões sem fundamento."},
{q:"Qual atitude pode causar erro de interpretação?",a:["Identificar palavras-chave","Ler o comando","Responder pela própria opinião sem conferir o texto","Procurar a ideia central"],c:2,e:"A opinião pessoal não substitui as informações fornecidas pelo texto."}
];

const quiz2=[
{q:"A ideia principal de um texto corresponde:",a:["Ao detalhe menos importante","À mensagem central","Sempre ao título","À opinião do leitor"],c:1,e:"A ideia principal organiza o sentido central do texto."},
{q:"Inferir significa:",a:["Copiar uma frase","Inventar uma informação","Concluir algo a partir de pistas do texto","Ignorar o contexto"],c:2,e:"Inferência é uma conclusão baseada em evidências do texto."},
{q:"“As ruas estavam molhadas e as pessoas carregavam guarda-chuvas.” Uma inferência possível é:",a:["Provavelmente choveu","Era meio-dia","Todos estavam atrasados","As ruas foram lavadas"],c:0,e:"A chuva é a conclusão mais diretamente sustentada pelas pistas."},
{q:"Uma inferência correta precisa:",a:["Ser baseada no texto","Ser criativa","Ser sempre explícita","Contradizer o autor"],c:0,e:"Inferências válidas partem de pistas e contexto fornecidos."},
{q:"Para localizar a ideia principal, ajuda perguntar:",a:["Qual palavra é mais longa?","Qual é a mensagem central?","Quantas linhas há?","Quem publicou primeiro?"],c:1,e:"Perguntar pela mensagem central ajuda a encontrar a ideia principal."}
];

let currentLesson=1;
let questions=[];
let qi=0;
let score=0;
let errors=[];
let answered=false;
let lastPassed=false;
let lastPct=0;

function show(id){
    document.querySelectorAll(".page").forEach(x=>{
        x.classList.remove("active");
    });

    const page=document.getElementById(id);

    if(page){
        page.classList.add("active");
    }

    document.querySelectorAll("nav button").forEach(x=>{
        x.classList.toggle("active",x.dataset.page===id);
    });

    scrollTo(0,0);
}

function startQuiz(lesson){
    currentLesson=lesson;

    questions=lesson===1 ? quiz1 : quiz2;

    qi=0;
    score=0;
    errors=[];
    answered=false;

    show("quiz");
    renderQ();
}

function backToLesson(){
    show(currentLesson===1 ? "lesson1" : "lesson2");
}

function renderQ(){
    answered=false;

    let q=questions[qi];

    document.getElementById("qnum").textContent=
        `QUESTÃO ${qi+1} DE ${questions.length}`;

    document.getElementById("scoreNow").textContent=
        `${score} acertos`;

    document.getElementById("qbar").style.width=
        `${(qi+1)/questions.length*100}%`;

    document.getElementById("qtext").textContent=q.q;

    const answersBox=document.getElementById("answers");

    answersBox.innerHTML="";

    q.a.forEach((t,i)=>{

        let b=document.createElement("button");

        b.className="answer";

        b.textContent=
            String.fromCharCode(65+i)+". "+t;

        b.onclick=()=>answer(i,b);

        answersBox.appendChild(b);
    });

    document.getElementById("feedback")
        .classList.add("hidden");

    document.getElementById("next")
        .classList.add("hidden");

    document.getElementById("next").textContent=
        qi===questions.length-1
        ? "VER RESULTADO"
        : "PRÓXIMA";
}

function answer(i,b){

    if(answered)return;

    answered=true;

    let q=questions[qi];

    let bs=[
        ...document.querySelectorAll(".answer")
    ];

    bs.forEach(x=>x.disabled=true);

    if(i===q.c){

        score++;

        b.classList.add("ok");

    }else{

        b.classList.add("no");

        if(bs[q.c]){
            bs[q.c].classList.add("ok");
        }

        errors.push({
            lesson:currentLesson,
            q:q.q,
            exp:q.e
        });
    }

    document.getElementById("feedback")
        .textContent=q.e;

    document.getElementById("feedback")
        .classList.remove("hidden");

    document.getElementById("next")
        .classList.remove("hidden");

    document.getElementById("scoreNow")
        .textContent=`${score} acertos`;
}

function nextQ(){

    if(qi<questions.length-1){

        qi++;

        renderQ();

        return;
    }

    lastPct=Math.round(
        score/questions.length*100
    );

    lastPassed=lastPct>=70;

    saveAttempt();

    renderResult();

    show("result");
}

function saveAttempt(){

    let attempts=JSON.parse(
        localStorage.getItem("history") || "[]"
    );

    attempts.unshift({

        lesson:currentLesson,

        pct:lastPct,

        passed:lastPassed,

        score:score,

        total:questions.length,

        date:new Date().toLocaleDateString("pt-BR"),

        time:new Date().toLocaleTimeString(
            "pt-BR",
            {
                hour:"2-digit",
                minute:"2-digit"
            }
        )
    });

    attempts=attempts.slice(0,10);

    localStorage.setItem(
        "history",
        JSON.stringify(attempts)
    );

    let storedErrors=JSON.parse(
        localStorage.getItem("errors") || "[]"
    );

    storedErrors=[
        ...errors,
        ...storedErrors
    ].slice(0,30);

    localStorage.setItem(
        "errors",
        JSON.stringify(storedErrors)
    );
}

function renderResult(){

    document.getElementById("resultPct")
        .textContent=lastPct+"%";

    document.getElementById("resultScore")
        .textContent=`${score}/${questions.length}`;

    const circle=document.querySelector(".circle");

    circle.className="circle";

    if(lastPassed){

        document.getElementById("resultTitle")
            .textContent="Missão aprovada 🟢";

        document.getElementById("resultMsg")
            .textContent=
            "Você atingiu o mínimo de 70% e pode avançar.";

        document.getElementById("mastery")
            .textContent="DOMÍNIO: aprovado";

        document.getElementById("resultAction")
            .textContent="CONCLUIR E RECEBER XP";

    }else{

        circle.classList.add(
            lastPct>=50 ? "warn" : "fail"
        );

        document.getElementById("resultTitle")
            .textContent=
            lastPct>=50
            ? "Quase lá 🟠"
            : "Vamos reforçar a base 🔴";

        document.getElementById("resultMsg")
            .textContent=
            "Você ainda não atingiu 70%. Seus erros foram salvos para revisão.";

        document.getElementById("mastery")
            .textContent=
            "DOMÍNIO: refazer conteúdo";

        document.getElementById("resultAction")
            .textContent=
            "REVISAR E TENTAR NOVAMENTE";
    }
}

function finishResult(){

    if(lastPassed){

        const key="passed"+currentLesson;

        if(!localStorage.getItem(key)){

            let currentXP=Number(
                localStorage.getItem("xp") || 0
            );

            localStorage.setItem(
                "xp",
                currentXP+100
            );

            localStorage.setItem(
                key,
                "1"
            );
        }

        if(currentLesson===1){

            localStorage.setItem(
                "lesson2Unlocked",
                "1"
            );
        }

        sync();

        show("progressPage");

    }else{

        sync();

        showReview();
    }
}

function showReview(){

    const e=JSON.parse(
        localStorage.getItem("errors") || "[]"
    );

    const reviewList=
        document.getElementById("reviewList");

    reviewList.innerHTML=e.length

    ? e.map((x,i)=>`

        <div class="card reviewItem">

            <b>
                ${i+1}. ${x.q}
            </b>

            <p class="muted">
                Aula ${x.lesson}
            </p>

            <p class="muted">
                ${x.exp}
            </p>

        </div>

    `).join("")

    : '<div class="card">Nenhum erro registrado.</div>';

    show("review");
}

function sync(){

    let x=Number(
        localStorage.getItem("xp") || 0
    );

    let p1=
        !!localStorage.getItem("passed1");

    let p2=
        !!localStorage.getItem("passed2");

    let unlocked=
        !!localStorage.getItem("lesson2Unlocked");

    let passedCount=
        (p1?1:0)+(p2?1:0);

    let progress=
        passedCount*20;

    const xpEl=document.getElementById("xp");

    if(xpEl){
        xpEl.textContent=x;
    }

    const missionsEl=
        document.getElementById("missions");

    if(missionsEl){
        missionsEl.textContent=passedCount;
    }

    const generalEl=
        document.getElementById("general");

    if(generalEl){
        generalEl.textContent=progress+"%";
    }

    const pPctEl=
        document.getElementById("pPct");

    if(pPctEl){
        pPctEl.textContent=progress+"%";
    }

    const pbarEl=
        document.getElementById("pbar");

    if(pbarEl){
        pbarEl.style.width=progress+"%";
    }

    const status1El=
        document.getElementById("status1");

    if(status1El){

        status1El.textContent=
            p1
            ? "✅ Aprovada"
            : "Em andamento";
    }

    const status2El=
        document.getElementById("status2");

    if(status2El){

        status2El.textContent=
            p2
            ? "✅ Aprovada"
            : unlocked
            ? "🔓 Liberada"
            : "🔒";
    }

    const nextMissionTitle=
        document.getElementById(
            "nextMissionTitle"
        );

    const nextMissionText=
        document.getElementById(
            "nextMissionText"
        );

    const nextMissionBtn=
        document.getElementById(
            "nextMissionBtn"
        );

    if(nextMissionTitle){

        nextMissionTitle.textContent=
            unlocked
            ? "🔓 Aula 02 liberada"
            : "🔒 Aula 02 bloqueada";
    }

    if(nextMissionText){

        nextMissionText.textContent=
            unlocked
            ? "Ideia principal e inferência já está disponível."
            : "Acerte pelo menos 70% na Aula 01 para desbloquear.";
    }

    if(nextMissionBtn){

        nextMissionBtn.disabled=!unlocked;

        nextMissionBtn.textContent=
            unlocked
            ? "COMEÇAR AULA 02"
            : "BLOQUEADA";
    }

    const aPass=
        document.getElementById("aPass");

    const aSecond=
        document.getElementById("aSecond");

    if(p1){

        if(aPass){
            aPass.textContent=
                "✅ Aprovado na primeira aula";
        }

        if(aSecond){
            aSecond.textContent=
                "✅ Desbloqueei a Aula 02";
        }
    }

    /*
       CORREÇÃO PRINCIPAL:
       não usamos mais "history.innerHTML",
       porque "history" também é um objeto
       interno do navegador.
    */

    const historyBox=
        document.getElementById("history");

    const attempts=JSON.parse(
        localStorage.getItem("history") || "[]"
    );

    if(historyBox){

        if(attempts.length){

            historyBox.innerHTML=
                attempts.map(attempt=>{

                    const result=
                        attempt.passed
                        ? "✅ aprovado"
                        : "❌ refazer";

                    const scoreText=
                        attempt.score!==undefined
                        ? `${attempt.score}/${attempt.total}`
                        : "";

                    const timeText=
                        attempt.time
                        ? ` • ${attempt.time}`
                        : "";

                    return `
                        <div style="
                            padding:12px 0;
                            border-bottom:1px solid #21382f;
                        ">

                            <b>
                                📚 Aula ${attempt.lesson}
                            </b>

                            <br>

                            Nota:
                            <b>${attempt.pct}%</b>

                            ${scoreText
                                ? ` • ${scoreText}`
                                : ""
                            }

                            <br>

                            ${result}

                            <br>

                            <small>
                                ${attempt.date}${timeText}
                            </small>

                        </div>
                    `;

                }).join("");

        }else{

            historyBox.textContent=
                "Nenhuma tentativa registrada.";
        }
    }

    const storedErrors=JSON.parse(
        localStorage.getItem("errors") || "[]"
    );

    const errorBook=
        document.getElementById("errorBook");

    if(errorBook){

        errorBook.innerHTML=
            storedErrors.length
            ? `${storedErrors.length} erro(s) salvo(s) para revisão.`
            : "Nenhum erro registrado.";
    }
}

sync();
