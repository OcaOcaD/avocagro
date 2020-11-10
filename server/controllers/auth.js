//Send an email before saving data in DB
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const expressJwt = require('express-jwt')
const _ = require('lodash')
const { OAuth2Client } = require('google-auth-library')
sgMail.setApiKey( process.env.SENDGRID_API_KEY )

// exports.signup = ( req, res ) => {
//     // console.log("signing up:", req.body)
//     // Make sure user doesn't exist
//     const { name, email, password } = req.body

//     User.findOne({email: email}).exec( (err, user) => {
//         if( user ){
//             return res.status(400).json({error: "Email is taken."})
//         }
//     } )

//     let newUser = new User({ name, email, password })
//     console.log("name is:", name)
//     console.log("email is:", email)
//     console.log("password is:", password)
//     newUser.save( (err, success) => {
//         if( err ){
//             console.log("SIGNUP ERROR: ", err)
//             return res.status(400).json({ error: err })
//         }
//         res.json({
//             created: true,
//             user: newUser
//         })
//     } )
// }

exports.signup = ( req, res ) => {
    const {name, email, password} = req.body
    User.findOne({email: email}).exec( (err, user) => {
        if( user ){
            return res.status(400).json({error: "Email is taken."})
        }
        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '20m'})
        let url = ( process.env.NODE_ENV === "development" ) ? process.env.CLIENT_LOCAL_URL: process.env.CLIENT_URL
        //Now we sent to the users email
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Account activation link',
            html: `
                <p>Please use the following link to activate your account</p>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                `
        }
        sgMail.send( emailData )
            .then( sent => {
                console.log("SIGNUP EMAIL SENT", sent)
                return res.json({
                    message: `Email has been sent to ${email}. Oh right?`
                })
            } )
            .catch( e => console.log("Sent error:", e.response.body.errors) )
    } );
}

exports.accountActivation = ( req, res ) => {
    console.log("O get here:", req)
    const { token } = req.body
    if( token ){
        jwt.verify( token, process.env.JWT_ACCOUNT_ACTIVATION, function( err, decoded ) {
            if( err ){
                console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR:", err)
                return res.status(401).json({
                    error: 'Expired link. signup again'
                })
            }
            //Not error
            const { name, email, password } = jwt.decode( token )
            const user = new User( { name, email, password } )
            user.save( (err, user)=> {
                if( err ){
                    console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err)
                    return res.status(401).json({
                        error: 'Error saving user in database'
                    })
                }
                return res.status(400).json({
                    message: 'Signup success. Please sign in'
                })
            } )
        })
    }else{
        return res.status(401).json({
            error: 'No token. try again'
        })
    }   
} 


exports.signin = ( req, res ) => {
    const { email, password } = req.body
    //First check if the user alredy signup
    User.findOne( {email} ).exec( (err, user) => {
        if( err || !user ){
            return res.status(400).json({
                error: 'Email does not exist. Please sign up'
            })
        }
        //Authenticate then
        if( !user.authenticate( password ) ){
            return res.status(400).json({
                error: 'Email and password does not match'
            })
        }else{
            //Generate token and send to client
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn : '3h'})
            const { _id, name, email, role } = user
            // return res.status(200).json({
            //     message: "Sign-in success"
            // })
            return res.json({
                token,
                user: { _id, name, email, role }
            })
        }
    } )
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET  // req.user._id
})

exports.adminMiddleware = ( req, res, next ) => {
    User.findById( req.user._id ).exec( (err, user ) => {
        if( err || !user ){
            return res.status(400).json({
                error: 'User not found'
            })
        }
        if( user.role !== 'admin' ){
            return res.status(400).json({
                error: "Admin resource. Denied access"
            })
        }
        req.profile = user
        next()
    } )
}

exports.forgotPassword = ( req, res ) => {
    const { email } = req.body

    User.findOne({ email },( err, user ) => {
        if( err || !user ){
            return res.status(400).json({
                error: 'User email doesn \'t exist'
            })
        }
        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_RESET_PASSWORD, {expiresIn: '20m'})
        //Now we sent to the users email
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Password reset link',
            html: `
                <p>Please use the following link to reset your password</p>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                `
        }

        return user.updateOne({ resetPasswordLink: token }, ( err, success ) => {
            if( err ) {
                return res.status( 400 ).json({
                    error: 'Database connection error on user password from request'    
                })
            }else{
                sgMail.send( emailData )
                .then( sent => {
                    console.log("SIGNUP EMAIL SENT", sent)
                    return res.json({
                        message: `Email has been sent to ${email}. Oh right?`
                    })
                } )
                .catch( e => console.log("Sent error:", e.response.body.errors) )
            }
        })
    })
}

exports.resetPassword = ( req, res ) => {
    console.log("Resseting")
    const { resetPasswordLink, newPassword } = req.body
    console.log("newPass: ", newPassword)
    if( resetPasswordLink ){
        jwt.verify( resetPasswordLink, process.env.JWT_RESET_PASSWORD, function( err, decoded ){
            if( err ){
                return res.status(400).json({
                    error: 'Expired link. Try again'
                });
            }
            User.findOne({ resetPasswordLink }, ( err, user ) => {
                if( err ){
                    return res.status(400).json({
                        error: 'Something went wrong. Try later.'
                    });
                }
                const updateFields = { 
                    password: newPassword,
                    resetPasswordLink: ''
                }

                user = _.extend(user, updateFields) //Info stays. Just adds the new one ins econd aprameter
                user.save( (err, result)=> {
                    if( err ){
                        return res.status(400).json({
                               error: 'Error resetting password'
                        });
                    }
                    res.json({
                        message: `Great!, Password reset`
                    })
                } ) 
            })
        } )
    }
    return false
}
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID )
exports.googleLogin = ( req, res ) => {
    const { idToken } = req.body

    client.verifyIdToken( {idToken, audience: process.env.GOOGLE_CLIENT_ID} ).then( response => {
        console.log('Google login response o:',response)
        const {email_verified, name, email} = response.payload
        console.log("email:", email_verified)
        if( email_verified ){
            //Find user in database
            User.findOne({email}).exec((err,user) => {
                if( user ) {
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7h'});
                    const {_id, email, name, role} = user
                    return res.json({
                        token, user: {_id, email, name, role}
                    })
                }else {
                    console.log("user didn't exist")
                    let password = email + process.env.JWT_SECRET
                    user = new User({name, email, password})
                    user.save((error, data) => {
                        if( err ){
                            console.log("ERROR GOOGLE LOGIN USER SAVE", err)
                            return res.status(400).json({
                                "error": "User signup with Google failed"
                            })

                        }
                        //No error
                        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7h'});
                        const {_id, email, name, role} = data
                        console.log("created cx")
                        return res.json({
                            token, user: {_id, email, name, role}
                        })
                    })
                }
            })
        }else{
            // Email not verified
            return res.status(400).json({
                "error": "Google Log in failed. Email unverified. Try again"
            })
        }
    } )
}
