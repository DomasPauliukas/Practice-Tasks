const MortyBase = require("../core/MortyBase");
const { getRandomInt } = require("../utils/random");

class ClassicMorty extends MortyBase {
    constructor(fairRandom) {
        super(fairRandom);
        this.name = "ClassicMorty";
    }

    hideGun(numBoxes) {
        return this.random ? this.random.generate(numBoxes).gunBox : getRandomInt(0, numBoxes - 1);
    }

    chooseBox(numBoxes, rickChoice, gunBox) {
        let options = [];
        for (let i = 0; i < numBoxes; i++) {
            if (i !== rickChoice && i !== gunBox) options.push(i);
        }
        if (options.length === 0) return gunBox;
        return options[getRandomInt(0, options.length - 1)];
    }
}

module.exports = ClassicMorty;