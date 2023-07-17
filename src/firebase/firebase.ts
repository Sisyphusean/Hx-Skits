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
import { firebaseLiveStreamResponse, firebaseOmegleToggleResponse, firebaseNameSkitResponse, nameSkitDataObject } from "../interfaces/apiinterfaces";

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

export const handleFirebaseMessage =
    (payload: MessagePayload, appData: appData)
        : Promise<false | firebaseLiveStreamResponse | firebaseOmegleToggleResponse | firebaseNameSkitResponse> => {

        return new Promise((resolve, reject) => {

            //Handle Live Stream Update notifications
            if (payload.notification && payload.notification.title) {
                const { title } = payload.notification

                //Show in-app notification if user is not logged in
                if (!appData.userData.isUserLoggedIn) {
                    toastHandler.showSuccessToast(title, "top-center")
                }

                if (localFirebaseToken) {
                    updateMessageLastReceived(localFirebaseToken)
                }

                if (payload.data) {

                    if (payload.data.messageFromEvent === "liveStreamUpdate") {

                        if (payload.data.liveStreamData !== "") {
                            const liveStreamData = JSON.parse(payload.data.liveStreamData)
                            let newData: firebaseLiveStreamResponse = {
                                messageFromEvent: payload.data.messageFromEvent,
                                liveStreamData: {
                                    streamingOn: liveStreamData.streamingOn,
                                    streamingLink: liveStreamData.streamingLink,
                                    activityType: liveStreamData.activityType
                                },
                                currentOmegleTags: payload.data.currentOmegleTags ? payload.data.currentOmegleTags.split(",") : []
                            }
                            resolve(newData)

                        } else {
                            reject(false)
                        }
                    }

                    if (payload.data.messageFromEvent === "nameSkitUpdate") {

                        const nameSkitData = payload.data.nameSkitData ? JSON.parse(payload.data.nameSkitData) as nameSkitDataObject : null

                        if (nameSkitData && nameSkitData.marksName && nameSkitData.shouldUserBeGaslit) {
                            let newData: firebaseNameSkitResponse = {
                                messageFromEvent: payload.data.messageFromEvent,
                                nameSkitData: {
                                    marksName: nameSkitData.marksName,
                                    shouldUserBeGaslit: JSON.parse(nameSkitData.shouldUserBeGaslit)
                                }
                            }
                            resolve(newData)
                        } else {
                            reject(false)
                        }

                    }


                } else {
                    reject(false)
                }

            }

            // Handle Data only notification from updating Omegle Tags
            if (payload.data) {
                const rawData = payload.data
                const data = rawData.currentOmegleTags.split(",")
                let receivedFirebaseData: firebaseOmegleToggleResponse = {
                    messageFromEvent: rawData.messageFromEvent,
                    currentOmegleTags: data
                }

                resolve(receivedFirebaseData)
            }

            else {
                reject(false)
            }

        })


    }