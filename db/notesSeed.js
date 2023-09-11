const client = require('./setup')

const seedDB = async () => {
    try {
        await client.connect()
        console.log("Awaiting Seed 📝🌱")
        // await client.db('studyApp-db').collection('notes_db').drop()
        await client.db('studyApp-db').collection('notes_db').insertMany([
            {
                username: "user1", 
                title: "title1", 
                subject: "subject1", 
                topicTags : ["tag1", "tag2"],
                content: "this is the first set of notes", 
                dateCreated: Date.now(), 
                lastEdited: Date.now()
            },
            {
                username: "thisUser2", 
                title: "Best Notes EVER!", 
                subject: "Spanish", 
                topicTags : ["weather", "reading", "higher"],
                content: "Elite notes for my Spanish exam", 
                dateCreated: Date.now(), 
                lastEdited: Date.now()
            },
            {
                username: "iamauser3", 
                title: "G.O.A.N", 
                subject: "Maths", 
                topicTags : ["g.o.a.n"],
                content: "this is the Greatest Of All Notes (G.O.A.N)", 
                dateCreated: Date.now(), 
                lastEdited: Date.now()
            }
        ])
        console.log("DB Seeded 🌾")
        await client.close()
    } catch (error) {
        console.log(error)
    }
}

seedDB()
