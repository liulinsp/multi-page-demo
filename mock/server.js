const express = require('express')
const conf = require('./config')
const http = require('http')
const bodyParser = require('body-parser')
const app = express()
const jsMock = require('./js-mock')
const jsonMock = require('./json-mock')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

var server = http.createServer(app)
server.listen(conf.port, conf.ip, function (error) {
  if (error) {
    console.error('Unable to listen for connections', error)
    process.exit(10)
  }
  console.info('模拟接口 listening on http://' +
    conf.ip + ':' + conf.port)
})
app.use('/api', jsMock)
app.use('/api', jsonMock)
