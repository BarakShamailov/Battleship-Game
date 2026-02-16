const DEFAULT_SIZE = 12;

class Ship{
    #length;
    #hits;
    constructor(length){
        this.#length = length;
        this.#hits = 0;
    }

    isSunk(){
        return this.#hits >= this.#length; // Determines if the ship is sunk
    }

    hit(){
        if(this.#hits < this.#length){
            this.#hits += 1;
        }
    }

    getHits(){
        return this.#hits;
    }

    // Returns the length of the ship
    getLength(){
        return this.#length;
    } 
}

class Gameboard{
    #size;
    #board;
    #ships;
    constructor(size){
        this.#size = size;
        this.#board = this.initBoard(size);
        this.#ships = [];
    }

    initBoard(size){

        const board = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push("null");
            }
            board.push(row);
        }
        return board;
    }

    getSize(){
        return this.#size;
    }

    getBoard(){
        return this.#board;
    }

    placeShip(start, end, size) {
        const [r1, c1] = start;
        const [r2, c2] = end;
    
        const inBounds = (r, c) =>
            r >= 0 && r < this.getSize() && c >= 0 && c < this.getSize();
    
        // 1) Validate board boundaries
        if (!inBounds(r1, c1) || !inBounds(r2, c2)) return;
    
        // 2) Check placement is straight (horizontal or vertical)
        const isVertical = c1 === c2;
        const isHorizontal = r1 === r2;
    
        if (!isVertical && !isHorizontal) return;
    
        // 3) Calculate distance correctly
        const distance =
            isVertical ? Math.abs(r2 - r1) + 1 : Math.abs(c2 - c1) + 1;
    
        if (distance !== size) return;
    
        // 4) Create ship and get its ID
        const ship = new Ship(size);
        this.#ships.push(ship);
        const shipId = String(this.#ships.length - 1);
    
        // 5) Place vertically
        if (isVertical) {
            const startRow = Math.min(r1, r2);
            const endRow = Math.max(r1, r2);
            for (let r = startRow; r <= endRow; r++) {
                if (this.#board[r][c1] !== "null"){
                    return;
                }
            }
            for (let r = startRow; r <= endRow; r++) {
                this.#board[r][c1] = shipId;
            }
        }
    
        // 6) Place horizontally
        if (isHorizontal) {
            const startCol = Math.min(c1, c2);
            const endCol = Math.max(c1, c2);
            for (let c = startCol; c <= endCol; c++) {
                if (this.#board[r1][c] !== "null"){
                    return;
                }
            }
            for (let c = startCol; c <= endCol; c++) {
                this.#board[r1][c] = shipId;
            }
        }

        return true
    }
        

    receiveAttack(coordinate){
        const r = coordinate[0];
        const c = coordinate[1];
        let shipId = null;
        if (!(r >= 0 && r < this.getSize() && c >= 0 && c < this.getSize())){
            return;
        }

        if (this.#board[r][c] === "null"){
            this.#board[r][c] = "missed";
        }
        else if (!isNaN(parseInt(this.#board[r][c]))){
            shipId = parseInt(this.#board[r][c]);
            this.#board[r][c] = "X";
            if (!this.#ships[shipId].isSunk()){
                this.#ships[shipId].hit();
            }
        }
        //console.log(shipId + " ---  " + this.#ships[shipId].isSunk())
        if (shipId !== null && this.#ships[shipId].isSunk()){
            return shipId;
        }

    }

    allShipsSunks(){
        for(const ship of this.#ships){
            if (!ship.isSunk()){
                return false;
            }
        }
        return true;
    }

    // Prints the current state of the game board to the console
    printBoard(){
        
        for(let row of this.#board){
            console.log(row.join(" "));
        }
    }
}


class Player{
    #previousMoves;
    constructor(name, type = 'human'){
        this.name = name;
        this.type = type;
        this.gameBoard = new Gameboard(DEFAULT_SIZE);
        this.#previousMoves = new Set();
    }
    getName(){
        return this.name;
    }
    getType(){
        return this.type;
    }

    getBoard(){
        return this.gameBoard;
    }

    attack(opponent, coordinate = null){
        if (this.type === 'human'){
            return opponent.gameBoard.receiveAttack(coordinate);
        }
        if(this.type === 'computer'){
            const randomHit = this.#generateRandomHit();
            return opponent.gameBoard.receiveAttack(randomHit);

        }

    }

    #generateRandomHit(){
        let r, c, key;
        do {
            r = Math.floor(Math.random() * DEFAULT_SIZE);
            c = Math.floor(Math.random() * DEFAULT_SIZE);
            key = `${r},${c}`;
        } while (this.#previousMoves.has(key));

        this.#previousMoves.add(key);
        return [r, c];
    
    }
}



const board = new Gameboard(4);
board.placeShip([0,0],[3,0],4);
board.placeShip([1,1],[1,3],3);
//board.printBoard();

board.receiveAttack([1,1]);
board.receiveAttack([1,2]);
board.receiveAttack([1,3]);

board.receiveAttack([0,0]);
board.receiveAttack([1,0]);
board.receiveAttack([2,0]);
board.receiveAttack([3,0]);
//board.printBoard();
console.log(board.allShipsSunks());


export {Ship, Gameboard, Player};


