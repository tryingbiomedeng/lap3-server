const client = require('./setup');

const seedDB = async () => {
  try {
    console.log("Awaiting Seed 🌱")

    const plannerCollection = client.db('planner').collection('planner')

    await plannerCollection.drop()
    
    await plannerCollection.insertMany([
      { username: "user 1", date: "11/02/23", content: "sample", tag: "school" },
      { username: "user 2", date: "10/02/23", content: "sample2", tag: "home" },
      { username: "user 3", date: "11/09/23", content: "sample3", tag: "work" }
    ])

    console.log("DB Seeded 🌾")
  } catch (e) {
    console.log(e)
  } finally {
    client.close()
  }
}

seedDB()
