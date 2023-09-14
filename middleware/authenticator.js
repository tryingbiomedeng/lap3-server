const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Token = require("../Models/TokenModel")

async function authenticateToken(req, res, next) {
  //const token = req.header("Authorization")
  try {
    const token = req.headers.authorization
    
    if (!token) {
      return res.status(401).send('Access denied. No token provided.')
    }
    const tokenValidation = await Token.findOne({ token })
    if (!tokenValidation) throw new Error

  } catch (error) {
    return res.status(403).send("Invalid token")
  }
  next()
}

module.exports = authenticateToken
// {Authorization: bearer tokenvalule}
