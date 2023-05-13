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
    setAppData: () => { }
});

//Define the app's data context provider
export function AppDataContextProvider({ children }: { children: React.ReactNode }) {
    const [appData, setAppData] = useState(emptyAppData)
    //instantiate app's data into state memory if it exists and create it if it doesn't.
    useEffect(() => {
        const initiliazeAppData = async () => {
            let appDataResult = await getAppDataInLocalStorage()

            if (!appDataResult) {
                //Data doesn't exist and is set to false
                setAppDataInLocalStorage(appData)
            }

            if (appDataResult) {
                //Data exists
                setAppData(appDataResult)
            }
        }

        initiliazeAppData()

    }
        , [])

    return (
        <AppDataContext.Provider value={{ appData, setAppData }}>
            {children}
        </AppDataContext.Provider>
    )

}