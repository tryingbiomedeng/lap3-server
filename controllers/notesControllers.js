// IMPORT MODELS
const mongoose = require("mongoose")
const Note = require("../Models/NotesModel")

const notesByUsername = async (req, res) => {
    //done
    try {
        const user = req.params.username
        const notes = await Note.find({username: {$eq: user}})
        if (user){
            res.status(200).json({
            "success": true,
            "response": notes
        })
    }
        
    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Notes for user not found",
            "error": error
        })
    }
}

const createNote = async (req, res) => {
    //done
   try {
    if (req.body){
        const note = await Note.create(req.body)
    res.status(201).json({
        "success": true,
        "response": note
        })
    }
   } catch (error) {
    res.status(404).json({
        "success": false,
        "message": "Unable to create new note",
        "error": error
    })
   }
}

const updateNote = async (req, res) => {
    //done
    try {
    if (req.params.id && req.body) {
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
                    last_update: data.last_update
                }
            }, 
            { 
                new: true,
                upsert: true
            }
        )
            // ).exec()
        res.status(200).json({
            "success": true,
            "response": updatedNote
        });
    }
        
   } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Unable to update note",
            "error": error
        })
   }
}



const noteByTitle = async (req, res) => {
    /* GET ONE NOTE BASED ON TITLE
    
    reqs = {
        params: username
        body: [searched string?]
    }
    */
    try {
        if (req.params.title){
            res.status(200).json({
            "success": true
        })
    }
   } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Note not found",
            "error": error
        })
   }
}

const notesByTag = async (req, res) => {
    /* GET ALL NOTES BASED ON TAG && USER

    reqs = {
        params: username
        body: [searched string?]
    }
    */
    try {
        if (req.params.tag)
        {res.status(200).json({
            "success": true
        })}
   } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Note not found",
            "error": error
        })
   }
}

const destroy = async (req, res) => {
    /* DELETE A NOTE DOCUMENT BASED ON ID

    reqs = {
        params: username
        body: [searched string?]
    }
    */
    try {
        if (req.params.id) {
            res.status(204).json({
            "success": true
            })
        }
   } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Unable to delete note",
            "error": error
        })
   }
}

// If users can search based on notes content
// const NotesByContent = async (req, res) => {
//     /* 
//     reqs = {
//         params: username
//         body: [searched string?]
//     }
//     */
// }

module.exports = {
    notesByUsername,
    createNote,
    updateNote,
    noteByTitle,
    notesByTag,
    destroy
}
