import instance from "@/api/instance";
import SETTINGS from "@/api/SETTINGS";
import weatherCurrentDataModel from "@/api/data-models/weather/weatherCurrentDataModel";
import weatherForecastDataModel from "@/api/data-models/weather/weatherForecastDataModel";
import weatherAllDataModel from "@/api/data-models/weather/weatherAllDataModel";
import MESSAGES from "@/constants/MESSAGES";
const { HOST, API_KEY } = SETTINGS.SERVICES.OPENWEATHERMAP

export default {
	async getAll(city) {
		try {
			const current = await this.getCurrent(city.coord)
			const forecast = await this.getForecast(city.coord)
			const weather = weatherAllDataModel({
				city,
				current: weatherCurrentDataModel(current),
				forecast: weatherForecastDataModel(forecast, current.dt)
			})

			return Promise.resolve(weather)
		} catch (e) {
			return Promise.reject(MESSAGES.GENERAL.NOT_AVAILABLE)
		}
	},

	getCurrent({ lat, lon }) {
		return instance
			.get(`${ HOST }data/2.5/weather/`, {
				params: {
					lat: lat,
					lon: lon,
					appid: API_KEY,
					lang: 'ru',
					units: 'metric'
				}
			})
			.then(response => response.data)
	},

	getForecast({ lat, lon }) {
		return instance
			.get(`${ HOST }data/2.5/forecast/`, {
				params: {
					lat: lat,
					lon: lon,
					appid: API_KEY,
					lang: 'ru',
					units: 'metric'
				}
			})
			.then(response => response.data)
	}
}