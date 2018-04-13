import { PassThrough } from 'stream';
import { Bet } from './Bet';
import { BetOnGroup } from './BetOnGroup';
import { BetOnValue } from './BetOnValue';
import { EuropeanRoulette } from './EuropeanRoulette';
import { FrenchRoulette } from './FrenchRoulette';
import { Player } from './Player';
import { Roulette } from './Roulette';
import { BetGroups } from './Utils';

class Game {
    private bankBudget: number;
    private players: Player[];
    private roulette: Roulette;

    public constructor(roulette: Roulette, bankBudget: number, players: Player[]) {
        this.players = players;
        this.roulette = roulette;
        this.bankBudget = bankBudget;
    }

    public start(): void {
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

    private pay(player: Player, amount: number): void {
        this.bankBudget -= amount;
        player.budget += amount;
        console.log("Player " + player.name + " made $" + amount);
    }

    private kickPlayer(player: Player): void {
        this.players.splice(this.players.indexOf(player), 1);
    }

    private processRound(): void {
        for (const player of this.players) {
            player.placeBetOnValue(Math.floor(Math.random() * 37),
                                   Math.ceil(player.budget - Math.random() * player.budget));
            player.placeBetOnGroup(BetGroups.HIGH, Math.ceil(player.budget - Math.random() * player.budget));
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

    private processBets(player: Player, rouletteNumber: number): void {
        for (const bet of player.currentBets) {
            let payout;

            if (bet instanceof BetOnValue) {
                if (bet.choosenNumber === rouletteNumber) {
                    payout = this.roulette.betMultiplier.straight * bet.amount + bet.amount;
                    this.pay(player, payout);
                } else {
                    this.bankBudget += bet.amount;
                }
            } else if (bet instanceof BetOnGroup) {
                for (const n of this.roulette.groupToNumbers[bet.choosenGroup]) {
                    if (n === rouletteNumber) {
                        payout = this.roulette.betMultiplier[bet.choosenGroup] * bet.amount + bet.amount;
                        this.pay(player, payout);
                        break;
                    } else {
                        this.bankBudget += bet.amount;
                    }
                }
            } else {
                throw new Error("Could not process invalid bet type");
            }
        }
        player.resetBets();
    }
}

const game = new Game(new EuropeanRoulette(), 1000,
    [new Player('a', 100), new Player('b', 100), new Player('c', 100)]);
game.start();
