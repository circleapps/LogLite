const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('logs.db');

db.run("CREATE TABLE IF NOT EXISTS logs (timestamp DATETIME, CAT TEXT, MSG TEXT)");

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            console.log("body:" + body);
        });
        req.on('end', () => {
            const log = JSON.parse(body);
            db.run("INSERT INTO logs (timestamp, cat, msg) VALUES (?, ?, ?)", [new Date().toISOString(), log.cat, log.msg], function(err) {
                if (err) {
                    res.writeHead(500);
                    res.end('Failed to insert log');
                    return;
                }
                res.writeHead(200);
                res.end('Log inserted successfully');
            });
        });
    } else if (req.method === 'GET' && req.url === '/search') {
        const query = new URL(req.url, `http://${req.headers.host}`).searchParams.get('q');
        console.log("Find msg like " + query)
        db.all("SELECT * FROM logs WHERE msg LIKE ? ORDER BY timestamp DESC", ['%' + query + '%'], (err, rows) => {
            if (err) {
                res.writeHead(500);
                res.end('Failed to search logs:' + err.message);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});