const crypto = require('crypto');

function getRandomInt(min, max) {
    return crypto.randomInt(min, max + 1);
}

module.exports = { getRandomInt };