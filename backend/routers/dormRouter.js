const express = require('express')
const router = express.Router()

const dormController = require('../controllers/dormController')
const {authenticateToken, isAdminInDorm}  = require("../middlewares/middleware")

router.post('/dorm/join/tenant', authenticateToken, dormController.joinDormAsTenant)
router.post('/dorm/join/technician', authenticateToken, dormController.joinDormAsTechnician)

// แสดง ห้องที่ user อยู่
router.get('/dorm/user', authenticateToken, dormController.getDormByUserId)
router.get('/dorm/owner', authenticateToken, dormController.getDormOwner)
router.get('/dorm/technician', authenticateToken, dormController.getDormTechnician)

router.get('/dorm/user/:dorm_id', authenticateToken, isAdminInDorm, dormController.getUserInDorm)
router.get('/dorm/:id', authenticateToken, dormController.getDormById)


router.post('/dorm', authenticateToken, dormController.createDorm)


module.exports = router
