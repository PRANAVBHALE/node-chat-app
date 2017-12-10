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
  li.text(`${chat.from}:  ${chat.text}`)


  jQuery('#messages').append(li)
})

socket.on('newLocationMessage',function(chat){
    var li = jQuery('<li></li>')
    var a = jQuery('<a target=_blank>My current location</a>')

    li.text(`${chat.from}: `)
    a.attr('href',chat.url)
    li.append(a)
    jQuery('#messages').append(li)

})

// socket.emit('createChat',{
//   from:'pranav',
//   text:'hello'
// },function (data) {
//   console.log('Got it',data);
// })


jQuery('#message-form').on('submit',function(e){
  e.preventDefault()

  socket.emit('createChat',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){

  })
})

var locationButton = jQuery('#send-location')
locationButton.on('click',function(){

  if(!navigator.geolocation){
    return alert('Geolocation not supported by browser')
  }

  navigator.geolocation.getCurrentPosition(function(position){
  //  console.log(position);
//  debugger
  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude

  })
  },function(){
    alert('unable to fetch location')
  })
})
