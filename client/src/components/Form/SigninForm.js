import React, { Fragment } from 'react'
import axios from 'axios';
import { Redirect, withRouter, Link } from 'react-router-dom'
import { authenticate, isAuth } from '../../auth/helpers'
import { ToastContainer, toast } from 'react-toastify';
import GoogleLogInBtn from '../../auth/GoogleLogInBtn'
require('dotenv').config();

class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'luisdonaldogarciacastro@gmail.com',
            password: 'admin123',
            btnTxt: 'Submit'
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.informParent = this.informParent.bind(this)
        console.log("prooooops:", this.props)
    }
  
    handleChange = input =>  event => {
        //
        this.setState( { ...this.state, [input]:event.target.value } )
    }

    informParent(response){
        console.log("satte", this.state)
        console.log("historyyy", this.history)
        authenticate( response, () => {
            ( isAuth() && isAuth().role === 'admin' ) ? this.props.history.push('admin') : this.props.history.push('/')
        } )
    }
  
    handleSubmit(event) {
        //
        event.preventDefault();
        this.setState({ ...this.state, "btnTxt":"Submitting" })
        let email = this.state.email
        let password = this.state.password
        let url = ( process.env.REACT_APP_NODE_ENV === "development" ) ? process.env.REACT_APP_LOCAL_API: process.env.REACT_APP_API
        url += "/signin"
        let config = {
            validateStatus: function (status) {
              return status < 500; // Resolve only if the status code is less than 500
            },
            url: url,
            data: { email, password },
            method: "post",
        };
        console.log("requesting to signin api:", url)
        axios(config)
            .then( response => {
                console.log("API did say something:", response)
                if( response.status === 401 ){
                    toast.error(response.data.error)
                }
                if( response.status === 200 ){
                    // console.log("go to:", this.props)
                    authenticate( response, () => {
                        ( isAuth() && isAuth().role === 'admin' ) ? this.props.history.push('admin') : this.props.history.push('/')
                    } )
                    ( isAuth() && isAuth().role === 'admin' ) ? this.props.history.push('admin') : this.props.history.push('/')
                
                }
            } )
            .catch( response => {
                console.log("ERROR ON POST say something:", response)
                // console.log("Response:", err.response.data)
                this.setState({ ...this.state, btnTxt: 'Submit' })
                // // toast.error(err.data.error)
                // toast.error(err.error)
            } )
    }
    render() {
    const { history } = this.props;
      return (
            <div className="container col-md-6">
                <ToastContainer/>
                <h3>Sign in with your apps</h3>
                {console.log("History in signinForm", this.history)}
                {console.log("History in signinForm", history)}
                <GoogleLogInBtn history={history} informParent={this.informParent}/>
                
                <form onSubmit={this.handleSubmit}>
                    {isAuth() ? <Redirect to="/" /> : console.log("nel")} 
                    <div className="form-group">
                        <label className="">Email</label>
                        <input className="form-control"
                        onChange={this.handleChange('email')}
                        value={this.state.email}
                        type="email" />
                    </div>
                    <div className="form-group">
                        <label className="">Password</label>
                        <input className="form-control"
                        onChange={this.handleChange('password')}
                        value={this.state.password} />
                    </div>
                    <input className="btn btn-primary"
                    type="submit"
                    value={this.state.btnTxt} />
                </form>
                <br/>
                <Link to="/auth/password/forgot" classname="">
                    Forgot password?
                </Link>
            </div>
      );
    }
  }

export default withRouter( SigninForm )