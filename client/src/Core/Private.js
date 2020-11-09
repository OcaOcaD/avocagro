import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'

// import Layout from '../Core/Layout'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.min.css'
import UpdateProfile from '../components/Form/UpdateForm'
import Layout from './Layout';


const Private = () => {
    return (
        <Fragment >
            <Layout />
                <div className="container text-center" >
                    <h1>PRIVATE</h1>
                    <h3>Update profile</h3>
                </div>
            <UpdateProfile/>
        </Fragment>
    );
}

export default withRouter(Private);