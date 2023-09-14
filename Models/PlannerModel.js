const mongoose = require('mongoose')
const plannerSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    date: {
        type:String,
        required: true,
    },
    content: {
        type:String,
        required: true
    },
    tag: {
        type:String,
        required: false
    }
})

const Planner = mongoose.model('Planner', plannerSchema)
module.exports = Planner
