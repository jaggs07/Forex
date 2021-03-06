const express = require('express')
const fetch = require('node-fetch')
const moment = require('moment')
const { API_KEY } = require('../../../config')

const router = express.Router()

router.get('/previous', async (req, res) => {
  const from = 'BTC'
  const to = 'USD'
  const date = moment().subtract(3, 'days')
  const formattedDate = date.format('YYYY-DD-MM')
  // Can be implemented using query params that could be set from the frontend
  const request = `https://api.polygon.io/v1/historic/crypto/${from}/${to}/${formattedDate}?limit=100&?&apiKey=${API_KEY}`
  return fetch(request)
    .then(res => res.json())
    .then(data => res.send(data))
})

module.exports = router