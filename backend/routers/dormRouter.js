const express = require('express')
const router = express.Router()

const dormController = require('../controllers/dormController')
const authenticateToken  = require("../middlewares/middleware")

// แสดง ห้องที่ user อยู่
router.get('/dorm', authenticateToken, dormController.getDormByUserId)

router.post('/dorm', authenticateToken, dormController.createDorm)
router.post('/dorm/join/tenant', authenticateToken, dormController.joinDormAsTenant)

module.exports = router
