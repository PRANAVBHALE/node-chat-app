const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message')
const publicPath  = path.join(__dirname,'../public')
var io =socketIO(server)


const port=process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)

var io =socketIO(server)

app.use(express.static(publicPath))



console.log(__dirname + '/../public');
console.log(publicPath);

// app.get('/index.html',(req,res)=>{
//   // res.render('about.hbs',{
//   //   pageTitle:'aboutpage',
//   // })
// })
io.on('connection',(socket)=>{
//  debugger
  console.log('New user connected');

  // socket.emit('newEmail',{
  //   from:'pranav25@gmail.com',
  //   text:'wassup bro',
  //   date:new Date()
  // });
  //
  // socket.on('createEmail',(newEmail)=>{
  //   console.log('create new email',newEmail);
  // })

  // socket.emit('newChat',{
  //   from:'rohan',
  //   text:'wassup',
  //   date:12211
  // })

  socket.emit('newChat',generateMessage('Admin','Welcome to the chat app'))

  socket.broadcast.emit('newChat',generateMessage('Admin','New user joined'))

  socket.on('createChat',(chat) =>{
    console.log('createChat',chat);
    io.emit('newChat',generateMessage(chat.from,chat.text))

    // socket.broadcast.emit('newChat',{
    //   from:chat.from,
    //   text:chat.text,
    //   createdAt:new Date().getTime()
    // })

  })

  socket.on('disconnect',()=>{
    console.log('Connection loged off');
  })
})

server.listen(port,(server)=>{
  console.log(`server is avaliavle on ${port}`);
})
