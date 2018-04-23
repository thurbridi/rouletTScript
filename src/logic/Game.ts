import { AmericanRoulette } from './AmericanRoulette';
import { Bet } from './Bet';
import { BetOnGroup } from './BetOnGroup';
import { BetOnValue } from './BetOnValue';
import { EuropeanRoulette } from './EuropeanRoulette';
import { FrenchRoulette } from './FrenchRoulette';
import { Player } from './Player';
import { Roulette } from './Roulette';
import { BetGroups } from './Utils';

class Game {
    public bankBudget: number;
    public players: Player[];
    public roulette: Roulette;

    public constructor(roulette: Roulette, bankBudget: number, players: Player[]) {
        this.players = players;
        this.roulette = roulette;
        this.bankBudget = bankBudget;
    }

    public bankHasMoney(): boolean {
        return this.bankBudget >= 0;
    }

    public spinRoulette(): number {
        return this.roulette.spin();
    }

    public playerCount(): number {
        return this.players.length;
    }

    public rouletteType(): string {
        if (this.roulette instanceof AmericanRoulette) {
            return "American roulette";
        } else if (this.roulette instanceof EuropeanRoulette) {
            return "European roulette";
        } else if (this.roulette instanceof FrenchRoulette) {
            return "French roulette";
        }
    }

    public processRound(): void {
        const result = this.roulette.spin();

        for (const player of this.players) {
            this.processBets(player, result);

            if (player.budget <= 0) {
                this.kickPlayer(player);
            }
        }
    }

    public processBets(player: Player, rouletteNumber: number): number {
        let earnedAmount = 0;
        for (const bet of player.currentBets) {
            let payout;

            if (bet instanceof BetOnValue) {
                if (bet.choosenNumber === rouletteNumber) {
                    payout = this.roulette.betMultiplier.straight * bet.amount + bet.amount;
                    earnedAmount += payout;
                    this.pay(player, payout);
                } else {
                    this.bankBudget += bet.amount;
                }
            } else if (bet instanceof BetOnGroup) {
                for (const n of this.roulette.groupToNumbers[bet.choosenGroup]) {
                    if (n === rouletteNumber) {
                        payout = this.roulette.betMultiplier[bet.choosenGroup] * bet.amount + bet.amount;
                        earnedAmount += payout;
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
        return earnedAmount;
    }

    public addPlayer(name: string, budget: number): void {
        this.players.push(new Player(name, budget));
    }

    public kickPlayer(player: Player): void {
        this.players.splice(this.players.indexOf(player), 1);
    }

    private pay(player: Player, amount: number): void {
        this.bankBudget -= amount;
        player.budget += amount;
    }
}

export { Game };
