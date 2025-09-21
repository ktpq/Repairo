const express = require('express')
const router = express.Router()

const requestController = require('../controllers/requestController')
const { authenticateToken, authorizeDormAccess, isAdminInDorm }  = require("../middlewares/middleware")


// Get request ทั้งหมด (แสดงในหน้า admin) -> maybe เกิด ปัญหา ขี้เกียจ เทส ;-;
router.get("/request/all/:dorm_id", authenticateToken, isAdminInDorm ,requestController.getAllRequest)

// Get request แยก status
router.get("/request/incomplete/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getIncompleteRequest)
router.get("/request/complete/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getCompleteRequest)
router.get("/request/:id/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getRequestById)

router.post("/request/:dorm_id/:room_id", authenticateToken, authorizeDormAccess,  requestController.createRequest)


// route ของ admin อยู่จังสี้
router.put("/request/change-status/:dorm_id", authenticateToken, isAdminInDorm, requestController.changeRequestStatus)

router.delete("/request/:dorm_id", authenticateToken, isAdminInDorm, requestController.deleteRequestById)


module.exports = router
