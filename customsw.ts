/// <reference lib="webworker" />

var firebase: any;

importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: 'AIzaSyC-zD96hZ2FzCnMtLGHaMiD8t2j5WeRtYU',
    authDomain: 'hx-skits-e0bf3.firebaseapp.com',
    projectId: 'hx-skits-e0bf3',
    storageBucket: 'hx-skits-e0bf3.appspot.com',
    messagingSenderId: '115885528287',
    appId: '1:115885528287:web:c000cd6e0ec1c84b2b456a',
}

var sw = (self as unknown) as ServiceWorkerGlobalScope
const firebaseApp = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

//Upon installing the service worker, skip waiting 
//for the previous service worker to be unregistered
sw.addEventListener('install', (event) => {

    //Cache all public assets on service worker installation
    event.waitUntil(
        caches.open('public-assets').then(
            (cache) => {
                cache.addAll(['/', '/*'])
            }
        )
    )

    sw.skipWaiting()
})

//Take control of all pages immediately
sw.addEventListener('activate', (event) => {
    sw.clients.claim()
})

sw.addEventListener('fetch', (event: FetchEvent) => {
    const url = event.request.url
    const request = event.request

    //Handle catching of all public assets
    if (url.includes('/public')) {
        event.respondWith(
            caches.match(request).then(
                (cachedResponse) => {

                    //If the asset is cached, return it
                    if (cachedResponse) {
                        return cachedResponse
                    }


                    return fetch(request).then(
                        (networkResponse) => {
                            const clonedResponse = networkResponse.clone()
                            caches.open('public-assets').then(
                                (cache) => {
                                    cache.put(request, clonedResponse)
                                }
                            )
                            return networkResponse
                        }
                    )

                })
        )
    }
})

//Handle Background Firebase Messages that come in while the app is closed
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload)
})
