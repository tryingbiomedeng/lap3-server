// IMPORT MODELS
const mongoose = require("mongoose")
const Note = require("../Models/NotesModel")

const notesByUsername = async (req, res) => {
    
    try {
        const user = req.params.username
        const notes = await Note.find({username: {$eq: user}})
        if (user){
            res.status(200).json({
            "success": true,
            "user": notes
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
    // POSTS NEW NOTES TO DB

   try {
    if (req.body){
        const note = await Note.create(req.body)
    res.status(201).json({
        "success": true,
        "respond": note
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
    /* UPDATES A NOTE IN DB
    
    reqs = {
        params: username
        body: [searched string?]
    }
    */
    try {
    if (req.params.id && req.body) {
        res.status(200).json({
            "success": true
        })
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
