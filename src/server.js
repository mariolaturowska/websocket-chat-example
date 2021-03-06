const io = require('socket.io')();
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "mariola",
    password: "qaz123QAZ!@#",
    database: 'messages'
});

con.connect((err) => {

    if (err) throw err;
    console.log("Connected!");

    io.on('connection', (client) => {
        client.on("broadcast message", msg => {
            console.log('added new message ', msg);

            io.emit("chat message", msg);
            const sql = "INSERT INTO messages (authorName, authorSurname, text, time, color,canvasImage) VALUES ('" + msg.authorName + "','" + msg.authorSurname + "','" + msg.text + "','" + msg.time + "','" + msg.OneButtonColorArea + "','" + msg.canvasImage + "')";

            con.query(sql, (err, result) => {
                if (err) throw err;
                console.log("1 record inserted");
            });

        });

        client.on("message received", (msg) => {
            console.log("Message received : " + msg);
            client.broadcast.emit("add message", msg);
        });
    });

});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

