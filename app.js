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

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.get('/', (req, res) => {
  res.json({
    name: "Study App API",
    description: "Welcme to your study buddy"
  })
})

// app.get('/planner', async (req, res) => {
//   try {
//     const planner = await Planner.find({});
//     res.status(200).json(planner);
//   } catch (error) {
//     console.error('Error retrieving planner data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })


mongoose.connection.once('open', () => {
  console.log('connected to MongoDB')
  app.listen(port, () => {
    console.log(`API running on port ${port}`)
  })
})


// module.exports = app