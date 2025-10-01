const ArgParser = require("./core/ArgParser");
const GameEngine = require("./core/GameEngine");

function printUsage() {
    console.log("Usage: node game.js <boxes> <MortyFile> <MortyClass>");
    console.log("Example: node game.js 5 ClassicMorty ClassicMorty");
}

const options = ArgParser.parse();

const boxes = Number(options.boxes);
if (!Number.isInteger(boxes) || boxes < 3) {
    console.error("Error: Number of boxes must be an integer >= 3.");
    printUsage();
    process.exit(1);
}
options.boxes = boxes;

const validMorties = ["ClassicMorty", "LazyMorty"];
if (!options.mortyClass || !validMorties.includes(options.mortyClass)) {
    console.error(`Error: Unknown Morty type: ${options.mortyClass}`);
    console.error(`Valid types: ${validMorties.join(", ")}`);
    printUsage();
    process.exit(1);
}

try {
    const game = new GameEngine(options);
    game.start();
} catch (err) {
    console.error("Error starting the game:", err.message);
    process.exit(1);
}