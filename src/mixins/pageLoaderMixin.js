export default {
	data() {
		return {
			pageLoader_showPage: false
		}
	},

	methods: {
		pageLoader_setLoadedLoader(value) {
			this.pageLoader_showPage = value
		},

		pageLoader_beforeRouteLeave(to, from, next) {
			this.pageLoader_setLoadedLoader(false)
			this.$emitter.emit('page-loader__page-loaded', false)
			next()
		}
	},

	mounted() {
		this.$emitter.on('page-loader__loader-loaded', this.pageLoader_setLoadedLoader)
	},

	beforeUnmount() {
		this.$emitter.off('page-loader__loader-loaded', this.pageLoader_setLoadedLoader)
	}
}