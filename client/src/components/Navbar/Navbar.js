import React, { Fragment } from 'react'
import {Link, withRouter, Redirect } from 'react-router-dom'
import { isAuth } from '../../auth/helpers'

const Navbar = () => {
    const notAuthOptions = () => {
        if( isAuth() !==  false ){
            <Fragment>
                <li className="nav-item">
                    <Link className="text-light nav-link"
                        to="/signup"> Sign up </Link>
                </li>
                <li className="nav-item">
                    <Link className="text-light nav-link"
                        to="/signin"> Sign in / {JSON.stringify(isAuth())} </Link>
                </li>
            </Fragment>
        }else{ null}
    }
    return (
        <ul className="nav nav-tabs bg-warning">
            <li className="nav-item">
                <Link className="text-light nav-link"
                    to="/"> Home </Link>
            </li>
            { notAuthOptions() }
        </ul>
    )
}

export default withRouter(Navbar);