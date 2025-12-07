import {Gameboard} from "./script";


describe('Gameboard class', () => {
    let board;
  
    beforeEach(() => {
      board = new Gameboard(4);
    });
  
    test('board should initialize with correct size', () => {
      expect(board.getSize()).toBe(4);
      expect(board.getBoard().length).toBe(4);
      expect(board.getBoard()[0].length).toBe(4);
    });
  
    test('placeShip should place a vertical ship correctly', () => {
      board.placeShip([0,0],[3,0],4);
      const b = board.getBoard();
      expect(b[0][0]).toBe("0");
      expect(b[3][0]).toBe("0");
    });
  
    test('placeShip should place a horizontal ship correctly', () => {
      board.placeShip([1,1],[1,3],3);
      const b = board.getBoard();
      expect(b[1][1]).toBe("0");
      expect(b[1][3]).toBe("0");
    });
  
    test('placeShip should not overwrite existing ship', () => {
      board.placeShip([0,0],[3,0],4);
      board.placeShip([1,0],[1,2],3); // overlaps
      const b = board.getBoard();
      // The second ship should not be placed
      expect(b[1][0]).toBe("0"); 
      expect(b[1][1]).toBe("null");
    });
  
    test('receiveAttack should mark missed attack', () => {
      board.receiveAttack([0,1]);
      expect(board.getBoard()[0][1]).toBe("missed");
    });
  
    test('allShipsSunks should return true after all ships sunk', () => {
      board.placeShip([0,0],[0,1],2);
      board.receiveAttack([0,0]);
      board.receiveAttack([0,1]);
      expect(board.allShipsSunks()).toBe(true);
    });
  });
  