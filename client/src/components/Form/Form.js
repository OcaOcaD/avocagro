import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom'
import { isAuth } from '../../auth/helpers'
require('dotenv').config();

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Donaldo 2',
            email: 'luisdonaldogarciacastro@gmail.com',
            password: 'admin123',
            btnTxt: 'Submit'
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleChange = input =>  event => {
        //update the state and the new input
        this.setState({ ...this.state, [input]:event.target.value })
    }
  
    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state);
        event.preventDefault();
        this.setState({ ...this.state, "btnTxt":"Submitting" })
        let name = this.state.name
        let email = this.state.email
        let password = this.state.password
        // url 
        let base_url = (process.env.REACT_APP_NODE_ENV === 'development') ? process.env.REACT_APP_LOCAL_API : process.env.REACT_APP_API
        axios({
            method: 'POST',
            url: `${base_url}/signup`,
            data: { name, email, password }
            
        })
            .then( response => {
                console.log("SIGNUP SUCCESS:", response)
                this.setState({ ...this.state, name: '', email: '', password: '', btnTxt: 'Submit' })
                console.log("response:", response)
                toast.success(response.data.message)
            } )
            .catch( err => {
                console.log("Response:", err.response.data)
                this.setState({ ...this.state, btnTxt: 'Submit' })
                toast.error(err.response.data.error)
            } )
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            {isAuth() ? <Redirect to="/" /> : null} 
            <div className="form-group">
                <label className="">Name</label>
                <input className="form-control" onChange={this.handleChange('name')} value={this.state.name} />
            </div>
            <div className="form-group">
                <label className="">Email</label>
                <input className="form-control" onChange={this.handleChange('email')} value={this.state.email} />
            </div>
            <div className="form-group">
                <label className="">Password</label>
                <input className="form-control" onChange={this.handleChange('password')} value={this.state.password} />
            </div>
            <input className="btn btn-primary" type="submit" value={this.state.btnTxt} />
        </form>
      );
    }
  }

export default NameForm