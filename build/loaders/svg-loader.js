/**
 * 向app.js中注入自定义svg的代码
 * @date 2018/4/17
 */
'use strict'

const fs = require('fs')
const path = require('path')
const iconConfigPath = require.resolve('../../config/icon');

module.exports = function (source) {
  // 删除require缓存
  delete require.cache[iconConfigPath]

  const iconConfig = require(iconConfigPath)
  const svgDir = iconConfig.svgDir
  const prefix = iconConfig.prefix

  // 验证`svg`文件夹
  try {
    if (!fs.statSync(svgDir).isDirectory()) {
      throw new Error(`Invalid directory of svg: ${svgDir}`)
    }
  } catch (err) {
    this.emitError(err)
    return source
  }

  // 监听`svg`文件夹变化
  this.addContextDependency(svgDir)

  // 监听`config/icon.js`文件变化
  this.addDependency(iconConfigPath)

  // 从svg文件夹中取
  fs.readdirSync(svgDir).forEach(file => {
    let svg = fs.readFileSync(path.resolve(svgDir, file), 'utf8')
    let sizeMatch = svg.match(/ viewBox="0 0 (\d+) (\d+)"/)
    let dMatch = svg.match(/ d="([^"]+)"/g)
    // let dMatch = svg.match(/(?<= d=")([^"]+)(?=")/)
    let svgName = prefix + path.basename(file, path.extname(file))

    if (!sizeMatch || !dMatch) {
      return
    }
    let ds = dMatch.map(item => {
      return item.substring(4, (item.length - 1))
    })
    // 注册使用到的svg
    source += `Icon.register(
            {
                '${svgName}': {
                    width: ${parseInt(sizeMatch[1], 10)},
                    height: ${parseInt(sizeMatch[2], 10)},
                    d: ${JSON.stringify(ds)}
                }
            });`
  })
  return source
}
