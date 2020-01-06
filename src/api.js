import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function addMessage(cb){
    socket.on("chat message", msg => cb(null,msg));
}

function broadcastMessage(msg){
    socket.emit('broadcast message', msg);
}


export {addMessage,broadcastMessage}