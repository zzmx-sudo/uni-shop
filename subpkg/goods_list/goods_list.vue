<template>
	<view>
		<view class="goods-list">
			<block v-for="(goods, i) in goodsList" :key="i">
				<view class="goods-item">
					<!-- 左侧的盒子 -->
					<view class="goods-item-left">
						<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
					</view>
					<!-- 右侧的盒子 -->
					<view class="goods-item-right">
						<!-- 商品名称 -->
						<view class="goods-name">{{goods.goods_name}}</view>
						<!-- 商品信息 -->
						<view class="goods-info-box">
							<view class="goods-price">￥{{goods.goods_price.toFixed(2)}}</view>
						</view>
					</view>
				</view>
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
				// 默认图片地址
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
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
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 7px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				.goods-price {
					color: #C00000;
					font-size: 16px;
					font-weight: 600;
				}
			}
		}
	}
</style>
