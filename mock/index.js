const jsMock = require('./js-mock')
const jsonMock = require('./json-mock')

module.exports = function (app) {
  app.use('/api', jsMock)
  app.use('/api', jsonMock)
}
