const express = require('express')
const router = express.Router()
const { registerAdmin, adminLogin,getUserData, handleBlockAndUnblock,updateUser} = require('../controllers/adminControllers')
const { authAdmin } = require('../middleware/adminAuthMiddleware')





router.post('/', adminLogin)
router.post('/register', registerAdmin)
router.get('/dashboard',authAdmin,getUserData)
router.put('/user/block-unblock',authAdmin,handleBlockAndUnblock)
router.put('/editUser', updateUser)










module.exports = router