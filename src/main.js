const PLAYER_X_CLASS = "x";
const PLAYER_O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const board = document.querySelector("#board");
const cellData = document.querySelectorAll("[data-cell]");
const winningMessage = document.querySelector("#winningMessage");
const winningMessageText = document.querySelector("#winningMessageText");
const restartBtn = document.querySelector("#btnRestart");
let isPlayerTurn = false;

restartBtn.addEventListener("click", startGame);
// function pour lancer le jeu
function startGame() {
  isPlayerTurn = false;
  cellData.forEach((cell) => {
    cell.classList.remove(PLAYER_O_CLASS);
    cell.classList.remove(PLAYER_X_CLASS);
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessage.classList.remove("show");
}

// event qui lance le jeu au clic
function handleCellClick(e) {
  const cell = e.target;
  console.log(cell);
  const currentClass = isPlayerTurn ? PLAYER_X_CLASS : PLAYER_O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    return;
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

// funciton qui met fin au jeu

function endGame(draw) {
  if (draw) {
    winningMessageText.innerHTML = "It's a draw";
  } else {
    winningMessageText.innerHTML = `Player wiht ${
      isPlayerTurn ? "O's" : "X's"
    } win!`;
  }

  winningMessage.classList.add("show");
}

function isDraw() {
  return [...cellData].every((cell) => {
    return (
      cell.classList.contains(PLAYER_X_CLASS) ||
      cell.classList.contains(PLAYER_O_CLASS)
    );
  });
}

// function qui permet de mettre le caractère dans la cellule cible
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// function qui permet l'alternance des tours pour chaque joueur lorsque le caractère est mit par un joeur pour passer au joueur suivant

function swapTurns() {
  isPlayerTurn = !isPlayerTurn;
}

//
function setBoardHoverClass() {
  board.classList.remove(PLAYER_X_CLASS);
  board.classList.remove(PLAYER_O_CLASS);
  isPlayerTurn
    ? board.classList.add(PLAYER_O_CLASS)
    : board.classList.add(PLAYER_X_CLASS);
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
