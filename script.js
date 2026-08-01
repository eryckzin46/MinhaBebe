// =========================================================
// MÚSICA
// =========================================================

const musica =
    document.getElementById("musica");

const botaoComecar =
    document.getElementById("comecar");

const musicPlay =
    document.getElementById("musicPlay");

const musicStatus =
    document.getElementById("musicStatus");

const musicProgress =
    document.getElementById("musicProgress");


// =========================================================
// TOCAR MÚSICA
// =========================================================

function tocarMusica(){

    if(!musica) return;

    musica.play()
        .then(() => {

            if(musicPlay){

                musicPlay.textContent = "Ⅱ";

            }

            if(musicStatus){

                musicStatus.textContent =
                    "Tocando";

            }

        })
        .catch(() => {

            if(musicStatus){

                musicStatus.textContent =
                    "Toque para tocar";

            }

        });

}


// =========================================================
// PAUSAR MÚSICA
// =========================================================

function pausarMusica(){

    if(!musica) return;

    musica.pause();

    if(musicPlay){

        musicPlay.textContent = "▶";

    }

    if(musicStatus){

        musicStatus.textContent =
            "Pausada";

    }

}


// =========================================================
// BOTÃO DO PLAYER
// =========================================================

if(musicPlay){

    musicPlay.addEventListener(
        "click",
        () => {

            if(!musica) return;

            if(musica.paused){

                tocarMusica();

            }else{

                pausarMusica();

            }

        }
    );

}


// =========================================================
// BOTÃO COMEÇAR
// =========================================================

if(botaoComecar){

    botaoComecar.addEventListener(
        "click",
        () => {

            tocarMusica();

            const pagina2 =
                document.getElementById("pagina2");

            if(pagina2){

                pagina2.scrollIntoView({

                    behavior:"smooth"

                });

            }

        }
    );

}


// =========================================================
// PROGRESSO DA MÚSICA
// =========================================================

if(musica){

    musica.addEventListener(
        "timeupdate",
        () => {

            if(
                !musica.duration ||
                !isFinite(musica.duration)
            ){

                return;

            }

            const porcentagem =
                (musica.currentTime /
                musica.duration) * 100;

            if(musicProgress){

                musicProgress.style.width =
                    porcentagem + "%";

            }

        }
    );

}


// =========================================================
// SCROLL REVEAL
// =========================================================

const sections =
    document.querySelectorAll(
        "section:not(.voto-section)"
    );


function reveal(){

    sections.forEach(
        section => {

            const top =
                section.getBoundingClientRect().top;

            const altura =
                window.innerHeight;

            if(
                top <
                altura - 100
            ){

                section.classList.add("show");

            }

        }
    );

}


window.addEventListener(
    "scroll",
    reveal
);

window.addEventListener(
    "load",
    reveal
);

reveal();


// =========================================================
// CORAÇÕES
// =========================================================

const hearts =
    document.getElementById("hearts");


function criarCoracao(){

    if(!hearts) return;

    const heart =
        document.createElement("div");

    heart.className =
        "heart";

    heart.textContent =
        "❤";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (14 + Math.random() * 14) + "px";

    const duracao =
        7 + Math.random() * 4;

    heart.style.animationDuration =
        duracao + "s";

    hearts.appendChild(
        heart
    );

    setTimeout(
        () => {

            heart.remove();

        },
        duracao * 1000 + 1000
    );

}


setInterval(
    criarCoracao,
    900
);


// =========================================================
// ESTRELAS
// =========================================================

const stars =
    document.getElementById("stars");


if(stars){

    for(
        let i = 0;
        i < 45;
        i++
    ){

        const star =
            document.createElement("span");

        star.style.position =
            "absolute";

        star.style.width =
            "2px";

        star.style.height =
            "2px";

        star.style.background =
            "white";

        star.style.borderRadius =
            "50%";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.opacity =
            .2 + Math.random() * .6;

        star.style.animation =
            `piscar ${2 + Math.random() * 4}s infinite`;

        stars.appendChild(
            star
        );

    }

}


// =========================================================
// DIGITAÇÃO DAS PÁGINAS
// =========================================================

const textos =
    document.querySelectorAll(".typing");


async function escreverPagina(
    elemento
){

    const texto =
        elemento.textContent.trim();

    elemento.textContent =
        "";

    elemento.classList.add(
        "show"
    );

    for(
        const letra of texto
    ){

        elemento.textContent +=
            letra;

        await esperar(30);

    }

}


function esperar(
    tempo
){

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                tempo
            )
    );

}


async function iniciarDigitacao(){

    for(
        const elemento of textos
    ){

        await escreverPagina(
            elemento
        );

        await esperar(450);

    }

}


window.addEventListener(
    "load",
    () => {

        iniciarDigitacao();

    }
);


// =========================================================
// VOTO — ELEMENTOS
// =========================================================

const abrirVoto =
    document.getElementById(
        "abrirVoto"
    );

const fecharVoto =
    document.getElementById(
        "fecharVoto"
    );

const votoOverlay =
    document.getElementById(
        "votoOverlay"
    );

const pergaminhoWrapper =
    document.getElementById(
        "pergaminhoWrapper"
    );

const conteudoVoto =
    document.getElementById(
        "conteudoVoto"
    );

const textoVoto =
    document.getElementById(
        "textoVoto"
    );

