//Import Cache Names and ClientClaim module for providing the cache name and taking control of all pages immediately
import { cacheNames, clientsClaim } from 'workbox-core'

//Import routing modules for registering routes and setting default and catch handlers
import { registerRoute, setCatchHandler, setDefaultHandler } from 'workbox-routing'

//Import caching modules for caching strategies
import {
    NetworkFirst, //Cache the network response first and return it if it succeeds, otherwise return the cached response
    NetworkOnly, //Fetch the resource from the network and don't cache it
    Strategy, //Base class for caching strategies
    StrategyHandler //Base class for caching strategy handlers
} from 'workbox-strategies'

//Import module for caching precached assets
import type { ManifestEntry } from 'workbox-build'

//Firebase
// declare let firebase: any;
// importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js');
import { initializeApp } from 'firebase/app';
// importScripts('https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging-compat.js');
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

//Extend the ServiceWorkerGlobalScope to include the __WB_MANIFEST property
interface MyServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
    __WB_MANIFEST: any;
}

// Give TypeScript the correct global.
declare let self: MyServiceWorkerGlobalScope

// Declare type for ExtendableEvent to use in install and activate events
declare type ExtendableEvent = any

const data = {
    race: false, //Fetch first, if it fails, return a previously cached response
    debug: false, //Don't log debug messages for intercepted requests and responses
    credentials: 'same-origin', //Only request resources from the same origin
    networkTimeoutSeconds: 0, //Timout in seconds for network requests; 0 means no timeout
    fallback: 'index.html' //Fallback to index.html if the request fails
}

// Access the pre-defined cache names for use in this app
const cacheName = cacheNames.runtime

//Configure the strategy for handling all requests based on the data object
const buildStrategy = (): Strategy => {

    //If race condition is set to true, begin a race condition between fetching from Network and Cache
    if (data.race) {
        class CacheNetworkRace extends Strategy {

            //Handle method for the race condition exists on the Strategy Calass
            _handle(request: Request, handler: StrategyHandler): Promise<Response | undefined> {
                const fetchAndCachePutDone: Promise<Response> = handler.fetchAndCachePut(request)
                const cacheMatchDone: Promise<Response | undefined> = handler.cacheMatch(request)

                //Return Promise with race conditions where the first to resolve wins
                return new Promise((resolve, reject) => {
                    fetchAndCachePutDone.then(resolve).catch((e) => {
                        if (data.debug)
                            console.log(`Cannot fetch resource: ${request.url}`, e)
                    })
                    cacheMatchDone.then(response => response && resolve(response))

                    // Reject if both network and cache error or find no response.
                    Promise.allSettled([fetchAndCachePutDone, cacheMatchDone]).then((results) => {
                        const [fetchAndCachePutResult, cacheMatchResult] = results
                        //fetchAndCachePutResult will be rejected if the network request fails and cacheMatchResult will be 
                        //undefined if the cache is empty since the cachematch promise has no way to be rejected
                        if (fetchAndCachePutResult.status === 'rejected' && cacheMatchResult.status !== 'fulfilled')
                            reject(fetchAndCachePutResult.reason)
                    })
                })

            }
        }
        return new CacheNetworkRace()
    }
    else {
        if (data.networkTimeoutSeconds > 0)
            return new NetworkFirst({ cacheName, networkTimeoutSeconds: data.networkTimeoutSeconds })
        else
            return new NetworkFirst({ cacheName })
    }
}

//Retrieve the manifest. First define asynchronus function to retrieve the manifest
// This is also required for the injection of the manifest into the service worker by workbox
// So despite it being outdate, Your application will not build without it
const manifest = self.__WB_MANIFEST as Array<ManifestEntry>

// async function retrieveManifest() {
//     const cacheStorage = await caches.open(cacheName)
//     let manifest: ManifestEntry[] = await cacheStorage.match('manifest.json').then(
//         (response) => {
//             if (response) {
//                 console.log("Retrieved manifest.json from cache ", response)
//                 return response.json()
//             }
//         }
//     ).catch((e) => {
//         console.log("Failed to retrieve manifest.json", e)
//     })

//     return manifest
// }

// //Assign Manifest to manifest variable
// retrieveManifest().then(
//     (retrievedManifest) => {
//         manifest = retrievedManifest
//     }
// )

//Array for resources that have been cached by the service worker
const cacheEntries: RequestInfo[] = []

//Run through the manifest and cache all resources
const manifestURLs = manifest.map(
    (entry) => {
        //Create a new url using the service worker location and the manifest entry url
        const url = new URL(entry.url, self.location.href)

        cacheEntries.push(new Request(url.href, {
            credentials: data.credentials as any
        }))

        return url.href
    }
)

// Cache resources when the service worker is first installed
self.addEventListener('install', (event: ExtendableEvent) => {
    // The browser will wait until the promise is resolved
    event.waitUntil(
        // Open the cache and cache all the resources in it. This may include resources
        // that are not in the manifest
        caches.open(cacheName).then((cache) => {
            return cache.addAll(cacheEntries)
        })
    )
})

// Upon activating the service worker, clear outdated caches by removing caches associated with 
// URL resources that are not in the manifest URL array
self.addEventListener('activate', (event: ExtendableEvent) => {
    // - clean up outdated runtime cache
    event.waitUntil(
        caches.open(cacheName).then((cache) => {

            // clean up those who are not listed in manifestURLs since the manifestURLs are the only 
            // resources that are unlikely to be outdated
            cache.keys().then((keys) => {

                keys.forEach((request) => {

                    data.debug && console.log(`Checking cache entry to be removed: ${request.url}`)

                    //If the manifest does not include the request url, delete it from the cache
                    if (!manifestURLs.includes(request.url)) {

                        cache.delete(request).then((deleted) => {
                            if (data.debug) {
                                if (deleted)
                                    console.log(`Precached data removed: ${request.url || request}`)
                                else
                                    console.log(`No precache found: ${request.url || request}`)
                            }
                        })

                    }
                })
            })
        })
    )
})

//Register all URLs that are found in the manifest and use the buildStrategy function to cache them
registerRoute(
    ({ url }) => manifestURLs.includes(url.href),
    buildStrategy()
)

// Inform the service worker to send all routes that are not recognized to the network to be fetched
setDefaultHandler(new NetworkOnly())

// This method is called when the service worker is unable to fetch a resource from the network
setCatchHandler(
    ({ event }: any): Promise<Response> => {
        switch (event.request.destination) {
            case 'document':
                return caches.match(data.fallback).then((r) => {
                    return r ? Promise.resolve(r) : Promise.resolve(Response.error())
                })
            default:
                return Promise.resolve(Response.error())
        }
    }
)

// this is necessary, since the new service worker will keep on skipWaiting state
// and then, caches will not be cleared since it is not activated
self.skipWaiting()
clientsClaim()

//Firebase config. You can init here by pasting the details. Don't worry it's not a security risk
//as the config is used to connect to the firebase project for listening and not to access the project's admin console
const firebaseConfig = {
    apiKey: 'AIzaSyC-zD96hZ2FzCnMtLGHaMiD8t2j5WeRtYU',
    authDomain: 'hx-skits-e0bf3.firebaseapp.com',
    projectId: 'hx-skits-e0bf3',
    storageBucket: 'hx-skits-e0bf3.appspot.com',
    messagingSenderId: '115885528287',
    appId: '1:115885528287:web:c000cd6e0ec1c84b2b456a',
}

//Initialize Firebase and get the messaging module
const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)


// //Handle Background Firebase Messages that come in while the app is closed
onBackgroundMessage(messaging, (payload: any) => {
    console.log('Received background message ', payload)
})
