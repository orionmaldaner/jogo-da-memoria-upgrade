const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let audio;
let soma = 0;
let btn = document.getElementById('btn');
let divMemory = document.querySelector('.memory-game');
let punctuation = document.querySelector('.punctuation');
let divCadastro = document.querySelector('.div-cadastro');
let divInicio = document.querySelector('.inicio');
let vez = 1;    
let sum11 = 0, sum22 = 0;
//----------------------------------------------------

//mostra o jog e esconde o cadastro

btn.addEventListener('click', function() {
    divMemory.style.display = 'flex';
    punctuation.style.display = 'block';
    divInicio.style.display = 'none';

    //let jog1 = document.querySelector('#jogador1').value;
    //let jog2 = document.querySelector('#jogador2').value;
    //console.log(jog1);
    //console.log(jog2);
    //callback(returnJog(jog1, jog2)); -- nao consegui pegar os valores de input
})
/*
var j = new Array();

//deveria retornar os nomes dos jogadores
j = function returnJog(jog1, jog2) {
    var jogadores = new Array();
    jogadores[0] = jog1;
    jogadores[1] = jog2;
    return jogadores;
}
*/

//-----------------------------------------------

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();    
    calcPoints(isMatch);
}

//calcula os pontos realizados
function calcPoints(Match) {
    let isMatch = Match;
    if (isMatch == false ) {
        if(vez == 1) {
            vez = 2;
        } else {
            vez = 1;
        }    
    }
    if (isMatch == true) {
        if(vez == 1) {
            sum11++;
        } else {
            sum22++;
        }
    }
    points(sum11, sum22, vez);
    console.log(sum11);
    console.log(sum22);
}

//retorna a pontuacao atualizada
function points(sum1, sum2, vezJog) {
    punctuation.innerHTML = 'Vez do Jogador: ' + vezJog + '<br>Jogador 1: ' + sum1 + 
    ' pontos<br>Jogador 2: ' + sum2 + ' pontos';
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    playAudio();    
    //executado toda ve que der match nas cartas
}

//executa efeito sonoro toda vez que for pontuado
function playAudio() {
    audio = document.querySelector('audio');
    audio.play();
    console.log('audio');
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// somatorio simples das cartas descobertas
/*
function points() {
    soma++;
    console.log(punctuation);
    punctuation.innerHTML = 'Pontuação: ' + soma;
    console.log('points');

}*/

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();



cards.forEach(card => card.addEventListener('click', flipCard));