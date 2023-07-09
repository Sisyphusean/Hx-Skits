//Firebase
import { initializeApp } from "firebase/app";
import { MessagePayload, getMessaging, getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";

//Custom Firebase services
import { updateMessageLastReceived } from "../services/firebaseservices"

//Utils
import { toastHandler } from "../utilities/toastHandler";

//Interaces
import { appData } from "../interfaces/datainterfaces";

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
var localFirebaseToken: string

export const getFirebaseCloudMessengerToken = async () => {
    //Get Token but pass in Vite's service worker to work with Firebase
    return getToken(messaging, {
        vapidKey,
        serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()
    }).then(
        (firebaseToken) => {
            localFirebaseToken = firebaseToken
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

export const handleFirebaseMessage = (payload: MessagePayload, appData: appData) => {
    if (payload.notification && payload.notification.title
        && !appData.userData.isUserLoggedIn) {
        const { title } = payload.notification

        toastHandler.showSuccessToast(title, "top-center")


        if (localFirebaseToken) {
            updateMessageLastReceived(localFirebaseToken)
        }
    }
}