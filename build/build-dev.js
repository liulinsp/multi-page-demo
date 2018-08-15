/**
 * 开发环境打包，用于错误调试
 */
'use strict'
require('./check-versions')()

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const utils = require('./utils');
const webpackDev = require('./webpack.dev.conf')
const spinner = ora('building for production...')

let assetsRoot = config.build.assetsRoot

spinner.start()
webpackDev.then(webpackConfig => {
  rm(path.join(assetsRoot), err => {
    webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'))
    })
  })
})

