const { check } = require('express-validator')

exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage("Name is requiered."),
    check("email")
        .isEmail()
        .withMessage("Must be a valid email address."),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
]

exports.userSigninValidator = [
    check("email")
        .isEmail()
        .withMessage("Must be a valid email address."),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
]

//Forgotten password
exports.forgotPasswordValidator = [
    check("email")
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Must be a valid email address."),
]

//Reser Password password
exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least  6 characters long')
];