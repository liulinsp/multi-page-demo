/**
 * toast 提示组件
 * @author liu_lin_sp@126.com
 * @date 2018/5/29
 */
import Vue from 'vue'
import Toast from './toast.vue'

// toast构造函数
const ToastConstructor = Vue.extend({
  extends: Toast
})
// toast实例池
let toastPool = []

/** 获取toast实例（实例池中有从池中取，没有则新建） */
let getInstance = () => {
  // console.log('toastPool:', toastPool)
  if (toastPool.length > 0) {
    return toastPool.shift()
  }
  return new ToastConstructor({
    el: document.createElement('div')
  })
}

/** 归还实例到实例池 */
let returnInstance = instance => {
  if (instance) {
    toastPool.push(instance)
    // console.log('归还实例:', instance, toastPool)
  }
}

/** 文档中移除toast的DOM节点 */
function removeDom (event) {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

// 关闭
ToastConstructor.prototype.close = function () {
  this.visible = false // 不可见
  this.closed = true // 关闭状态
  this.$el.addEventListener('transitionend', removeDom) // 动画完成后移除DOM节点
  returnInstance(this) // 实例对象归还到实例池，实例可以重复利用
}

// 显示toast提示信息
export default function (options = {}) {
  // 显示时间，默认3秒
  let duration = options.duration || 3000
  let instance = getInstance()
  // console.log('instance=', instance)
  // 显示类型
  instance.type = options.type || 'normal'
  // 显示内容
  instance.message = typeof options === 'string' ? options : options.message
  // 显示位置：top、middle、bottom
  instance.position = options.position || 'middle'
  instance.className = options.className || ''
  // 移除动画完成事件
  instance.$el.removeEventListener('transitionend', removeDom)
  // console.log('instance.$el=', instance.$el)
  // 将节点添加到文档
  document.body.appendChild(instance.$el)

  instance.visible = true
  instance.closed = false

  // 清除定时器
  instance.timer && clearTimeout(instance.timer)
  // 设置定时器，关闭toast
  instance.timer = setTimeout(() => {
    console.log('关闭', instance)
    !instance.closed && instance.close()
    instance.timer = null
  }, duration)
}
