const mysql = require('mysql');
const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors());

const con = mysql.createConnection({
    host: "localhost",
    user: "mariola",
    password: "qaz123QAZ!@#",
    database: 'messages'
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    app.get('/messages', (req, res) => {
        const sql = "SELECT * FROM messages";
        const resultArray = [];
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200);
            res.setHeader('Content-type', 'application/json');
            result.forEach( (element) => {
                resultArray.push({...element,canvasImage: element.canvasImage.toString('ascii')});
            });
            return res.send(resultArray);
        });
    });

    app.listen(8080);
});