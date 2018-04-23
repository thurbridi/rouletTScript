import { Roulette } from './Roulette';
import { BetGroups, Dictionary } from './Utils';

class AmericanRoulette extends Roulette {
    public betMultiplier: Dictionary<number>;
    public sequence: number[];

    constructor() {
        super();

        // 37 represents pocket 00
        this.sequence = [0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3,
            24, 36, 13, 1, 37, 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16,
            4, 23, 35, 14, 2];

        this.betMultiplier = {};
        this.betMultiplier.straight = 35;
        this.betMultiplier[BetGroups.RED] = 1;
        this.betMultiplier[BetGroups.BLACK] = 1;
        this.betMultiplier[BetGroups.EVEN] = 1;
        this.betMultiplier[BetGroups.ODD] = 1;
        this.betMultiplier[BetGroups.HIGH] = 1;
        this.betMultiplier[BetGroups.LOW] = 1;
        this.betMultiplier[BetGroups.DOZEN1] = 2;
        this.betMultiplier[BetGroups.DOZEN2] = 2;
        this.betMultiplier[BetGroups.DOZEN3] = 2;
        this.betMultiplier[BetGroups.COLUMNTOP] = 2;
        this.betMultiplier[BetGroups.COLUMNMID] = 2;
        this.betMultiplier[BetGroups.COLUMNBOT] = 2;
    }
}

export { AmericanRoulette };
