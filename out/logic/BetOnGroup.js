"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bet_1 = require("./Bet");
class BetOnGroup extends Bet_1.Bet {
    constructor(choosenGroup, amount) {
        super();
        this.choosenGroup = choosenGroup;
        this.amount = amount;
    }
}
exports.BetOnGroup = BetOnGroup;
