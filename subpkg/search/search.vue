<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" cancelButton="none" radius="100"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list" v-if="historyList.length !== 0">
				<uni-tag v-for="(qs, i) in histroies" :key="i" :text="qs" @click="gotoGoodsList(qs)">
				</uni-tag>
			</view>
			<view v-else class="history-empty">当前搜索历史为空</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				qs: '',
				// 搜索的结果列表
				searchResults: [],
				// 搜索历史
				historyList: []
			};
		},
		onLoad() {
			// 页面加载时，获取存在在本地的搜索历史列表
			this.historyList = JSON.parse(uni.getStorageSync('qs') || '[]')
		},
		methods: {
			input(e) {
				// 防抖
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.qs = e
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.qs === '') {
					this.searchResults = []
					return
				}

				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.qs
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				// 搜索到数据后，将搜索关键字加入搜索列表
				this.saveSearchHistory()
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			gotoGoodsList(qs) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + qs
				})
			},
			saveSearchHistory() {
				// this.historyList.push(this.qs)
				// 搜索关键字存在时不添加
				const set = new Set(this.historyList)
				// 若搜索关键字存在，则会先删除再添加，先删除再添加可保证顺序
				set.delete(this.qs)
				set.add(this.qs)
				this.historyList = Array.from(set)
				// 对搜索列表进行本地存储
				uni.setStorageSync('qs', JSON.stringify(this.historyList))
			},
			clearHistory() {
				this.historyList = []
				uni.setStorageSync('qs', '[]')
			}
		},
		computed: {
			// 使用计算属性，返回原搜索历史列表反转后生成的列表
			histroies() {
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
				background-color: white;
				color: black;
				border: none;
			}
		}
	}

	.history-empty {
		font-size: 12px;
	}
</style>
