const express = require('express')
const router = express.Router()

const requestController = require('../controllers/requestController')
const { authenticateToken, authorizeDormAccess }  = require("../middlewares/middleware")


router.get("/request/incomplete/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getIncompleteRequest)
router.get("/request/complete/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getCompleteRequest)

router.post("/request/:dorm_id/:room_id", authenticateToken, authorizeDormAccess,  requestController.createRequest)


module.exports = router
