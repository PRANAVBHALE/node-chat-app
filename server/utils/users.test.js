const expect = require('expect');

const {Users} = require('./users')

describe('Users',()=>{
  var users

    beforeEach(()=>{
      users = new Users()

      users.users = [{
        id:1,
        name:'pranav',
        room:'gamers'
      },{
        id:2,
        name:'rohan',
        room:'gamers'
      },{
        id:3,
        name:'papa',
        room:'office'
      }]
    })


  it('should add new user',()=>{
    var users = new Users()
    var user = {
      id:'123',
      name:'pranav',
      room:'gamers'
    }

    var resUser = users.addUser(user.id,user.name,user.room)

    expect(users.users).toEqual([user])
  })

  it('should remove the user',()=>{
    var userId = 1;
    var user =  users.removeUser(userId);

    expect(user.id).toBe(userId)

    expect(users.users.length).toBe(2)
  })

  it('should not remove user',()=>{
    var userId = '99'
    var user = users.removeUser(userId)

    expect(user).toBeFalsy()

    expect(users.users.length).toBe(3)
  })

  it('should find user',()=>{
    var userId = 2
    var user = users.getUser(userId)
//    var user2 = users.gettUser(userId)


    expect(user.id).toBe(userId)
  //  expect(user2).toBe(userId)

  })

  it('should not find user',()=>{
    var userId = '99'

    var user = users.getUser(userId)

    expect(user).toBeFalsy();
  })

  it('should return names for gamers',()=>{
    var userList = users.getUserList('gamers')

    expect(userList).toEqual(['pranav','rohan'])
  })

  it('should return names for office',()=>{
    var userList = users.getUserList('office')

    expect(userList).toEqual(['papa'])
  })
})
