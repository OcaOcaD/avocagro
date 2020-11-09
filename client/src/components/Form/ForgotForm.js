import React, { Fragment } from 'react'
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom'
import { authenticate, isAuth } from '../../auth/helpers'
import { ToastContainer, toast } from 'react-toastify';
require('dotenv').config();

class ForgotForm extends React.Component {
    constructor(props) {
        super(props);
        const { history } = this.props;
        this.state = {
            email: 'alokacstu@gmail.com',
            btnTxt: 'Get a reset password link'
        }; 
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleChange = input =>  event => {
        //
        this.setState( { ...this.state, [input]:event.target.value } )
    }
  
    handleSubmit(event) {
        //
        event.preventDefault();
        this.setState({ ...this.state, "btnTxt":"Submitting" })
        let email = this.state.email
        let password = this.state.password
        console.log("Sending reset request")
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: { email }   
        })
            .then( response => {
                console.log("FORGOT PASSSWORD SUCCESS:", response)
                toast.success( response.data.message )
                this.setState( { ...this.state, btnTxt:"Requested" } )
                // save the response ( user, token ) in localStorage / cookie
            } )
            .catch( err => {
                toast.error(err.response.data.error)
                this.setState( { ...this.state, btnTxt:"Get a reset password link" } )
            } )
    }
    render() {
    const { history } = this.props;
      return (
          <Fragment>
            <ToastContainer/>
            <h3>Please enter your email here</h3>
            <form onSubmit={this.handleSubmit}>
                {isAuth() ? <Redirect to="/" /> : null} 
                <div className="form-group">
                    <label className="">Email</label>
                    <input className="form-control"
                    onChange={this.handleChange('email')}
                    value={this.state.email}
                    type="email" />
                </div>
                <input className="btn btn-primary"
                type="submit"
                value={this.state.btnTxt} />
            </form>
          </Fragment>
      );
    }
  }

export default withRouter( ForgotForm )