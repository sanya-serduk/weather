import helpers from "@/api/data-models/weather/weatherHelpersDataModel";

export default (data, timezone) => {
	timezone = timezone || data.timezone

	const services = {
		temp: {
			metric: '' + Math.round(data.main.temp),
			imperial: '' + helpers.convertUnitCtoF(data.main.temp)
		},
		tempFeelsLike: {
			metric: '' + Math.round(data.main.feels_like),
			imperial: '' + helpers.convertUnitCtoF(data.main.feels_like)
		},
		pressure: {
			metric: data.main.pressure,
			mmHg: helpers.convertUnitHPAtoMMHG(data.main.pressure)
		},
		windSpeed: {
			m: Math.round(data.wind.speed * 10) / 10,
			km: helpers.convertUnitMStoKMH(data.wind.speed)
		},
		visibility: {
			m: data.visibility,
			km: helpers.convertUnitMtoKM(data.visibility)
		}
	}

	const icon = data.type === 'current'
		? helpers.getIconInPeriod(data.weather[0].icon, data.dt, data.sys.sunrise, data.sys.sunset)
		: helpers.getIconInCurrentHour(data.weather[0].icon, helpers.getHour(data.dt, timezone))

	return {
		services      : services,
		icon          : '' + icon,
		timestamp     : '' + data.dt,
		date          : helpers.date(data.dt, timezone),
		time          : helpers.time(data.dt, timezone),
		temp          : '' + services.temp.metric,
		tempFeelsLike : '' + services.tempFeelsLike.metric,
		description   : '' + data.weather[0].description,
		windSpeed     : '' + services.windSpeed.m,
		pressure      : '' + services.pressure.metric,
		humidity      : '' + data.main.humidity,
		visibility    : '' + services.visibility.km,
		clouds        : '' + data.clouds.all,
	}
}