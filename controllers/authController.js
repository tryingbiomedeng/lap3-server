const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const secretKey = crypto.randomBytes(64).toString('hex')
const Token = require("../Models/TokenModel")
const { error } = require('console')

async function register(req, res) {
  try {
    const { username, password } = req.body
    // password processing done within User Model
    const user = new User({ username, password })
    const response = await user.save()
    res.status(201).json({
      success: true,
      response: response
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: err
    })
  } 
}

async function login(req, res) {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) return res.status(401).send('Invalid username or password.')
    if (user.logged_in === true) {
      return res.status(403).json({
        success: false, 
        message: "User is already logged in.",
        error: error
      }) 
    }
    // if logged out then logged_in changed to avoid error
    const loggedInUser = await User.findByIdAndUpdate({_id: user._id}, {$set:{logged_in: true}})

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).send('Invalid username or password.')
 
    const token = jwt.sign({ _id: user._id }, secretKey)
    const newToken = new Token(
      {
        username: username, 
        token: token
      }
    );
    await newToken.save()
    res.status(201).json({
      "success": true,
      "response": {token: newToken.token}
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

async function logout(req, res) {
  try {
    
    const authorization = req.headers.authorization
    const deletedToken = await Token.findOneAndDelete({token: authorization})
    if (deletedToken.deletedCount === 0) {
      throw new Error
    }
    // logged_in is toggled only if there's no error with token
    const LoggedOutUser = await User.findOneAndUpdate({username: deletedToken.username}, {$set:{logged_in: false}})
    res.status(200).json({
      success: true,
      response: deletedToken
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
      error: err
    })
  }
}


module.exports = { register, login, logout }
