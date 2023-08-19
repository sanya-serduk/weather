import cityDataModel from "@/api/data-models/city/cityBaseDataModel";

export default data => {
	return data
		.filter(item => item.state)
		.map(item => {
			return cityDataModel({
				name: item?.local_names?.ru || item.name,
				description: item.state,
				coord: {
					lon: item.lon,
					lat: item.lat
				}
			})
		})
}