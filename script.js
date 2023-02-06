'use strict';
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
// Used getElementById just to show you can
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceImg = document.querySelector('.dice');

let currentScore, player0Score, player1Score, playing;

const newGame = function() {
    currentScore = 0;
    player0Score = 0;
    player1Score = 0;
    playing = true;
    diceImg.classList.add('hidden');
    score0.textContent=player0Score;
    score1.textContent=player1Score;
    current0.textContent=currentScore;
    current1.textContent=currentScore;
    player0.classList.remove('player--winner')
    player1.classList.remove('player--winner')
    player1.classList.remove('player--active')
    player0.classList.add('player--active')
}

newGame();


const switchPlayers = function() {
    if(player0.classList.contains('player--active')) {
        player0.classList.remove('player--active')
        player1.classList.add('player--active')
        player0Score += currentScore;
        score0.textContent=player0Score;
        current0.textContent=0;
        console.log("Switched from 0 to 1")
    } else {
        player1.classList.remove('player--active')
        player0.classList.add('player--active')
        player1Score += currentScore;
        score1.textContent=player1Score;
        current1.textContent=0;
        console.log("Switched from 0 to 1")
    }
}

const checkWin = function() {
    if(player0Score >= 100) {
        playing = false;
        player0.classList.add('player--winner');
    } else if (player1Score >=100){
        playing = false;
        player1.classList.add('player--winner');
    } else {
        switchPlayers();
    }
}

const rollDice = function() {
    if(playing) {
    diceImg.classList.remove('hidden');
    let diceNum = Math.trunc(Math.random()*6)+1;
    diceImg.src = "dice-" + diceNum + ".png";
    console.log(diceNum);
        if (diceNum === 1) {
                currentScore = 0;
                switchPlayers();  
        } else {
                currentScore += diceNum;
        }
        if(player0.classList.contains('player--active')){
            current0.textContent=currentScore;
        } else if(player1.classList.contains('player--active')) {
            current1.textContent=currentScore;
        }
    }
}

const holdEm = function() {
    if(player0.classList.contains('player--active')) {
        player0Score += currentScore;
        score0.textContent=player0Score;
        currentScore = 0;
        current0.textContent=currentScore;
        checkWin();
    } else if (player1.classList.contains('player--active')) {
        player1Score += currentScore;
        score1.textContent=player1Score;
        currentScore = 0;
        current1.textContent=currentScore;
        checkWin();
    }
}

rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdEm);
newBtn.addEventListener('click', newGame);