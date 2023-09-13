const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticator')

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the protected route!', user: req.user })
})

module.exports = router
