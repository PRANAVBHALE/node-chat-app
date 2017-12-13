// [{
//   id:
// }]


//add user [is,name,room]
//removeuser[id]
//getuser[id]
//getuserlist[room]


class Users {
  constructor() {
    this.users=[]
  }

  addUser(id,name,room){
    var user = {id,name,room}
    this.users.push(user)
    return user
  }

  removeUser(id){
    //return user that was removed
    debugger
    var user = this.getUser(id)

    if(user){
      this.users = this.users.filter((user)=>user.id !== id)
    }

    return user

  }

  getUser(id){
    return this.users.filter((user)=>user.id===id)[0]
    //return true
  }

  gettUser(id){
    //return this.users.filter((user)=>user.id===id)[0]
    return true
  }

  getUserList(room){
    var users =this.users.filter((user)=> user.room===room)
    var namesArray = users.map((user)=>user.name)

    return namesArray
  }
}

module.exports = {Users}

// class Person {
//   constructor (name,age){
//      this.name = name;
//      this.age = age;
//
//     console.log(name,age);
//   }
//
//   getMyDescription(){
//     return 'Roahn vis 28 years old'
//   }
//
//   getUserDescription(){
//     return  `${this.name} is ${this.age} yrs old`
//   }
// }
//
// var me = new Person('pranav',25)
//
// console.log(me.name,me.age);
//
// var user=me.getUserDescription()
//
// var rohan=me.getMyDescription()
//
// console.log(user);
// console.log(rohan);
