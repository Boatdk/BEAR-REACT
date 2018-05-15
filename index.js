const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

let bears = [{ id: 1, name: 'Pooh', weight: 223},{ id: 2, name: 'Winnie', weight: 223}]

app.use(express.static('test\\public'))
app.use(cors(),bodyParser.urlencoded({extended: false}), router)
 
router.route('/bears')
    .get((req,res) => {
        res.send(bears)
    })

    .post((req,res) =>{
        let bear ={};
        bear.id = bears.length+1
        console.log('body.name', req.body)
        bear.name = req.body.name
        bear.weight = req.body.weight
        bears.push(bear)
        res.send(bears)
        //res.json(bears)
    })

router.route('/bear/:id')
    .get((req,res) => { 
        res.send(bears[req.params.id])
    } ) 

    .put ((req,res) => {
        const id = req.params.id        
        bears[id].name = req.body.name;  // update the bears info
        bears[id].weight = req.body.weight;  // update the bears info
        res.json({ message: 'Bear updated!' });        
     })

    .delete ((req,res) => {
        const id = req.params.id
        console.log('id',id)
        delete  bears[id]
        res.json({ message: 'Bear deleted!' });        
    })

// post man + URL encode (Data not enter...)
// app.use('/api', bodyParser.urlencoded({ extended: false }), router);   
app.use('/api', bodyParser.json(), router);  // for axios 

app.listen(8888)