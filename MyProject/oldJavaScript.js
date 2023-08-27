'use strict';

let playing = true;

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');

const dice = document.querySelector('.dice');

const roll = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

//to change the backgrounds
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

var currentScore = 0;
var activePlayer = 0;
var score = [0, 0];
dice.classList.add('hidden');

//intitializing the score as 0
score0.textContent = 0;
score1.textContent = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //will check if the given class contains active or not if not there then add it else remove thus swap the background
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  currentScore = 0;
};

//function for rolling a dice
const rollDice = function () {
  if (playing) {
    var randomNum = Math.floor(Math.random() * 6) + 1;
    if (randomNum !== 1) {
      // add current score
      currentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
    dice.classList.remove('hidden');
    //displaying image of dice as per randomNumber
    dice.src = `dice-${randomNum}.png`;
  }
};

roll.addEventListener('click', rollDice);
dice.addEventListener('click', rollDice);
//for new game consition
newGame.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.getElementById(`name--${activePlayer}`).textContent = 'PLAYER 1';
  switchPlayer();
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  score = [0, 0];
  dice.classList.add('hidden');
  playing = true;
});

// for hold consition
hold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      dice.classList.add('hidden');
      document.getElementById(`name--${activePlayer}`).textContent =
        'YOU WON!🎖️';
      switchPlayer();
    }
    switchPlayer();
  }
});
