# 滚动组件
### 一、简单示例
#### 1.  属性
##### 1) scrollbar - 是否显示滚动条
* true : 根据内容判断是否显示滚动条（默认）
* false : 不显示滚动条
##### 2) bounce - 是否显示回弹动画
* true : 显示回弹动画（默认）
* false : 不显示回弹动画
##### 3) wrapperBgColor - 包裹器背景色
* 即上拉、下拉漏出的底色， 默认： #f9f9f9
##### 4) contentBgColor - 内容区域背景色
* 默认： #fff
#### 2. 样式要求
组件外面需要包裹可以相对定位的元素，如：示例中的scroll-pane，可滚动区域的大小与该元素大小相同
```
<template>
  <scroll :scrollbar="true" :bounce="true" wrapperBgColor="#f9f9f9" contentBgColor="#fff">
    <h1>1</h1>
    <h1>2</h1>
    <h1>3</h1>
    <h1>4</h1>
    <h1>5</h1>
    <h1>6</h1>
    <h1>7</h1>
    <h1>8</h1>
    <h1>9</h1>
    <h1>10</h1>
    <h1>11</h1>
    <h1>12</h1>
  </scroll>
</template>
<script>
import Scroll from '@/components/scroll/Scroll'
export default {
  components: {
    Scroll
  }
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 64px;
  line-height: 2;
  text-align: center;
}
</style>
```
### 二、列表示例
#### 1.  功能
##### 1) 上拉加载
##### 2) 下拉刷新
```
<template>
  <scroll-list :dataList="dataList" @pullUpEvent="pullUpEvent" ref="scroll"
               @pullDownEvent="pullDownEvent">
    <ul class="data-list" slot="list" v-if="dataList.length > 0">
      <li class="item" v-for="item in dataList" :key="item.id" @click="selectItem(item)">
        <div class="title">{{item.title}}</div>
        <div class="date">{{item.articleDate}}</div>
      </li>
    </ul>
    <not-found slot="list" v-else-if="pageNo > 0"></not-found>
  </scroll-list>
</template>
<script>
import ScrollList from '@/components/scroll/ScrollList.vue'
import NotFound from '@/components/NotFound.vue'

export default {
  name: 'ScrollListView',
  data () {
    return {
      pageSize: 10, // 每页大小
      pageNo: 0, // 页码
      count: 0, // 数据总数
      dataList: [], // 列表数据
      isLoading: false // 是否正在加载中
    }
  },
  created () {
    this.getList(1)
  },
  methods: {
    // 获取列表数据
    getList (pageNo) {
      this.isLoading = true
      pageNo = pageNo || this.pageNo + 1
      return this.$api.post({
        url: '/api/article/list',
        params: {pageSize: this.pageSize, pageNo}
      }, this).then(data => {
        this.pageNo = data.page.pageNo
        this.count = data.page.count
        if (this.pageNo > 1) {
          this.dataList = [...this.dataList, ...data.page.list]
        } else {
          this.dataList = data.page.list
        }
        this.isLoading = false
      }, e => {
        if (e.name === 'BusinessError' && !e.ignore) {
          this.$toast(e.message)
        }
        this.isLoading = false
      })
    },
    // 上拉加载
    pullUpEvent () {
      if (this.isLoading) return
      let dataCount = this.count // 总条数
      let pageCount = Math.ceil(dataCount / this.pageSize) // 计算出总共页数
      if (this.pageNo >= pageCount) {
        this.finish('PullUp')
        this.noData()
        return
      }
      this.getList().then(() => {
        this.finish('PullUp')
      })
    },
    // 下拉刷新
    pullDownEvent () {
      if (this.isLoading) return
      this.getList(1).then(() => {
        this.finish('PullDown')
      })
    },
    // 点击li事件
    selectItem (item) {
      console.log('点击了列表', item)
    },
    // 修改scroll组件的完成状态
    finish (type) {
      this.$refs.scroll.finish(type)
    },
    // 显示没有数据了
    noData () {
      this.$refs.scroll.noData()
    }
  },
  components: {
    ScrollList,
    NotFound
  }
}
</script>
<style lang="scss" scoped>
.data-list{
  padding-bottom: 36px;
  background-color: #fff;
  .item {
    width: 690px;
    height: 180px;
    margin: 0 auto;
    border-top: solid 1px #6dafff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 30px;
    .title {
      width: 468px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .date {
      color: #999
    }
  }
}
</style>
```
### 三、横向滚动示例
#### 1.  相关属性
##### 1) scrollX
是否支持横向滚动
##### 2) scrollY
是否支持纵向滚动
#### 2. 样式要求
* 内容必须为行内元素并且不能折行

```
<template>
  <div class="nav-wrap">
    <scroll :scrollbar="false" :scrollX="true" :scrollY="false">
      <ul class="nav">
        <li>推荐</li>
        <li>娱乐</li>
        <li>视频</li>
        <li>生活</li>
        <li>资讯</li>
        <li>时尚</li>
        <li>美妆</li>
        <li>健康</li>
        <li>体育</li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Scroll from '@/components/scroll/Scroll'
export default {
  name: 'ScrollHorizontal',
  components: {
    Scroll
  }
}
</script>
<style lang="scss" scoped>
$nav-height: 92px;
.nav-wrap{
  position: relative;
  height: $nav-height;
}
.nav{
  display: inline-flex;
  flex-wrap: nowrap;
  height: $nav-height;
  min-width: 750px;
  padding: 0 30px;
  background-color: #f5fffc;
  li {
    line-height: $nav-height;
    font-size: 36px;
    text-align: center;
    white-space: nowrap;
    padding: 0 40px;
  }
}
</style>
```
### 四、重新初始化滚动态条示例
#### 1. 相关属性
##### 1) eventId
事件ID
#### 2. 执行方式
* 通过全局的EventBus发布重新初始化滚动条事件，事件名称为‘init-scroll-’ + eventId
* 事件参数为布尔类型：如果为true, 表示重新初始化时保持滚动条的位置

```
<scroll eventId="scrollPageHasImages">
    ...
</scroll>
```
```
this.$eventBus.$emit('init-scroll-scrollPageHasImages', true)
```

