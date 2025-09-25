const fs = require('fs')
const path = require('path')
const folder = 'C:/Users/domas/OneDrive/Desktop/task2files'
const files = fs.readdirSync(folder)

const crypto = require('crypto')
const hashes = files.map(file => {
  const data = fs.readFileSync(path.join(folder, file))
  return crypto.createHash('sha3-256').update(data).digest('hex')
})

function sortKey(hex) {
  let prod = 1;
  for (let i = 0; i < hex.length; i++) {
    prod *= parseInt(hex[i], 16) + 1;
  }
  return prod;
}
const sorted = hashes.sort((a, b) => sortKey(a) - sortKey(b));

const email = 'domas0319@gmail.com'
const finalString = sorted.join('') + email.toLocaleLowerCase()

const finalHash = crypto.createHash('sha3-256').update(finalString).digest('hex')
console.log(finalHash)

