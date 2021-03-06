const path = require('path')

module.exports = {
  PORT: process.env.PORT || 4000,
  PUBLIC_PATH: path.join(__dirname + '/'),
  API_KEY: 'API_KEY',
  PAIR_BTC_USD: 'BTC-USD'
}
