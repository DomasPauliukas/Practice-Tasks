console.log("hmac.js loaded")

const crypto = require('crypto');

function generateKey() {
    return crypto.randomBytes(32).toString("hex")
}
function generateHmac(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
}

const key = generateKey();
const message =  "test message";
const hmac = generateHmac(key, message);

console.log("Key:", key);
console.log("Message:", message);
console.log("HMAC:", hmac);

module.exports = { generateKey, generateHmac };