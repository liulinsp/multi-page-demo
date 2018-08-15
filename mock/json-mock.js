const path = require('path')
const url = require('url')
const fs = require('fs')
const router = require('express').Router()

router.use('*', (req, res) => {
  let pathname = url.parse(req.baseUrl).pathname
  let endIndex = pathname.lastIndexOf('.do')
  if (endIndex > -1) {
    pathname = pathname.substring(0, endIndex)
  }
  console.log(pathname)
  let params = url.parse(req.url, true).query
  console.log(pathname, '[params] = ', params)
  console.log(pathname, '[data] = ', req.body)
  let dataPath = path.resolve(__dirname, './data' + pathname + '.json')
  console.log('dataPath = ', dataPath)
  let data = fs.readFileSync(dataPath, 'utf-8')
  // 模拟服务端接口调用延时
  setTimeout(function () {
    res.send(data)
    res.end()
  }, 600)
})
module.exports = router
