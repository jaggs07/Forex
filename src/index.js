const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { PORT, API_KEY } = require('../config')
const Polygon = require('./polygon')
const cors = require('cors')
const routes = require('./routes')

app.use(cors())

io.on('connection', function (socket) {
  const client = new Polygon({ apiKey: API_KEY })
  client.subscribe(['XT.*'])

  client.on('XT', (trade) => {
    socket.emit('trade_data', trade)
  })
})

app.use('/', routes)

app.use('/*', (req, res, next) => {
  res.send({
    status: 404,
    message: 'No route defined'
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
