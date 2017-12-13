const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users')
const publicPath  = path.join(__dirname,'../public')
var io =socketIO(server)

var users = new Users()


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


  socket.on('join',(params,callback)=>{
    debugger
    if (!isRealString(params.name) || !isRealString(params.room)) {
    return   callback('Name and room name are required')
    }

    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id,params.name,params.room)

    io.to(params.room).emit('updateUserList',users.getUserList(params.room))
    //socket.leave('gaming room') to leave room
    //io.emit => io.to('room' .emit()
    //socket.broadcast.emit = > socket.broadcast.to('room').emit()
    //socket.emit

    socket.emit('newChat',generateMessage('Admin','Welcome to the chat app'))

    socket.broadcast.to(params.room).emit('newChat',generateMessage('Admin',`${params.name} has joined`))

    callback()
  })


  socket.on('createChat',(chat,callback) =>{
//    console.log('createChat',chat);

    var user = users.getUser(socket.id)

    if(user && isRealString(chat.text)){
      io.to(user.room).emit('newChat',generateMessage(user.name,chat.text))

    }
    callback()
    // socket.broadcast.emit('newChat',{
    //   from:chat.from,
    //   text:chat.text,
    //   createdAt:new Date().getTime()
    // })

  })

  socket.on('createLocationMessage',(coords)=>{
  //  debugger

      var user = users.getUser(socket.id)
      if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude , coords.longitude))
      }
  })

  socket.on('disconnect',()=>{
    console.log('Connection loged off');

    debugger

    var user = users.removeUser(socket.id)

    if(user){
      debugger
      io.to(user.room).emit('updateUserList',users.getUserList(user.room))
      io.to(user.room).emit('newChat',generateMessage('Admin',`${user.name} has left`))

    }
  })
})

server.listen(port,(server)=>{
  console.log(`server is avaliavle on ${port}`);
})
