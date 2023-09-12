const mongoose = require("mongoose");
const Planner = require("../Models/PlannerModel");
const connectDB = require("./setup");

const seedDB = async () => {
  try {
    console.log("Planting Seeds 🌱")
    await connectDB();
    console.log("Awaiting Note Seed 📝🌱")
    await Planner.insertMany([
      { 
        username: "user 1", 
        date: "11/02/23", 
        content: "sample", 
        tag: "school" 
      },
      { 
        username: "user 2", 
        date: "10/02/23", 
        content: "sample2", 
        tag: "home" },
      { 
        username: "user 3", 
        date: "11/09/23", 
        content: "sample3", 
        tag: "work" }
    ])

    console.log("DB Seeded 🌾")
    await mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}

seedDB()
