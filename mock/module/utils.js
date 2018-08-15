const fs = require('fs')
const path = require('path')

module.exports = {
  // 读取json文件
  getJsonFile (filePath) {
    // 读取指定json文件
    var json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
    console.log('json', json)
    // 解析并返回
    return JSON.parse(json)
  }
}
