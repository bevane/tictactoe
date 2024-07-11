
function GameBoard() {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board.push([]);
    for (j = 0; j < 3; j++) {
      board[i].push(" ");
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
    if (board[i][j] != " ") {
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

  function checkWinCondition(token, i, j) {
    // checks if a token position satisfies a win condition
    const winArrangement = [token, token, token];
    const tokenRow = board[i];
    const tokenColumn = (() => {
      const col = []
      for (let k = 0; k < board.length; k++) {
        col.push(board[k][j]);
      }
      return col;
    })();
    const tokenDiagonal1 = [board[0][0], board[1][1], board[2][2]]
    const tokenDiagonal2 = [board[0][2], board[1][1], board[2][0]]

    if (
      arrayIsEqual(tokenRow, winArrangement) ||
      arrayIsEqual(tokenColumn, winArrangement) ||
      arrayIsEqual(tokenDiagonal1, winArrangement) ||
      arrayIsEqual(tokenDiagonal2, winArrangement)
    ) return true
    return false
  }

  function checkFullBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === " ") return false;
      }
    }
    return true
  }

  return { board, printBoard, addToken, clearBoard, checkWinCondition, checkFullBoard }
}


function Player(name, token) {
  let score = 0;

  const increaseScore = () => ++score;
  const getScore = () => score;

  return { name, token, increaseScore, getScore }
}


const game = (function Game() {
  player1Name = prompt("Player 1 name: ");
  const player1 = Player(player1Name, "x");
  console.log(`${player1.name} has joined the game and will be playing ${player1.token}`);
  player2Name = prompt("Player 2 name: ");
  const player2 = Player(player2Name, "o");
  console.log(`${player2.name} has joined the game an will be playing ${player2.token}`);

  function playTurn(player) {
    console.log(`It is now ${player.name}'s turn`);
    let [i, j] = prompt("Type position to place your marker: ").split(",");
    console.log(`${i}, ${j}`);
    gameboard.addToken(player.token, i, j);
    return gameboard.checkWinCondition(player.token, i, j);
  }

  function playRound(startingPlayer) {
    let currentPlayer = startingPlayer;
    gameboard.printBoard();
    while (gameboard.checkFullBoard() === false) {
      let currentPlayerWon = playTurn(currentPlayer)
      gameboard.printBoard();
      if (currentPlayerWon) {
        return currentPlayer;
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    return "tie"
  }

  function playGame() {
    let startingPlayer = player1;
    for (let i = 0; i < 3; i++) {
      console.log(`ROUND ${i + 1} OF 3`)
      let winningPlayer = playRound(startingPlayer)
      if (winningPlayer === player1) player1.increaseScore();
      else if (winningPlayer === player2) player2.increaseScore();
      console.log(`${winningPlayer.name} won round ${i + 1}. Score: ${player1.getScore()} - ${player2.getScore()}`);
      gameboard.clearBoard();
      startingPlayer = startingPlayer === player1 ? player2 : player1;
    }
    if (player1.getScore() > player2.getScore()) {
      console.log(`${player1.name} has won the game with a score of ${player1.getScore()} - ${player2.getScore()}`);
    }
    else if (player2.getScore() > player1.getScore()) {
      console.log(`${player2.name} has won the game with a score of ${player2.getScore()} - ${player1.getScore()}`);
    }
    else console.log(`The game is a tie!`);
  }


  return { player1, player2, playTurn, playRound, playGame }

})();

function arrayIsEqual(array1, array2) {
  return array1.toString() === array2.toString()
}

const gameboard = GameBoard();
