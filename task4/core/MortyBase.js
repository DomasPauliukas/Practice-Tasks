class MortyBase {
    constructor(random) {
        this.random = random
    }

    hideGun(numBoxes) {
        throw new Error("hideGun() not implemented");
    }

    chooseBoxes(numBoxes, rickChoice, gunBox) {
        throw new Error("chooseBoxes() not implemented");
    }

    probabilities(numBoxes) {
        throw new Error("probabilities() not implemented");
    }
}

module.exports = MortyBase;