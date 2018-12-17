'use strict'
const path = require('path')
const fs = require('fs')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.publicPath = function (_path) {
  const publicDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath

  return path.posix.join(publicDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// 在pageDir中寻找各个页面入口
exports.getEntries = function (pageDir, entryPath, folders) {
  let entry = {}
  let pageDirPath = path.join(__dirname, '..', pageDir)
  folders = folders ||  []

  fs.readdirSync(pageDirPath)
     // 发现文件夹，就认为是页面模块
    .filter(function (f) {
      return fs.statSync(path.join(pageDirPath, f)).isDirectory()
    })
    .forEach(function (f) {
      let tempEntryFilePath = path.join(__dirname, '..', [pageDir, f, entryPath].join('/'))
      // 如果有entry.js文件说明是页面，否则是目录
      let isPage = fs.existsSync(tempEntryFilePath)
      if (!isPage) { // 如果是目录，则继续遍历
        let subEntry = exports.getEntries(pageDir + '/' + f, entryPath, [...folders, f])
        Object.assign(entry, subEntry)
      } else { // 如果是页面，添加入口js
        let entryName = [...folders, path.basename(f)].join('_')
        entry[entryName] = [pageDir, f, entryPath].join('/')
      }
    })
  return entry
}
/*
exports.getEntries = function (pageDir, entryPath) {
  var entry = {}
  var pageDirPath = path.join(__dirname, '..', pageDir)
  fs.readdirSync(pageDirPath)
  // 发现文件夹，就认为是页面模块
    .filter(function (f) {
      return fs.statSync(path.join(pageDirPath, f)).isDirectory()
    })
    .forEach(function (f) {
      entry[path.basename(f)] = [pageDir, f, entryPath].join('/')
    })
  return entry
}
*/

exports.getHistoryRewrites = function (pageDir) {
  let pageDirPath = path.join(__dirname, '..', pageDir)
  return fs.readdirSync(pageDirPath)
  // 发现文件夹，就认为是页面模块
    .filter(f => {
      return fs.statSync(path.join(pageDirPath, f)).isDirectory()
    })
    .map( f => {
      let page = path.basename(f)
      let toFile = exports.publicPath(page + '.html')
      console.log('########### page = ', page, 'toFile = ', toFile)
      return {
        from: new RegExp('^\\/' + page + '.*$'),
        to: toFile
      }
    })
}


