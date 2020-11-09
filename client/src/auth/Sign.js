import React, { useState } from 'react'
import Layout from '../Core/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import SignupForm from '../components/Form/Form'
const Signup = (  ) => {
    return(
        <Layout>
            <ToastContainer />
            <h1>SignupForm</h1>
        </Layout>
    )
}
export default Signup