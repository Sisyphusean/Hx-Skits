//Import poster api caller
import { apiResponse } from "../interfaces/apiinterfaces"
import { appData } from "../interfaces/datainterfaces"
import { loginResponse } from "../interfaces/apiinterfaces"

//Import ToastHandler
import { toastHandler } from "../utilities/toastHandler"


//Utils
import { checkUserTokenValidity } from "./checkusertokenvalidity"

export const logUserInLocally = (apiResponse: apiResponse, appData: appData) => {
    let isUserLoggedIn = false

    if (apiResponse.status == 400) {
        toastHandler.showErrorToast("You've entered an invalid username or password. Please try again", "top-right")
        let appDataWithUserLoggedIn = ""
        return { isUserLoggedIn, appDataWithUserLoggedIn }
    }

    let { id, username, token } = apiResponse.data as loginResponse
    let isTokenValid = checkUserTokenValidity(token, username)

    if (isTokenValid) {
        let appDataWithUserLoggedIn: appData = {
            ...appData,
            userData: {
                ...appData.userData,
                userId: id,
                username: username,
                userToken: token,
                userType: "admin",
                isUserLoggedIn: true
            }
        }

        //Update user data to reflect the new user data
        isUserLoggedIn = true
        toastHandler.showSuccessToast("You've successfully logged in", "top-right")

        return { isUserLoggedIn, appDataWithUserLoggedIn }
    } else {
        toastHandler.showErrorToast("John misread something and because of that we can't log you in. Get help in discord", "top-right")
        let appDataWithUserLoggedIn = ""
        return { isUserLoggedIn, appDataWithUserLoggedIn }
    }



}