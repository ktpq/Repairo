const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

const { authenticateToken } =  require('../middlewares/middleware')


router.get("/myuser", authenticateToken, userController.getCurrentLoginUser)


router.put("/user/change-password", authenticateToken, userController.changePassword)
router.put("/user/change-name", authenticateToken, userController.changeName)

module.exports = router