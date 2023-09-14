const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/authController')
const authenticator = require("../middleware/authenticator")

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', authenticator, logout)

module.exports = router
