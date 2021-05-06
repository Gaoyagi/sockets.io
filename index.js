const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// landing page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//shows that the program launched
server.listen(3000, () => {
  console.log('listening on *:3000');
});

// event to show a user connection and disconnection
io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('chat message', 'user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
      io.emit('chat message', 'user disconnected');
    });
});

// logs the message the user typed to terminal  
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
});

// This will emit the event to all connected sockets
io.emit('some event', { 
    someProperty: 'some value', otherProperty: 'other value' 
}); 

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

// makes messages appear on the html
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});