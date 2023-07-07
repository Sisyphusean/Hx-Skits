//Import fcmDocument interface
import { fcmDocument } from "../interfaces/indexdbinterfaces"

let db;

//import custom service worker interface
import { MyServiceWorkerGlobalScope } from "../interfaces/swinterfaces"

/**
 * This opens the indexed db and returns the db object
 * @param self This is the service worker object used to open the indexed db
 * @returns {IDBObjectStore} db The indexed db object
 */
export const openDatabase = (self: MyServiceWorkerGlobalScope | null = null): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {

        let request;

        if (self) {
            request = self.indexedDB.open(import.meta.env.VITE_INDEXED_DB_DATABASE, 1)
        } else {
            request = window.indexedDB.open(import.meta.env.VITE_INDEXED_DB_DATABASE, 1)
        }

        request.onsuccess = (event: Event) => {
            db = (event.target as IDBRequest<IDBDatabase>).result
            resolve(db)
        }

        request.onupgradeneeded = (event: Event) => {
            db = (event.target as IDBRequest<IDBDatabase>).result

            if (!db.objectStoreNames.contains('fcm')) {
                const objectStore = db.createObjectStore('fcm', { keyPath: 'id' })
            }
        }

        request.onerror = (event: Event) => {
            console.error('Failed to connect to DB: ', event)
            reject((event.target as IDBRequest<IDBDatabase>).error)
        }

    })
}

/**
 * This function fetches the fcm object store from the indexed db
 * 
 * @param db This is the db object used to fetch the fcm object store
 * @returns 
 */
export const getFcmObjectStoreData = (db: IDBDatabase): Promise<IDBObjectStore> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('fcm', 'readwrite')
        const fcmStore = transaction.objectStore('fcm')
        let count = 0;
        const getCount = fcmStore.count()

        getCount.onsuccess = (event: Event) => {
            count = getCount.result
        }

        if (count === 0) {
            reject(new Error("No fcm token found", { cause: "NoFcmTokenFound" }))
        }

        transaction.onerror = (event: Event) => {
            console.error('Failed to get fcm object store: ', event)
            reject(new Error('Something went wrong while getting the fcm object store', { cause: 'SomethingWentWrong' }))
        }

        transaction.oncomplete = (event: Event) => {
            resolve(fcmStore)
        }
    })
}

export const addFcmToken = (db: IDBDatabase, newFcmToken: string): Promise<IDBRequest<IDBValidKey>> => {

    return new Promise((resolve, reject) => {
        const transaction = db.transaction('fcm', 'readwrite')
        const fcmStore = transaction.objectStore('fcm')
        const newFcmTokenDocument: fcmDocument = { id: generateRandomId(), fcmToken: newFcmToken }
        const request = fcmStore.add(newFcmTokenDocument)

        request.onsuccess = (event: Event) => {
            resolve(request)
        }

        request.onerror = (event: Event) => {
            console.error('Error adding document:', event);
            reject((event.target as IDBRequest<IDBValidKey>).error);
        };
    })
}

/**
 * This function is used to retrieve the fcm token from the indexed db
 * @param fcmStore 
 * @returns {Promise<string[]>} This is the fcm token
 */
export const getFcmToken = (db: IDBDatabase): Promise<fcmDocument[]> => {


    return new Promise((resolve, reject) => {

        const transaction = db.transaction('fcm', 'readwrite')
        const fcmStore = transaction.objectStore('fcm')
        const request = fcmStore.openCursor()

        let results: fcmDocument[] = [];

        request.onsuccess = (event: Event) => {
            const cursor: IDBCursorWithValue = (event.target as IDBRequest).result

            if (cursor) {
                const value: fcmDocument = cursor.value
                results.push(value)
                cursor.continue()
            } else {
                resolve(results)
            }

        }

        request.onerror = (event: Event) => {
            console.error('Error getting fcm token:', event);
            reject((event.target as IDBRequest).error);
        }
    })
}

/**
 * This function is used to update the fcm token in the indexed db
 * @param fcmStore This is the fcm object store reference
 * @param fcmId This is the id of the fcm token to be updated
 * @param newFcmToken This is the new fcm token
 * @returns {boolean} This is true if the update was successful and false if it was not
 */
export const updateFcmToken = (
    fcmStore: IDBObjectStore,
    fcmId: string,
    newFcmToken: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {

        // Get the document that will be updated
        const existingDataRequest: IDBRequest<fcmDocument> = fcmStore.get(fcmId)

        existingDataRequest.onsuccess = (event: Event) => {

            const existingData = (event.target as IDBRequest).result as fcmDocument

            if (existingData) {
                const updatedData: fcmDocument = { ...existingData, fcmToken: newFcmToken }
                const putRequest = fcmStore.put(updatedData)

                putRequest.onsuccess = (event: Event) => resolve(true)

                putRequest.onerror = (event: Event) => reject(false)
            } else {
                reject(false)
            }

        }

        existingDataRequest.onerror = (event: Event) => reject(false)

    })
}

/**
 * 
 * @param db This is the db object used to fetch the fcm object store
 * @returns {Promise<boolean>} This is true if the delete was successful and false if it was not
 */
export const deletAllFcmTokens = (
    db: IDBDatabase): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('fcm', 'readwrite')
        const fcmStore = transaction.objectStore('fcm')

        fcmStore.clear();

        transaction.oncomplete = (event: Event) => {
            resolve(true)
        }

        transaction.onerror = (event: Event) => reject(false)
    })
}

const generateRandomId = () => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0].toString();
};
