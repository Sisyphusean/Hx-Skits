//Types
import { platform } from "../types/types";

//ApiRequest services
import { poster } from "./apirequests";

export const saveToken = async (token: string, platform: platform) => {
    const data = {
        token, platform
    }

    const path = import.meta.env.VITE_FCM_SAVE_TOKEN as string

    return await poster(path, data).then(
        (response) => {
            if (response.status == 200) {
                console.log("Saved token successfully")
                return response
            } else {
                console.error("Failed to save token", response)
                return false
            }
            //We still need to pass the Token to local storage
        },

        (reject) => {
            console.log("Failed to save token", reject)
            return false
        }
    ).catch((error) => {
        console.log("Something went wrong while saving the token", error)
        return false
    })
}

export const validateToken = async (token: string) => {
    const data = {
        token
    }

    const path = import.meta.env.VITE_FCM_VALIDATE_TOKEN as string

    return await poster(path, data).then(
        (response) => {
            console.log("Validated token successfully", response, typeof response)
            return response
        },

        (reject) => {
            console.log("Failed to validate token", reject)
            return false
        }
    ).catch((error) => {
        console.log("Something went wrong while validating the token", error)
        return false
    })
}

export const updateToken = async (token: string) => {
    const messagelastreceivedon = new Date().toDateString()
    const data = {
        token,
        messagelastreceivedon
    }

    const path = import.meta.env.VITE_FCM_UPDATE_LAST_MESSAGE_ON as string

    return await poster(path, data).then(
        (response) => {
            console.log("Updated token successfully")
            return response
        },

        (reject) => {
            console.log("Failed to update token", reject)
            return false
        }
    ).catch(
        (error) => {
            console.log("Something went wrong while updating fcm data", error)
            return false
        }
    )
}