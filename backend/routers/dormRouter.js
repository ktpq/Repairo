const express = require('express')
const router = express.Router()

const dormController = require('../controllers/dormController')
const authenticateToken  = require("../middlewares/middleware")

router.post('/dorm', authenticateToken, dormController.createDorm)
router.post('/dorm/join', authenticateToken, dormController.joinDorm)

module.exports = router