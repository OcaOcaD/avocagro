import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import Private from './Private'
import Admin from './Admin'
import Signup from '../auth/Signup'
import Signin from '../auth/Signin'
import PrivateRoute from '../auth/PrivateRoute'
import AdminRoute from '../auth/AdminRoute'
import Forgot from '../auth/Forgot'
import Reset from '../auth/Reset'
import Activate from '../auth/Activate'
// Calcultor
import Calculator from '../Avocagro/Calculator/Calculator'
import UgasMap from '../Avocagro/UgasMap/UgasMap'
import NewSpace from '../Avocagro/NewSpace/NewSpace'
import Land from '../Avocagro/Land/Land'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Land} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute path="/private" exact component={Private} />
                <AdminRoute path="/admin" exact component={Admin} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <Route path="/auth/password/forgot" exact component={Forgot} />
                <Route path="/auth/password/reset/:token" exact component={Reset} />
                //Avocagro
                <Route path="/newSpace" exact component={NewSpace} />
                <Route path="/calculator" exact component={Calculator} />
                //Map test
                <Route path="/map" exact component={UgasMap} />
                <Route path="/demo" component={UgasMap} />
                <Route path="/land" component={Land} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
