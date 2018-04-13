import { Bet } from "./Bet";

class BetOnValue extends Bet {
    public choosenNumber: number;

    constructor(choosenNumber: number, amount: number) {
        super();
        this.choosenNumber = choosenNumber;
        this.amount = amount;
    }
}

export { BetOnValue };
