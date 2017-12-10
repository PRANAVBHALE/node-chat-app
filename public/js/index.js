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
  var li = jQuery('<li></li>')
  li.text(`${chat.from}: ${chat.text}`)


  jQuery('#chats').append(li)
})

// socket.emit('createChat',{
//   from:'pranav',
//   text:'hello'
// },function (data) {
//   console.log('Got it',data);
// })


jQuery('#chat-form').on('submit',function(e){
  e.preventDefault()

  socket.emit('createChat',{
    from:'User',
    text:jQuery('[name=chat]').val()
  },function(){

  })
})
