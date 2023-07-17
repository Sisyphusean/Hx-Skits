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

//Import indexdb.ts for accessing the indexdb database
import { openDatabase, getFcmToken } from './utilities/indexdb'

//Firebase
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

//Interfaces
import { MyServiceWorkerGlobalScope } from './interfaces/swinterfaces'
import { fcmDocument } from "./interfaces/indexdbinterfaces"





// Give TypeScript the correct global.
declare let self: MyServiceWorkerGlobalScope

// Declare type for ExtendableEvent to use in install and activate events
declare type ExtendableEvent = any

//Create the broadcsat channel for communicating with the React app
const broadcastChannel = new BroadcastChannel(import.meta.env.VITE_BROADCASTCHANNEL_NAME as string)

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

//Access the notification permission
const notificationPermission = Notification.permission

//Retrieve the manifest. First define asynchronus function to retrieve the manifest
// This is also required for the injection of the manifest into the service worker by workbox
// So despite it being outdate, Your application will not build without it
const manifest = self.__WB_MANIFEST as Array<ManifestEntry>

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

//Disable debug messages for intercepted requests and responses
self.__WB_DISABLE_DEV_LOGS = !data.debug;

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

//Add notification click event listener
self.addEventListener('notificationclick', (event: NotificationEvent) => {
    event.waitUntil(

        //Retrieve all the open windows controlled by the service worker
        self.clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(
            (clientList) => {
                let client = null

                for (let i = 0; i < clientList.length; i++) {
                    let item = clientList[i]

                    if (item.url) {
                        client = item
                        break
                    }
                }

                //If the navigate property exists in the client, 
                //focus the client and navigate to the url
                if (client && 'navigate' in client) {
                    client.focus()
                    event.notification.close()
                    // return client.navigate(client.url)
                }
                //Otherwise, close the notification and open a new window with the url
                else {
                    event.notification.close()
                }
            }
        )

    )

})

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

const getFcmTokenForServiceWorker = (): Promise<string> => {

    return new Promise((resolve, reject) => {
        openDatabase(self).then(
            (db) => {
                getFcmToken(db).then(
                    (fcmDocument) => {
                        let { fcmToken } = fcmDocument[0] as fcmDocument
                        resolve(fcmToken)
                    }
                ).catch((error: Error) => {
                    reject(error)
                })
            }
        )
    })

}

const checkIfFcmTokenExists = (): Promise<boolean> => {

    return new Promise((resolve, reject) => {
        openDatabase(self).then(
            (db) => {
                getFcmToken(db).then(
                    (fcmDocument) => {
                        if (fcmDocument.length > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }
                ).catch((error: Error) => {
                    reject(error)
                })
            }
        )
    })

}

//Function for updating the last received time of the message
const updateMessageLastReceived = async (token: string): Promise<string> => {
    const messagelastreceivedon = new Date()
    const data = {
        token,
        messagelastreceivedon
    }

    const fcmLastMessagePath = import.meta.env.VITE_FCM_UPDATE_LAST_MESSAGE_ON as string
    let webServerPath

    if (import.meta.env.VITE_ENV === 'dev') {
        webServerPath = import.meta.env.VITE_DEV_BE_BASE_URL as string
    } else {
        webServerPath = import.meta.env.VITE_BE_BASE_URL as string
    }

    const path = webServerPath + fcmLastMessagePath

    const response = await fetch(path, {
        method: 'POST',
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    return response.json()
}

// //Handle Background Firebase Messages that come in while the app is closed
onBackgroundMessage(messaging, (payload: any) => {

    //If data is included in the payload, send a message to the React app
    if (payload.data) {
        broadcastChannel.postMessage(payload.data)
    }
    //After the message is received, update the last received time for the token
    checkIfFcmTokenExists().then(
        (fcmTokenExists) => {
            if (notificationPermission === 'granted' && fcmTokenExists) {

                //If user has granted permission, 
                //fetch token from Window thread, and update the last received time
                getFcmTokenForServiceWorker()
                    .then(async (token) => {

                        //After the message is received, 
                        //update the last received time

                        updateMessageLastReceived(token)
                            .then((response) => {
                                import.meta.env.VITE_ENV === "dev" ? console.log(response) : null
                            }).catch((error) => {
                                console.error(
                                    "Failed to update service worker's last received time",
                                    error
                                )
                            })
                    })
                    .catch(error => console.log(error))
            }

        }
    )
})


