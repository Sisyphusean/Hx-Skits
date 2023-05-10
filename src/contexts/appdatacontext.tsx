//React imports
import { useState, createContext, useEffect } from "react";

//Constant import
import { emptyAppData } from "../constants/dataconstants";

//Utilities import
import { getAppDataInLocalStorage, setAppDataInLocalStorage } from "../utilities/localStorageHandler";
import { appDataContextType } from "../types/types";

//Store of the entire app's data
export const AppDataContext = createContext<appDataContextType>({
    appData: emptyAppData,
    setAppData: null
});

//Define the app's data context provider
export function AppDataContextProvider({ children }: { children: React.ReactNode }) {
    const [appData, setAppData] = useState(emptyAppData)

    //instantiate app's data into state memory if it exists and create it if it doesn't.
    useEffect(() => {
        let checkIfAppDataIsDefinedInLocalStorage = getAppDataInLocalStorage()
        checkIfAppDataIsDefinedInLocalStorage.then((data) => {

            if (!data) {
                //Data doesn't exist and is set to false
                setAppDataInLocalStorage(appData)
            }

            if (data) {
                //Data exists
                setAppData(data)
            }

        })
    }
        , [])

    //Update app's data in local storage whenever the appData changes.
    useEffect(() => () => {
        setAppDataInLocalStorage(appData)
    }, [appData])

    return (
        <AppDataContext.Provider value={{ appData, setAppData }}>
            {children}
        </AppDataContext.Provider>
    )

}