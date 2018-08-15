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
    height: 120px;
    padding: 0 40px;
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
    &:not(:first-child){
      border-top: solid 1px $list-border-color;
    }
  }
}
</style>
