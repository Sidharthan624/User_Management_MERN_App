
const express = require('express')
const router = express.Router()
const {registerUser, loginUser,getMe,loadUserProfile,updateUserProfile} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const { upload } = require( '../middleware/multer')



 router.post('/',registerUser)
 router.post('/login',loginUser)
 router.get('/me',protect,getMe)
 router.route('/profile').get(protect,loadUserProfile)
 .put(protect,upload.single('file') ,updateUserProfile);

 router.route('/userDetails').get(protect,loadUserProfile)
 
 
 
 
 
 module.exports = router

