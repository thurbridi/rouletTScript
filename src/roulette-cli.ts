import { CommandLineInterface } from './interface/CLI';
import { AmericanRoulette } from './logic/AmericanRoulette';
import { Bet } from './logic/Bet';
import { EuropeanRoulette } from './logic/EuropeanRoulette';
import { FrenchRoulette } from './logic/FrenchRoulette';
import { Game } from './logic/Game';
import { Player } from './logic/Player';
import { Roulette } from './logic/Roulette';
import { BetGroups } from './logic/Utils';

let game: Game;
const cli = new CommandLineInterface();

function selectRoulette(): Roulette {
    const roulette = cli.inputRoulette();
    switch (roulette) {
        case 'American roulette':
            return new AmericanRoulette();
        case 'French roulette':
            return new FrenchRoulette();
        case 'European roulette':
            return new EuropeanRoulette();
        default:
    }
}

function addPlayer(): Player {
    const info = cli.inputPlayerInfo();
    return new Player(info.name, info.budget);
}

function createPlayerList(): Player[] {
    const players: Player[] = [];
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

function inputChoosenNumber(): number {
    const answer = cli.inputChoosenNumber();
    let choosenNumber: number;
    if (game.roulette instanceof AmericanRoulette && answer === "00") {
        choosenNumber = 37;
    } else if (parseInt(answer, 10) >= 0 && parseInt(answer, 10) <= 36) {
        choosenNumber = parseInt(answer, 10);
    } else {
        console.log("This is not a valid number to bet on.\n");
        return inputChoosenNumber();
    }
    return choosenNumber;
}

function registerBet(player: Player): void {
    const betType: string = cli.queryBetType();
    const amount = cli.inputBetAmount(player.budget);

    if (betType === "Straight-up") {
        const choosenNumber = inputChoosenNumber();
        // game logic
        player.placeBetOnValue(choosenNumber, amount);
        if (choosenNumber === 37 && game.roulette instanceof AmericanRoulette) {
            cli.logPlayerBet(player.name, amount, "on the number 00");
        } else {
            cli.logPlayerBet(player.name, amount, "on the number " + choosenNumber);
        }
    } else {
        switch (betType) {
            case "Reds":
                player.placeBetOnGroup(BetGroups.RED, amount);
                break;

            case "Blacks":
                player.placeBetOnGroup(BetGroups.BLACK, amount);
                break;

            case "Evens":
                player.placeBetOnGroup(BetGroups.EVEN, amount);
                break;

            case "Odds":
                player.placeBetOnGroup(BetGroups.ODD, amount);
                break;

            case "Lows":
                player.placeBetOnGroup(BetGroups.LOW, amount);
                break;

            case "Highs":
                player.placeBetOnGroup(BetGroups.HIGH, amount);
                break;

            case "First Dozen":
                player.placeBetOnGroup(BetGroups.DOZEN1, amount);
                break;

            case "Second Dozen":
                player.placeBetOnGroup(BetGroups.DOZEN2, amount);
                break;

            case "Third Dozen":
                player.placeBetOnGroup(BetGroups.DOZEN3, amount);
                break;

            case "Top Column":
                player.placeBetOnGroup(BetGroups.COLUMNTOP, amount);
                break;

            case "Middle Column":
                player.placeBetOnGroup(BetGroups.COLUMNMID, amount);
                break;

            case "Bottom Column":
                player.placeBetOnGroup(BetGroups.COLUMNBOT, amount);
                break;
        }
        cli.logPlayerBet(player.name, amount, betType);
    }
}

function setup(): void {
    game = new Game(selectRoulette(), cli.inputBankBudget(), createPlayerList());
    cli.logGameSettings(game.rouletteType(), game.bankBudget, game.playerCount());
}

function gameLoop(): void {
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
            } else {
                if (cli.queryBetThisRound()) {
                    let answer = true;
                    while (answer) {
                        registerBet(player);
                        answer = cli.queryAnotherBet();
                    }
                } else {
                    player.skipBet();
                }
            }
        }

        const result = game.spinRoulette();
        if (result === 37) {
            cli.logBallResult('00');
        } else {
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

function start(): void {
    setup();
    gameLoop();
}

start();
