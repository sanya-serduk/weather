import instance from "@/api/instance";
import SETTINGS from "@/api/SETTINGS";
import MESSAGES from "@/constants/MESSAGES";
import CustomError from "@/helpers/CustomError";
import cityYandexDataModel from "@/api/data-models/city/cityYandexDataModel";
import cityOpenWeatherMapDataModel from "@/api/data-models/city/cityOpenWeatherMapDataModel";

function getCities({ url, dataModel }) {
	return instance
		.get(url.path, {
			params: url.params
		})
		.then(response => {
			const data = dataModel(response.data)
			return data.length
				? Promise.resolve(data)
				: Promise.reject(new CustomError(MESSAGES.CITY.NOT_FOUND))
		})
		.catch(e => {
			return e instanceof CustomError
				? Promise.reject(e.message)
				: Promise.reject(MESSAGES.GENERAL.NOT_AVAILABLE)
		})
}

export default {
	getYandex(query) {
		const { HOST, API_KEY } = SETTINGS.SERVICES.YANDEX
		return getCities({
			url: {
				path: HOST,
				params: {
					geocode: query,
					apikey: API_KEY,
					format: 'json',
					kind: 'locality',
					results: '5'
				}
			},
			dataModel: cityYandexDataModel
		})
	},

	getOpenWeatherMap(query) {
		const { HOST, API_KEY } = SETTINGS.SERVICES.OPENWEATHERMAP
		return getCities({
			url: {
				path: `${ HOST }geo/1.0/direct`,
				params: {
					q: query,
					appid: API_KEY,
					limit: '5',
					lang: 'ru'
				}
			},
			dataModel: cityOpenWeatherMapDataModel
		})
	}
}