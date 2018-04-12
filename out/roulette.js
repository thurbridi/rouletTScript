class Game {
    constructor(roulette, bankBudget, players) {
        this.players = players;
        this.roulette = roulette;
        this.bankBudget = bankBudget;
    }
    start() {
        while (true) {
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
            console.log();
        }
    }
    pay(player, amount) {
        this.bankBudget -= amount;
        player.budget += amount;
    }
    kickPlayer(player) {
        this.players.splice(this.players.indexOf(player), 1);
    }
    processRound() {
        this.players.forEach((player) => {
            player.placeBet(Math.floor(37 * Math.random()), player.budget - Math.floor(Math.random() * player.budget));
        });
        const result = this.roulette.spin();
        console.log("---> The ball landed on the number " + result + " <---");
        this.players.forEach((player) => {
            if (player.currentBet === result) {
                const payout = player.betAmount * 35;
                console.log(this.bankBudget);
                this.pay(player, payout);
                console.log("PLAYER " + player.name + " WON $" + payout);
            }
            else {
                // Player's bet goes to the bank
                this.bankBudget += player.betAmount;
            }
            if (player.budget <= 0) {
                this.kickPlayer(player);
            }
        });
    }
}
class Player {
    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
    }
    placeBet(num, value) {
        this.currentBet = num;
        this.betAmount = value;
        this.budget -= value;
        console.log("Player " + this.name + " bets on: " + num + " ||| Value: $" + value);
    }
}
class Roulette {
    spin() {
        const index = Math.floor(Math.random() * this.sequence.length);
        return this.sequence[index];
    }
}
class AmericanRoulette extends Roulette {
    constructor() {
        super();
        // 37 represents pocket 00
        this.sequence = [0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3,
            24, 36, 13, 1, 37, 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16,
            4, 23, 35, 14, 2];
    }
}
class EuropeanRoulette extends Roulette {
    constructor() {
        super();
        this.sequence = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11,
            30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28,
            12, 35, 3, 26];
    }
}
class FrenchRoulette extends Roulette {
    constructor() {
        super();
        this.sequence = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11,
            30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28,
            12, 35, 3, 26];
    }
}
const game = new Game(new FrenchRoulette(), 1000, [new Player('a', 100), new Player('b', 100), new Player('c', 100)]);
game.start();
