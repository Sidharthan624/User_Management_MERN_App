const { generateToken } = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new User
// @routes  POST /api/users/
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),

        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc Login a user
// @routes  POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        if(user.isBlocked){
            res.status(401)
            throw new Error('You are blocked Please contact the admin :)')
        }
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
            avatar: user.avatar,
          

        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data
// @routes  GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {

    res.status(200).json(req.user)
})

//Get user profile
//get /api/users/profile
//private
const loadUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isBlocked: req.user.isBlocked
    }
    res.status(200).json(user)
})

// Update user profile
// PuT /api/users/profile
// private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        if (req.file) {
            user.avatar = req.file.filename
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar
        });
    } else {
        res.status(404);
        throw new Error("user not found");
    }
});


module.exports = {
    registerUser,
    loginUser, getMe, loadUserProfile, updateUserProfile
}