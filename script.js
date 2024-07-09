
function GameBoard() {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board.push([]);
    for (j = 0; j < 3; j++) {
      board[i].push([" "]);
    }
  }

  function printBoard() {
    let boardStr = "";
    for (let i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        boardStr += board[i][j];
        if (j < board[i].length - 1) {
          boardStr += "|";
        }
      }
      if (i < board.length - 1) {
        boardStr += "\n";
        boardStr += "_ _ _";
        boardStr += "\n";
      }
    }
    console.log(boardStr);
  }

  function addToken(token, i, j) {
    if (board[i][j] === " ") {
      return console.log(`${i},${j} is not empty!`);
    }
    board[i][j] = token;
    return
  }

  function clearBoard() {
    for (let i = 0; i < 3; i++) {
      board.push([]);
      for (j = 0; j < 3; j++) {
        board[i][j] = " ";
      }
    }
  }

  return { board, printBoard, addToken, clearBoard }
}

const gameboard = GameBoard();
