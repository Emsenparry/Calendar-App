const staticCacheName = 'site-static-v1'

const dynamicCacheName = 'site-dynamic-v1'

const assets = [
	'/',
	'./pages/fallback.html',
	'./index.html',
	'./js/App.js',
	'./js/firestore-config.js',
	'./js/script.js',
	'./css/styles.css',
	'./img.png'
]




// Install Service Worker
self.addEventListener('install', event => {
	console.log('Service Worker has been installed');

	// We add all of our assets to our static cache
	event.waitUntil(
		caches.open(staticCacheName)
			.then(cache => {
				cache.addAll(assets)
			})
	)
})

// Activate Service Worker
self.addEventListener('activate', event => {
	console.log('Service Worker has been activated');

	event.waitUntil(
		caches.keys()
			.then(keys => {
				return Promise.all(keys
					.filter(key => key !== staticCacheName)
					.map(key => caches.delete(key)))
			})
	)
	return;
})


// Fetch event
self.addEventListener('fetch', event => {
	if (!(event.request.url.indexOf('http') === 0)) return;

	event.respondWith(
		caches.match(event.request)
			.then(cacheRes => {
				return cacheRes || fetch(event.request)

					.then(fetchRes => {
						return caches.open(dynamicCacheName)
							.then(cache => {
								cache.put(event.request.url, fetchRes.clone())

								return fetchRes
							})
					})
			}).catch(() => {
				if (event.request.url.indexOf('.html') > -1) {
					return caches.match('/pages/fallback.html')
				}
			})
	)
})