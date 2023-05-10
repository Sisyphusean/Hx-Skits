//Import Crypto JS
import { AES } from 'crypto-js';
import utf8 from 'crypto-js/enc-utf8';

//import Interfaces
import { appData } from '../interfaces/datainterfaces';

const salt = import.meta.env.VITE_CRYPTO_SALT

/**
 * This function is used to encrypt the data that is stored in the local storage
 * 
 * @param appData This is the app data that is to be encrypted
 * @returns the encrypted data object of type appData if successful and false if it fails
 */
export const encryptAppDataToBeStoredInLocalStorage = (appData: appData) => {
    try {
        let encryptedData = AES.encrypt(JSON.stringify(appData), salt).toString();
        return encryptedData
    } catch (error) {
        console.error(`Failed to encrypt data: ${error}`)
        return false
    }
}

/**
 * This function is used to decrypt the data that is stored in the local storage
 * 
 * @param appData This is the data that is to be decrypted
 * @returns decrypted data if successful and false if it fails to decrypt the data
 */
export const decryptAppDataStoredInLocalStorage = (appData: string) => {

    try {
        let decryptedData = AES.decrypt(appData, salt).toString(utf8);
        return decryptedData
    } catch (error) {
        console.error(`Failed to decrypt data: ${error}`)
        return false
    }

}