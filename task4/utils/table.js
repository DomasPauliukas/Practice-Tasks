const Table = require("cli-table3");

function renderStats(stats, numBoxes) {
    const pStayExact = 1 / numBoxes;
    const pSwitchExact = (numBoxes - 1) / numBoxes;

    const pStayEstimate = stats.stays > 0 ? stats.winsStay / stats.stays : 0;
    const pSwitchEstimate = stats.switches > 0 ? stats.winsSwitch / stats.switches : 0;

    const table = new Table({
        head: ["Game results", "Rick switched", "Rick stayed"],
        colWidths: [15, 15, 15]
    });

    table.push(
        ["Rounds", stats.switches, stats.stays],
        ["Wins", stats.winsSwitch, stats.winsStay],
        ["P (estimate)", pSwitchEstimate.toFixed(3), pStayEstimate.toFixed(3)],
        ["P (exact)", pSwitchExact.toFixed(3), pStayExact.toFixed(3)]
    );

    console.log(table.toString());
}

module.exports = { renderStats };