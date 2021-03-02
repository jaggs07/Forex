const lodash = require('lodash')
const WebSocket = require('ws')
const EventEmitter = require('events').EventEmitter

class Polygon extends EventEmitter {
  constructor(params) {
    super()
    console.log('Polygon class initialized..')
    this.ws = null
    this.subscriptions = []
    this.apiKey = params.apiKey
    this.connect()
  }
  subscribe(channels) {
    // Add to our list of subscriptions:
    this.subscriptions.push(channels)
    this.subscriptions = lodash.flatten(this.subscriptions)
    // If these are additional subscriptions, only send the new ones:
    if (this.connected) this.sendSubscriptions(channels)
  }
  connect() {
    this.connected = false
    this.ws = new WebSocket('wss://socket.polygon.io/crypto')
    this.ws.on('open', this.onOpen.bind(this))
    this.ws.on('close', this.onDisconnect.bind(this))
    this.ws.on('disconnect', this.onDisconnect.bind(this))
    this.ws.on('error', this.onError.bind(this))
    this.ws.on('message', this.onMessage.bind(this))
  }
  onOpen() {
    // Authenticate:
    this.ws.send(`{"action":"auth","params":"rCPMgpXH80NfZSGMDjGhmPKloJHQlxbg"}`)
    this.connected = true
    // Subscribe to Crypto Trades and SIP:
    this.sendSubscriptions(this.subscriptions)
  }
  sendSubscriptions(subscriptions) {
    this.ws.send(`{"action":"subscribe","params":"${subscriptions.join(',')}"}`)
  }
  onDisconnect() {
    setTimeout(this.connect.bind(this), 2000)
  }
  onError(e) {
    console.log('Error:', e)
  }
  onMessage(data) {
    data = JSON.parse(data)
    data.map((msg) => {
      if (msg.ev === 'status') {
        console.log('Status Update:', msg.message)
      }
      this.emit(msg.ev, msg)
    })
  }
}

module.exports = Polygon
