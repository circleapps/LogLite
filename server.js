const express = require('express');
const sqlite3 = require('sqlite3').verbose();

///////////////////////////////////////////////////////////////////////////////
// database
///////////////////////////////////////////////////////////////////////////////

const db = new sqlite3.Database('logs.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to log.db");
});
db.run("CREATE TABLE IF NOT EXISTS log (id INTEGER PRIMARY KEY, timestamp DATETIME NOT NULL, cat TEXT, msg TEXT)");

///////////////////////////////////////////////////////////////////////////////
// web server
///////////////////////////////////////////////////////////////////////////////

const app = express();
app.use(express.json());

// map client files to public directory
app.use(express.static('public'));

// REST Services
app.post('/log', (req, res) => {
    const timestamp = new Date().toISOString();
    console.log(req.body);
    //const log = JSON.parse(req.body);
    const log = req.body;

    db.run("INSERT INTO log (timestamp, cat, msg) VALUES (?, ?, ?)", [timestamp, log.cat, log.msg], (err) => {
        if (err) {
            return res.status(500).json({error: "Failed to insert log:" + err.message});
        }
        return res.status(200).json({success: true});
    });

})
app.get('/log', (req, res) => {
    const {date, cat, msg} = req.query;

    console.log("req.query.date:" + date);

    let sql = 'SELECT * FROM log';
    let params = [];
    let first = true;
    if (date || msg || cat) {
        sql += ' WHERE';
        if (cat) {
            sql += ' cat = ?';
            params.push(`${cat}`);
            first = false;
        }
        if (date) {
            if (!first) sql += ' AND';
            sql += " date(timestamp) = ?";
            params.push(`${date}`);
            first = false;
        }
        if (msg) {
            if (!first) sql += ' AND';
            sql += ' msg LIKE ?';
            params.push(`%${msg}%`);
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