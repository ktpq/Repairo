const express = require('express')
const router = express.Router()

const roomController = require('../controllers/roomController')
const { authenticateToken, authorizeDormAccess, isAdminInDorm }  = require("../middlewares/middleware")


router.get("/room/:dorm_id", authenticateToken, isAdminInDorm, roomController.getAllRoomInDorm);
router.put("/room/change-accesscode/:dorm_id", authenticateToken, isAdminInDorm, roomController.changeRoomAccessCode)

router.put("/room/delete-user/:dorm_id", authenticateToken, isAdminInDorm, roomController.deleteUserInRoom);

module.exports = router
