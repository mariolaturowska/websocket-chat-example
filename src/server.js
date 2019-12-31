const io = require('socket.io')();

io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });

    client.on('addMessage', (message) =>{
       console.log('client added message ', message);
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

