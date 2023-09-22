require("dotenv").config()
const mongoose = require("mongoose");
 
//could add a conditional based on ENV being PROD or DEV
const connectionURI = process.env.DB_CONNECTION || 'mongodb://localhost:27017';
 
// Enable command monitoring for debugging
// const client = mongoose.Mongoose(con)
const connectDB = async () => {
    try {
        await mongoose.connect(connectionURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`Connected to ${connectionURI} successfully 🚀`)        
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB
