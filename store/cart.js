export default {
	// 为当前模块开启命名空间
	namespaced: true,

	// 模块的 state 数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下6个属性
		// {goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	mutations: {
		addToCart(state, goods) {
			// 根据提交的商品Id，查询购物车中是否存在这件商品
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)

			if (!findResult) {
				// 表示购物车中没有这件商品，则直接push
				state.cart.push(goods)
			} else {
				// 表示购物车中有这件商品，则让其数量+1
				findResult.goods_count++
			}

			// 将购物车数据永久存储
			this.commit('cart/savaToStorage')
		},
		savaToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		}
	},

	getters: {
		cartCount(state) {
			// reduce高阶函数，将所有商品的goods_count相加
			const c = state.cart.reduce((prev, cur) => {
				return prev + cur.goods_count
			}, 0)
			return c
		}
	}
}
