const express = require("express");
const notesRouter = express.Router();

const { notesByUsername, createNote, updateNote, noteByTitle, notesByTag } = require("../controllers/notesControllers")

notesRouter.get("/", )

module.exports = notesRouter 
