'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const message = document.querySelector('.message');
const body = document.querySelector('body');
const displayScore = document.querySelector('.score');
const displayHighScore = document.querySelector('.highscore');
const number = document.querySelector('.number');
const guessDisplay = document.querySelector('.guess');
const check = document.querySelector('.check');
const reset = document.querySelector('.again');

const displayMessage = textMessage => {
  message.textContent = textMessage;
};

const scoreHigh = (score, highScore) => {
  if (score > highScore) {
    highScore = score;
    displayHighScore.textContent = highScore;
  }
};

const change = (bodyColor, numberWidth, numberText) => {
  body.style.backgroundColor = bodyColor;
  number.style.width = numberWidth;
  number.textContent = numberText;
};

const playerWin = (message, highScore) => {
  displayMessage(message);
  change('#60b347', '30rem', secretNumber);
  scoreHigh(score, highScore);
};

const guessWrong = guess => {
  if (score > 1) {
    displayMessage(guess > secretNumber ? '📈 To High!' : '📉 To Low');
    score--;
    displayScore.textContent = score;
  } else {
    displayMessage('💥 You Lost The Game!');
    displayScore.textContent = 0;
  }
};

guessDisplay.addEventListener('keydown', e => {
  if (e.key === 'Enter') check.click();
});

check.addEventListener('click', () => {
  const guess = Number(guessDisplay.value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔ No Number!');
  } else if (guess === secretNumber) {
    playerWin('🎉 Correct Number!', highScore);
    // When guess is wrong
  } else if (score !== secretNumber) {
    guessWrong(guess);
  }
});

window.addEventListener('keydown', e => {
  if (e.code === 'KeyR') reset.click();
});

reset.addEventListener('click', () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  guessDisplay.value = '';
  displayScore.textContent = score;
  change('#222', '15rem', '?');
});
