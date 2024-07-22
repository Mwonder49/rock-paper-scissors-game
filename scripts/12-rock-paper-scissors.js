let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses : 0,
  ties : 0
};
updateScoreElement();

let result = JSON.parse(localStorage.getItem('result')) || '';
updateResultElement();

let moves = JSON.parse(localStorage.getItem('moves')) || '';
updateMovesElement();

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateMovesElement() {
  let text;
  if (!moves) {
    text = '';
  } else {
    text = `You <img src="images/${moves.playerMove}-emoji.png" alt="${moves.playerMove}" class="move-icon"> <img src="images/${moves.computerMove}-emoji.png" alt="${moves.computerMove}" class="move-icon"> Computer`;
  }
  document.querySelector('.js-moves').innerHTML = text;
}

function updateResultElement() {
  document.querySelector('.js-result').innerHTML = result;
}

let isAutoPlay = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlay) {
    intervalId = setInterval (() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000)
    isAutoPlay = true;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    reset();
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    reset();
  }
});

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
  autoPlay();
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    autoPlay();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  moves = { playerMove, computerMove };
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.'
    } else if (computerMove === 'paper') {
      result = 'You lose.'
    } else if (computerMove === 'scissors') {
      result = 'You win.'
    }
  } else if (playerMove == 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.'
    } else if (computerMove === 'paper') {
      result = 'Tie.'
    } else if (computerMove === 'scissors') {
      result = 'You lose.'
    }
  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.'
    } else if (computerMove === 'paper') {
      result = 'You win.'
    } else if (computerMove === 'scissors') {
      result = 'Tie.'
    }
  }

  if (result == "You win.") {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('result', JSON.stringify(result));
  localStorage.setItem('moves', JSON.stringify(moves));
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  updateResultElement();
  updateMovesElement();
}

function pickComputerMove() {
  let randomNumber = Math.random();

  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function reset() {
  if (score.wins === 0 && score.losses === 0 && score.ties === 0) {
    let confirmationElement = document.querySelector('.js-confirmation');
    confirmationElement.innerHTML = '<p>Play atleast one move before resetting score.</p>';
    setTimeout(() => {
      confirmationElement.innerHTML = '';
    }, 2500);
    return;
  }
  let htmlCode = `<p>Are you sure you want to reset the score? <button class="confirmation-button js-yes-button">Yes</button> <button class="confirmation-button js-no-button">No</button>`;
  document.querySelector('.js-confirmation').innerHTML = htmlCode;
  document.querySelector('.js-yes-button')
    .addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    localStorage.removeItem('moves');
    updateMovesElement();
    localStorage.removeItem('result');
    updateResultElement();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
    document.querySelector('.js-confirmation').innerHTML = '';
    });
  document.querySelector('.js-no-button')
    .addEventListener('click', () => {
      document.querySelector('.js-confirmation').innerHTML = '';
    });
}