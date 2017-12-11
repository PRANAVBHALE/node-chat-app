var socket = io()

function scrollToBottom() {
  //selectors
  var messages=jQuery('#messages')
  var newMessage = messages.children('li:last-child')
  //heights
  var clientHeight=messages.prop('clientHeight')
  var scrollTop=messages.prop('scrollTop')
  var scrollHeight=messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()


  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight>=scrollHeight) {
    //console.log('should scroll');
    messages.scrollTop(scrollHeight)
  }
}

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
//  console.log('new chat',chat);
var formatedTime=moment(chat.createdAt).format('h:mm a')

var template = jQuery('#message-template').html()

var html = Mustache.render(template,{
  text:chat.text,
  from:chat.from,
  createdAt:formatedTime
})

 jQuery('#messages').append(html)
 scrollToBottom()

//   var li = jQuery('<li></li>')
//   li.text(`${chat.from}  ${formatedTime}:  ${chat.text}`)
//
//
//   jQuery('#messages').append(li)
})

socket.on('newLocationMessage',function(chat){
  var formatedTime=moment(chat.createdAt).format('h:mm a')
    // var li = jQuery('<li></li>')
    // var a = jQuery('<a target=_blank>My current location</a>')
    var template=jQuery('#location-message-template').html()

    // li.text(`${chat.from}  ${formatedTime}: `)
    // a.attr('href',chat.url)
    // li.append(a)
    var html = Mustache.render(template,{
      from:chat.from,
      url:chat.url,
      createdAt:formatedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom()

})

// socket.emit('createChat',{
//   from:'pranav',
//   text:'hello'
// },function (data) {
//   console.log('Got it',data);
// })
var messsageTextBox=  jQuery('[name=message]')

jQuery('#message-form').on('submit',function(e){
  e.preventDefault()

  socket.emit('createChat',{
    from:'User',
    text:messsageTextBox.val()
  },function(){
    messsageTextBox.val('')
  })
})

var locationButton = jQuery('#send-location')


locationButton.on('click',function(){

  locationButton.attr('disabled','disabled').text('Sending Location....')

  if(!navigator.geolocation){
    return alert('Geolocation not supported by browser')
  }

  navigator.geolocation.getCurrentPosition(function(position){
  //  console.log(position);
//  debugger
  locationButton.removeAttr('disabled').text('Send Location')
  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude

  })
  },function(){
    locationButton.removeAttr('disabled').text('Send Location')

    alert('unable to fetch location')
  })
})
