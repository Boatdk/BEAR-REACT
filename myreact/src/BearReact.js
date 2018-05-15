import React, { Component } from 'react';
import axios from 'axios'; 

const URL = 'http://localhost:8888/api/';

class Bear extends Component {
    constructor(props){
        super(props)
          this.state = {
            bears: [], 
            id: 0, name: 'Foo', weight: 100,
            newId: 0, newName: '', newWeight: 0,
        } 
    }

    componentDidMount() {
        this.getAllBears() 
    }
    
    getAllBears() {
        axios.get(`${URL}/bears`)
            .then(res => {
                    this.setState({bears: res.data})
                    console.log(res.data)
                }
            )
            .catch( (error) => { console.log(error); })
    }

    renderBears() {
        return this.state.bears.map( (bear,index) => {
            if (bear !== null )
                return (                
                        <li  key={bear.id}>
                            {bear.id}. {bear.name}, {bear.weight} {index} &nbsp;&nbsp;
                            <button onClick={() => this.getBear(index)}>Get</button>  &nbsp;
                            <button onClick={() => this.deleteBear(index)}>Delete</button>
                        </li>
                )
            return ('')
        })
    }

    deleteBear(id) {       
        axios.delete(`${URL}/bear/${id}`)
            .then( (res) => {
                console.log('Delete:' + res)
                this.getAllBears()  // Get all bear
            })
    }

    addBear = (e) => {
            e.preventDefault() 
            axios.post(`${URL}/bears`,   {                
                name: this.state.name,
                weight: this.state.weight            
            })
                .then( (res) => {
                console.log('Create a new bear: ' + res);
                this.getAllBears()  // Get all bear
            })
    }

    getBear(id) {        
        axios.get(`${URL}/bear/${id}`)
            .then( (res) => {
                const {name, weight} = res.data
                console.log( res.data)
                this.setState({ newId: id, newName: name ,  newWeight: weight})
                console.log(this.state)
            })
    }

    editBear = (e) => {      
        e.preventDefault()  
        axios.put(`${URL}/bear/${this.state.newId}`, {
                name: this.state.newName,
                weight: this.state.newWeight
                })
            .then( (response) => {
                console.log('Create a new bear: ' + response);
                this.getAllBears()  // Get all bear
            })            
    }    

    handleChange = (e) =>  {
        const {name, value} = e.target 
        this.setState({[name]:value})
    }

    render() {
        return (
            <div>
                <h2> Bear Profile</h2>
                <ul>
                    {this.renderBears()}
                </ul>

                <h2>Add Bear</h2>
                <form onSubmit={this.addBear}>
                <input type="text" name="name" 
                    value={this.state.name} 
                    onChange={this.handleChange} />
                <input type="number" name="weight"
                     value={this.state.weight} 
                     onChange={this.handleChange}/>
                <br/>   
                <button>Submit</button>
                </form>

                <br/>
                <h2>Edit Bear</h2>
                <form onSubmit={this.editBear}>
                <input type="text" name="newName" 
                    value={this.state.newName} 
                    onChange={this.handleChange} />
                <input type="number" name="newWeight"
                     value={this.state.newWeight} 
                     onChange={this.handleChange}/>
                <input type="hidden" name="newId"
                     value={this.state.newId}
                       onChange={this.handleChange} />                  
                <br/>   
                <button>Submit</button>
                </form>


            </div>
        );
    }

}

export default Bear;