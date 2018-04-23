"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Roulette_1 = require("./Roulette");
const Utils_1 = require("./Utils");
class AmericanRoulette extends Roulette_1.Roulette {
    constructor() {
        super();
        // 37 represents pocket 00
        this.sequence = [0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3,
            24, 36, 13, 1, 37, 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16,
            4, 23, 35, 14, 2];
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
exports.AmericanRoulette = AmericanRoulette;
