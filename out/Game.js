"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BetOnGroup_1 = require("./BetOnGroup");
const BetOnValue_1 = require("./BetOnValue");
const EuropeanRoulette_1 = require("./EuropeanRoulette");
const Player_1 = require("./Player");
const Utils_1 = require("./Utils");
class Game {
    constructor(roulette, bankBudget, players) {
        this.players = players;
        this.roulette = roulette;
        this.bankBudget = bankBudget;
    }
    start() {
        // let i: number = 0;
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
            // i++;
        }
    }
    pay(player, amount) {
        this.bankBudget -= amount;
        player.budget += amount;
        console.log("Player " + player.name + " made $" + amount);
    }
    kickPlayer(player) {
        this.players.splice(this.players.indexOf(player), 1);
    }
    processRound() {
        for (const player of this.players) {
            player.placeBetOnValue(Math.floor(Math.random() * 37), Math.ceil(player.budget - Math.random() * player.budget));
            player.placeBetOnGroup(Utils_1.BetGroups.HIGH, Math.ceil(player.budget - Math.random() * player.budget));
        }
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
}
const game = new Game(new EuropeanRoulette_1.EuropeanRoulette(), 1000, [new Player_1.Player('a', 100), new Player_1.Player('b', 100), new Player_1.Player('c', 100)]);
game.start();
