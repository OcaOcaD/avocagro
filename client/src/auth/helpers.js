import cookie from 'js-cookie'

// Set in cookie
export const setCookie = ( key, value ) => {
    if( window !== 'undefined' ){
        cookie.set( key, value, {
            expires: 1
        } )
    }
}
// Remove the cookie
export const removeCookie = ( key ) => {
    if( window !== 'undefined' ){
        cookie.remove( key, {
            expires: 1
        } )
    }
}
// Get from cookie such as stored token
export const getCookie = ( key ) => {
    if( window !== 'undefined' ){
        return cookie.get(key)
    }
}
//set in localStorage
    export const setLocalStorage = ( key, value ) => {
        if( window !== 'undefined' ){
            // Value must be json
            localStorage.setItem(key, JSON.stringify( value ))
        }
    }
//remove from localStorage
export const removeLocalStorage = ( key ) => {
    if( window !== 'undefined' ){
        // Value must be json
        localStorage.removeItem( key )
    }
}
/************** */
// To make request to server with token

// Authenticate user by passing dataa to cookie and localstorage during sign in
export const authenticate = ( response, next ) => {
    //Next is callback function
    console.log("AUTH HELPER ON SIGNIN RESPONSE", response)
    setCookie( 'token', response.data.token )
    setLocalStorage( 'user', response.data.user )
    next()
}
// Access user from localstorage
export const isAuth = () => {
    if( window !== 'undefined' ){
        const cookieChecked = getCookie('token')
        if( cookieChecked ){
            if( localStorage.getItem( 'user' ) ){
                return JSON.parse( localStorage.getItem('user') )
            }else{
                return false
            }
        }
    }
}
//
export const signOut = ( next ) => {
    removeCookie('token')
    removeLocalStorage('user')
    next()
}
// Middleware
export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};
