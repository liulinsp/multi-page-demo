'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const utils = require('./utils');
const webpackConfig = require('./webpack.prod.conf')
const spinner = ora('building for production...')

const program = require('commander')
program
  .version('0.0.1')
  .option('-s, --start', 'Start Service')
  .option('-p, --port', 'Service Port')
  .option('-pub, --publish', 'Publish APP Codes')
  .parse(process.argv)
// 是否需要启动服务
let isNeedStart = program.start
//是否需要发布到服务器
let isNeedPublish = program.publish
// 服务的端口号
let port = program.port || 8181
// 本机IP
let localIP = config.localIP
let assetsRoot = config.build.assetsRoot
spinner.start()

// rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
rm(path.join(assetsRoot), err => {
  if (err) throw err
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
    // console.log(chalk.yellow(
    //   '  Tip: built files are meant to be served over an HTTP server.\n' +
    //   '  Opening index.html over file:// won\'t work.\n'
    // ))
    if(isNeedStart) {
      startServer()
    }
    if(isNeedPublish){
      publishApp()
    }
  })
})

/* 启动服务 */
function startServer() {
  const express = require('express')
  const http = require('http')
  const app = express()
  // const history = require('connect-history-api-fallback')
  const proxyMiddleWare = require("http-proxy-middleware")

  // let rewrites = utils.getHistoryRewrites('./src/pages')
  // app.use(history({rewrites}))
  app.use(express.static(path.resolve(__dirname, '../dist')))
  app.use('/api', proxyMiddleWare({
    target: 'http://localhost:9090',
    changeOrigoin: true
  }))

  let server = http.createServer(app)
  let conf = {
    ip: localIP,
    port
  }
  server.listen(conf.port, conf.ip, function (error) {
    if (error) {
      console.error('Unable to listen for connections', error)
      process.exit(10)
    }
    console.info('listening on http://' +
      conf.ip + ':' + conf.port)
  })

  let opn = require('opn')
  opn(`http://${conf.ip}:${conf.port}`)
}

/* 发布应用代码 */
function publishApp () {
  const SSH2Utils = require('ssh2-utils');
  const ssh = new SSH2Utils();

  let server = {
    host: config.publish.remoteHost,
    port: config.publish.remotePort,
    username: config.publish.remoteUsername,
    password: config.publish.remotePassword
  }
  let remotePath = config.publish.remotePath
  let localPath = assetsRoot
  // console.log(server, localPath, remotePath)
  ssh.putDir(server, localPath, remotePath, function(err,server,conn){
    if(err){
      console.error("发布到测试服务器失败",err)
    }else{
      console.log(chalk.cyan("成功发布到测试服务器!"))
      conn.end()

      let opn = require('opn')
      let uri = config.publish.webUrl;
      opn(uri)
    }
  })
}


