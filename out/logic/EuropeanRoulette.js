"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Roulette_1 = require("./Roulette");
const Utils_1 = require("./Utils");
class EuropeanRoulette extends Roulette_1.Roulette {
    constructor() {
        super();
        this.sequence = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11,
            30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28,
            12, 35, 3, 26];
        this.betMultiplier = {};
        this.betMultiplier.straight = 35;
        this.betMultiplier[Utils_1.BetGroups.RED] = 1;
        this.betMultiplier[Utils_1.BetGroups.BLACK] = 1;
        this.betMultiplier[Utils_1.BetGroups.EVEN] = 1;
        this.betMultiplier[Utils_1.BetGroups.ODD] = 1;
        this.betMultiplier[Utils_1.BetGroups.HIGH] = 1;
        this.betMultiplier[Utils_1.BetGroups.LOW] = 1;
        this.betMultiplier[Utils_1.BetGroups.DOZEN1] = 2;
        this.betMultiplier[Utils_1.BetGroups.DOZEN2] = 2;
        this.betMultiplier[Utils_1.BetGroups.DOZEN3] = 2;
        this.betMultiplier[Utils_1.BetGroups.COLUMNTOP] = 2;
        this.betMultiplier[Utils_1.BetGroups.COLUMNMID] = 2;
        this.betMultiplier[Utils_1.BetGroups.COLUMNBOT] = 2;
    }
}
exports.EuropeanRoulette = EuropeanRoulette;
