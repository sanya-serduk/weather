import weatherDataModel from "@/api/data-models/weather/weatherBaseDataModel";

export default data => {
	return weatherDataModel({ type: 'current', ...data })
}