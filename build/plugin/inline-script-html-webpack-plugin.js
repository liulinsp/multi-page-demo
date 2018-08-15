/**
 * html中插入js代码插件
 * @author liu_lin_sp@126.com
 * @date 2018/7/10
 */
const uglifyJS = require('uglify-js')
const fs = require('fs')
const path = require('path')

const HEAD_TAG_REG = /\<\/head\>/

function InlineScriptPlugin(options) {
  this.filePath = options.filePath
}

InlineScriptPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin(
      'html-webpack-plugin-before-html-processing',
      (data, cb) => {
        let jsPath = this.filePath
        let jsStr = uglifyJS.minify(fs.readFileSync(jsPath, 'utf-8').toString()).code
        let newHtml = data.html.replace(HEAD_TAG_REG, `<script type="text/javascript">${jsStr}</script></head>`)
        data.html = newHtml
        cb(null, data)
      }
    )
  })
}

module.exports = InlineScriptPlugin
