import React from 'react'
import Layout from '../Core/Layout'
import {Fragment} from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import SigninForm from '../components/Form/SigninForm'

const Signin = ( history ) => {
    return(
        <div>
            <Layout />
            <div className="container col-md-6 text-center">
                <h1>Sign in</h1>

                <h3>Or sign up with us</h3>
                <SigninForm > 
                    {JSON.stringify(history)}
                </SigninForm>
            </div>

        </div>
    )
}
export default Signin

