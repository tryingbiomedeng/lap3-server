require("dotenv").config()
const connectDB = require('./db/setup')
const app = require('./app')
const port = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on port ${port}`)
    })
  }).catch((error) => {
    console.log(error)
  })
