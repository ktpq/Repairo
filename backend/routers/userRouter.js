const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

const { authenticateToken, upload, isAdminInDorm } =  require('../middlewares/middleware')


router.get("/myuser", authenticateToken, userController.getCurrentLoginUser)

router.delete("/user/tenant/:id/:dorm_id", authenticateToken, isAdminInDorm, userController.deleteTenantUser)
router.delete("/user/technician/:id/:dorm_id", authenticateToken, isAdminInDorm, userController.deleteTechnicianUser)

router.put("/user/change-password", authenticateToken, userController.changePassword)
router.put("/user/change-profile-info", authenticateToken, upload.single('image_url'), userController.changeName)

module.exports = router