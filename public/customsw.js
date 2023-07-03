/// <reference lib="webworker" />
var firebase;
importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging-compat.js');
var firebaseConfig = {
    apiKey: 'AIzaSyC-zD96hZ2FzCnMtLGHaMiD8t2j5WeRtYU',
    authDomain: 'hx-skits-e0bf3.firebaseapp.com',
    projectId: 'hx-skits-e0bf3',
    storageBucket: 'hx-skits-e0bf3.appspot.com',
    messagingSenderId: '115885528287',
    appId: '1:115885528287:web:c000cd6e0ec1c84b2b456a'
};
var sw = self;
var firebaseApp = firebase.initializeApp(firebaseConfig);
var messaging = firebase.messaging();
//Upon installing the service worker, skip waiting 
//for the previous service worker to be unregistered
sw.addEventListener('install', function (event) {
    //Cache all public assets on service worker installation
    event.waitUntil(caches.open('public-assets').then(function (cache) {
        cache.addAll(['/', '/*']);
    }));
    sw.skipWaiting();
});
//Take control of all pages immediately
sw.addEventListener('activate', function (event) {
    sw.clients.claim();
});
sw.addEventListener('fetch', function (event) {
    var url = event.request.url;
    var request = event.request;
    //Handle catching of all public assets
    if (url.includes('/public')) {
        event.respondWith(caches.match(request).then(function (cachedResponse) {
            //If the asset is cached, return it
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(request).then(function (networkResponse) {
                var clonedResponse = networkResponse.clone();
                caches.open('public-assets').then(function (cache) {
                    cache.put(request, clonedResponse);
                });
                return networkResponse;
            });
        }));
    }
});
//Handle Background Firebase Messages that come in while the app is closed
messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
});
