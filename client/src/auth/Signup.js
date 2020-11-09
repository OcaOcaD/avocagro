import React, { Fragment } from 'react'
import Layout from '../Core/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import SignupForm from '../components/Form/Form'
const Signup = () => {
    return(
        <Fragment>
            <Layout />
            <ToastContainer />
            <h1>Sign up </h1>
            <SignupForm ></SignupForm>
        </Fragment>
    )
}
export default Signup