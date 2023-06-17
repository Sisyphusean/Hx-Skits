//Interfaces
import { appData } from '../interfaces/datainterfaces';


/**
 * This function is used to log the user out of the app
 */
export const logUserOutLocally = (appData: appData, isUserSessionInvalid: string = "") => {
    // console.log(isUserSessionInvalid !== "" ? "sessionInvalid" : false)
    let newAppData: appData = {
        ...appData,
        userData: {
            ...appData.userData,
            userId: "",
            userToken: "",
            username: "",
            isUserLoggedIn: isUserSessionInvalid !== "" ? "sessionInvalid" : false
        }
    }
    return newAppData
}