import React, { Fragment } from 'react'
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom'
import { authenticate, isAuth, getCookie, signOut, updateUser } from '../../auth/helpers'
import { ToastContainer, toast } from 'react-toastify';
require('dotenv').config();

class UpdateForm extends React.Component {
    constructor(props) {
        super(props);
        const { history } = this.props;
        this.token = getCookie('token')
        this.state = {
            role: '',
            name: '',
            email: '',
            password: '',
            btnTxt: 'Submit'
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.loadProfile = this.loadProfile.bind(this)
    }

    componentDidMount() {
        this.loadProfile()
    }
    componentDidUpdate() {
        // this.loadProfile()
    }

    loadProfile = () =>{
        console.log("user_id:", isAuth()._id)
        console.log("Token", this.token)
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
            .then( response => {
                console.log("Axios IN SUCCESS:", response)
                const { role, name, email } = response.data
                console.log("BACKEND DATA:", role)
                this.setState( {...this.state, role, name, email } )
                console.log("STATE:", this.state.role)
            } )
            .catch( err => {
                console.log("ERROR GETTING USER INFO")
                console.log(err.response)
                if( err.response.status === 401 ){
                    console.log("ERROR")
                    signOut(() => {
                        console.log("Expired")
                        this.history.push('/')
                    })
                }
            } )
    }

    handleChange = input =>  event => {
        //
        this.setState( { ...this.state, [input]:event.target.value } )
    }
  
    handleSubmit(event) {
        //
        event.preventDefault();
        this.setState({ ...this.state, "btnTxt":"Submitting" })
        let name = this.state.name
        let email = this.state.email
        let password = this.state.password
        // Update the profile
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update/${isAuth()._id}`,
            data:{name, password},
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
            .then( response => {
                console.log("PRIVATE PROFILE UPDATE SUCCESS:", response)
                console.log("Response", response )
                updateUser( response, ()=>{
                    toast.success('Profile updated succesfully')
                } )
                // this.setState( {...this.state, role, name, Emailail } )
                // console.log("STATE:", this.state.role)
            } )
            .catch( err => {
                console.log("ERROR WHILE UPDATING PROFILE")
                this.setState({ ...this.state, "btnTxt": "Submit" })
                console.log(err.response)
                toast.error(err.response.data.error)
            } )

        
    }
    render() {
    const { history } = this.props;
      return (
          <Fragment>
            <ToastContainer/>
            <form className="container" onSubmit={this.handleSubmit}>
                {/* {isAuth() ? <Redirect to="/" /> : null}  */}
                <div className="form-group"> 
                    <label className="">Role</label>
                    <input className="form-control"
                    onChange={this.handleChange('role')}
                    defaultValue={this.state.role}
                    type="text" 
                    disabled
                    value={this.state.role} />
                </div>
                <div className="form-group">
                    <label className="">Name</label>
                    <input className="form-control"
                    onChange={this.handleChange('name')}
                    value={this.state.name} />
                </div>
                <div className="form-group">
                    <label className="">Email</label>
                    <input className="form-control"
                    onChange={this.handleChange('email')}
                    value={this.state.email}
                    disabled
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
          </Fragment>
      );
    }
  }

export default withRouter( UpdateForm )