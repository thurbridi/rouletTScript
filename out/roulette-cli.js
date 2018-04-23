"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CLI_1 = require("./interface/CLI");
const AmericanRoulette_1 = require("./logic/AmericanRoulette");
const EuropeanRoulette_1 = require("./logic/EuropeanRoulette");
const FrenchRoulette_1 = require("./logic/FrenchRoulette");
const Game_1 = require("./logic/Game");
const Player_1 = require("./logic/Player");
const Utils_1 = require("./logic/Utils");
let game;
const cli = new CLI_1.CommandLineInterface();
function selectRoulette() {
    const roulette = cli.inputRoulette();
    switch (roulette) {
        case 'American roulette':
            return new AmericanRoulette_1.AmericanRoulette();
        case 'French roulette':
            return new FrenchRoulette_1.FrenchRoulette();
        case 'European roulette':
            return new EuropeanRoulette_1.EuropeanRoulette();
        default:
    }
}
function addPlayer() {
    const info = cli.inputPlayerInfo();
    return new Player_1.Player(info.name, info.budget);
}
function createPlayerList() {
    const players = [];
    players.push(addPlayer());
    let answer = true;
    while (answer) {
        answer = cli.queryAnotherPlayer();
        if (answer) {
            players.push(addPlayer());
        }
    }
    console.log();
    return players;
}
function inputChoosenNumber() {
    const answer = cli.inputChoosenNumber();
    let choosenNumber;
    if (game.roulette instanceof AmericanRoulette_1.AmericanRoulette && answer === "00") {
        choosenNumber = 37;
    }
    else if (parseInt(answer, 10) >= 0 && parseInt(answer, 10) <= 36) {
        choosenNumber = parseInt(answer, 10);
    }
    else {
        console.log("This is not a valid number to bet on.\n");
        return inputChoosenNumber();
    }
    return choosenNumber;
}
function registerBet(player) {
    const betType = cli.queryBetType();
    const amount = cli.inputBetAmount(player.budget);
    if (betType === "Straight-up") {
        const choosenNumber = inputChoosenNumber();
        // game logic
        player.placeBetOnValue(choosenNumber, amount);
        if (choosenNumber === 37 && game.roulette instanceof AmericanRoulette_1.AmericanRoulette) {
            cli.logPlayerBet(player.name, amount, "on the number 00");
        }
        else {
            cli.logPlayerBet(player.name, amount, "on the number " + choosenNumber);
        }
    }
    else {
        switch (betType) {
            case "Reds":
                player.placeBetOnGroup(Utils_1.BetGroups.RED, amount);
                break;
            case "Blacks":
                player.placeBetOnGroup(Utils_1.BetGroups.BLACK, amount);
                break;
            case "Evens":
                player.placeBetOnGroup(Utils_1.BetGroups.EVEN, amount);
                break;
            case "Odds":
                player.placeBetOnGroup(Utils_1.BetGroups.ODD, amount);
                break;
            case "Lows":
                player.placeBetOnGroup(Utils_1.BetGroups.LOW, amount);
                break;
            case "Highs":
                player.placeBetOnGroup(Utils_1.BetGroups.HIGH, amount);
                break;
            case "First Dozen":
                player.placeBetOnGroup(Utils_1.BetGroups.DOZEN1, amount);
                break;
            case "Second Dozen":
                player.placeBetOnGroup(Utils_1.BetGroups.DOZEN2, amount);
                break;
            case "Third Dozen":
                player.placeBetOnGroup(Utils_1.BetGroups.DOZEN3, amount);
                break;
            case "Top Column":
                player.placeBetOnGroup(Utils_1.BetGroups.COLUMNTOP, amount);
                break;
            case "Middle Column":
                player.placeBetOnGroup(Utils_1.BetGroups.COLUMNMID, amount);
                break;
            case "Bottom Column":
                player.placeBetOnGroup(Utils_1.BetGroups.COLUMNBOT, amount);
                break;
        }
        cli.logPlayerBet(player.name, amount, betType);
    }
}
function setup() {
    game = new Game_1.Game(selectRoulette(), cli.inputBankBudget(), createPlayerList());
    cli.logGameSettings(game.rouletteType(), game.bankBudget, game.playerCount());
}
function gameLoop() {
    while (true) {
        if (!game.bankHasMoney()) {
            cli.logGameEnd("the house has no money left.");
            break;
        }
        if (game.playerCount() === 0) {
            cli.logGameEnd("no players left.");
            break;
        }
        for (const player of game.players) {
            cli.logPlayerTurn(player.name);
            if (player.skipCount === 3) {
                cli.logForcedBet();
                registerBet(player);
            }
            else {
                if (cli.queryBetThisRound()) {
                    let answer = true;
                    while (answer) {
                        registerBet(player);
                        answer = cli.queryAnotherBet();
                    }
                }
                else {
                    player.skipBet();
                }
            }
        }
        const result = game.spinRoulette();
        if (result === 37) {
            cli.logBallResult('00');
        }
        else {
            cli.logBallResult(String(result));
        }
        for (const player of game.players) {
            const earnedAmount = game.processBets(player, result);
            if (earnedAmount > 0) {
                cli.logPlayerEarnings(player.name, earnedAmount);
            }
            cli.logPlayerTotal(player.name, player.budget);
            if (player.budget <= 0) {
                game.kickPlayer(player);
            }
        }
        console.log();
    }
}
function start() {
    setup();
    gameLoop();
}
start();
