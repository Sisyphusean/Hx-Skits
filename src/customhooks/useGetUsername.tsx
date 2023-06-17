//React Hook
import { useContext } from "react";

//Contexts
import { AppDataContext } from "../contexts/appdatacontext";


/**
 * This hook is used to check if the user is logged in or not
 * @returns {boolean} isUserLoggedIn
 */
export const useGetUsername = () => {

    const { appData } = useContext(AppDataContext)
    let username: boolean | string = false

    if (appData.userData.username !== "") {
        username = appData.userData.username
    }

    return { username }
}