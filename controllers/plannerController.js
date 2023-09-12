const mongoose = require ("mongoose")
const Planner = require("../Models/PlannerModel")

const plannerByUsername = async (req, res) => {
  try {
		const user = req.params.username
		const planner = await Planner.find({username:{$eq: user}})
		if (user){
			res.status(200).json({
				"success": true,
				"user": planner
			})
		}
	} catch (err) {
		res.status(404).json({
			"success": false,
			"message": "Planner for user not found",
			"error":err
		})
	}
}

const createPlanner = async (req, res) => {
	try {
		if (req.body){
			const planner = await Planner.create(req.body)
		res.status(201).json({
			"success": true,
			"respond": planner
		})
		}
	} catch (err) {
		res.status(404).json({
			"success": false,
			"message": "Unable to create new event",
			"error":err
		})
	}
}

const updatePlanner = async (req, res) => {
	try {
		if (req.params.id && req.body) {
			res.status(200).json({
				"success": true
			})
		}
	} catch (err) {
		res.status(404).json({
			"success": false,
			"message": "Unable to update note",
			"error": err
		})
	}
}

const plannerByDate = async (req, res) => {
	try {
		if (req.params.date){
			res.status(200).json({
			"success": true
		})
	}
  } catch (err) {
		res.status(404).json({
			"success": false,
			"message": "Date not found",
			"error": err
		})
  }
}

const plannerByTag = async (req, res) => {
	try {
		if (req.params.tag)
		{res.status(200).json({
			"success": true
		})}
  } catch (err) {
		res.status(404).json({
			"success": false,
			"message": "Note not found",
			"error": err
		})
  }
}

const destroy = async (req, res) => {
	try {
		if (req.params.id) {
			res.status(204).json({
			"success": true
			})
		}
  } catch (err) {
		res.status(404).json({
			"success": false,
			"message": "Unable to delete planner",
			"error": err
		})
  }
}

module.exports = {
	plannerByUsername,
	createPlanner,
	updatePlanner,
	plannerByDate,
	plannerByTag,
	destroy
}
