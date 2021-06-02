const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

//Starting Client Connection
io.on('connection', socket => {

    let name = socket.request._query['username'];
    
    //Welcome message to Current User
    socket.emit('welcome', "Welcome to FERRARA Chat :)");

    /*
        io.sockets.emit will send to all clients;
        socket.broadcast.emit  will send the message to all others
        clients except the connection that you just created
    */

    /*
       message sent to all except the current user when
       he connects       
    */
    socket.broadcast.emit('welcome_broadcast', ` ${name} has entered in chat :)`);

    //when the user logs out we send the message to all
    socket.on('disconnect', () => {

        const obj = {
            name: this.name,
            message: 'has left the chat'
        }
        //io.emit('leave', obj);
        io.emit('leave', `${name} has left the chat`);
    });
    
    socket.on('chatMsg', m => {
            io.emit('message', m);
    });

    
});

const PORT = 3050;

app.use(express.static('public'));

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});