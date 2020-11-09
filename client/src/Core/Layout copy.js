import React, {Fragment} from 'react'
// import Navbar  from '../components/Navbar/Navbar'
import {Link, withRouter} from 'react-router-dom'
import { isAuth, signOut } from '../auth/helpers'


const Layout = ( {children, history} ) => {
    // Set class for active and non active links
    const isActive = path => {
        return ( history.location.pathname === path ) ? 'nav-link active' : 'nav-link'
    }
    // Just print the sign in and sign up when not auth
    const notAuthOptions = () => {
        if( !isAuth() ){
            return (
                <Fragment>
                    <li className="nav-item">
                        <Link className={isActive( '/signup' )}
                            to="/signup"> Sign up </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={isActive( '/signin' )}
                            to="/signin"> Sign in  </Link>
                    </li>
                </Fragment>
            )
        }else{ return (
            <Fragment>
                <Link className="nav-link"
                to="/private">
                    { isAuth().name }
                </Link>
                <li className="nav-item">
                    <span className="nav-link"
                    onClick={ ()=> {
                        signOut( () => {
                            history.push('/')
                        } )
                    } }> Sign out  </span>
                </li>
            </Fragment>
            
        )}
    }
    //Navbar component
    const Navbar = () => {
        return (
            <ul className="nav nav-tabs bg-warning">
                <li className="nav-item">
                    <Link className={isActive( '/' )}
                        to="/"> Home
                    </Link>
                </li>
                { notAuthOptions() }    
            </ul>
        )
    }
    const hello = () => {
        return ( isAuth() ) ? `Hello ${isAuth().name}` : `Hello, bro! you should `
    }
    return (
        <Fragment>
            <Navbar props={ children } />
            <h1>{hello()}</h1>
        </Fragment>
    );
}

export default withRouter(Layout);