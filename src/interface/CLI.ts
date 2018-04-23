import rl = require('readline-sync');

class CommandLineInterface {
    public inputRoulette(): string {
        const roulettes = ['American roulette', 'European roulette', 'French roulette'];

        const index = rl.keyInSelect(roulettes, 'Select the roulette variation that will be used:', {cancel: false});
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

    public inputBankBudget(): number {
        const bankBudget: number = rl.questionInt("Bank Budget: $");

        console.log();
        return bankBudget;
    }

    public inputPlayerInfo(): any {
        const playerName = this.inputPlayerName();
        const playerBudget = this.inputPlayerBudget();
        console.log();

        return {budget: playerBudget, name: playerName};
    }

    public inputPlayerName(): string {
        const name: string = rl.question("Player name: ");
        return name;
    }

    public inputPlayerBudget(): number {
        const budget: number = rl.questionInt("Player budget: $");
        return budget;
    }

    public queryAnotherPlayer(): boolean {
        const answer = rl.keyInYN("Would you like to add another player?");
        console.log();
        return answer;
    }

    public queryBetThisRound(): boolean  {
        return rl.keyInYN("Would you like to bet this round?");
    }

    public queryBetType(): string {
        const betTypes = ["Straight-up", "Reds", "Blacks", "Evens", "Odds", "Lows", "Highs",
        "First Dozen", "Second Dozen", "Third Dozen", "Top Column", "Middle Column", "Bottom Column"];
        const index = rl.keyInSelect(betTypes, "What bet would you like to make?", {cancel: false});
        console.log("You choose", betTypes[index] + ".\n");
        return betTypes[index];
    }

    public queryAnotherBet(): boolean {
        const answer = rl.keyInYN("Would you like to make another bet?");
        if (!answer) {
            console.log();
        }
        return answer;
    }

    public inputChoosenNumber(): string {
        return rl.question("What number do you want to bet on? ");
    }

    public inputBetAmount(playerBudget: number): number {
        console.log("How much will you bet? ");

        const MAX = playerBudget;
        const MIN = 1;
        let amount = Math.ceil(playerBudget/2);
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

    public logGameSettings(rouletteType: string, bankBudget: number, playerCount: number): void {
        console.log("---GAME SETUP---");
        console.log("Roulette type:", rouletteType);
        console.log("Bank budget: $" + bankBudget);
        console.log("Number of players:", playerCount);
        console.log("---SETUP DONE---\n\n");
    }

    public logPlayerBet(playerName: string, betAmount: number, betTarget: string): void {
        console.log(playerName, "bets $" + betAmount, "on", betTarget, '\n');
    }

    public logPlayerTurn(name: string): void {
        console.log(name + "'s turn");
    }

    public logBallResult(result: string): void {
        console.log("\n>>> The ball landed on the number " + result + " <<<\n");
    }

    public logPlayerEarnings(name: string, amount: number): void {
        console.log(name, "earned $" + amount);
    }

    public logPlayerTotal(name: string, budget: number): void {
        console.log(name, "has a total of $" + budget);
    }

    public logForcedBet(): void {
        console.log("You have to bet this round.");
    }

    public logGameEnd(reason: string): void {
        console.log("Game ended:", reason);
    }
}

export { CommandLineInterface };
