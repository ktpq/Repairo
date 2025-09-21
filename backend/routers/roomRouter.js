const express = require('express')
const router = express.Router()

const roomController = require('../controllers/roomController')
const { authenticateToken, authorizeDormAccess, isAdminInDorm }  = require("../middlewares/middleware")


router.get("/room/:dorm_id", authenticateToken, isAdminInDorm, roomController.getAllRoomInDorm);


module.exports = router
