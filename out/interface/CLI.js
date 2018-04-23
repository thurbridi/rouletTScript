"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rl = require("readline-sync");
class CommandLineInterface {
    inputRoulette() {
        const roulettes = ['American roulette', 'European roulette', 'French roulette'];
        const index = rl.keyInSelect(roulettes, 'Select the roulette variation that will be used:', { cancel: false });
        switch (index) {
            case 0:
                console.log("American Roulette was selected\n");
                break;
            case 1:
                console.log("European Roulette was selected\n");
                break;
            case 2:
                console.log("French Roulette was selected\n");
        }
        return roulettes[index];
    }
    inputBankBudget() {
        const bankBudget = rl.questionInt("Bank Budget: $");
        console.log();
        return bankBudget;
    }
    inputPlayerInfo() {
        const playerName = this.inputPlayerName();
        const playerBudget = this.inputPlayerBudget();
        console.log();
        return { budget: playerBudget, name: playerName };
    }
    inputPlayerName() {
        const name = rl.question("Player name: ");
        return name;
    }
    inputPlayerBudget() {
        const budget = rl.questionInt("Player budget: $");
        return budget;
    }
    queryAnotherPlayer() {
        const answer = rl.keyInYN("Would you like to add another player?");
        console.log();
        return answer;
    }
    queryBetThisRound() {
        return rl.keyInYN("Would you like to bet this round?");
    }
    queryBetType() {
        const betTypes = ["Straight-up", "Reds", "Blacks", "Evens", "Odds", "Lows", "Highs",
            "First Dozen", "Second Dozen", "Third Dozen", "Top Column", "Middle Column", "Bottom Column"];
        const index = rl.keyInSelect(betTypes, "What bet would you like to make?", { cancel: false });
        console.log("You choose", betTypes[index] + ".\n");
        return betTypes[index];
    }
    queryAnotherBet() {
        const answer = rl.keyInYN("Would you like to make another bet?");
        if (!answer) {
            console.log();
        }
        return answer;
    }
    inputChoosenNumber() {
        return rl.question("What number do you want to bet on? ");
    }
    inputBetAmount(playerBudget) {
        console.log("How much will you bet? ");
        const MAX = playerBudget;
        const MIN = 1;
        let amount = Math.ceil(playerBudget / 2);
        let key;
        console.log('\n\n' + (new Array(20)).join(' ') + '[Z] <- -> [X]  FIX: [SPACE]\n');
        while (true) {
            console.log('\x1B[1A\x1B[K|' +
                (new Array(amount + 1)).join('-') + 'O' +
                (new Array(MAX - amount + 1)).join('-') + '| ' + amount);
            key = rl.keyIn('', { hideEchoBack: true, mask: '', limit: 'zx ' });
            if (key === 'z') {
                if (amount > MIN) {
                    amount--;
                }
            }
            else if (key === 'x') {
                if (amount < MAX) {
                    amount++;
                }
            }
            else {
                break;
            }
        }
        return amount;
    }
    logGameSettings(rouletteType, bankBudget, playerCount) {
        console.log("---GAME SETUP---");
        console.log("Roulette type:", rouletteType);
        console.log("Bank budget: $" + bankBudget);
        console.log("Number of players:", playerCount);
        console.log("---SETUP DONE---\n\n");
    }
    logPlayerBet(playerName, betAmount, betTarget) {
        console.log(playerName, "bets $" + betAmount, "on", betTarget, '\n');
    }
    logPlayerTurn(name) {
        console.log(name + "'s turn");
    }
    logBallResult(result) {
        console.log("\n>>> The ball landed on the number " + result + " <<<\n");
    }
    logPlayerEarnings(name, amount) {
        console.log(name, "earned $" + amount);
    }
    logPlayerTotal(name, budget) {
        console.log(name, "has a total of $" + budget);
    }
    logForcedBet() {
        console.log("You have to bet this round.");
    }
    logGameEnd(reason) {
        console.log("Game ended:", reason);
    }
}
exports.CommandLineInterface = CommandLineInterface;
