<template>
	<view>
		<!-- 商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧的文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 循环渲染购物车中的商品信息 -->
		<block v-for="(goods, i) in cart" :key="i">
			<goods-item :goods="goods"></goods-item>
		</block>
	</view>
</template>

<script>
	import BadgeMix from '@/mixins/tarbar_badge.js'
	import {
		mapState
	} from 'vuex'

	export default {
		mixins: [BadgeMix],
		computed: {
			...mapState('cart', ['cart'])
		},
		data() {
			return {

			};
		},
		onLoad() {
			console.log(this.cart);
		}
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 6px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 6px;
		}
	}
</style>
