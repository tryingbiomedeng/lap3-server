const Planner = require("../Models/PlannerModel")

const getAll = async (req, res) => {
	try {
		const planners = await Planner.find()
		res.status(200).json(planners)
	} catch (err) {
		res.status(500).json({ message: err.message})
	}
}

const getById = async (req, res) => {
	try {
    const { id } = req.params;
    const planner = await Planner.findById(id);

    if (!planner) {
      return res.status(404).json({ message: 'Planner not found' });
    }

    res.status(200).json(planner);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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
			const idx = req.params.id
			const data = req.body
			const updatedPlanner = await Planner.findByIdAndUpdate(
				{_id: idx},
				{
					$set: {
						content: data.content,
						date: data.date,
						tag: data.tag
					}
				},
				{
					new: true,
					upsert: true
				})
			// if (!planner){
			// 	return res.status(404).json({"message": "Event not found"})
			// }

			// planner.set(req.body)
			// await planner.save()

			res.status(200).json({
				"success": true,
				"response": updatedPlanner
			})
		}
	} catch (err) {
		res.status(404).json({
			"success": false,
			"message": "Unable to update planner event",
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
			const deletedPlanner = await Planner.findByIdAndDelete(req.params.id)
			if (!deletedPlanner) {
        return res.status(404).json({"message": "Planner event not found"});
      }

			await planner.remove()

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
	getAll,
	getById,
	plannerByUsername,
	createPlanner,
	updatePlanner,
	plannerByDate,
	plannerByTag,
	destroy
}
