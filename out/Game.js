"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AmericanRoulette_1 = require("./AmericanRoulette");
const BetOnGroup_1 = require("./BetOnGroup");
const BetOnValue_1 = require("./BetOnValue");
const EuropeanRoulette_1 = require("./EuropeanRoulette");
const FrenchRoulette_1 = require("./FrenchRoulette");
class Game {
    constructor(roulette, bankBudget, players) {
        this.players = players;
        this.roulette = roulette;
        this.bankBudget = bankBudget;
    }
    start() {
        while (true) {
            console.log("--- ROUND BEGIN ---");
            this.processRound();
            if (this.bankBudget < 0) {
                console.log();
                console.log("Roulette machine broke.");
                console.log("-Understandable, have a nice day.");
                break;
            }
            if (this.players.length === 0) {
                console.log("House always wins");
                break;
            }
            console.log("--- ROUND END ---");
            console.log();
        }
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
        console.log("\n>>> The ball landed on the number " + result + " <<<\n");
        for (const player of this.players) {
            this.processBets(player, result);
            console.log("Player " + player.name + " has $" + player.budget);
            if (player.budget <= 0) {
                this.kickPlayer(player);
            }
        }
    }
    processBets(player, rouletteNumber) {
        for (const bet of player.currentBets) {
            let payout;
            if (bet instanceof BetOnValue_1.BetOnValue) {
                if (bet.choosenNumber === rouletteNumber) {
                    payout = this.roulette.betMultiplier.straight * bet.amount + bet.amount;
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
    }
    kickPlayer(player) {
        this.players.splice(this.players.indexOf(player), 1);
    }
    pay(player, amount) {
        this.bankBudget -= amount;
        player.budget += amount;
        console.log("Player " + player.name + " made $" + amount);
    }
}
exports.Game = Game;
