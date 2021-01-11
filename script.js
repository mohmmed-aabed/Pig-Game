'use strict';

// ------------------------------------------------------------
// Selecting Elements
// ------------------------------------------------------------
const diceElement = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0Element = document.querySelector('.player--0');
let current0Element = document.getElementById('current--0');
let score0Element = document.getElementById('score--0');

const player1Element = document.querySelector('.player--1');
let current1Element = document.getElementById('current--1');
let score1Element = document.getElementById('score--1');

// ------------------------------------------------------------
// Starting Conditions
// ------------------------------------------------------------
const playerElements = [player0Element, player1Element];
const currentElements = [current0Element, current1Element];
const scoreElements = [score0Element, score1Element];

let currentScore, activePlayer, playing, scores;

function startGame() {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player1Element.classList.remove('player--active');
  if (!player0Element.classList.contains('player--active')) {
    !player0Element.classList.add('player--active');
  }
}

startGame();

// ------------------------------------------------------------
// Switch Player
// ------------------------------------------------------------
function switchPlayer() {
  currentScore = 0;
  currentElements[activePlayer].textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElements[0].classList.toggle('player--active');
  playerElements[1].classList.toggle('player--active');
}

// ------------------------------------------------------------
// Roll Dice
// ------------------------------------------------------------
btnRollDice.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      currentElements[activePlayer].textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// ------------------------------------------------------------
// Hold
// ------------------------------------------------------------
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    scoreElements[activePlayer].textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      // playerElements[activePlayer].classList.remove('player--active');
      playerElements[activePlayer].classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

// ------------------------------------------------------------
// Reset
// ------------------------------------------------------------
btnNewGame.addEventListener('click', startGame);
