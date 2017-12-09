var expect = require('expect');

var {generateMessage} = require('./message')

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
