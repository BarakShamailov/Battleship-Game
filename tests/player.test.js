const { Player } = require("../docs/script.js");

class MockBoard {
    constructor(size = 12) {
        this.size = size;
        this.attacks = [];
        this.cells = {};

        // Pre-fill board with "null"
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                this.cells[`${r},${c}`] = "null";
            }
        }
    }

    getSize() {
        return this.size;
    }

    receiveAttack(coord) {
        this.attacks.push(coord);

        const key = coord.toString();

        if (this.cells[key] === "null") {
            this.cells[key] = "missed";
            return "miss";
        }

        return "hit";
    }
}

class MockPlayer {
    constructor() {
        this.gameBoard = new MockBoard();
    }
}

describe("Human Player", () => {
    test("Human player stores name and type", () => {
        const p = new Player("Barak", "human");
        expect(p.getName()).toBe("Barak"); // based on your code
        expect(p.getType()).toBe("human");
    });

    test("Human player attacks at the specified coordinate", () => {
        const human = new Player("Barak", "human");
        const opponent = new MockPlayer();

        const result = human.attack(opponent, [3, 4]);

        expect(result).toBe("miss");
        expect(opponent.gameBoard.attacks).toContainEqual([3, 4]);
    });
});

describe("Computer Player", () => {

    test("Computer player stores name and type", () => {
        const p = new Player("Computer", "computer");
        expect(p.getName()).toBe("Computer"); // based on your code
        expect(p.getType()).toBe("computer");
    });
    test("Computer player generates a unique random attack", () => {
        const computer = new Player("CPU", "computer");
        const opponent = new MockPlayer();

        const result = computer.attack(opponent); // no coordinate needed
        expect(opponent.gameBoard.attacks.length).toBe(1);

        const [r, c] = opponent.gameBoard.attacks[0];

        expect(r).toBeGreaterThanOrEqual(0);
        expect(c).toBeGreaterThanOrEqual(0);
        expect(r).toBeLessThan(12);
        expect(c).toBeLessThan(12);
    });

    test("Computer never repeats the same move", () => {
        const computer = new Player("CPU", "computer");
        const opponent = new MockPlayer();
        const seen = new Set();

        for (let i = 0; i < 20; i++) {
            computer.attack(opponent);
            const coord = opponent.gameBoard.attacks[i];
            const key = coord.toString();

            expect(seen.has(key)).toBe(false);
            seen.add(key);
        }
    });

    test("Computer attack calls opponent board's receiveAttack", () => {
        const computer = new Player("CPU", "computer");
        const opponent = new MockPlayer();

        const output = computer.attack(opponent);

        expect(["miss", "hit"]).toContain(output);
        expect(opponent.gameBoard.attacks.length).toBe(1);
    });
});
