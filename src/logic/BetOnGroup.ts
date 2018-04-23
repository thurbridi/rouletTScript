import { Bet } from "./Bet";
import { BetGroups } from './Utils';

class BetOnGroup extends Bet {
    public choosenGroup: BetGroups;

    constructor(choosenGroup: BetGroups, amount: number) {
        super();
        this.choosenGroup = choosenGroup;
        this.amount = amount;
    }
}

export { BetOnGroup };
