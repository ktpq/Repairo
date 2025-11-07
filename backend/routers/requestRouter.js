const express = require('express')
// const multer = require('multer');
// const path = require('path');
const router = express.Router()

const requestController = require('../controllers/requestController')
const { authenticateToken, authorizeDormAccess, isAdminInDorm, isTechnicianInDorm, upload, uploadS3 }  = require("../middlewares/middleware")


router.put("/request/tenant/:id/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, upload.single('image_url'), requestController.updateRequest)

// ดู request ทั้งหมดในหอ
router.get("/request/technician/incomplete/:dorm_id", authenticateToken, isTechnicianInDorm, requestController.getIncompleteRequestForTechnician)
router.get("/request/technician/complete/:dorm_id", authenticateToken, isTechnicianInDorm, requestController.getCompleteRequestForTechnician)

router.get("/request/admin/all/:dorm_id", authenticateToken, isAdminInDorm ,requestController.getAllRequest)
router.get("/request/admin/status/:dorm_id", authenticateToken, isAdminInDorm, requestController.getDashboardStatus)



// ดู request ของตัวเอง (Incomplete / Complete)
router.get("/request/tenant/incomplete/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getIncompleteRequest)
router.get("/request/tenant/complete/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getCompleteRequest)
router.put("/request/tenant/cancel/:id", authenticateToken, requestController.cancelRequest)

// ดู request ของ technician ที่ยังไม่เสร็จ

// ดู request ที่ยังไม่มีคนรับ
router.get("/request/technician/notech/:dorm_id", authenticateToken, isTechnicianInDorm, requestController.getNoTechRequest)

// อัพเดตสถานะ / Hand-in
router.put("/request/technician/change-status/:dorm_id", authenticateToken, isTechnicianInDorm, requestController.changeRequestStatus)
router.put("/request/technician/accept/:id/:dorm_id", authenticateToken, isTechnicianInDorm, requestController.acceptRequest)
router.put("/request/technician/submit/:id/:dorm_id", authenticateToken, isTechnicianInDorm, upload.single('image_url'), requestController.submitRequest)

// สร้าง request ใหม่
router.post("/request/tenant/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, upload.single('image_url'), requestController.createRequest)

// ลบ request
router.put("/request/admin/:dorm_id", authenticateToken, isAdminInDorm, requestController.deleteRequestById)

router.get("/request/:id/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getRequestById)
router.get("/request/:id/:dorm_id", authenticateToken, isTechnicianInDorm, requestController.getRequestByIdTechnician)


// Get request ทั้งหมด (แสดงในหน้า admin) -> maybe เกิด ปัญหา ขี้เกียจ เทส ;-;
// router.get("/request/all/:dorm_id", authenticateToken, isAdminInDorm ,requestController.getAllRequest)

// // Get request แยก status ของ user เเตละคน
// router.get("/request/incomplete/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getIncompleteRequest)
// router.get("/request/complete/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getCompleteRequest)
// router.get("/request/:id/:dorm_id/:room_id", authenticateToken, authorizeDormAccess, requestController.getRequestById)

// router.get("/request/nohand/:dorm_id", authenticateToken, isTechnicianInDorm, requestController.getNoHandRequest)
// router.get("/request/technician/incomplete/:dorm_id", authenticateToken, isTechnicianInDorm, requestController.getIncompleteRequestForTechnician)

// router.post("/request/:dorm_id/:room_id", authenticateToken, authorizeDormAccess,  requestController.createRequest)


// // route ของ admin อยู่จังสี้
// router.put("/request/change-status/:dorm_id", authenticateToken, isTechnicianInDorm, requestController.changeRequestStatus)
// router.put("/request/handin/:id/:dorm_id", authenticateToken, isTechnicianInDorm, requestController.handInRequest)
// router.delete("/request/:dorm_id", authenticateToken, isAdminInDorm, requestController.deleteRequestById)


module.exports = router
