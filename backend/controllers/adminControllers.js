const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utils/generateToken')
const Admin = require('../models/adminModel')
const User = require('../models/userModel')


const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.create({
        email,
        password
    })
    res.status(200).json(admin)
})

const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
  
    if (admin && admin.matchPassword(password)) {
        res.status(200).json({
            _id: admin.id,
            email: admin.email,
            token: generateToken(admin.id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid username or password')
    }
})

const getUserData = asyncHandler(async(req,res)=>{    
    const user = await User.find({})   
    if(user){
        res.status(200).json(user)
    }else{
        res.status(401)
        throw new Error('Cant fetch data from data base')
    }
})

const handleBlockAndUnblock = asyncHandler(async(req,res)=>{
    const _id = req.query._id;
    const user = await User.findById(_id)
    if(user){
        user.isBlocked = !user.isBlocked
        const updatedUser = await user.save()
        // const allUsers = await User.find()
        res.status(200).json(updatedUser)
    }else{
        res.status(401)
        throw new Error('User not found')
    }
})

const updateUser = asyncHandler(async (req, res) => {
      const userId = req.body.userId;
      const { body } = req;
      const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true });
      const users = await User.find()
      if (!users) {
        res.status(404).json({ message: "User not found" });
        return;
      } else {
        res.status(200).json({ users });
      }
  });


module.exports = {
    registerAdmin,adminLogin,getUserData,
    handleBlockAndUnblock,updateUser
}