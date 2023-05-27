//import App context
import { AppDataContext } from "../contexts/appdatacontext"

// import React hooks
import { useCallback } from "react"

//import interfaces
import { appData } from "../interfaces/datainterfaces"
import { getAppDataInLocalStorage, setAppDataInLocalStorage } from "../utilities/localStorageHandler"

//Import lodash
import _ from "lodash"

export const useUpdateAppDataWithShallowComparisonIgnoringTime = () => {

    /**
     * This function updates the app's data in local storage if the app's data in local storage is different 
     * from the app's data in react's memory
     * @param newData The new app data to set
     */
    const useUpdateAppDataWithShallowComparisonIIFE = useCallback(async (newData: appData) => {

        //Both setAppData and appDataInLocalStorage should never not be defined since
        //they are defined prior, but might as well check to prevent error linting :)
        let appDataInLocalStorage: false | appData = await getAppDataInLocalStorage();

        let AppDataInLocalStorageIgnoringTime = appDataInLocalStorage ? {
            ...appDataInLocalStorage,
            userData: { ...appDataInLocalStorage.userData, firstOpened: "" }
        } : newData

        let reactAppDataIgnoringTime = {
            ...newData,
            userData: { ...newData.userData, firstOpened: "" }
        };

        let areTheAppDataValuesTheSame =
            _.isEqual(AppDataInLocalStorageIgnoringTime, reactAppDataIgnoringTime);


        if (!areTheAppDataValuesTheSame) {
            (import.meta.env.VITE_ENV === "dev" ? console.log("Data updated because data wasn't the same") : "");
            (newData ? setAppDataInLocalStorage(newData) : null)
        }

        if (areTheAppDataValuesTheSame) {
            (import.meta.env.VITE_ENV === "dev"
                ? console.log(
                    "Data was not updated. Debug data is below",
                    `{'NewData' : ${JSON.stringify(reactAppDataIgnoringTime)},  'OldData': ${JSON.stringify(AppDataInLocalStorageIgnoringTime)}}`
                ) : "");
        }
    }, [])

    return useUpdateAppDataWithShallowComparisonIIFE;
}