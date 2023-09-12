const express = require("express");
const plannerRouter = express.Router();

const { plannerByUsername, createPlanner, updatePlanner, plannerByDate, plannerByTag, destroy, getAll, getById } = require("../controllers/plannerControllers")

plannerRouter.get("/", getAll)
plannerRouter.get('/:id', getById);
plannerRouter.get("/:username", plannerByUsername)
plannerRouter.get("/:date", plannerByDate)
plannerRouter.get("/:tag", plannerByTag)
plannerRouter.post("/", createPlanner)
plannerRouter.patch("/:id", updatePlanner)
plannerRouter.delete("/:id", destroy)

module.exports = plannerRouter 
