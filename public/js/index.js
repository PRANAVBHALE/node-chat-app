var socket = io()

socket.on('connect', function (){
  console.log('Connected');

  // socket.emit('createEmail',{
  //   sendTo:'rohan24@gmail.com',
  //   text:'what are u doing'
  // });

  // socket.emit('createChat',{
  //   from:'pranav',
  //   text:'gaming'
  // })
});


socket.on('disconnect',function(){
  console.log('DisConnected from sever');
})

// socket.on('newEmail',function(email){
//   debugger
//   console.log('get new email',email);
// })

socket.on('newChat',function(chat){
  console.log('new chat',chat);
})
