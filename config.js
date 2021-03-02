const path = require('path')

console.log({ __dirname })
module.exports = {
  PORT: process.env.PORT || 4000,
  PUBLIC_PATH: path.join(__dirname + '/')
}
