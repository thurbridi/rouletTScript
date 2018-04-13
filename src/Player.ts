import { Bet } from './Bet';
import { BetOnGroup } from './BetOnGroup';
import { BetOnValue } from './BetOnValue';
import { BetGroups } from './Utils';

export class Player {
    public name: string;
    public budget: number;
    public skipCount: number;
    public currentBets: Bet[];
    public currentBetAmount: number;

    public constructor(name: string, budget: number) {
        this.name = name;
        this.budget = budget;
        this.currentBets = [];
        this.currentBetAmount = 0;
    }

    public placeBetOnValue(choosenNumber: number, amount: number): void {
        this.currentBets.push(new BetOnValue(choosenNumber, amount));
        this.currentBetAmount += amount;
        this.budget -= amount;

        console.log("Player " + this.name + " bets on: " + choosenNumber + " ||| Value: $" + amount);
    }

    public placeBetOnGroup(choosenGroup: BetGroups, amount: number): void {
        this.currentBets.push(new BetOnGroup(choosenGroup, amount));
        this.currentBetAmount += amount;
        this.budget -= amount;

        console.log("Player " + this.name + " bets on: " + choosenGroup + " ||| Value: $" + amount);
    }

    public skipBet(): void {
        this.skipCount++;
    }

    public resetBets(): void {
        this.currentBets = [];
        this.currentBetAmount = 0;
    }
}
