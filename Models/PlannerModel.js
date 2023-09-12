const mongoose = require('mongoose')
const plannerSchema = mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        required: true,
        default: Date.now()
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

module.exports = mongoose.model('Planner', plannerSchema)