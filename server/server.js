const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
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
  debugger
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

  socket.emit('newChat',{
    from:'rohan',
    text:'wassup',
    date:new Date()
  })

  socket.on('createChat',function (newchat) {

    console.log('new chat added',newchat);

  })

  socket.on('disconnect',(server)=>{
    console.log('Connection loged off');
  })
})

server.listen(port,()=>{
  console.log(`server is avaliavle on ${port}`);
})
