const http = require('http')
const url = require('url')

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b)
}

function lcm(a, b) {
    if (a === 0 || b === 0) return 0
    return (a * b) / gcd(a, b)
}

const email = "domas0319_gmail_com"
const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true)
    if (q.pathname === '/' + email) {
        const x = parseInt(q.query.x)
        const y = parseInt(q.query.y)
        if (x >= 0 && y >= 0) {
            res.end(String(lcm(x, y)))
        } else {
            res.end('NaN')
        }
    } else {
        res.end('Invalid endpoint')
    }
})
server.listen(3000, () => {
    console.log('Server is listening on port 3000')
})