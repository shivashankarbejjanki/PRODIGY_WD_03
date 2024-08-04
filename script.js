document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset-button");
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    const isAgainstAI = true; // Set this to true if playing against AI, false for two-player mode

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkForWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if (isAgainstAI && currentPlayer === "O") {
            makeAIMove();
        }
    };

    const makeAIMove = () => {
        let availableCells = [];
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === "") {
                availableCells.push(i);
            }
        }

        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameState[randomIndex] = "O";
        cells[randomIndex].textContent = "O";

        if (checkForWinner()) {
            alert(`Player O wins!`);
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = "X";
    };

    const checkForWinner = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    };

    const handleResetButtonClick = () => {
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        cells.forEach(cell => cell.textContent = "");
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", handleResetButtonClick);
});
