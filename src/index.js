var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var { PORT } = require('../config')
const Polygon = require('./polygon')


io.on('connection', function (socket) {
  const client = new Polygon({ apiKey: "YOUR_KEY" })
  client.subscribe(['XT.*'])

  client.on('XT', (trade) => {
    socket.emit('trade_data', trade )
  })
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.use('/*', (req, res, next) => {
  res.send({
    status: 404,
    message: 'No route defined'
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
