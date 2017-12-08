const path = require('path');
const express = require('express');
const publicPath  = path.join(__dirname,'../public')


const port=process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath))



console.log(__dirname + '/../public');
console.log(publicPath);

// app.get('/index.html',(req,res)=>{
//   // res.render('about.hbs',{
//   //   pageTitle:'aboutpage',
//   // })
// })

app.listen(port,()=>{
  console.log(`server is avaliavle on ${port}`);
})
