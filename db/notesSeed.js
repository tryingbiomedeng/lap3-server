const mongoose = require("mongoose");
// import Models for seeding
const Note = require("../Models/NotesModel");
const connectDB = require("./setup");
const seedDB = async () => {
    try {
        console.log("Planting Seeds 🌱")
        await connectDB();
        //notes seed
        console.log("Awaiting Note Seed 📝🌱")
        await Note.insertMany([
            {
                username: "user1", 
                title: "Maths Calc Exam Notes", 
                subject: "Maths", 
                topic_tags : ["CoSin", "Calculator"],
                content: "this is the first set of maths notes"
            },
            {
                username: "thisUser2", 
                title: "Best Notes EVER!", 
                subject: "Spanish", 
                topic_tags : ["weather", "reading", "higher exam"],
                content: "Elite notes for my Spanish exam"
            },
            {
                username: "iamauser3", 
                title: "G.O.A.N", 
                subject: "Maths", 
                topic_tags : ["g.o.a.n"],
                content: "this is the Greatest Of All Notes (G.O.A.N)"
            }
        ])
        // add other seeds below using code from line 10 down await <Model>.insertMany([array])

        //this code from this line downward stays
        console.log("DB Seeded 🌾")
        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
}

seedDB()
