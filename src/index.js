const path  = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/messages.js');

const app = express();

const server = http.createServer(app);

const io = socketio(server);

const port = process.env.PORT ||3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));



io.on('connection', (socket)=>{

  console.log('New WebSocket connection');

  // socket.emit('countUpdated', count);

  // socket.on('increment', ()=>{

  //    count++;

  //    io.emit('countUpdated', count);

  // });

  socket.on('join', ({username, room})=>{

    socket.join(room);

    socket.emit('message', generateMessage('Welcome'));

    socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`));



  });




  socket.on("sendMessage", (message)=>{

    io.to('room').emit('message', generateMessage(message));

  });


  socket.on("sendLocation", (location, callback)=>{

   io.emit('locationMessage', generateLocationMessage(`https://www.google.com/maps?q=${location.latitude}, ${location.longitude}`));

     // io.emit('message', `https://www.google.com/maps?q=${location.latitude}, ${location.longitude}`);
     
     

   });

  socket.on('disconnect', ()=>{

    io.emit('message', generateMessage('A user has left'));


  });



});


server.listen(port, ()=>{

 console.log(`Server is started on port ${port}`);

});


