import createGame from "./game.js";
import domController from "./dom.js";

const game = createGame("Barak");

const playerBoardEl = document.querySelector("#player-board");
const computerBoardEl = document.querySelector("#computer-board");

// Initial render
domController.renderBoard(game.humanPlayer.gameBoard, playerBoardEl);
domController.renderBoard(game.computerPlayer.gameBoard, computerBoardEl, true);

let phase = "placement"; // "placement" or "battle"
let currentShipSize = 4; // Example ship size
let placedShips = 0;

// Player places ships
playerBoardEl.addEventListener("click", (e) => {
    if (phase !== "placement") return;
    if (!e.target.classList.contains("cell")) return;

    const r = Number(e.target.dataset.row);
    const c = Number(e.target.dataset.col);

    // Place ship horizontally for example
    game.humanPlayer.gameBoard.placeShip([r, c], [r, c + currentShipSize - 1], currentShipSize);

    placedShips++;
    domController.renderBoard(game.humanPlayer.gameBoard, playerBoardEl);

    if (placedShips === 3) { // All ships placed
        phase = "battle";
        domController.showMessage("Battle phase started! Click on computer board to attack.");
    }
});

// Player attacks computer
computerBoardEl.addEventListener("click", (e) => {
    if (phase !== "battle") return; // Only allow attacks after placement
    if (!e.target.classList.contains("cell")) return;

    const r = Number(e.target.dataset.row);
    const c = Number(e.target.dataset.col);

    const result = game.playRound([r, c]);

    // Re-render boards
    domController.renderBoard(game.humanPlayer.gameBoard, playerBoardEl);
    domController.renderBoard(game.computerPlayer.gameBoard, computerBoardEl, true);

    if (result.gameOver) {
        domController.showMessage("Game Over!");
        alert("Game Over!");
    }
});
