const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()

// Route Imports
const notesRoute = require("./routes/notesRoute")
const plannerRoute = require("./routes/plannerRoute")

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
app.use("/planner", plannerRoute)


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