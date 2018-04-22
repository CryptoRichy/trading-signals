require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cp = require('child_process')

let notifications = cp.fork(__dirname + '/notifications/controller', ['child'])

server.listen(process.env.PORT, process.env.IP)

app.use(morgan('short'))

app.use(cors())

app.use(express.static('./client/build'))

app.get('/', function (req, res) {
  res.sendfile('index.html')
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

io.on('connection', function (socket) {
  notifications.on('message', (data) => {
    data.time = (new Date).toLocaleString()
    socket.emit('all', data)
  })
})

console.log(`Server on port: ${process.env.PORT}`)
