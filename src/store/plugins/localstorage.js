export default store => {
	store.subscribe(async (mutation, state) => {
		try {
			if (!state.localstorage.loaded)
				return

			const weather = store.getters['weather/localStorageSettings']
			const settings = store.getters['settings/localStorageSettings']
			localStorage.setItem('root', JSON.stringify({ weather, settings }))

			if (mutation.type === 'weather/remove') {
				const listUrlParams = weather.list.map(({ coord }) => `lat=${ coord.lat }&lon=${ coord.lon }`)
				const cache = await caches.open('weather')
				const cacheItems = await cache.keys()

				for (const item of cacheItems) {
					const url = listUrlParams.some(params => item.url.includes(params)) ? null : item.url
					await cache.delete(url)
				}
			}
		} catch (e) {
			console.error(e)
		}
	})
}