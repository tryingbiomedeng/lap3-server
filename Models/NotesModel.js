const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
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
        }
    },
    {timestamps: true}
)

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
