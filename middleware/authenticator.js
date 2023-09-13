const jwt = require('jsonwebtoken')
const crypto = require('crypto')
// const secretKey = crypto.randomBytes(64).toString('hex')
const Token = require("../Models/TokenModel")

async function authenticateToken(req, res, next) {
  const token = req.header('Authorization')
  if (!token) return res.status(401).send('Access denied. No token provided.')

  const tokenValidation = await Token.findOne({ token })
  if (!tokenValidation) {
    return res.status(403).send("Invalid token")
  }
  next()
  // jwt.verify(token, secretKey, (err, user) => {
  //   if (err) return res.status(403).send('Invalid token.')
  //   req.user = user;
  //   next()
  // })
}

module.exports = authenticateToken
// {Authorization: bearer tokenvalule}
