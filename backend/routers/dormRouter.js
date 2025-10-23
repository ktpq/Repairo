const express = require('express')
const router = express.Router()

const dormController = require('../controllers/dormController')
const {authenticateToken}  = require("../middlewares/middleware")

// แสดง ห้องที่ user อยู่
router.get('/dorm/user', authenticateToken, dormController.getDormByUserId)
router.get('/dorm/owner', authenticateToken, dormController.getDormOwner)
router.get('/dorm/technician', authenticateToken, dormController.getDormTechnician)

router.post('/dorm/join/tenant', authenticateToken, dormController.joinDormAsTenant)
router.post('/dorm/join/technician', authenticateToken, dormController.joinDormAsTechnician)

router.get('/dorm/:id', authenticateToken, dormController.getDormById)


router.post('/dorm', authenticateToken, dormController.createDorm)


module.exports = router
