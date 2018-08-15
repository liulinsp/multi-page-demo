// import qs from 'qs'
import axios from 'axios'

// 接口根地址
/* eslint-disable no-undef */
var baseUrl = ''

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8' // 'application/x-www-form-urlencoded;charset=UTF-8'

// POST传参序列化
/* axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  console.error('错误的传参')
  return Promise.reject(error)
}) */
// 执行 POST 请求
function post (opt) {
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + opt.url, opt.params)
      .then(res => {
        if (res.data.success || res.data.retCode === '0000') { // 请求成功
          resolve(res.data)
        } else { // 请求服务端错误
          console.error('请求失败！', res)
          reject(new Error('请求异常', res.data))
        }
      }, err => {
        console.error('请求失败！', err)
        reject(err)
      })
      .catch((err) => {
        console.error('请求失败！', err)
        reject(err)
      })
  })
}

// 执行 GET 请求
function get (opt) {
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + opt.url, {params: opt.params})
      .then(function (res) {
        if (res.data.success || res.data.retCode === '0000') { // 请求成功
          // console.log(res.data)
          resolve(res.data)
        } else { // 请求服务端错误
          console.error('请求失败！', res)
          reject(new Error('请求异常', res.data))
        }
      }, err => {
        console.error('请求失败！', err)
        reject(err)
      })
      .catch(function (err) {
        console.error('请求失败！', err)
        reject(err)
      })
  })
}

export default {
  post,
  get
}
