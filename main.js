// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
// 导入网络请求的包
import {
	$http
} from '@escook/request-miniprogram'

// 注册全局$http
uni.$http = $http

// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'

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

// 挂载全局显示弹框消息方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
