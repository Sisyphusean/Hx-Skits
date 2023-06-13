//React Hook
import { useContext } from "react";

//Contexts
import { AppDataContext } from "../contexts/appdatacontext";


/**
 * This hook is used to check if the user is logged in or not
 * @returns {boolean} isUserLoggedIn
 */
export const useIsUserLoggedIn = () => {

    const { appData } = useContext(AppDataContext)
    let isUserLoggedIn = (appData.userData.userId !== "" && appData.userData.userToken !== "") ? true : false

    return { isUserLoggedIn }
}