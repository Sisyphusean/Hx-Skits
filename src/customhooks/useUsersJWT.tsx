//React Hook
import { useContext } from "react";

//Contexts
import { AppDataContext } from "../contexts/appdatacontext";


/**
 * This hook gets the user's JWT
 * @returns {string|boolean} userToken
 */
export const useUsersJWT = () => {

    const { appData } = useContext(AppDataContext)
    let userJWT = (appData.userData.userToken !== "") ? appData.userData.userToken : false

    return { userJWT }
}