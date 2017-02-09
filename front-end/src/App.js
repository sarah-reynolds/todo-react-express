import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from '../node_modules/jquery/dist/jquery.min.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theClass: []
        }
        this.addStudent = this.addStudent.bind(this)
    }

    componentDidMount() {
        $.getJSON('http://localhost:3000/getStudents', (studentsFromAPI) =>{
            console.log(studentsFromAPI);
            this.setState({
                theClass: studentsFromAPI
            })
        });
    }

    addStudent(event){
        var self = this;
        var studentToAdd = event.target.parentNode.childNodes[0].value;
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/addStudent",
            data: { name: studentToAdd }
        })
        .done(( studentsArray )=> {
            self.setState({
                theClass: studentsArray
            })
        });
    }

	render() {

        var theClassArray = [];
        this.state.theClass.map((student, index)=>{
            return theClassArray.push(<li key={index} >{student.name}</li>)
        });
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
                <div className="add-box">
                    <input type="text" id="newStudent" />
                    <button onClick={this.addStudent}>Add student</button>
                </div>
				<p className="App-intro">
					{theClassArray}
				</p>
			</div>
		);
	}
}

export default App;
