const express = require('express')
const router = express.Router()
const { register, login, findUser ,logout } = require('../controllers/authController')
const authenticator = require("../middleware/authenticator")

router.post('/register', register)
router.post('/login', login)
router.get('/find', authenticator, findUser)
router.delete('/logout', authenticator, logout)

module.exports = router
