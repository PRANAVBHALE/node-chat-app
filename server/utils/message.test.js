var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message')

describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
  //  var res = res,
    var from = 'pranav';
    var    text = 'hello';
  //      createdAt = 123
      var  message=generateMessage(from,text);

      expect(typeof message.createdAt).toEqual('number');
      expect(message).toMatchObject({from,text});
    //  expect(message.text).toBe(text);

    })
})

describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
  //  var res = res,
   var from = 'pranav';
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1';
    var message=generateLocationMessage(from,latitude,longitude)

      expect(typeof message.createdAt).toEqual('number');
      expect(message).toMatchObject({from,url});
    //  expect(message.text).toBe(text);

    })
})
