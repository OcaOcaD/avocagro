import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../Core/Layout'
import axios from 'axios';
import { isAuth, getCookie, signOut, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Admin = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        let base_url = (process.env.REACT_APP_NODE_ENV === 'development') ? process.env.REACT_APP_LOCAL_API : process.env.REACT_APP_API
        let config = {
            validateStatus: function (status) {
              return status < 500; // Resolve only if the status code is less than 500
            },
            url: `${base_url}/user/${isAuth()._id}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios(config)
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE', response);
                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { role, name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        let base_url = (process.env.REACT_APP_NODE_ENV === 'development') ? process.env.REACT_APP_LOCAL_API : process.env.REACT_APP_API
        axios({
            method: 'PUT',
            url: `${base_url}/admin/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Profile updated successfully');
                });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input defaultValue={role} type="text" className="form-control" disabled />
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input defaultValue={email} type="email" className="form-control" disabled />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="pt-5 text-center">Admin</h1>
                <p className="lead text-center">Profile update</p>
                {updateForm()}
            </div>
        </Layout>
    );
};

export default Admin;