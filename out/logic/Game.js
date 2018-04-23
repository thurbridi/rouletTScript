"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AmericanRoulette_1 = require("./AmericanRoulette");
const BetOnGroup_1 = require("./BetOnGroup");
const BetOnValue_1 = require("./BetOnValue");
const EuropeanRoulette_1 = require("./EuropeanRoulette");
const FrenchRoulette_1 = require("./FrenchRoulette");
const Player_1 = require("./Player");
class Game {
    constructor(roulette, bankBudget, players) {
        this.players = players;
        this.roulette = roulette;
        this.bankBudget = bankBudget;
    }
    bankHasMoney() {
        return this.bankBudget >= 0;
    }
    spinRoulette() {
        return this.roulette.spin();
    }
    playerCount() {
        return this.players.length;
    }
    rouletteType() {
        if (this.roulette instanceof AmericanRoulette_1.AmericanRoulette) {
            return "American roulette";
        }
        else if (this.roulette instanceof EuropeanRoulette_1.EuropeanRoulette) {
            return "European roulette";
        }
        else if (this.roulette instanceof FrenchRoulette_1.FrenchRoulette) {
            return "French roulette";
        }
    }
    processRound() {
        const result = this.roulette.spin();
        for (const player of this.players) {
            this.processBets(player, result);
            if (player.budget <= 0) {
                this.kickPlayer(player);
            }
        }
    }
    processBets(player, rouletteNumber) {
        let earnedAmount = 0;
        for (const bet of player.currentBets) {
            let payout;
            if (bet instanceof BetOnValue_1.BetOnValue) {
                if (bet.choosenNumber === rouletteNumber) {
                    payout = this.roulette.betMultiplier.straight * bet.amount + bet.amount;
                    earnedAmount += payout;
                    this.pay(player, payout);
                }
                else {
                    this.bankBudget += bet.amount;
                }
            }
            else if (bet instanceof BetOnGroup_1.BetOnGroup) {
                for (const n of this.roulette.groupToNumbers[bet.choosenGroup]) {
                    if (n === rouletteNumber) {
                        payout = this.roulette.betMultiplier[bet.choosenGroup] * bet.amount + bet.amount;
                        earnedAmount += payout;
                        this.pay(player, payout);
                        break;
                    }
                    else {
                        this.bankBudget += bet.amount;
                    }
                }
            }
            else {
                throw new Error("Could not process invalid bet type");
            }
        }
        player.resetBets();
        return earnedAmount;
    }
    addPlayer(name, budget) {
        this.players.push(new Player_1.Player(name, budget));
    }
    kickPlayer(player) {
        this.players.splice(this.players.indexOf(player), 1);
    }
    pay(player, amount) {
        this.bankBudget -= amount;
        player.budget += amount;
    }
}
exports.Game = Game;
