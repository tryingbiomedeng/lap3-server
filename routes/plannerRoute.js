const express = require("express");
const plannerRouter = express.Router();

const { plannerByUsername, createPlanner, updatePlanner, plannerByDate, plannerByTag, destroy } = require("../controllers/plannerControllers")

plannerRouter.get("/user/:username", plannerByUsername)
plannerRouter.get("/date/:date", plannerByDate)
plannerRouter.get("/tag/:tag", plannerByTag)
plannerRouter.post("/", createPlanner)
plannerRouter.patch("/:id", updatePlanner)
plannerRouter.delete("/:id", destroy)

module.exports = notesRouter 
