<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<goods-item :goods="goods"></goods-item>
			</view>
		</view>
		<view class="bottom-box" v-if="queryObj.pagenum >= maxPageNum">
			<view class="buttom-text">
				我可是有底线的哦...
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					// 查询关键字
					query: '',
					// 商品分类id
					cid: '',
					// 页码数
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10,
				},
				// 商品列表
				goodsList: [],
				// 商品总数
				total: 0,
				// 最大页码数
				maxPageNum: 2,
				// 节流阀
				isloading: false
			};
		},
		onLoad(options) {
			// 发起请求，加载首页数据
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''

			console.log(this.queryObj);
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cb) {
				// 打开节流阀
				this.isloading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				//关闭节流阀
				this.isloading = false
				// 只要数据请求完毕，就立即按需调用 cb 回调函数
				cb && cb()
				if (res.meta.status !== 200) return uni.$showMsg()

				// 请求成功后才让页码+1
				this.queryObj.pagenum++
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				this.calcPageCount()
			},
			calcPageCount() {
				if (this.total % this.queryObj.pagesize) {
					this.maxPageNum = parseInt(this.total / this.queryObj.pagesize) + 1
				} else {
					this.maxPageNum = parseInt(this.total / this.queryObj.pagesize)
				}
			},
			gotoDetail(goods) {
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods.goods_id
				})
			}
		},
		// 上拉触底事件
		onReachBottom() {
			// 当节流阀打开时，直接返回
			if (this.isloading) return
			// 当页码达到最大页码后，直接返回
			if (this.queryObj.pagenum > this.maxPageNum) return
			this.getGoodsList()
		},
		// 下拉刷新事件
		onPullDownRefresh() {
			// 重置页面数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.maxPageNum = 2
			this.goodsList = []

			// 重新发起请求，请求完成后关闭上拉刷新事件
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	.bottom-box {
		margin-top: 10px;
		padding: 0 20px;

		.buttom-text {
			padding-top: 5px;
			font-size: 14px;
			color: #808080;
			border-top: 1px solid #f0f0f0;
			text-align: center;
		}
	}
</style>
