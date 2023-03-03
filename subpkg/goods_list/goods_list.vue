<template>
	<view>
		<view class="goods-list">
			<block v-for="(goods, i) in goodsList" :key="i">
				<goods-item :goods="goods"></goods-item>
			</block>
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
			async getGoodsList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status !== 200) return uni.$showMsg()

				this.goodsList = res.message.goods
				this.total = res.message.total
				this.queryObj.pagenum += 1
			}
		}
	}
</script>

<style lang="scss">

</style>
