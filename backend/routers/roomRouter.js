const express = require('express')
const router = express.Router()

const roomController = require('../controllers/roomController')
const authenticateToken  = require("../middlewares/middleware")

router.get('/room', roomController)

module.exports = router