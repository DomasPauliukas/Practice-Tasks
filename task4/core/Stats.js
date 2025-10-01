class Stats {
    constructor(numBoxes) {
        this.rounds = 0;
        this.winsStay = 0;
        this.winsSwitch = 0;
        this.stays = 0;
        this.switches = 0;
        this.numBoxes = numBoxes;
    }

    recordRound(win, switched) {
        this.rounds++;
        if (switched) {
            this.switches++;
            if (win) this.winsSwitch++;
        } else {
            this.stays++;
            if (win) this.winsStay++;
        }
    }

    getStats() {
        return {
            rounds: this.rounds,
            winsStay: this.winsStay,
            winsSwitch: this.winsSwitch,
            stays: this.stays,
            switches: this.switches
        };
    }
}

module.exports = Stats;