'use strict';
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0el = document.getElementById('score--0');
const score1el = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//declair variables
let finalScores, currentScore, activePlayer, playing;

//starting conditions
const init = function(){
finalScores = [0, 0];
currentScore = 0;
activePlayer = 0;
// create game state variable
playing = true;

score0el.textContent = 0;
score1el.textContent = 0;
current0.textContent = 0;
current1.textContent = 0;

dice.classList.add('hidden');
player0.classList.remove("player--winner");
player1.classList.remove("player--winner");
player0.classList.add("player--active");
player1.classList.remove("player--active");
}

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
init();

// random dice roll 1-6
btnRollDice.addEventListener('click', function () {
  if (playing) {
    const roll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${roll}.png`;

    if (roll !== 1) {
      currentScore += roll;
      //current0.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to activeplayer
    finalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScores[activePlayer];

    //check to see if the score is >= 20
    if (finalScores[activePlayer] >= 20) {
      //finish game
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);