const assinatura =
    document.getElementById(
        "assinatura"
    );

const brincadeira =
    document.getElementById(
        "brincadeira"
    );


let votoAberto =
    false;

let votoTimers = [];


// =========================================================
// PARÁGRAFOS DO VOTO
// =========================================================

const paragrafosVoto =
    textoVoto
        ? [
            ...textoVoto.querySelectorAll("p")
        ]
        : [];


// =========================================================
// SALVAR TEXTOS
// =========================================================

paragrafosVoto.forEach(
    paragrafo => {

        paragrafo.dataset.texto =
            paragrafo.textContent
                .replace(/\s+/g," ")
                .trim();

    }
);


// =========================================================
// LIMPAR TIMERS
// =========================================================

function limparVotoTimers(){

    votoTimers.forEach(
        timer =>
            clearTimeout(timer)
    );

    votoTimers = [];

}


// =========================================================
// ABRIR VOTO
// =========================================================

if(abrirVoto){

    abrirVoto.addEventListener(
        "click",
        abrirNossoVoto
    );

}


function abrirNossoVoto(){

    if(votoAberto){

        return;

    }

    votoAberto =
        true;

    limparVotoTimers();


    // =====================================================
    // RESET
    // =====================================================

    paragrafosVoto.forEach(
        paragrafo => {

            paragrafo.textContent =
                "";

            paragrafo.style.opacity =
                "0";

        }
    );


    if(assinatura){

        assinatura.classList.remove(
            "mostrar"
        );

    }


    if(brincadeira){

        brincadeira.classList.remove(
            "mostrar"
        );

    }


    if(conteudoVoto){

        conteudoVoto.classList.remove(
            "mostrar"
        );

    }


    // =====================================================
    // ESCURECER TELA
    // =====================================================

    votoOverlay.classList.add(
        "ativo"
    );

    document.body.classList.add(
        "voto-bloqueia-scroll"
    );


    // =====================================================
    // ABRIR PERGAMINHO
    // =====================================================

    const abrirTimer =
        setTimeout(
            () => {

                if(
                    !votoAberto
                ){

                    return;

                }

                if(
                    pergaminhoWrapper
                ){

                    pergaminhoWrapper.classList.add(
                        "abrindo"
                    );

                }

            },
            600
        );


    votoTimers.push(
        abrirTimer
    );


    // =====================================================
    // MOSTRAR CONTEÚDO
    // =====================================================

    const conteudoTimer =
        setTimeout(
            () => {

                if(
                    !votoAberto
                ){

                    return;

                }

                if(
                    conteudoVoto
                ){

                    conteudoVoto.classList.add(
                        "mostrar"
                    );

                }

                iniciarVotoEscrito();

            },
            2300
        );


    votoTimers.push(
        conteudoTimer
    );

}


// =========================================================
// ESCREVER VOTO
// =========================================================

async function iniciarVotoEscrito(){

    for(
        let i = 0;
        i < paragrafosVoto.length;
        i++
    ){

        if(
            !votoAberto
        ){

            return;

        }

        const paragrafo =
            paragrafosVoto[i];

        await escreverParagrafoVoto(
            paragrafo
        );

        await esperar(
            350
        );

    }


    // =====================================================
    // ASSINATURA
    // =====================================================

    if(
        votoAberto &&
        assinatura
    ){

        assinatura.classList.add(
            "mostrar"
        );

    }


    await esperar(
        1300
    );


    // =====================================================
    // BRINCADEIRA
    // =====================================================

    if(
        votoAberto &&
        brincadeira
    ){

        brincadeira.classList.add(
            "mostrar"
        );

    }

}


// =========================================================
// ESCREVER PARÁGRAFO
// =========================================================

function escreverParagrafoVoto(
    elemento
){

    return new Promise(
        resolve => {

            const texto =
                elemento.dataset.texto;

            let indice =
                0;


            elemento.style.opacity =
                "1";


            const velocidade =
                32;


            const intervalo =
                setInterval(
                    () => {

                        if(
                            !votoAberto
                        ){

                            clearInterval(
                                intervalo
                            );

                            resolve();

                            return;

                        }


                        elemento.textContent +=
                            texto.charAt(
                                indice
                            );

                        indice++;


                        if(
                            indice >=
                            texto.length
                        ){

                            clearInterval(
                                intervalo
                            );

                            resolve();

                        }

                    },
                    velocidade
                );

        }
    );

}


// =========================================================
// FECHAR VOTO
// =========================================================

if(fecharVoto){

    fecharVoto.addEventListener(
        "click",
        fecharNossoVoto
    );

}


function fecharNossoVoto(){

    votoAberto =
        false;

    limparVotoTimers();


    if(votoOverlay){

        votoOverlay.classList.remove(
            "ativo"
        );

    }


    document.body.classList.remove(
        "voto-bloqueia-scroll"
    );


    if(conteudoVoto){

        conteudoVoto.classList.remove(
            "mostrar"
        );

    }


    if(assinatura){

        assinatura.classList.remove(
            "mostrar"
        );

    }


    if(brincadeira){

        brincadeira.classList.remove(
            "mostrar"
        );

    }


    paragrafosVoto.forEach(
        paragrafo => {

            paragrafo.textContent =
                "";

            paragrafo.style.opacity =
                "0";

        }
    );


    setTimeout(
        () => {

            votoAberto =
                false;

        },
        700
    );

}