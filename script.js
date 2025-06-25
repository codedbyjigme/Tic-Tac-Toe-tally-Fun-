const gameBoard = document.getElementById("gameBoard");
const playerTurn = document.getElementById("turnInfo");
const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");
let currentPlayer = "X";

    // Create 3x3 Outer Grid
    for (let i = 0; i < 9; i++) {
      const outerCell = document.createElement("div");
      outerCell.classList.add("outer-cell");
      outerCell.setAttribute("data-index", i);

      const innerBoard = document.createElement("div");
      innerBoard.classList.add("inner-board");

      for (let j = 0; j < 9; j++) {
        const innerCell = document.createElement("div");
        innerCell.classList.add("inner-cell");

        innerBoard.appendChild(innerCell);

        innerCell.addEventListener("click", () => {
          if (innerCell.textContent || innerBoard.classList.contains("won")) return;
          innerCell.textContent = currentPlayer;
          checkInnerBoardWin(innerBoard);
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          playerTurn.textContent = currentPlayer === "X" ? "Player 1's turn" : "Player 2's turn"; 
          
        });

        
      }

      outerCell.appendChild(innerBoard);
      gameBoard.appendChild(outerCell);
    }

    function checkInnerBoardWin(innerBoard) {
      const cells = innerBoard.querySelectorAll(".inner-cell");
      const combos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];

      for (const [a, b, c] of combos) {
        if (cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {

            //it starts from here    
            innerBoard.classList.add("won");
            innerBoard.setAttribute("data-winner", cells[a].textContent);
            const outerCell = innerBoard.parentElement;
            outerCell.setAttribute("data-winner", cells[a].textContent);
            checkOuterBoardWin();
            break;
        }
      }
    }

    function resetGameBoard() {
      // Reset all inner cells
      document.querySelectorAll(".inner-cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("won");
      });

      // Reset all inner boards
      document.querySelectorAll(".inner-board").forEach(board => {
        board.classList.remove("won");
        board.removeAttribute("data-winner");
      });

      // Reset all outer cells
      document.querySelectorAll(".outer-cell").forEach(cell => {
        cell.removeAttribute("data-winner");
      });

      // Reset turn to Player 1
      currentPlayer = "X";
      playerTurn.textContent = "Player 1's turn";

      // Re-enable click listeners
      document.querySelectorAll(".inner-cell").forEach(cell => {
        const newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);
        newCell.addEventListener("click", () => {
          if (newCell.textContent || newCell.parentElement.classList.contains("won")) return;
          newCell.textContent = currentPlayer;
          checkInnerBoardWin(newCell.parentElement);
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          playerTurn.textContent = currentPlayer === "X" ? "Player 1's turn" : "Player 2's turn";
          
        });
      });
    }

    // Modify checkOuterBoardWin to use resetGameBoard
    function checkOuterBoardWin() {
      const outerCells = document.querySelectorAll(".outer-cell");
      const combos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];

      for (const [a, b, c] of combos) {
        const winA = outerCells[a].getAttribute("data-winner");
        const winB = outerCells[b].getAttribute("data-winner");
        const winC = outerCells[c].getAttribute("data-winner");

        if (winA && winA === winB && winA === winC) {
          if(winA === "X") {
            player1Score.textContent = parseInt(player1Score.textContent) + 1;
          }
          else{
            player2Score.textContent = parseInt(player2Score.textContent) + 1;
          }
          setTimeout(() => {
            alert(`Player ${winA} wins the game!`);
            resetGameBoard();
          }, 100); // 100ms delay lets the DOM update first
        }
      }
    }