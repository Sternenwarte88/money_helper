self.addEventListener('install', function (event) {
	console.log('installing ServiceWorker', event);
});

self.addEventListener('activate', function (event) {
	console.log('activating ServiceWorker', event);
});

self.addEventListener('fetch', function (event) {
	console.log(event);
});
