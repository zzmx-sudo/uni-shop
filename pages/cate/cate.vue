<template>
	<view>
		<!-- 使用自定义搜索组件 -->
		<search @click='gotoSearch'></search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view scroll-y="true" :style="{height: windowHeight + 'px'}" class="left-scroll-view">
				<view class="left-scroll-view-item" v-for="(item, i) in cateList" :key="i" @click="changeCatId(i)"
					:class="{active: currentId === i}">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧滑动的区域 -->
			<scroll-view scroll-y="true" :style="{height: windowHeight + 'px'}" :scroll-top="scrollTop">
				<view class="right-scroll-view-item" v-for="(item2, i2) in childList" :key="i2">
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon.replace('dev', 'web')"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import BadgeMix from '@/mixins/tarbar_badge.js'

	export default {
		mixins: [BadgeMix],
		data() {
			return {
				// 画面可用高度
				windowHeight: 0,
				// 分类数据列表
				cateList: [],
				// 被选中的一级分类id
				currentId: 0,
				// 二级分类数据列表
				childList: [],
				// 定义右侧滚动区域Y轴的值
				scrollTop: 0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.windowHeight = sysInfo.windowHeight - 45

			// 获取分类数据
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.childList = this.cateList ? this.cateList[0].children : []
			},
			changeCatId(id) {
				this.currentId = id
				this.childList = this.cateList[id].children
				// scroll-top的值有变化才会滚动，因此让其在0和1之间切换
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 20px 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>
