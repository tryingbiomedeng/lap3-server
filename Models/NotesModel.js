const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        subject: {type: String},
        topicTags: {
            type: Array
        },
        content: {
            type: String,
            
        }
    }
)

/*

username: { type: String, required: true }

title: { type: String, required: true }

subject: { type: string }

topic_tags: { type: array }

content: { type: string }

date_created: { type: date, default: now }

last_edited:  { type: date, default: now }
*/
