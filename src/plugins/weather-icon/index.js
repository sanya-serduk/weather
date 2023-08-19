import WeatherIcon from "@/plugins/weather-icon/WeatherIcon";

export default {
	install: (Vue) => {
		Vue.component("weather-icon", WeatherIcon)
	}
}