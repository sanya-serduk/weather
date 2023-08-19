import api from "@/api";

export default {
	namespaced: true,

	actions: {
		search(ctx, request) {
			const { current, types } = ctx.rootState.settings.userSettings.searchServices
			const action = {
				[types.yandex]         : 'getYandex',
				[types.openweathermap] : 'getOpenWeatherMap',
				default                : 'getYandex'
			}

			return api.city[action[current] || action.default](request)
		}
	}
}