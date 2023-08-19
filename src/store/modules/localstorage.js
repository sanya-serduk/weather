export default {
	namespaced: true,

	state: {
		loaded: false
	},

	getters: {
		loaded(state) {
			return state.loaded
		}
	},

	mutations: {
		loaded(state, value) {
			state.loaded = value
		}
	},

	actions: {
		async init(ctx) {
			try {
				const root = { root: true }
				const ls = JSON.parse(localStorage.getItem('root'))

				if (ls.settings) {
					ctx.dispatch('settings/localStorageSettings', ls.settings, root)
				}

				if (ls.weather) {
					await ctx.dispatch('weather/localStorageSettings', ls.weather, root)
				}
			} catch (e) {
				localStorage.clear()
			} finally {
				ctx.commit('loaded', true)
			}
		}
	}
}