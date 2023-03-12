<template>
	<view>
		<!-- 收获地址区域 -->
		<take-addres></take-addres>
		<!-- 商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧的文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 循环渲染购物车中的商品信息 -->
		<!-- 滑动删除组件 -->
		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClick(goods)">
					<goods-item :goods="goods" :showRadio="true">
						<radio slot="radio" color="#C00000" :checked="goods.goods_state" @click="raidoClick(goods)">
						</radio>
						<uni-number-box slot="numberbox" :min="1" :value="goods.goods_count"
							@change="numberChange($event, goods)">
						</uni-number-box>
					</goods-item>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
	</view>
</template>

<script>
	import BadgeMix from '@/mixins/tarbar_badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		mixins: [BadgeMix],
		computed: {
			...mapState('cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: "删除",
					style: {
						backgroundColor: "#C00000"
					}
				}]
			};
		},
		onLoad() {
			console.log(this.cart);
		},
		methods: {
			...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoods']),
			raidoClick(goods) {
				goods.goods_state = !goods.goods_state
				// 将修改保存到本地存储
				this.updateGoodsState(goods)
				// 修改界面总价
			},
			numberChange(val, goods) {
				goods.goods_count = val
				// 将修改保存到本地存储
				this.updateGoodsCount(goods)
				// 修改界面总价
			},
			swipeItemClick(goods) {
				this.removeGoods(goods)
				// 修改界面总价
			}
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
