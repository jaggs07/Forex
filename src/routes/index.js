const express = require('express')
const cryptoRouter = require('./crypto')

const router = express.Router()

router.use('/crypto', cryptoRouter)

module.exports = router
