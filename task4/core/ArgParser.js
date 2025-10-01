const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

class ArgParser {
    static parse() {
        const argv = yargs(hideBin(process.argv))
            .usage('Usage: $0 <boxes> <mortyFile> <mortyClass>')
            .demandCommand(3)
            .argv;

        const boxesRaw = argv._[0];

        if (!/^[1-9]\d*$/.test(boxesRaw)) {
            console.error("Error: Number of boxes must be a valid integer >= 3 (no letters or symbols allowed).");
            process.exit(1);
        }

        const boxes = parseInt(boxesRaw, 10);

        return {
            boxes,
            mortyFile: argv._[1],
            mortyClass: argv._[2]
        };
    }
}

module.exports = ArgParser;