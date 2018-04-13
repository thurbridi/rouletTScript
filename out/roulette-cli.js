"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AmericanRoulette_1 = require("./AmericanRoulette");
const EuropeanRoulette_1 = require("./EuropeanRoulette");
const FrenchRoulette_1 = require("./FrenchRoulette");
const Game_1 = require("./Game");
const Player_1 = require("./Player");
const Utils_1 = require("./Utils");
const rl = require('readline-sync');
let roulette;
let game;
function selectRoulette() {
    const roulettes = ['American roulette', 'European roulette', 'French roulette'];
    const index = rl.keyInSelect(roulettes, 'Select the roulette variation that will be used:', { cancel: false });
    switch (index) {
        case 0:
            roulette = new AmericanRoulette_1.AmericanRoulette();
            console.log("American Roulette was selected\n");
            break;
        case 1:
            roulette = new EuropeanRoulette_1.EuropeanRoulette();
            console.log("European Roulette was selected\n");
            break;
        case 2:
            roulette = new FrenchRoulette_1.FrenchRoulette();
            console.log("French Roulette was selected\n");
    }
    return roulette;
}
function inputBankBudget() {
    const bankBudget = rl.questionInt("Bank Budget: $");
    console.log();
    return bankBudget;
}
function addPlayer() {
    const name = rl.question("Player name: ");
    const budget = rl.questionInt("Player budget: $");
    console.log();
    return new Player_1.Player(name, budget);
}
function createPlayerList() {
    const players = [];
    players.push(addPlayer());
    let answer = true;
    while (answer) {
        answer = rl.keyInYN("Would you like to add another player?");
        if (answer) {
            players.push(addPlayer());
        }
    }
    console.log();
    return players;
}
function inputWillBet(player) {
    if (rl.keyInYN("Would you like to bet this round?")) {
        player.skipCount = 0;
        return true;
    }
    else {
        player.skipBet();
        return false;
    }
}
function inputChoosenNumber() {
    const answer = rl.question("What number do you want to bet on? ");
    let choosenNumber;
    if (roulette instanceof AmericanRoulette_1.AmericanRoulette && answer === "00") {
        choosenNumber = 37;
    }
    else if (parseInt(answer, 10) >= 0 || parseInt(answer, 10) <= 36) {
        choosenNumber = parseInt(answer, 10);
    }
    else {
        console.log("This is not a valid number to bet on.\n");
        return inputChoosenNumber();
    }
    return choosenNumber;
}
function inputBetAmount(player) {
    console.log("How much will you bet? ");
    const MAX = player.budget;
    const MIN = 1;
    let amount = Math.ceil(player.budget / 2);
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
function inputBet(player) {
    const betTypes = ["Straight-up", "Reds", "Blacks", "Evens", "Odds", "Lows", "Highs",
        "First Dozen", "Second Dozen", "Third Dozen", "Top Column", "Middle Column", "Bottom Column"];
    const index = rl.keyInSelect(betTypes, "What bet would you like to make?", { cancel: false });
    console.log("You choose", betTypes[index], ".\n");
    const amount = inputBetAmount(player);
    switch (index) {
        case 0:
            const choosenNumber = inputChoosenNumber();
            player.placeBetOnValue(choosenNumber, amount);
            console.log(player.name, "bets $" + amount, "on the number ", choosenNumber, '\n');
            break;
        case 1:
            player.placeBetOnGroup(Utils_1.BetGroups.RED, amount);
            console.log(player.name, "bets $" + amount, "on Reds\n");
            break;
        case 2:
            player.placeBetOnGroup(Utils_1.BetGroups.BLACK, amount);
            console.log(player.name, "bets $" + amount, "on Blacks\n");
            break;
        case 3:
            player.placeBetOnGroup(Utils_1.BetGroups.EVEN, amount);
            console.log(player.name, "bets $" + amount, "on Evens\n");
            break;
        case 4:
            player.placeBetOnGroup(Utils_1.BetGroups.ODD, amount);
            console.log(player.name, "bets $" + amount, "on Odds\n");
            break;
        case 5:
            player.placeBetOnGroup(Utils_1.BetGroups.LOW, amount);
            console.log(player.name, "bets $" + amount, "on Lows\n");
            break;
        case 6:
            player.placeBetOnGroup(Utils_1.BetGroups.HIGH, amount);
            console.log(player.name, "bets $" + amount, "on Highs\n");
            break;
        case 7:
            player.placeBetOnGroup(Utils_1.BetGroups.DOZEN1, amount);
            console.log(player.name, "bets $" + amount, "on the First Dozen\n");
            break;
        case 8:
            player.placeBetOnGroup(Utils_1.BetGroups.DOZEN2, amount);
            console.log(player.name, "bets $" + amount, "on the Second Dozen\n");
            break;
        case 9:
            player.placeBetOnGroup(Utils_1.BetGroups.DOZEN3, amount);
            console.log(player.name, "bets $" + amount, "on the Third Dozen\n");
            break;
        case 10:
            player.placeBetOnGroup(Utils_1.BetGroups.COLUMNTOP, amount);
            console.log(player.name, "bets $" + amount, "on the Top Column\n");
            break;
        case 11:
            player.placeBetOnGroup(Utils_1.BetGroups.COLUMNMID, amount);
            console.log(player.name, "bets $" + amount, "on the Middle Column\n");
            break;
        case 12:
            player.placeBetOnGroup(Utils_1.BetGroups.COLUMNBOT, amount);
            console.log(player.name, "bets $" + amount, "on the Bottom Column\n");
            break;
    }
}
function setup() {
    console.log("---GAME SETUP---");
    game = new Game_1.Game(selectRoulette(), inputBankBudget(), createPlayerList());
    console.log("Roulette type: ", game.rouletteType());
    console.log("Bank budget: $", game.bankBudget);
    console.log("Number of players: ", game.playerCount());
    console.log("---SETUP DONE---\n\n");
}
function gameLoop() {
    while (true) {
        if (!game.bankHasMoney) {
            console.log("Game ended, the House has no more money.");
            break;
        }
        if (game.playerCount() === 0) {
            console.log("Game ended, the House always wins.");
            break;
        }
        for (const player of game.players) {
            console.log(player.name + "'s turn");
            if (player.skipCount === 3) {
                console.log("You have to bet this round.");
                player.skipCount = 0;
                inputBet(player);
            }
            else {
                if (inputWillBet(player)) {
                    let answer = true;
                    while (answer) {
                        inputBet(player);
                        answer = rl.keyInYN("Would you like to make another bet?");
                    }
                }
            }
        }
        const result = game.spinRoulette();
        console.log("\n>>> The ball landed on the number " + result + " <<<\n");
        for (const player of game.players) {
            game.processBets(player, result);
            console.log(player.name, " has $", player.budget);
            if (player.budget <= 0) {
                game.kickPlayer(player);
            }
        }
    }
}
function start() {
    setup();
    gameLoop();
}
start();
