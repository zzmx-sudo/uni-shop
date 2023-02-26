
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'

// 注册全局$http
uni.$http = $http

// 配置请求拦截器
// 网络请求前拦截器，显示loading效果
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中'
	})
}
// 网络请求后拦截器，关闭loading效果
$http.afterRequest = function() {
	uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif