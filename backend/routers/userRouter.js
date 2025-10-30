const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

const { authenticateToken, upload, isAdminInDorm, uploadS3 } =  require('../middlewares/middleware')


router.get("/myuser", userController.getCurrentLoginUser)

router.delete("/user/tenant/:id/:dorm_id", authenticateToken, isAdminInDorm, userController.deleteTenantUser)
router.delete("/user/technician/:id/:dorm_id", authenticateToken, isAdminInDorm, userController.deleteTechnicianUser)

router.put("/user/change-password", authenticateToken, userController.changePassword)
router.put("/user/change-profile-info", authenticateToken, uploadS3.single('image_url'), userController.changeProfileInfo)

module.exports = router