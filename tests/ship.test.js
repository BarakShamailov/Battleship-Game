import {Ship} from "../src/script";


describe("Ship class", () => {
    test("creates a ship with correct length", () => {
      const ship = new Ship(3);
      expect(ship.getLength()).toBe(3);
    });
  
    test("hit() increases hit count", () => {
      const ship = new Ship(3);
      ship.hit();
      expect(ship.getHits()).toBe(1);
    });
  
    test("isSunk() returns true when hits == length", () => {
      const ship = new Ship(2);
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  });