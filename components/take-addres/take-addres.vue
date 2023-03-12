<template>
	<view>
		<!-- 选择收获地址的盒子 -->
		<view class="address-choose-box" v-if="Object.keys(address).length === 0">
			<button type="primary" size="mini" class="btn-choose-address">请选择收货地址</button>
		</view>

		<!-- 渲染收获信息的盒子 -->
		<view class="address-info-box" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">收获人：aaa</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：11111111111</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收获地址：</view>
				<view class="row2-right">江西省景德镇市***江西省景德镇市***江西省景德镇市***江西省景德镇市***</view>
			</view>
		</view>

		<!-- 底部的边框线 -->
		<image src="/static//cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	export default {
		name: "take-addres",
		data() {
			return {
				address: {}
			};
		}
	}
</script>

<style lang="scss">
	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn-choose-address {}
	}

	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;
			margin-bottom: 5px;

			.row1-right {
				display: flex;
				justify-content: space-between;
			}
		}

		.row2 {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>
