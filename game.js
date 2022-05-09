let player = 0;
let board = [
  [createCell(), createCell(), createCell()],
  [createCell(), createCell(), createCell()],
  [createCell(), createCell(), createCell()],
];

function choiceCell(cell) {
  cell.value = 1;

  if (isWin(1)) {
    board
      .flatMap((line) => line)
      .filter((cell) => cell.value == 0)
      .forEach((cell) => {
        cell.el.disabled = true;
      });

    return;
  }

  choiceComputer();
}

function choiceComputer() {
  const items = board.flatMap((line) => line).filter((cell) => cell.value == 0);

  const cell = items[Math.floor(Math.random() * items.length)];

  cell.value = -1;

  if (isWin(-1)) {
    board
      .flatMap((line) => line)
      .filter((cell) => cell.value == 0)
      .forEach((cell) => {
        cell.el.disabled = true;
      });

    return;
  }
}

function render() {
  const $board = document.getElementById("board");

  board.forEach((line) => {
    line.forEach((cell) => {
      cell.el.addEventListener("click", () => choiceCell(cell));

      $board.appendChild(cell.el);
    });
  });
}

function reset() {
  board
    .flatMap((line) => line)
    .forEach((cell) => {
      cell.value = 0;
      cell.removeWinner();
    });
}

function isWin(value) {
  for (let i = 0; i < board.length; ++i) {
    let sum = 0;

    for (let j = 0; j < board.length; ++j) {
      sum += board[i][j].value;
    }

    if (sum == value * 3) {
      board[i][0].addWinner();
      board[i][1].addWinner();
      board[i][2].addWinner();

      return true;
    }
  }

  for (let i = 0; i < board.length; ++i) {
    let sum = 0;

    for (let j = 0; j < board.length; ++j) {
      sum += board[j][i].value;
    }

    if (sum == value * 3) {
        
      board[0][i].addWinner();
      board[1][i].addWinner();
      board[2][i].addWinner();

      return true;
    }
  }

  let sum = 0;

  for (let i = 0, j = 0; i < board.length; ++i, ++j) {
    sum += board[i][j].value;
  }

  if (sum == value * board.length) {
    board[0][0].addWinner();
    board[1][1].addWinner();
    board[2][2].addWinner();

    return true;
  }

  sum = 0;

  for (let i = board.length - 1, j = 0; i >= 0; --i, ++j) {
    sum += board[i][j].value;
  }

  if (sum == value * board.length) {
    board[2][0].addWinner();
    board[1][1].addWinner();
    board[0][2].addWinner();

    return true;
  }

  return false;
}

render();
