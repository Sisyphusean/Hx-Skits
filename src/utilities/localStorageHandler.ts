//Import interfaces
import { appData } from '../interfaces/datainterfaces';

//Import Encryption Handler
import { encryptAppDataToBeStoredInLocalStorage, decryptAppDataStoredInLocalStorage } from './encryptionHandler'

const localStorageKey = import.meta.env.VITE_LOCAL_STORAGE_KEY

/**
 * This function is used to retrieve the app's encrypted data from local storage, decrypt the data and
 * return it as an appData object.
 * 
 * @returns the app data object if successful and false if it fails to fetch the data from local storage
 */
export const getAppDataInLocalStorage = async (): Promise<appData | false> => {
    try {

        let appData = await localStorage.getItem(localStorageKey)

        // if (appData) {
        //     let decryptedData = decryptAppDataStoredInLocalStorage(appData) ? decryptAppDataStoredInLocalStorage(appData) : false

        //     if (decryptedData) {
        //         return JSON.parse(decryptedData) as appData
        //     }

        //     return false
        // }
        // return false;

        return (appData ? JSON.parse(appData) as appData : false)

    } catch (error) {
        console.error(`Failed to get App Data from local storage: ${error}`)
        return false
    }
}

/**
 * This function is used to encrypt the app's data and set it in in local storage.
 * 
 * @param appData This is the appData that is to be encrypted and stored in local storage
 * @returns 
 */
export const setAppDataInLocalStorage = async (appData: appData) => {
    console.log(appData)
    let encryptedData = encryptAppDataToBeStoredInLocalStorage(appData)
    try {
        if (encryptedData) {
            localStorage.setItem(localStorageKey, JSON.stringify(appData))
            return true
        }
    } catch (error) {
        console.error(error)
        return false
    }
}