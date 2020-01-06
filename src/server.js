const io = require('socket.io')();

io.on('connection', (client) => {
    client.on("broadcast message", msg => {
        console.log('added new message ', msg);
        io.emit("chat message", msg);
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

