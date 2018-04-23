"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
class Roulette {
    constructor() {
        this.groupToNumbers = {};
        this.groupToNumbers[Utils_1.BetGroups.RED] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        this.groupToNumbers[Utils_1.BetGroups.BLACK] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        this.groupToNumbers[Utils_1.BetGroups.EVEN] = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
        this.groupToNumbers[Utils_1.BetGroups.ODD] = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
        this.groupToNumbers[Utils_1.BetGroups.HIGH] = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        this.groupToNumbers[Utils_1.BetGroups.LOW] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        this.groupToNumbers[Utils_1.BetGroups.DOZEN1] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.groupToNumbers[Utils_1.BetGroups.DOZEN2] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        this.groupToNumbers[Utils_1.BetGroups.DOZEN3] = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        this.groupToNumbers[Utils_1.BetGroups.COLUMNTOP] = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
        this.groupToNumbers[Utils_1.BetGroups.COLUMNMID] = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
        this.groupToNumbers[Utils_1.BetGroups.COLUMNBOT] = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
    }
    spin() {
        const index = Math.floor(Math.random() * this.sequence.length);
        return this.sequence[index];
    }
}
exports.Roulette = Roulette;
