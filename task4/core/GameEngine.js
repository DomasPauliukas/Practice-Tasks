const ClassicMorty = require("../morties/ClassicMorty");
const LazyMorty = require("../morties/LazyMorty");
const Stats = require("./Stats");
const FairRandom = require("./FairRandom");
const readline = require("readline-sync");
const crypto = require("crypto");
const { renderStats } = require("../utils/table");

class GameEngine {
    constructor(options) {
        this.options = options;
        this.stats = new Stats(this.options.boxes);
        this.fairRandom = new FairRandom();
        this.morty = null;
        this.mortyTypes = {
            ClassicMorty,
            LazyMorty
        };
    }

    selectMorty(mortyType) {
        const MortyClass = this.mortyTypes[mortyType];
        if (!MortyClass) throw new Error(`Unknown Morty type: ${mortyType}`);
        this.morty = new MortyClass(this.fairRandom);
    }

    start() {
        console.log("=== Game started ===");
        console.log(`Number of boxes: ${this.options.boxes}`);
        console.log(`Morty type: ${this.options.mortyClass}`);

        this.selectMorty(this.options.mortyClass);

        let keepPlaying = true;

        while (keepPlaying) {
            const hmac = this.fairRandom.commit(this.options.boxes);
            console.log("Morty HMAC:", hmac);

            const rickChoice = this.askRickChoice();

            const gunBox = this.fairRandom.mortyValue;
            const removedBox = this.morty.chooseBox(this.options.boxes, rickChoice, gunBox);

            const finalChoice = this.askStayOrSwitch(rickChoice, removedBox);

            const result = finalChoice === gunBox;
            console.log(result ? "You won!" : "You lost!");
            console.log(`Gun was in box: ${gunBox}`);

            this.stats.recordRound(result, finalChoice !== rickChoice);

            const { mortyValue, key, hmac: originalHmac } = this.fairRandom.reveal();
            console.log("\n=== Verification ===");
            console.log("Morty's value:", mortyValue);
            console.log("Key (hex):", key.toString("hex"));

            const recomputed = crypto
                .createHmac("sha256", key)
                .update(mortyValue.toString())
                .digest("hex");

            console.log("Recomputed HMAC:", recomputed);
            console.log("Matches original:", recomputed === originalHmac);

            keepPlaying = this.askPlayAgain();
        }

        console.log("Thanks for playing!");
        renderStats(this.stats.getStats(), this.options.boxes);
    }

    askRickChoice() {
        let choice;
        while (true) {
            const input = readline.question(`Choose a box (0-${this.options.boxes - 1}): `);
            choice = Number(input);

            if (!Number.isInteger(choice)) {
                console.log("Invalid input! Please enter a valid integer.");
                continue;
            }

            if (choice >= 0 && choice < this.options.boxes) break;

            console.log(`Invalid choice! Please enter a number between 0 and ${this.options.boxes - 1}.`);
        }
        return choice;
    }

    askStayOrSwitch(rickChoice, removedBox) {
        let answer;
        while (true) {
            answer = readline.question("Do you want to switch? (y/n): ").toLowerCase();
            if (answer === "y" || answer === "n") break;
            console.log("Invalid input! Please enter 'y' or 'n'.");
        }
        if (answer === "y") {
            for (let i = 0; i < this.options.boxes; i++) {
                if (i !== rickChoice && i !== removedBox) return i;
            }
        }
        return rickChoice;
    }

    askPlayAgain() {
        let answer;
        while (true) {
            answer = readline.question("\nDo you want to play another round (y/n)? ").toLowerCase();
            if (answer === "y" || answer === "n") break;
            console.log("Invalid input! Please enter 'y' or 'n'.");
        }
        return answer === "y";
    }
}

module.exports = GameEngine;