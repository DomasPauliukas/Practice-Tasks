const crypto = require('crypto');

function generateKey() {
    return crypto.randomBytes(32)
}
function generateHmac(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
}

module.exports = { generateKey, generateHmac };