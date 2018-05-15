//FrontEnd
import React, { Component } from 'react'; //import react ดึงข้อมูลของรีแอคมาใช้
import axios from 'axios';  //middleware

const URL = 'http://localhost:8888/api/';

class Curriculum extends Component { //Create Class Curriculum
    constructor(props){
        super(props)
          this.state = {
            curriculums: [],
            curriculum_id: 0, name: ' ',  //set id ,name ,base
            curriculum_newId: 0, newName: '',
        }
    }

    componentDidMount() { //Call value
        this.getAllCurriculums()
    }

    getAllCurriculums() {
        axios.get(`${URL}/curriculums`)
            .then(res => {
                    this.setState({curriculums: res.data})
                    console.log(res.data)
                }
            )
            .catch( (error) => { console.log(error); })
    }

    renderCurriculums() {
        return this.state.curriculums.map( (curriculum,index) => {
            if (curriculum !== null )
                return (
                    <p>
                        <li  key={curriculum.curriculum_id}>
                           <pre>{curriculum.name}     <button onClick={() => this.deleteCurriculum(index)}>Delete</button></pre>
                        </li>
                    </p>


                )
            return ('')
        })
    }

    deleteCurriculum(curriculum_id) {
        axios.delete(`${URL}/curriculum/${curriculum_id}`)
            .then( (res) => {
                console.log('Delete:' + res)
                this.getAllCurriculums()  // Get all curriculum
            })
    }

    addCurriculum = (e) => {
            e.preventDefault()
            axios.post(`${URL}/curriculums`,   {
                name: this.state.name,
            })
                .then( (res) => {
                console.log('Create a new curriculum: ' + res);
                this.getAllCurriculums()  // Get all curriculum
            })
    }

    getCurriculum(curriculum_id) {
        axios.get(`${URL}/curriculum/${curriculum_id}`)
            .then( (res) => {
                const {name} = res.data
                console.log( res.data)
                this.setState({ curriculum_newId: curriculum_id, newName: name })
                console.log(this.state)
            })
    }

    handleChange = (e) =>  {
        const {name, value} = e.target
        this.setState({[name]:value})
    }

    render() {
        return (
            <div>
                <h2> College of Computing</h2>
                <ol>
                    {this.renderCurriculums()}

                </ol>


                <h2>Add Curriculum</h2>
                <form onSubmit={this.addCurriculum}>
                <input type="text" name="name"
                    value={this.state.name}
                    onChange={this.handleChange} />
                    &nbsp;&nbsp;<button>Submit</button>

                </form>

                <br/>


            </div>
        );
    }

}

export default Curriculum;
