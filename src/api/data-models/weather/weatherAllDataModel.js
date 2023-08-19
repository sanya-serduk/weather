export default data => {
	return {
		id: `${ data.city.coord.lon },${ data.city.coord.lat }`,
		city: data.city,
		current: data.current,
		forecast: data.forecast
	}
}