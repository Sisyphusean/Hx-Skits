//Firebase
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const vapidKey = import.meta.env.VITE_FIREBASE_WEB_PUSH_CERTIFICATE as string

export const firebaseApp = initializeApp(firebaseConfig)
export const messaging = getMessaging(firebaseApp)

export const getFirebaseCloudMessengerToken = async () => {
    //Get Token but pass in Vite's service worker to work with Firebase
    return getToken(messaging, {
        vapidKey,
        serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()
    }).then(
        (firebaseToken) => {
            return firebaseToken
        },

        (reject) => {
            console.error("Failed to get Firebase token: ", reject)
            return false
        }
    ).catch((error) => {
        console.log("Error getting Firebase token: ", error)
        return false
    })
}
