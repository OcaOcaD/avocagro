const express = require('express')
const router = express.Router()
// Import controller
const {signup, accountActivation, signin, forgotPassword, resetPassword, googleLogin } = require('../controllers/auth')


// Import validators
const { userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth')
const { runValidation } = require('../validators/index')


router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/account-activation', accountActivation)
router.post('/signin', userSigninValidator, runValidation, signin)
// Forgotten pass
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword)
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword)
// API logins
router.post('/google-login', googleLogin)

module.exports = router // {}

