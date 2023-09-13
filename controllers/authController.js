const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const secretKey = crypto.randomBytes(64).toString('hex')
const Token = require("../Models/TokenModel")

async function register(req, res) {
  try {
    const { username, password } = req.body
    // password processing done within User Model
    const user = new User({ username, password })
    await user.save()
    res.sendStatus(201)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) return res.status(401).send('Invalid username or password.')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).send('Invalid username or password.')

    const token = jwt.sign({ _id: user._id }, secretKey)
    const newToken = await new Token(
      {
        username: username, 
        token: token, 
        date_created: Date.now()
      }
    );
    newToken.save()
    res.status(201).json({
      "success": true,
      "response": newToken.token
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports = { register, login }
