const express = require('express')
const app = express() 
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

let curriculums = [{ curriculum_id: 1, name: 'B.ENG (COMPUTER ENGINEERING)'},{ curriculum_id: 2, name: 'B.SC (INFORMATION TECHNOLOGY)'},
					{ curriculum_id: 3, name: 'B.SC (SOFTWARE ENGINEERING)'},{ curriculum_id: 4, name: 'B.SC (ELECTRONIC BUSINESS)'}]

app.use(express.static('test\\public'))
app.use(cors())
 
router.route('/curriculums')
	.get((req,res) => {
		res.send(curriculums)
	})

	.post((req,res) =>{
		let curriculum ={};
		curriculum.curriculum_id = curriculums.length + 1
		console.log('body.name', req.body)
		curriculum.name = req.body.name
		curriculums.push(curriculum)
		res.send(curriculums)
	})

router.route('/curriculum/:curriculum_id')
	.get((req,res) => { 
		res.send(curriculums[req.params.curriculum_id])
	} )	

	.put ((req,res) => {
		const curriculum_id = req.params.curriculum_id		
		curriculums[curriculum_id].name = req.body.name;  // update the curriculums info
        res.json({ message: 'Curriculum updated!' });        
     })

    .delete ((req,res) => {
		const curriculum_id = req.params.curriculum_id
		console.log('curriculum_id',curriculum_id)
		delete 	curriculums[curriculum_id]
      	res.json({ message: 'Curriculum deleted!' });        
    })

// post man + URL encode (Data not enter...)
// app.use('/api', bodyParser.urlencoded({ extended: false }), router);   
app.use('/api', bodyParser.json(), router);  // for axios 

app.listen(8888)