const express = require('express')
const router = express.Router()
// Import controller
const { requireSignin, adminMiddleware } = require('../controllers/auth')
const { read, update } = require('../controllers/user')
 
router.get('/user/:id', requireSignin, read )
router.put('/user/update/:id', requireSignin, update )
router.put('/admin/update/:id', requireSignin, adminMiddleware, update )

module.exports = router // {}