// elements
const gameBoard = document.getElementById('game-board');
const winnerBoard = document.getElementById('winner-board');
const turnBoard = document.getElementById('turn-board');
const thingsToChoose = document.getElementById('things-to-choose');
const playerChoice = document.getElementById('player-choice');
const computerChoice = document.getElementById('computer-choice');
//spans
const winner = document.getElementById('winner-board__title');
//buttons
const startGameBtn = document.getElementById('start-button');
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');


// MAKING GAME

//variables
let isTied = false;
let isComputer = false;
let isPlayer = false;
let isFinished = false;

//buttons
startGameBtn.addEventListener('click', startGame);
rockBtn.addEventListener('click', addItem);
paperBtn.addEventListener('click', addItem);
scissorsBtn.addEventListener('click', addItem);

//main functions
function startGame() {
    if (isFinished) {
        clearBoard();
        prepareBoard();
    } else {
        prepareBoard();
    }
}

function prepareBoard() {
    thingsToChoose.classList.remove('hidden');
    turnBoard.classList.remove('hidden');
    isComputer = false;
    isPlayer = false;
    isFinished = false;
    isTied = false;
}

function clearBoard() {
    thingsToChoose.classList.add('hidden');
    winnerBoard.classList.add('hidden');
    playerChoice.textContent = '';
    computerChoice.textContent = '';
}

function addItem() {
    if(!playerChoice.textContent){
        playerChoice.textContent = this.textContent;
        computerChoose();
        checkWinner();
    }
    return;
}

function computerChoose() {
    let choice = Math.random();
    if(choice>0.66){
        computerChoice.textContent = rockBtn.textContent;
    } else if(choice>0.33) {
        computerChoice.textContent = paperBtn.textContent;
    } else {
        computerChoice.textContent = scissorsBtn.textContent;
    }
}

function checkWinner() {
    if(computerChoice.textContent === playerChoice.textContent){
        isTied = true;
    } else if((computerChoice.textContent === '✊' && playerChoice.textContent === '✌') || (computerChoice.textContent === '🖐️' && playerChoice.textContent === '✊') || (computerChoice.textContent === '✌' && playerChoice.textContent === '🖐️')) {
        isComputer = true;
    } else {
        isPlayer = true;
    }
    endGame();  
}

function endGame() {
    if(isTied) {
        winner.textContent = 'There is a TIE!'
    } else if(isComputer) {
        winner.textContent = 'Computer won!'
    } else {
        winner.textContent = 'You won!'    
    }
    turnBoard.classList.add('hidden');
    winnerBoard.classList.remove('hidden');
    isFinished = true;
}
