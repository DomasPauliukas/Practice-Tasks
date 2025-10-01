const { generateKey, generateHmac } = require("../utils/hmac");
const { getRandomInt } = require("../utils/random");

class FairRandom {
    constructor() {
        this.key = null;
        this.mortyValue = null;
        this.hmac = null;
    }

    commit(numBoxes) {
        if (!numBoxes || numBoxes < 1) {
            throw new Error("numBoxes must be a positive integer");
        }

        this.key = generateKey();
        this.mortyValue = getRandomInt(0, numBoxes - 1);
        this.hmac = generateHmac(this.key, this.mortyValue.toString());

        return this.hmac;
    }

    reveal() {
        return {
            mortyValue: this.mortyValue,
            key: this.key,
            hmac: this.hmac
        };
    }
}

module.exports = FairRandom;