const User = require('../models/user')

exports.read = ( req, res ) => {
    const userId = req.params.id //data grabbed from the route
    console.log("Jelou:", {userId})
    User.findById( userId ).exec( (err, user ) => {
        if( err || !user ) {
            console.log("HMMMM NO")
            return res.status(400).json({
                error: 'User not found'+err
            })
        }
        console.log("HMMMM sí", user)
        res.status(200).json( user )
    } )
}
exports.update = ( req, res ) => {
    //
    console.log("update user:", req.user)
    console.log("update body:", req.body)
    const { name, password } = req.body
    User.findById(  req.user._id ).exec( (err, user ) => {
        if( err || !user ) {
            console.log("HMMMM NO")
            return res.status(400).json({
                error: 'User not found'+err
            })
        }
        if( !name ){
            return res.status(400).json({
                error: "Name is required"
            })
        }else{
            user.name = name
        }
        if( password && password != '' ){
            if( password.length < 6 ){
                return res.status(400).json({
                    error: "Password must be at least 6 characters long."
                })
            }else{
                user.password = req.body.password
            }
        }
        // Data ok
        user.save( (err, updatedUser) => {
            if( err ){
                console.log("ERROR UPDATING", err)
                return res.status(400).json({
                    error: "User update failed"
                })
            }
            updatedUser.hashed_password = undefined
            updatedUser.salt = undefined
            // res.json( updatedUser )
            return res.status(200).json( updatedUser )
        } )
    } )
}