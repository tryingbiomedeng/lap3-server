const express = require("express");
const notesRouter = express.Router();

const { notesByUsername, createNote, updateNote, noteByTitle, notesByTag, deleteById } = require("../controllers/notesControllers")

notesRouter.get("/", notesByUsername)

notesRouter.get("/:title", noteByTitle)

notesRouter.get("/:tag", notesByTag)

notesRouter.post("/", createNote)
// patching by id since the title can change
notesRouter.patch("/:id", updateNote)

notesRouter.delete("/:id", deleteById)

module.exports = notesRouter 
