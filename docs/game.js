import { Player } from "./script.js";

export default function createGame(playerName) {
    const humanPlayer = new Player(playerName, "human");
    const computerPlayer = new Player("Computer", "computer");

    let currentPlayer = humanPlayer;

    function playRound(coordinate) {
        let enemy = currentPlayer === humanPlayer ? computerPlayer : humanPlayer;
        let result;

        if (currentPlayer.getType() === "human") {
            result = currentPlayer.attack(enemy, coordinate);
        } else {
            // Computer automatically attacks
            const move = currentPlayer.attack(); // You need to implement this public method
            result = currentPlayer.attack(enemy, move);
        }

        // Switch turns
        currentPlayer = enemy;

        return {
            result,
            gameOver: isGameOver()
        };
    }

    function isGameOver() {
        return humanPlayer.gameBoard.allShipsSunks() || computerPlayer.gameBoard.allShipsSunks();
    }

    return {
        humanPlayer,
        computerPlayer,
        playRound,
        getCurrentPlayer: () => currentPlayer,
        isGameOver
    };
}
