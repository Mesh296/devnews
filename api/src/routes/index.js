const express = require('express')
const userRoutes = require('./users/user.js')

var router = express.Router()

router.use('/users', userRoutes)

module.exports = router