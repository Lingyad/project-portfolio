'use strict';

console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number!';
// document.querySelector('.secretNumber').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

//assign a random secretNumber between 0-20
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// document.querySelector('.number').textContent = secretNumber;
let score = 20;
let highScore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener(
  'click',
  function () {
    const guess = Number(document.querySelector('.guess').value);
    // console.log(guess, typeof guess);
    //when no input
    if (!guess) {
      displayMessage('⛔️ No Number! 🤪');
    } else if (guess === secretNumber) {
      //when player wins
      displayMessage('🎉 Correct Number!');
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = ' #60b347';
      document.querySelector('.number').style.width = '30rem';

      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
      }
    } else if (guess !== secretNumber) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too Low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }

  // //when guess is too high
  // }else if (guess > secretNumber){
  // if(score > 1){
  // document.querySelector('.message').textContent = '📈 Too high!';
  // score --;
  // document.querySelector('.score').textContent = score;
  // }else {
  // document.querySelector('.message').textContent = '💥 You lost the game!';
  // document.querySelector('.score').textContent = 0;
  // }
  // //when guess is too low
  // }else if (guess < secretNumber){
  // if (score > 1){
  // document.querySelector('.message').textContent = '📉 Too Low!';
  // score --;
  // document.querySelector('.score').textContent = score;
  // }else{
  // document.querySelector('.message').textContent = '💥 You lost the game!';
  // document.querySelector('.score').textContent = 0;
  // }
);

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
