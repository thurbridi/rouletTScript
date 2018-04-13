import { Roulette } from './Roulette';
import { BetGroups, Dictionary } from './Utils';

class EuropeanRoulette extends Roulette {
    public betMultiplier: Dictionary<number>;
    protected sequence: number[];

    constructor() {
        super();
        this.sequence = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11,
            30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28,
            12, 35, 3, 26];

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

export { EuropeanRoulette };
