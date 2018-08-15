// 数据上拉加载完成
export const NO_DATA = '亲，没数据了哦'
// 加载数据提示信息
export const LOADING_TIP = '正在拼命加载中...'
// 上拉加载更多提示信息
export const LOADING_MORE = '上拉加载更多'
// 加载中提示信息
export const LOADING_MSG = '加载中...'
// 上拉加载默认状态
export const PULLUP_STATE = '当前状态：上拉加载'
// 下拉加载默认状态
export const PULLDOWN_STATE = '当前状态：下拉加载更多'
// 上拉距离多少时执行加载
export const UP_THRES_SHOLD = -60
// 当下拉到超过顶部多少像素时，触发 pullingDown 事件
export const DOWN_THRES_SHOLD = 120
// 下拉刷新后回滚(刷新数据的过程中，回弹停留在距离顶部还有多少像素的位置,在刷新数据完成之后，调用 finishPullDown 方法，回弹到顶部)
export const STOP = 100
