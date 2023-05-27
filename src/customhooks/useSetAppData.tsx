//Import React hooks
import { useCallback, useContext, useEffect } from "react";

//Import interfaces
import { appData as appDataInterface } from "../interfaces/datainterfaces";

//Import setAppData from appDataContext
import { AppDataContext } from "../contexts/appdatacontext";

import { useUpdateAppDataWithShallowComparisonIgnoringTime } from "./useUpdateAppDataWithShallowComparison";

/**
 * This hook returns a function that can set the app's data in react's memory and in local storage
 * @returns Function that can set the app's data in react's memory and in local storage
 */
export const useSetAppData = () => {
    const { setAppData } = useContext(AppDataContext)
    const updateAppDataWithShallowComparison = useUpdateAppDataWithShallowComparisonIgnoringTime()

    /**
     * This function sets the app's data in react's memory and in local storage
     * @param newData The new app data to set
     */
    const setAppDataCallback = useCallback((newData: appDataInterface) => {
        setAppData(newData)
        updateAppDataWithShallowComparison(newData)
    }, [setAppData])

    return setAppDataCallback

}