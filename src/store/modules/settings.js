export default {
	namespaced: true,

	state: {
		maxWeatherCard: 4,

		userSettings: {
			searchServices: {
				path: 'searchServices',
				current: 'openweathermap',
				types: {
					yandex: 'yandex',
					openweathermap: 'openweathermap'
				},
				symbol: {
					yandex: 'Яндекс',
					openweathermap: 'OpenWeatherMap'
				}
			},

			weatherUnits: {
				temp: {
					path: 'weatherUnits/temp',
					current: 'metric',
					types: {
						metric: 'metric',
						imperial: 'imperial'
					},
					symbol: {
						metric: 'C',
						imperial: 'F'
					}
				},

				pressure: {
					path: 'weatherUnits/pressure',
					current: 'metric',
					types: {
						metric: 'metric',
						mmHg: 'mmHg'
					},
					symbol: {
						metric: 'ГПа',
						mmHg: 'мм рт.ст.'
					}
				},

				windSpeed: {
					path: 'weatherUnits/windSpeed',
					current: 'm',
					types: {
						m: 'm',
						km: 'km'
					},
					symbol: {
						m: 'м/с',
						km: 'км/ч'
					}
				},

				visibility: {
					path: 'weatherUnits/visibility',
					current: 'km',
					types: {
						m: 'm',
						km: 'km'
					},
					symbol: {
						m: 'м',
						km: 'км'
					}
				}
			}
		}
	},

	getters: {
		maxWeatherCard(state) {
			return state.maxWeatherCard
		},

		userSettings(state) {
			return state.userSettings
		},

		symbolsOfCurrentUserSettings(state) {
			const helper = (obj) => {
				const result = {}

				for (const key in obj) {
					const node = obj[key]
					result[key] = node.hasOwnProperty('current')
						? node.symbol?.[node.current] || ''
						: helper(node)
				}

				return result
			}

			return helper(state.userSettings)
		},

		localStorageSettings(state) {
			const helper = (obj) => {
				if (obj.hasOwnProperty('current'))
					return obj.current

				const result = {}

				for (const key in obj) {
					result[key] = helper(obj[key])
				}

				return result
			}

			return helper(state.userSettings)
		}
	},

	mutations: {
		changeUserSetting(state, { path, value }) {
			const prop = path
				.split('/')
				.reduce((acc, curr) => {
					return acc ? acc[curr] : undefined
				}, state.userSettings)

			if (prop) {
				prop.current = prop.types[value] || prop.current
			}
		},

		localStorageSettings(state, value) {
			const stack = [{
				state: state.userSettings,
				ls: value
			}]

			while (stack.length > 0) {
				const node = stack.pop()

				for (const key in node.ls) {
					if (!node.state.hasOwnProperty(key))
						continue

					const state = node.state[key]
					const ls = node.ls[key]

					switch (typeof ls) {
						case "string":
							state.current = state.types[ls] || state.current
							break

						case "object":
							stack.push({state, ls })
							break
					}
				}
			}
		}
	},

	actions: {
		changeUserSetting(ctx, { path, value }) {
			ctx.commit('changeUserSetting', { path, value })
			ctx.commit('weather/updateUnits', ctx.rootState, { root: true })
		},

		localStorageSettings(ctx, value) {
			ctx.commit('localStorageSettings', value)
			ctx.commit('weather/updateUnits', ctx.rootState, { root: true })
		}
	}
}