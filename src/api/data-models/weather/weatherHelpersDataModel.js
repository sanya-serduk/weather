export default {
	newDateInTimezone(timestamp, timezone = 0) {
		return new Date((Number(timestamp) + Number(timezone)) * 1000)
	},

	getHour(timestamp, timezone = 0) {
		const date = this.newDateInTimezone(timestamp, timezone)
		return date.getUTCHours()
	},

	date(timestamp, timezone = 0) {
		const date = this.newDateInTimezone(timestamp, timezone)
		const lang = 'ru-RU'
		const timeZone = 'UTC'
		return {
			weekday  : date.toLocaleString(lang, { weekday: 'long', timeZone }),
			monthday : date.toLocaleString(lang, { month: 'long', day: '2-digit', timeZone }),
			year     : '' + date.getUTCFullYear()
		}
	},

	time(timestamp, timezone = 0) {
		const date = this.newDateInTimezone(timestamp, timezone)
		return date.toLocaleTimeString('RU-ru', { hour: '2-digit', minute:'2-digit', timeZone: 'UTC' })
	},

	convertUnitCtoF(value) {
		return Math.round(value * 9 / 5 + 32)
	},

	convertUnitHPAtoMMHG(value) {
		return Math.round(value * 0.750063755419211)
	},

	convertUnitMtoKM(value) {
		return Math.round((value / 1000) * 10) / 10
	},

	convertUnitMStoKMH(value) {
		return Math.round((value * 3600 / 1000) * 10) / 10
	},

	getPeriodsPattern() {
		return [
			{ name: 'Ночь',  from: 0,  to: 5  },
			{ name: 'Утро',  from: 6,  to: 11 },
			{ name: 'День',  from: 12, to: 17 },
			{ name: 'Вечер', from: 18, to: 23 }
		]
	},

	getIconInCurrentHour(icon, hour) {
		const periods = this.getPeriodsPattern()
		const code = icon.slice(0, -1)
		for (let i = 0; i < periods.length ; i++) {
			if (hour >= periods[i].from && hour <= periods[i].to) {
				return  i > 0 && i < 3 ? code + 'd' : code + 'n'
			}
		}

		return icon
	},

	getIconInPeriod(icon, timestamp, sunrise, sunset) {
		const code = icon.slice(0, -1)
		return timestamp > sunrise && timestamp < sunset ? code + 'd' : code + 'n'
	}
}