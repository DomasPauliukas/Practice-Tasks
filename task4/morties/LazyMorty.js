const MortyBase = require("../core/MortyBase");
class LazyMorty extends MortyBase {
    constructor(fairRandom) {
        super(fairRandom);
        this.name = "LazyMorty";
    }

    hideGun(numBoxes) {
        return this.random ? this.random.generate(numBoxes).gunBox : getRandomInt(0, numBoxes - 1);
    }

    chooseBox(numBoxes, rickChoice, gunBox) {
        for (let i = 0; i < numBoxes; i++) {
            if (i !== rickChoice && i !== gunBox) return i;
        }
        return gunBox;
    }
}

module.exports = LazyMorty;