const http = require('http')
const url = require('url')

function gcd(a, b) {
    return b === 0n ? a : gcd(b, a % b)
}

function lcm(a, b) {
    if (a === 0n || b === 0n) return 0n
    return (a * b) / gcd(a, b)
}

const email = "domas0319_gmail_com"
const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true)
    if (q.pathname === '/' + email) {
        try {
            const {x, y} = q.query
            if (!x || !y) {
                res.end('NaN')
                return
            }
            const a = BigInt(x)
            const b = BigInt(y)
            if (x >= 0n && y >= 0n) {
                res.end(String(lcm(x, y)))
            } else {
                res.end('NaN')
            }
        } catch {
            res.end('NaN')
        }
    } else {
        res.end('Invalid endpoint')
    }
})
server.listen(3000, () => {
    console.log('Server is listening on port 3000')
})