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
        topic_tags: {
            type: Array
        },
        content: {
            type: String,
            default: ""
        },
        date_created: {
            type: Date,
            required: true,
            default: Date.now()
        },
        last_update: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
)

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;