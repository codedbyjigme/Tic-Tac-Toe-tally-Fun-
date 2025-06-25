const gameBoard = document.getElementById("gameBoard");
const playerTurn = document.getElementById("turnInfo");
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
          innerCell.removeEventListener("click");
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
          setTimeout(() => {
            alert(`Player ${winA} wins the game!`);
            location.reload();
          }, 100); // 100ms delay lets the DOM update first
        }
      }
    }