import api from "@/api";
import MESSAGES from "@/constants/MESSAGES";

export default {
	namespaced: true,

	state: {
		list: [],
		basket: [],
		activeID: null
	},

	getters: {
		basket(state) {
			return state.basket
		},

		list(state) {
			return state.list
		},

		activeID(state) {
			return state.activeID
		},

		localStorageSettings(state) {
			return {
				active: state.activeID,
				list: state.list.map(weather => {
					return {
						id: weather.id,
						name: weather.city.name,
						coord: weather.city.coord
					}
				})
			}
		}
	},

	mutations: {
		addBasket(state, value) {
			state.basket.push(value)
		},

		clearBasket(state) {
			state.basket.length = 0
		},

		add(state, value) {
			state.list.push(value)
		},

		remove(state, value) {
			state.list = state.list.filter(weather => weather.id !== value)
			if (value === state.activeID) {
				state.activeID = state.list.length ? state.list[0].id : null
			}
		},

		change(state, value) {
			state.activeID = value
		},

		updateUnits(state, rootState) {
			const units      = rootState.settings.userSettings.weatherUnits
			const temp       = units.temp.current
			const pressure   = units.pressure.current
			const windSpeed  = units.windSpeed.current
			const visibility = units.visibility.current

			state.list.forEach(weather => {
				weather.current.temp          = weather.current.services.temp[temp]
				weather.current.tempFeelsLike = weather.current.services.tempFeelsLike[temp]
				weather.current.pressure      = weather.current.services.pressure[pressure]
				weather.current.windSpeed     = weather.current.services.windSpeed[windSpeed]
				weather.current.visibility    = weather.current.services.visibility[visibility]
				weather.forecast.forEach(future => {
					future.tempMin = future.services.tempMin[temp]
					future.tempMax = future.services.tempMax[temp]
					future.periods.forEach(period => {
						period.tempMin = period.services.tempMin[temp]
						period.tempMax = period.services.tempMax[temp]
						period.timeList.forEach(time => {
							time.temp          = time.services.temp[temp]
							time.tempFeelsLike = time.services.tempFeelsLike[temp]
							time.pressure      = time.services.pressure[pressure]
							time.windSpeed     = time.services.windSpeed[windSpeed]
							time.visibility    = time.services.visibility[visibility]
						})
					})
				})
			})
		}
	},

	actions: {
		addBasket(ctx, value) {
			ctx.commit('addBasket', value)
		},

		clearBasket(ctx) {
			ctx.state.basket.forEach(id => ctx.commit('remove', id))
			ctx.commit('clearBasket')
		},

		async add(ctx, { name, coord }) {
			try {
				const weather = await ctx.dispatch('getWeather', { name, coord })
				ctx.commit('add', weather)
				ctx.commit('updateUnits', ctx.rootState)
				ctx.commit('change', weather.id)
				return Promise.resolve(MESSAGES.WEATHER.SUCCESSFULLY_ADDED)
			} catch (e) {
				return Promise.reject(e)
			}
		},

		remove(ctx, value) {
			ctx.commit('remove', value)
		},

		change(ctx, value) {
			ctx.commit('change', value)
		},

		async getWeather(ctx, { name, coord }) {
			try {
				const weather = await api.weather.getAll({ name, coord })
				const duplicate = ctx.state.list.find(el => el.id === weather.id)
				return duplicate
					? Promise.reject(MESSAGES.WEATHER.ALREADY_ADDED)
					: Promise.resolve(weather)
			} catch (e) {
				return Promise.reject(MESSAGES.GENERAL.NOT_AVAILABLE)
			}
		},

		async localStorageSettings(ctx, value) {
			try {
				for (const item of value.list) {
					const weather = await ctx.dispatch('getWeather', item)
					ctx.commit('add', weather)
					ctx.commit('updateUnits', ctx.rootState)
				}

				ctx.commit('change', value.active)
			} catch (e) {
				console.error(e)
			}
		}
	}
}