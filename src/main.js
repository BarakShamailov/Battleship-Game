import createGame from "./game.js";
import domController from "./dom.js";

const game = createGame("Barak");

const playerBoardEl = document.querySelector("#player-board");
const computerBoardEl = document.querySelector("#computer-board");


// ============================
// INITIAL RENDER
// ============================

domController.renderBoard(game.humanPlayer.gameBoard, playerBoardEl);
domController.renderBoard(game.computerPlayer.gameBoard, computerBoardEl, true);


// ============================
// HOVER PREVIEW
// ============================

playerBoardEl.addEventListener("mouseover", (e) => {
    if (phase !== "placement") return;
    if (!e.target.classList.contains("cell")) return;
    if (!selectedLength) return;

    clearPreview();

    const r = Number(e.target.dataset.row);
    const c = Number(e.target.dataset.col);

    for (let i = 0; i < selectedLength; i++) {
        const row = selectedAxis === "x" ? r : r + i;
        const col = selectedAxis === "x" ? c + i : c;

        const cell = document.querySelector(
            `.cell[data-row="${row}"][data-col="${col}"]`
        );

        if (cell) {
            cell.classList.add("preview");
        }
    }
});

playerBoardEl.addEventListener("mouseleave", clearPreview);

function clearPreview() {
    document.querySelectorAll(".preview").forEach(cell => {
        cell.classList.remove("preview");
    });
}

// ============================
// SHIP PLACEMENT
// ============================
function playerPlaceShips(board){
    const randomPosition = Math.floor(Math.random() * 3) + 1;

    if (randomPosition === 1){
        board.placeShip([0,0],[0,1],2);                 
        board.placeShip([2,3],[4,3],3);                 
        board.placeShip([6,0],[6,3],4);                
        board.placeShip([1,7],[4,7],4);               
        board.placeShip([10,4],[10,8],5);  
        board.placeShip([6,11],[11,11],6); 
    }

    else if (randomPosition === 2){
        board.placeShip([0,5],[0,6],2);                 
        board.placeShip([2,1],[4,1],3);                
        board.placeShip([5,3],[5,6],4);               
        board.placeShip([1,8],[4,8],4);                
        board.placeShip([9,4],[9,8],5);
        board.placeShip([10,11],[5,11],6);      
    }
    
    else {
        board.placeShip([1,2],[1,3],2);                
        board.placeShip([3,6],[5,6],3);                 
        board.placeShip([6,1],[6,4],4);                 
        board.placeShip([0,9],[3,9],4);                 
        board.placeShip([8,3],[8,7],5);
        board.placeShip([11,4],[11,9],6);      
    }
}


function computerPlaceShips(board) {

    const randomPosition = Math.floor(Math.random() * 3) + 1;

    if (randomPosition === 1) {

        board.placeShip([0,7],[0,8],2);             
        board.placeShip([3,2],[5,2],3);             
        board.placeShip([6,4],[6,7],4);             
        board.placeShip([1,0],[4,0],4);             
        board.placeShip([8,3],[8,7],5);
        board.placeShip([5,10],[10,10],6);             

    } else if (randomPosition === 2) {

        board.placeShip([2,5],[2,6],2);             
        board.placeShip([0,1],[2,1],3);             
        board.placeShip([5,8],[8,8],4);             
        board.placeShip([4,0],[4,3],4);             
        board.placeShip([7,2],[7,6],5);
        board.placeShip([11,0],[11,5],6);            

    } else {

        board.placeShip([1,4],[1,5],2);             
        board.placeShip([6,0],[8,0],3);             
        board.placeShip([3,6],[3,9],4);             
        board.placeShip([0,2],[3,2],4);             
        board.placeShip([9,1],[9,5],5);   
        board.placeShip([6,6],[6,11],6);          

    }
}


function refreshBoards() {
    domController.renderBoard(game.humanPlayer.gameBoard, playerBoardEl);
    domController.renderBoard(game.computerPlayer.gameBoard, computerBoardEl, true);
}

// ============================
// RANDOMLY PLACE SHIPS
// ============================


playerPlaceShips(game.humanPlayer.gameBoard);
computerPlaceShips(game.computerPlayer.gameBoard);

refreshBoards();

let phase = "battle"; // immediately start battle

// ============================
// PLAYER ATTACKS COMPUTER
// ============================

computerBoardEl.addEventListener("click", (e) => {
    if (phase !== "battle") return;
    if (!e.target.classList.contains("cell")) return;

    const r = Number(e.target.dataset.row);
    const c = Number(e.target.dataset.col);

    console.log(`Player attacks (${r}, ${c})`);
    game.computerPlayer.gameBoard.receiveAttack([r, c]);
    if (game.computerPlayer.gameBoard.allShipsSunks()) {
        alert("You win!\nRefresh the page to play again.");
        phase = "gameOver";
    }


    // Re-render boards
    refreshBoards();
    game.computerPlayer.attack(game.humanPlayer);
    if (game.humanPlayer.gameBoard.allShipsSunks()) {
        alert("Computer wins!\nRefresh the page to play again.");
        phase = "gameOver";
    }
    refreshBoards();


});

