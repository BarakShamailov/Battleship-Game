const domController = (() => {

    function renderBoard(board, container, hideShips = false) {
        container.innerHTML = "";

        for (let r = 0; r < board.getSize(); r++) {
            for (let c = 0; c < board.getSize(); c++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = r;
                cell.dataset.col = c;

                const value = board.getBoard()[r][c];

                if (value === "missed") cell.classList.add("miss");
                if (value === "X") cell.classList.add("hit");
                if (!hideShips && value !== "null" && value !== "missed" && value !== "X") {
                    cell.classList.add("ship");
                }

                container.appendChild(cell);
            }
        }
    }

    function showMessage(msg) {
        const messageEl = document.querySelector("#message");
        if (messageEl) messageEl.textContent = msg;
    }

    return { renderBoard, showMessage };

})();

export default domController;
