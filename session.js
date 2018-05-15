var express = require('express');
var app = express();

app.use(express.static('public')); 

app.set('views', './views') 
app.set('view engine', 'ejs')

app.get('/',(req,res)=> {res.send('OK')}) 
  
app.get('/fruit', (req, res)=>{ 
   res.render('fruit', {
   	fruits: ['banana', 'apple']
   }) 
})

app.get('/foo', (req, res)=>{ 
   res.send(' foo bar') 
});

app.listen(8000);