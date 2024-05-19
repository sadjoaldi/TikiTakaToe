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

startGame = () => {
  isPlayerTurn = false;
  cellData.forEach((cell) => {
    cell.classList.remove(PLAYER_O_CLASS);
    cell.classList.remove(PLAYER_X_CLASS);
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessage.classList.remove("show");
};

const handleCellClick = (e) => {
  const cell = e.target;
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
};
