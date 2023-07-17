//Interfaces
import { firebaseNameSkitResponse, nameSkitDataObject } from "../interfaces/apiinterfaces";
import { appData } from "../interfaces/datainterfaces";


/**
 * This function takes in the appData and the firebaseNameSkitDatObject 
 * and returns the appData with the updated nameSkitData and a notification message
 * @param appData This is the appData object
 * @param firebaseNameSkitDatObject  This is the firebaseNameSkitDatObject
 * @returns {appData, string}
 */
export const prepareappdataforupdatingnameskitobject =
    (appData: appData,
        firebaseNameSkitDatObject: firebaseNameSkitResponse,
        hasTheNameSkitDataStringBeenParsed: boolean = true): { appDataWithUpdatedNameSkit: appData, notificationMessage: string } => {

        if (hasTheNameSkitDataStringBeenParsed) {

            const appDataWithUpdatedNameSkit: appData = {
                ...appData,
                skitData: {
                    ...appData.skitData,
                    nameSkitData: {
                        ...appData.skitData.nameSkitData,
                        marksCurrentName: firebaseNameSkitDatObject.nameSkitData.marksName,
                        shouldTheMarkBeGaslight: JSON.parse(firebaseNameSkitDatObject.nameSkitData.shouldUserBeGaslit),
                    }
                }
            }

            let notificationMessage = firebaseNameSkitDatObject.nameSkitData.shouldUserBeGaslit ?
                `Don't say their name! Gaslight them` : `Say their name! it's ${firebaseNameSkitDatObject.nameSkitData.marksName}`

            return { appDataWithUpdatedNameSkit, notificationMessage }

        } else {
            let rawNameSkitData = firebaseNameSkitDatObject.nameSkitData as any
            const parsedNameSkitData = JSON.parse(rawNameSkitData) as nameSkitDataObject

            const appDataWithUpdatedNameSkit: appData = {
                ...appData,
                skitData: {
                    ...appData.skitData,
                    nameSkitData: {
                        ...appData.skitData.nameSkitData,
                        marksCurrentName: parsedNameSkitData.marksName,
                        shouldTheMarkBeGaslight: JSON.parse(parsedNameSkitData.shouldUserBeGaslit),
                    }
                }
            }

            let notificationMessage = parsedNameSkitData.shouldUserBeGaslit ?
                `Don't say their name! Gaslight them` : `Say their name! it's ${parsedNameSkitData.marksName}`

            return { appDataWithUpdatedNameSkit, notificationMessage }
        }


    }