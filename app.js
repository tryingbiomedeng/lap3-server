const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()

// Route Imports
const notesRoute = require("./routes/notesRoute")
const plannerRoute = require("./routes/plannerRoute")
const authRoute = require('./routes/authRoute')
const protectedRoute = require('./routes/protectedRoute')

// Middleware
app.use(cors())
app.use(express.json())

app.use(logger('dev', {
  skip: (req, res) => {
    return process.env.NODE_ENV === 'test'
  }
}))

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
app.use("/planners", plannerRoute)
app.use('/auth', authRoute)
app.use('/protected', protectedRoute)

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


// Planner routes



// app.get("*", (req, res) => {
//   res.status(405).json({
//     status: res.statusCode,
//     message: "Method not allowed"
//   })
// })

// app.post("*", (req, res) => {
//   res.status(405).json({
//     status: res.statusCode,
//     message: "Method not allowed"
//   })
// })

// app.put("*", (req, res) => {
//   res.status(405).json({
//     status: res.statusCode,
//     message: "Method not allowed"
//   })
// })

// app.delete("*", (req, res) => {
//   res.status(405).json({
//     status: res.statusCode,
//     message: "Method not allowed"
//   })
// })

module.exports = app