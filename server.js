const express = require('express');
const sqlite3 = require('sqlite3').verbose();

///////////////////////////////////////////////////////////////////////////////
// database
///////////////////////////////////////////////////////////////////////////////

const db = new sqlite3.Database('logs.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to logs.db");
});
db.run("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY, timestamp DATETIME NOT NULL, category TEXT, message TEXT)");

///////////////////////////////////////////////////////////////////////////////
// web server
///////////////////////////////////////////////////////////////////////////////

const app = express();
app.use(express.json({limit: '50mb'}));

// map client files to public directory
app.use(express.static('public'));

// REST Services
app.post('/log', (req, res) => {
    console.log(req.body);
    const log = req.body; 

    const message = log.message ? log.message.slice(-1024*100) : "";

    db.run("INSERT INTO logs (timestamp, category, message) VALUES (?, ?, ?)", [log.timestamp, log.category, message], (err) => {
        if (err) {
            return res.status(500).json({error: "Failed to insert log:" + err.message});
        }
        return res.status(200).json({success: true});
    });

})
app.get('/log', (req, res) => {
    const {date, category, message} = req.query;

    console.log("req.query.date:" + date);

    let sql = 'SELECT * FROM logs';
    let params = [];
    let first = true;
    if (date || message || category) {
        sql += ' WHERE';
        if (category) {
            sql += ' category = ?';
            params.push(`${category}`);
            first = false;
        }
        if (date) {
            if (!first) sql += ' AND';
            sql += " date(timestamp) = ?";
            params.push(`${date}`);
            first = false;
        }
        if (message) {
            if (!first) sql += ' AND';
            sql += ' message LIKE ?';
            params.push(`%${message}%`);
            first = false;
        }
    }
    db.all(sql, params, (err, rows) => {
        console.log(sql);
        console.log(params);
        if (err) {
            return res.status(500).json({error: 'Failed to query log:' + err.message});
        }
        return res.status(200).json({logs: rows});
    });
});


app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});