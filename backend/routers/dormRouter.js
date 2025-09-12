const express = require('express')
const router = express.Router()

const dormController = require('../controllers/dormController')
const authenticateToken  = require("../middlewares/middleware")

router.post('/dorm', authenticateToken, dormController.createDorm)

module.exports = router