<template>
	<view class="search-container" :style="{'background-color': bgcolor}" @click="searchClick">
		<!-- 使用 view组件模拟 input 输入框的样式 -->
		<view class="search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {

			};
		},
		props: {
			bgcolor: {
				type: String,
				default: "#C00000"
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			searchClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		// background-color: #c00000;
		height: 45px;
		padding: 0 15px;
		display: flex;
		align-items: center;

		.search-box {
			height: 30px;
			background-color: #ffffff;
			// border-radius: 18px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.placeholder {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>
