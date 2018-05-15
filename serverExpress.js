var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var cookieParser = require('cookie-parser')

app.use(express.static('public')); 
  
app.use(cookieParser('keyboard cat')) 
  
app.get('/ck_get', function(req, res) { 
   res.send(req.cookies) 
}) 
  
app.get('/ck_set', function(req, res) { 
   res.cookie('a', 10)
   res.cookie('name','Sutida Laebua') 
   res.send('ok') 
})


  
app.listen(8000);

