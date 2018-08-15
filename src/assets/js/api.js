// import qs from 'qs'
import axios from 'axios'

// 接口根地址
var baseUrl = ''

/**
 * 业务异常类
 */
class BusinessError extends Error {
  constructor (code, message, data) {
    super(message)
    this.code = code
    this.name = 'BusinessError'
    this.data = data
  }
}
/**
 * 系统异常类
 */
class SystemError extends Error {
  constructor (code, message, data) {
    super(message)
    this.code = code
    this.name = 'SystemError'
    this.data = data
  }
}

// axios 配置
// axios.defaults.timeout = 10000
/* axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 'application/json;charset=UTF-8'
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  console.error('错误的传参')
  return Promise.reject(error)
}) */
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 执行 POST 请求
function post (option, vm) {
  option.method = 'POST'
  return http(option, vm)
}

// 执行 GET 请求
function get (option, vm) {
  option.method = 'GET'
  return http(option, vm)
}
function http (option, vm) {
  return new Promise((resolve, reject) => {
    axios({
      method: option.method,
      url: baseUrl + option.url,
      data: option.params || {t: Date.now()}
    }).then(function (res) {
      console.log(option.url + ' 请求成功！', res)
      if (res.data.success || res.data.code === '0000') { // 请求成功
        resolve(res.data.data)
      } else { // 业务异常
        console.error('业务异常：', res)
        let message = res.data.message || '请求失败！'
        let err = new BusinessError(res.data.code, message, res.data.data)
        errorhandle(err, reject, option, vm)
      }
    }, err => {
      console.error('请求失败！', err)
      errorhandle(err, reject, option, vm)
    }).catch(function (err) {
      console.error('请求失败！', err)
      errorhandle(err, reject, option, vm)
    })
  })
}

/* 异常处理 */
function errorhandle (err, reject, option, vm) {
  console.error(option.url, '请求失败！', err.code, '#####', err)
  var error = null
  if (err.name === 'BusinessError') {
    error = err
  } else {
    error = new SystemError(500, '非常抱歉，系统出现错误，请稍后重试！')
  }
  console.log('error = ', error)
  if (vm) {
    if (error.name === 'BusinessError') { // 业务异常
      // 没有权限
      if (error.code === 911) {
        vm.$toast({type: 'error', message: error.message})
        error.ignore = true
      }
    } else { // 系统异常
      vm.$toast('网络异常！')
    }
  }
  reject(error)
}

export default {
  http,
  post,
  get
}
