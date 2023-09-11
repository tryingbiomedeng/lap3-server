require("dotenv").config()
const { MongoClient } = require("mongodb");

//could add a conditional based on ENV being PROD or DEV
const connectionURI = process.env.DB_CONNECTION || 'mongodb://localhost:27017';

// Enable command monitoring for debugging
const client = new MongoClient(connectionURI, { monitorCommands: true });

const connectDB = async () => {
    try {
        await client.connect(connectionURI)
        console.log(`Connected to ${connectionURI} successfully 🚀`)
        
    } catch (error) {
        console.log(error)
    }
}
connectDB()
module.exports = client
