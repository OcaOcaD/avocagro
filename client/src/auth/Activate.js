import React, { useState, useEffect } from 'react';
import Layout from '../Core/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({ match }) => {
    
    const [values, setValues] = useState({
        name: '',
        token: 'd',
    });

    useEffect(() => {
        console.log("match:", match)
        let t = match.params.token;
        console.log("Token:", t)
        if (t) {
            let tokenInfo = jwt.decode(t);
            console.log("Token info:", tokenInfo)
            let tname = tokenInfo.name
            let temail = tokenInfo.email
            let tpass = tokenInfo.password
            console.log("t:", tname, temail, tpass)
            setValues({
                ...setValues,
                token: t
                // [password]:tpass
            });
        }
    }, []);

    const { name, token } = values;

    const clickSubmit = event => {
        event.preventDefault();
        console.log("token in about axios:", token)
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {"token": values.token}
        })
            .then(response => {
                console.log('ACCOUNT ACTIVATION', response);
                setValues({ ...values, show: false });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
                toast.error(error.response.data.error);
            });
    };

    const activationLink = () => (
        <div className="text-center">
            <p>f</p>
            <p>f</p>
            <p>f</p>
            <p>f</p>
            <p>f</p>
            {JSON.stringify(token)}
            <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>
                Activate Account
            </button>
        </div>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {activationLink()}
            </div>
        </Layout>
    );
};

export default Activate;