require("dotenv").config()
// const mongoose = require("mongoose")
const connectDB = require('./db/setup')
const app = require('./app')
const port = process.env.PORT || 5000



connectDB()
  .then(() => {
    // console.log('connected to mongoDB')
    app.listen(port, () => {
      console.log(`API running on port ${port}`)
    })
  }).catch((error) => {
    console.log(error)
  })
require("dotenv").config()
const app = require('./app')
const port = process.env.PORT


app.listen(port, () => {
  console.log(`API running on port ${port}`)
})