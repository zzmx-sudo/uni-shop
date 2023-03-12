<template>
	<view>
		<view class="goods-item">
			<!-- 左侧的盒子 -->
			<view class="goods-item-left">
				<slot name="radio"></slot>
				<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
			</view>
			<!-- 右侧的盒子 -->
			<view class="goods-item-right">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods.goods_name}}</view>
				<!-- 商品信息 -->
				<view class="goods-info-box">
					<view class="goods-price">￥{{goods.goods_price | toFixed}}</view>
					<slot name="numberbox"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goods-item",
		data() {
			return {
				// 默认图片地址
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		props: {
			goods: {
				type: Object,
				default: {}
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
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 7px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					color: #C00000;
					font-size: 16px;
					font-weight: 600;
				}
			}
		}
	}
</style>
