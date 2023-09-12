require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./db/setup')
const port = process.env.PORT

// connect to mongo
connectDB();

const app = express()

// Route Imports
const notesRoute = require("./routes/notesRoute")

// Middleware
app.use(cors())
app.use(express.json())
app.use(logger('dev'))

// TODO: Auth
// TODO: Data Filter Middleware

app.get('/', (req, res) => {
  res.json({
    name: "Study App API",
    description: "Welcome to your study buddy"
  })
})

// *ROUTES*
app.use("/notes", notesRoute)




// *CATCH ALL FOR PUT & POST* (place last)
app.put("*", (req, res) => {
  res.status(405).json({
    status: res.statusCode,
    message: "Method Not Allowed"
  })
})

app.post("*", (req, res) => {
  res.status(405).json({
    status: res.statusCode,
    message: "Method Not Allowed"
  })
})

app.get("*", (req, res) => {
  res.status(405).json({
    status: res.statusCode,
    message: "Method Not Allowed"
  })
})

app.delete("*", (req, res) => {
  res.status(405).json({
    status: res.statusCode,
    message: "Method Not Allowed"
  })
})

module.exports = app
