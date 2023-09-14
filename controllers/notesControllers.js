const mongoose = require("mongoose")
const Note = require("../Models/NotesModel")
const Token = require("../Models/TokenModel")

const notesByUsername = async (req, res) => {
    try {
        const user = req.params.username
        const notes = await Note.find({username: {$eq: user}})
        res.status(200).json({
        "success": true,
        "response": notes
        })

        
    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Notes for user not found",
            "error": error
        })
    }
}

const createNote = async (req, res) => {try {
    const { title, subject, topic_tags, content } = req.body
    const username = await Token.find({
        token: {$eq: req.headers.authorization}
    }, {username: 1, _id: 0}
    )

    const newNote = new Note({
        username: username[0].username, 
        title: title, 
        subject: subject, 
        topic_tags: topic_tags, 
        content: content
    })
    const response = await newNote.save()

    res.status(201).json({
        "success": true,
        "response": response
    })
    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Unable to create new note",
            "error": error
        })
    }
}

const updateNote = async (req, res) => {
    try {
        const idx = req.params.id
        const data = req.body
        // excl username, date created
        const updatedNote = await Note.findByIdAndUpdate(
            {_id: idx}, 
            {
                $set: {
                    title: data.title, 
                    subject: data.subject,
                    topic_tags: data.topic_tags,
                    content: data.content,
                }
            }, 
            { 
                new: true,
                upsert: true
            }
        )
        res.status(200).json({
            "success": true,
            "response": updatedNote
        });
    } catch (error) {
        res.status(404).json({
        "success": false,
        "message": "Unable to update note",
        "error": error
        })
    }
}

const noteByTitle = async (req, res) => {
   try {
        const username = await Token.find({
            token: {$eq: req.headers.authorization}}, 
            {username: 1, _id: 0})

        const data = req.body
        //RegExp 2nd param is for making regex filter non-case-sensitive
        const titleRegex = new RegExp(data.title, 'i')
        const notes = await Note.find({username: {$eq: username[0].username}, title: {$regex: titleRegex}})
        res.status(200).json({
            "success": true,
            "response": notes
        })
   } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Note not found",
            "error": error
        })
   }
}

const notesByTag = async (req, res) => {
    try {
        const username = await Token.find({
            token: {$eq: req.headers.authorization}}, 
            {username: 1, _id: 0})

        const tagx = req.params.tag
        const notes = await Note.find({username: {$eq: username[0].username}, topic_tags: {$eq: tagx}})
        res.status(200).json({
        "success": true,
        "response": notes
        })
   } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Note not found",
            "error": error
        })
   }
}

const destroy = async (req, res) => {
   try {
        const idx = req.params.id     
        const result = await Note.findByIdAndDelete(idx)
        console.log(result)
        if (!result) {
            throw new Error("Note ID not found")
        }
        res.status(204).json({
        "success": true,
        "response": result
        })
   } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Unable to delete note. " + error.message,
            "error": error
        })
   }
}

module.exports = {
    notesByUsername,
    createNote,
    updateNote,
    noteByTitle,
    notesByTag,
    destroy
}
