// elements
const background = document.querySelector('.background');
const nameEditor = document.querySelector('.name-editor');
const gameBoard = document.getElementById('game-board');
const winnerBoard = document.getElementById('winner-board');
const boardPlaces = document.querySelectorAll('.place');
const gameTurn = document.getElementById('game-turn');
// inputs
const playerNameInput = document.getElementById('player-name__input');
//spans
const labelName = document.getElementById('player-name__label');
const warningText = document.getElementById('warning-alert');
const playerOneName = document.getElementById('player-one__tagname');
const playerTwoName = document.getElementById('player-two__tagname');
const playerTurn = document.getElementById('player-turn');
const winner = document.getElementById('winner-board__title');
//buttons
const cancelbutton = document.getElementById('cancel-button');
const confirmButton = document.getElementById('confirm-button');
const startGameBtn = document.getElementById('start-button');
const editButtonFirst = document.getElementById('edit-button__first');
const editButtonSecond = document.getElementById('edit-button__second');


// CHANGING NAME

// variables

let playerName;
let playerEl;

// buttons

editButtonFirst.addEventListener('click', editFirstName);
editButtonSecond.addEventListener('click', editSecondName);
cancelbutton.addEventListener('click', cancel);
confirmButton.addEventListener('click', confirmName);

// main functions

function confirmName() {
    if (playerNameInput.value.trim()) {
        saveName();
        changeName(playerEl, playerName);
        toggleEditBox();
        warningText.classList.add('hidden');
        labelName.classList.remove('warning');
        playerNameInput.classList.remove('warning');
    } else {
        warningText.classList.remove('hidden');
        labelName.classList.add('warning');
        playerNameInput.classList.add('warning');
    }
}

function editFirstName() {
    toggleEditBox();
    playerEl = playerOneName;
}

function editSecondName() {
    toggleEditBox();
    playerEl = playerTwoName;
}

function cancel() {
    toggleEditBox();
    warningText.classList.add('hidden');
    labelName.classList.remove('warning');
    playerNameInput.classList.remove('warning');
}


// help functions

function saveName() {
    playerName = playerNameInput.value;
}

function changeName(player, name) {
    player.textContent = name;
    playerNameInput.value = '';
}

function toggleEditBox() {
    background.classList.toggle("shadowed");
    nameEditor.classList.toggle("show");
}

// MAKING GAME

//variables
let playerNameOne;
let playerNameTwo;
let isPlayerOneTurn = true;
let isFinished = false;
let isTied = false;

//buttons
startGameBtn.addEventListener('click', startGame);

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
    gameBoard.classList.remove('hidden');
    gameTurn.classList.remove('hidden');
    playerTurn.textContent = playerOneName.textContent;
    playerNameOne = playerOneName.textContent;
    playerNameTwo = playerTwoName.textContent;
    for (const boardPlace of boardPlaces) {
        boardPlace.addEventListener('click', makingFunctionalityPlaces);
    };
    isPlayerOneTurn = true;
}

function clearBoard() {
    isFinished = false;
    winnerBoard.classList.add('hidden');
    for (const boardPlace of boardPlaces) {
        boardPlace.classList.remove('finished');
        boardPlace.classList.remove('tagged');
        boardPlace.textContent = '';
    };
}

function makingFunctionalityPlaces() {
    this.classList.add('tagged');
    if (isPlayerOneTurn) {
        this.textContent = 'X';
        this.removeEventListener('click', makingFunctionalityPlaces);
        isPlayerOneTurn = false;
        playerTurn.textContent = playerNameTwo;
        isWinner(boardPlaces);
    } else {
        this.textContent = 'O';
        this.removeEventListener('click', makingFunctionalityPlaces);
        isPlayerOneTurn = true;
        playerTurn.textContent = playerNameOne;
        isWinner(boardPlaces);
    }
}

function isWinner(boardPlace) {
    if (((boardPlace[0].textContent == boardPlace[1].textContent && boardPlace[1].textContent == boardPlace[2].textContent && boardPlace[1].textContent != '') || (boardPlace[3].textContent == boardPlace[4].textContent && boardPlace[4].textContent == boardPlace[5].textContent && boardPlace[4].textContent != '') || (boardPlace[6].textContent == boardPlace[7].textContent && boardPlace[7].textContent == boardPlace[8].textContent && boardPlace[7].textContent != '') || (boardPlace[0].textContent == boardPlace[3].textContent && boardPlace[3].textContent == boardPlace[6].textContent && boardPlace[3].textContent != '') || (boardPlace[1].textContent == boardPlace[4].textContent && boardPlace[4].textContent == boardPlace[7].textContent && boardPlace[4].textContent != '') || (boardPlace[2].textContent == boardPlace[5].textContent && boardPlace[5].textContent == boardPlace[8].textContent && boardPlace[5].textContent != '') || (boardPlace[0].textContent == boardPlace[4].textContent && boardPlace[4].textContent == boardPlace[8].textContent && boardPlace[4].textContent != '') || (boardPlace[2].textContent == boardPlace[4].textContent && boardPlace[4].textContent == boardPlace[6].textContent) && boardPlace[4].textContent != '')) {
        if (isPlayerOneTurn) {
            endGame(playerNameTwo);
        } else {
            endGame(playerNameOne);
        }
    } else if (boardPlace[0].classList.contains('tagged') && boardPlace[1].classList.contains('tagged') && boardPlace[2].classList.contains('tagged') && boardPlace[3].classList.contains('tagged') && boardPlace[4].classList.contains('tagged') && boardPlace[5].classList.contains('tagged') && boardPlace[6].classList.contains('tagged') && boardPlace[7].classList.contains('tagged') && boardPlace[8].classList.contains('tagged')) {
        isTied = true;
        endGame('Draw');
    }
}

function endGame(winGuy) {
    for (const boardPlace of boardPlaces) {
        boardPlace.removeEventListener('click', makingFunctionalityPlaces);
    };
    gameTurn.classList.add('hidden');
    winnerBoard.classList.remove('hidden');
    if (isTied) {
        winner.textContent = winGuy;
    } else {
        winner.textContent = 'You won ' + winGuy;
    }
    for (const boardPlace of boardPlaces) {
        boardPlace.classList.add('finished');
    };
    isFinished = true;
    isTied = false;
}