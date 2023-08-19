import cityBaseDataModel from "@/api/data-models/city/cityBaseDataModel";

export default data => {
	return data.response.GeoObjectCollection.featureMember.reduce((acc, item) => {
		const kind = item.GeoObject.metaDataProperty.GeocoderMetaData.kind
		const coord = item.GeoObject.Point.pos.split(' ')

		if (kind === 'locality' || kind === 'province') {
			acc.push(cityBaseDataModel({
				name: item.GeoObject.name,
				description: item.GeoObject.description,
				coord: {
					lon: coord[0],
					lat: coord[1]
				}
			}))
		}

		return acc
	}, [])
}