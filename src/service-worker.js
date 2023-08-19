import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

clientsClaim()
self.skipWaiting()
precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
	({ url }) => {
		return url.pathname === '/data/2.5/weather/'
			|| url.pathname === '/data/2.5/forecast/'
	},
	new NetworkFirst({
		cacheName: 'weather',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			})
		]
	})
)

registerRoute(
	/\.(?:js|css|webp|png|jpg|svg)$/,
	new CacheFirst({
		cacheName: 'assets',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			})
		]
	})
)