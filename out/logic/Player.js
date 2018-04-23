"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BetOnGroup_1 = require("./BetOnGroup");
const BetOnValue_1 = require("./BetOnValue");
class Player {
    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
        this.currentBets = [];
        this.skipCount = 0;
        this.currentBetAmount = 0;
    }
    placeBetOnValue(choosenNumber, amount) {
        this.currentBets.push(new BetOnValue_1.BetOnValue(choosenNumber, amount));
        this.currentBetAmount += amount;
        this.budget -= amount;
        this.skipCount = 0;
    }
    placeBetOnGroup(choosenGroup, amount) {
        this.currentBets.push(new BetOnGroup_1.BetOnGroup(choosenGroup, amount));
        this.currentBetAmount += amount;
        this.budget -= amount;
        this.skipCount = 0;
    }
    skipBet() {
        this.skipCount++;
    }
    resetBets() {
        this.currentBets = [];
        this.currentBetAmount = 0;
    }
}
exports.Player = Player;
