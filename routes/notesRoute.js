const express = require("express");
const notesRouter = express.Router();

const { notesByUsername, createNote, updateNote, noteByTitle, notesByTag, destroy } = require("../controllers/notesControllers")

notesRouter.get("/user/:username", notesByUsername)

notesRouter.get("/title/", noteByTitle)

notesRouter.get("/tag/:tag", notesByTag)

notesRouter.post("/", createNote)
// patching by id since the title can change
notesRouter.patch("/:id", updateNote)

notesRouter.delete("/:id", destroy)

module.exports = notesRouter 
