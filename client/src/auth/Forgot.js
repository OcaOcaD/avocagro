import React from 'react'
import Layout from '../Core/Layout'
import {Fragment} from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import ForgotForm from '../components/Form/ForgotForm'
const Forgot = ( history ) => {
    return(
        <Fragment >
            <Layout />
            <div className="container">
                <h1>Password reset</h1>
                
                <ForgotForm > 
                    {JSON.stringify(history)}
                </ForgotForm>
            </div>

        </Fragment>
    )
}
export default Forgot

