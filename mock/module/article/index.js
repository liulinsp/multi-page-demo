const router = require('express').Router()
const Mock = require('mockjs')
const utils = require('../utils')
router.post('/list', function (req, res) {
  let data = buildData(req, res)
  setTimeout(() => {
    res.json(data)
  }, 1000)
})

function buildData (req, res) {
  let count = 26 // 列表总数
  console.log('req.body = ', req.body)
  let pageNo = req.body.pageNo || 1
  let pageSize = req.body.pageSize || 10
  let num = pageSize
  if (count - (pageNo - 1) * pageSize < pageSize) {
    num = count - (pageNo - 1) * pageSize
  }
  console.log('num=', num, ', pageSize=', req.body.pageSize, 'pageNo=', req.body.pageNo)
  let result = {
    success: true,
    code: '0000',
    message: '成功',
    data: {
      page: {
        pageNo,
        pageSize,
        count,
        list: []
      }
    }
  }
  var json = utils.getJsonFile('./article/data/article.json')
  for (let i = 0; i < num; i++) {
    result.data.page.list.push(Mock.mock(json))
  }
  return result
}
module.exports = router
