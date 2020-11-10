import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { authenticate, isAuth } from '../auth/helpers'

const GoogleLoginBtn = ( {history, informParent = f => f } ) => {
    
    const responseGoogle = (response) => {
      console.log(response);
      let base_url = (process.env.REACT_APP_NODE_ENV === 'development') ? process.env.REACT_APP_LOCAL_API : process.env.REACT_APP_API
      axios({
          method: 'POST',
          url: `${base_url}/google-login`,
          data: {idToken: response.tokenId}
      })
        .then( response => {
            console.log("google signin sucess,", response)
            console.log("google signin sucess 2", response.tokenId)
            // Inform parent
            // informParent( response )
            console.log("hisory new", history)
            authenticate( response, () => {
                ( isAuth() && isAuth().role === 'admin' ) ? history.push('admin') : history.push('/private')
            } )
        } )
        .catch( error => {
            console.log("google signin ERROR unu", error)
            // 
        } )
    }

    return(
        <div>
              <GoogleLogin
                // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button className="btn btn-danger btn-lg btn-block" onClick={renderProps.onClick} disabled={renderProps.disabled}>Log in with Google</button>
                )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
export default GoogleLoginBtn;