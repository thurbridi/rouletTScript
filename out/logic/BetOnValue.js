"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bet_1 = require("./Bet");
class BetOnValue extends Bet_1.Bet {
    constructor(choosenNumber, amount) {
        super();
        this.choosenNumber = choosenNumber;
        this.amount = amount;
    }
}
exports.BetOnValue = BetOnValue;
