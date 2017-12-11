// var date = new Date()
// console.log(date.getMonth());

const moment = require('moment');
var date=moment()


createdAt = moment().valueOf()
console.log(createdAt);

// console.log(date.add(5,'days'));
// console.log(date.format('Do MMM YY hA'));

console.log(date.format('h:mm a'));
