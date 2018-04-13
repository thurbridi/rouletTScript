import { AmericanRoulette } from './AmericanRoulette';
import { Bet } from './Bet';
import { EuropeanRoulette } from './EuropeanRoulette';
import { FrenchRoulette } from './FrenchRoulette';
import { Game } from './Game';
import { Player } from './Player';
import { Roulette } from './Roulette';
import { BetGroups } from './Utils';

const rl = require('readline-sync');
let roulette: Roulette;
let game: Game;

function selectRoulette(): Roulette {
    const roulettes = ['American roulette', 'European roulette', 'French roulette'];

    const index = rl.keyInSelect(roulettes, 'Select the roulette variation that will be used:', {cancel: false});
    switch (index) {
        case 0:
            roulette = new AmericanRoulette();
            console.log("American Roulette was selected\n");
            break;
        case 1:
            roulette = new EuropeanRoulette();
            console.log("European Roulette was selected\n");
            break;
        case 2:
            roulette = new FrenchRoulette();
            console.log("French Roulette was selected\n");
    }
    return roulette;
}

function inputBankBudget(): number {
    const bankBudget: number = rl.questionInt("Bank Budget: $");

    console.log();
    return bankBudget;
}

function addPlayer(): Player {
    const name: string = rl.question("Player name: ");
    const budget: number = rl.questionInt("Player budget: $");

    console.log();
    return new Player(name, budget);
}

function createPlayerList(): Player[] {
    const players: Player[] = [];
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

function inputWillBet(player: Player): boolean {
    if (rl.keyInYN("Would you like to bet this round?")) {
        player.skipCount = 0;
        return true;
    } else {
        player.skipBet();
        return false;
    }
}

function inputChoosenNumber(): number {
    const answer = rl.question("What number do you want to bet on? ");
    let choosenNumber: number;
    if (roulette instanceof AmericanRoulette && answer === "00") {
        choosenNumber = 37;
    } else if (parseInt(answer, 10) >= 0 || parseInt(answer, 10) <= 36) {
        choosenNumber = parseInt(answer, 10);
    } else {
        console.log("This is not a valid number to bet on.\n");
        return inputChoosenNumber();
    }
    return choosenNumber;
}

function inputBetAmount(player: Player): number {
    console.log("How much will you bet? ");

    const MAX = player.budget;
    const MIN = 1;
    let amount = Math.ceil(player.budget/2);
    let key;

    console.log('\n\n' + (new Array(20)).join(' ') + '[Z] <- -> [X]  FIX: [SPACE]\n');
    while (true) {
      console.log('\x1B[1A\x1B[K|' +
        (new Array(amount + 1)).join('-') + 'O' +
        (new Array(MAX - amount + 1)).join('-') + '| ' + amount);
      key = rl.keyIn('', {hideEchoBack: true, mask: '', limit: 'zx '});
      if (key === 'z') {
        if (amount > MIN) {
            amount--; }
        } else if (key === 'x') {
            if (amount < MAX) { amount++; }
        } else {
            break;
        }
    }
    return amount;
}

function inputBet(player: Player): void {
    const betTypes = ["Straight-up", "Reds", "Blacks", "Evens", "Odds", "Lows", "Highs",
                      "First Dozen", "Second Dozen", "Third Dozen", "Top Column", "Middle Column", "Bottom Column"];
    const index = rl.keyInSelect(betTypes, "What bet would you like to make?", {cancel: false});
    console.log("You choose", betTypes[index], ".\n");
    const amount = inputBetAmount(player);
    switch (index) {
        case 0:
            const choosenNumber = inputChoosenNumber();
            player.placeBetOnValue(choosenNumber, amount);
            console.log(player.name, "bets $"  + amount, "on the number ", choosenNumber, '\n');
            break;

        case 1:
            player.placeBetOnGroup(BetGroups.RED, amount);
            console.log(player.name, "bets $"  + amount, "on Reds\n");
            break;

        case 2:
            player.placeBetOnGroup(BetGroups.BLACK, amount);
            console.log(player.name, "bets $"  + amount, "on Blacks\n");
            break;

        case 3:
            player.placeBetOnGroup(BetGroups.EVEN, amount);
            console.log(player.name, "bets $"  + amount, "on Evens\n");
            break;

        case 4:
            player.placeBetOnGroup(BetGroups.ODD, amount);
            console.log(player.name, "bets $"  + amount, "on Odds\n");
            break;

        case 5:
            player.placeBetOnGroup(BetGroups.LOW, amount);
            console.log(player.name, "bets $"  + amount, "on Lows\n");
            break;

        case 6:
            player.placeBetOnGroup(BetGroups.HIGH, amount);
            console.log(player.name, "bets $"  + amount, "on Highs\n");
            break;

        case 7:
            player.placeBetOnGroup(BetGroups.DOZEN1, amount);
            console.log(player.name, "bets $"  + amount, "on the First Dozen\n");
            break;

        case 8:
            player.placeBetOnGroup(BetGroups.DOZEN2, amount);
            console.log(player.name, "bets $"  + amount, "on the Second Dozen\n");
            break;

        case 9:
            player.placeBetOnGroup(BetGroups.DOZEN3, amount);
            console.log(player.name, "bets $"  + amount, "on the Third Dozen\n");
            break;

        case 10:
            player.placeBetOnGroup(BetGroups.COLUMNTOP, amount);
            console.log(player.name, "bets $" + amount, "on the Top Column\n");
            break;

        case 11:
            player.placeBetOnGroup(BetGroups.COLUMNMID, amount);
            console.log(player.name, "bets $"  + amount, "on the Middle Column\n");
            break;

        case 12:
            player.placeBetOnGroup(BetGroups.COLUMNBOT, amount);
            console.log(player.name, "bets $"  + amount, "on the Bottom Column\n");
            break;
    }
}

function setup(): void {
    console.log("---GAME SETUP---");
    game = new Game(selectRoulette(), inputBankBudget(), createPlayerList());
    console.log("Roulette type: ", game.rouletteType());
    console.log("Bank budget: $", game.bankBudget);
    console.log("Number of players: ", game.playerCount());
    console.log("---SETUP DONE---\n\n");
}

function gameLoop(): void {
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
            } else {
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

function start(): void {
    setup();
    gameLoop();
}

start();
