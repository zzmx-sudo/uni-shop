<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 商品轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price | toFixed}}</view>
			<!-- 商品信息主体 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏区域 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递: 免运费</view>
		</view>
		<!-- 商品描述区域 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 商品导航组件区域 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		computed: {
			...mapState('cart', []),
			...mapGetters('cart', ['cartCount'])
		},
		watch: {
			cartCount: {
				// handler属性用来定义侦听器的 function 处理函数
				handler(newValue) {
					const findResult = this.options.find(x => x.text === '购物车')
					if (findResult) {
						findResult.info = newValue
					}
				},
				// immediate 属性用来声明此侦听器，是否在页面首次加载完毕后立即调用
				immediate: true
			}
		},
		data() {
			return {
				// 商品详情对象
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			// 获取商品id
			const goods_id = options.goods_id
			// 发起请求获取商品详情
			this.getGoodsDetail(goods_id)
		},
		methods: {
			...mapMutations('cart', ['addToCart']),
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				// 通过replace先将商品详情中img标签添加display:block CSS属性
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')
				// 为data中的数据赋值
				this.goods_info = res.message
			},
			preview(i) {
				// 图片放大显示
				uni.previewImage({
					// 预览时，默认显示图片的索引
					current: i,
					// 所有图片url地址的数组
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					// 格式化goods对象
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					}
					this.addToCart(goods)
				}
			}
		},
		filters: {
			toFixed(price) {
				return Number(price).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #C00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	.goods-detail-container {
		padding-bottom: 50px;
	}

	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
