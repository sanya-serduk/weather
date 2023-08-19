import weatherDataModel from "@/api/data-models/weather/weatherBaseDataModel";
import helpers from "@/api/data-models/weather/weatherHelpersDataModel";

function periodDataModel(data) {
	const periodTempMin = data.timeList.reduce((acc, curr) => Number(curr.services.temp.metric) < Number(acc.services.temp.metric) ? curr : acc)
	const periodTempMax = data.timeList.reduce((acc, curr) => Number(curr.services.temp.metric) > Number(acc.services.temp.metric) ? curr : acc)

	const services = {
		tempMin : periodTempMin.services.temp,
		tempMax : periodTempMax.services.temp
	}

	return {
		services    : services,
		name        : data.name,
		icon        : data?.timeList[data.timeList.length-1]?.icon || '',
		description : data?.timeList[data.timeList.length-1]?.description || '',
		tempMin     : services.tempMin.metric,
		tempMax     : services.tempMax.metric,
		timeList    : data.timeList,
	}
}

function dayDataModel(data, timezone) {
	const periodTempMin = data.periods.reduce((acc, curr) => Number(curr.services.tempMin.metric) < Number(acc.services.tempMin.metric) ? curr : acc)
	const periodTempMax = data.periods.reduce((acc, curr) => Number(curr.services.tempMax.metric) > Number(acc.services.tempMax.metric) ? curr : acc)
	const services = {
		tempMin: periodTempMin.services.tempMin,
		tempMax: periodTempMax.services.tempMax
	}

	return {
		services    : services,
		timestamp   : data.timestamp,
		date        : helpers.date(data.timestamp, timezone),
		tempMin     : services.tempMin.metric,
		tempMax     : services.tempMax.metric,
		icon        : data.periods[2].icon,
		description : data.periods[2].description,
		periods     : data.periods,
	}
}

function filterListByDate(list, minTimestamp, maxTimestamp, timezone) {
	return list.filter(item => {
		const date = helpers.newDateInTimezone(item.dt, timezone)
		const timestamp = Math.floor(date.getTime() / 1000)
		return timestamp >= minTimestamp && timestamp < maxTimestamp
	})
}

function convertWeatherDataFormat(list, timezone) {
	return list.map(item => {
		item.type = 'forecast'
		return weatherDataModel(item, timezone)
	})
}

function splitListByDay(list, timezone) {
	const utcDate = timestamp => helpers.newDateInTimezone(timestamp, timezone).getUTCDate()

	return list.reduce((acc, curr) => {
		const currDate = utcDate(curr.timestamp)
		const searchDay = acc.find(item => utcDate(item.timestamp) === currDate)
		searchDay
			? searchDay.list.push(curr)
			: acc.push({ timestamp: curr.timestamp, list: [curr] })

		return acc
	}, [])
}

function splitListByPeriods(list, timezone) {
	const periodsPattern = helpers.getPeriodsPattern()
	return list.map(day => {
		return {
			timestamp: day.timestamp,
			periods: periodsPattern.map(pattern => {
				return {
					name: pattern.name,
					timeList: day.list.filter(item => {
						const hour = helpers.getHour(item.timestamp, timezone)
						return hour >= pattern.from && hour <= pattern.to
					})
				}
			})
		}
	})
}

function addSummaryDataPeriods(list) {
	return list.map(day => {
		return {
			timestamp: day.timestamp,
			periods: day.periods.map(period => periodDataModel(period))
		}
	})
}

function addSummaryDataDays(list, timezone) {
	return list.map(day => dayDataModel(day, timezone))
}

function getTimestampWithOffset(currentTimestamp, timezone, numDay) {
	const date = helpers.newDateInTimezone(currentTimestamp)
	date.setUTCDate(date.getUTCDate() + numDay)
	date.setUTCSeconds(date.getUTCSeconds() + timezone)
	date.setUTCHours(0, 0, 0, 0)
	return Math.floor(date.getTime() / 1000)
}

export default (data, currentTimestamp = new Date()) => {
	const timezone = data.city.timezone
	const minTimestamp = getTimestampWithOffset(currentTimestamp, timezone, 1)
	const maxTimestamp = getTimestampWithOffset(currentTimestamp, timezone, 5)

	let list = data.list
	list = filterListByDate(list, minTimestamp, maxTimestamp, timezone)
	list = convertWeatherDataFormat(list, timezone)
	list = splitListByDay(list, timezone)
	list = splitListByPeriods(list, timezone)
	list = addSummaryDataPeriods(list)
	list = addSummaryDataDays(list, timezone)

	return list
}