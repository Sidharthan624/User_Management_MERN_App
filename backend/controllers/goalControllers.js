const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc getgoals
// @routes  Get /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)

})

// @desc Set Goals
// @routes  Post /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.json(goal)
})

// @desc update goals
// @routes  Put /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }


    //check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
        { new: true })
    res.json(updatedGoal)
})

// @desc delete goals
// @routes  delete /api/goals/:id
// @access Private
// const deleteGoals = asyncHandler(async(req,res)=>{
//     const trashGoal = await Goal.findById(req.params.id)
//     const user = await User.findById(req.user.id)

//     //check for user
//     if(!user){
//         res.status(401)
//         throw new Error('User not found')
//     }
//     //make sure the logged in user matches the goal user
//     if(trashGoal.user.toString() !== user.id ){
//         res.status(401)
//         throw new Error('User not authorized')
//     }

//     if(!trashGoal){
//         res.status(400)
//         throw new Error('Goal not found')
//     }
//     await trashGoal.delete()
//     res.json({message:`delete goal ${req.params.id} goal deleted sucessfully `})
// })

const deleteGoals = asyncHandler(async (req, res) => {
    const trashGoal = await Goal.findById(req.params.id);


    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged-in user matches the goal user
    if (trashGoal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Check if the goal exists
    if (!trashGoal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    await Goal.deleteOne({ _id: req.params.id })
    res.json({ message: `Deleted goal ${req.params.id} successfully` });
});



module.exports = {
    getGoals, setGoals, updateGoals, deleteGoals
}