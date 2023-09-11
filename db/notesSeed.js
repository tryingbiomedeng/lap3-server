const mongoose = require("mongoose");
const Note = require("../Models/NotesModel")
const seedDB = async () => {
    try {
        // await mongoose.connect("mongodb://localhost:9000")
        console.log("Awaiting Seed 📝🌱")
        // await client.db('studyApp-db').collection('notes_db').drop()
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
        console.log("DB Seeded 🌾")
        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
}

// seedDB()
