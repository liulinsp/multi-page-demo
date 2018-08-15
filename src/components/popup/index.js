/**
 * 弹出窗口组件
 * @author liu_lin_sp@126.com
 */
import Vue from 'vue'
import Popup from './Popup.vue'

// Popup构造函数
const PopupConstructor = Vue.extend({
  extends: Popup
})

// 显示弹出窗口
export default function (options = {}) {
  let instance = new PopupConstructor({
    el: document.createElement('div')
  })
  // console.log('instance=', instance)
  // 窗口辩题
  instance.title = typeof options === 'string' ? options : options.title
  // 显示内容
  instance.message = typeof options === 'string' ? options : options.message
  // 窗口宽度
  instance.width = typeof options.width === 'number' && options.width >= 100 && options.width <= 700 ? options.width : 500
  // 窗口高度
  instance.height = typeof options.height === 'number' && options.height >= 100 && options.height <= 1200 ? options.height : 300
  // 自定义样式名
  instance.className = options.className || ''
  // 父节点
  let parentElement = options.parentElement || document.body
  // 关闭时移除
  instance.$on('input', visible => {
    if (!visible) {
      instance.$refs.popBox.addEventListener('transitionend', event => {
        // 动画完成后移除DOM节点
        // parentElement.removeChild(instance.$el)
        if (event.target.parentNode && event.target.parentNode.parentNode) {
          event.target.parentNode.parentNode.removeChild(event.target.parentNode)
        }
        // 销毁组件
        instance.$destroy()
      })
    }
  })
  // console.log('instance.$el=', instance.$el)
  // 将节点添加到文档
  parentElement.appendChild(instance.$el)

  instance.visible = true
  instance.closed = false
}
