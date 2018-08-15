# toast提示组件
框架注入了toast插件，设置了静态方法$toast

### 使用示例
##### 1. 简单使用
```
vm.$toast('网络异常！')
```
##### 2. 使用options参数

```
vm.$toast({
  message: '网络异常！',
  duration: 2000,
  position: 'middle',
  className: 'big'
})
```
* message 提示信息内容
* duration 停留时间，单位为毫秒
* position 显示位置：top、middle、bottom
* className 样式名称

##### 2. 错误提示
```
vm.$toast({
  message: '验证码错误！',
  duration: 2000,
  type: 'error'
})
```

