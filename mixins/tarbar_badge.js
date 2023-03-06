import {
	mapGetters
} from 'vuex'

export default {
	computed: {
		...mapGetters('cart', ['cartCount'])
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				// text属性必须为字符串
				text: this.cartCount + ''
			})
		}
	}
}
