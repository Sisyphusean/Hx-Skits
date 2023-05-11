import { appData } from "../interfaces/datainterfaces"

//This is the user's type which can either be admin or limited
export type userType = "admin" | "limited" | "unset"

/** This property is used to specify if the user has been onboarded or not. It can either be incomplete 
* if the user is yet to even see the dialog, notifications if the user has seen the first page of the 
* onboarding dialog that shows notifications and complete if the user has completed the onboarding process 
* by enabling notifications and installing the app as a PWA. 
*/
export type onboardingState = "incomplete" | "notifications" | "complete"

/**
 * This property indicates the current skit that is being played
 */
export type currentSkit = "none" | "nameSkit"

/**
 * This is used to specify the type of the context used to create the master store of the entire application
 */
export type appDataContextType = {
    //This represents the entire app data and is a defined type of appData
    appData: appData,
    //This represents the function that is used to set the app data state and is passed down through the react apps
    setAppData: React.Dispatch<React.SetStateAction<appData>> | null
}

export type buttonClassTypes = "filled" | "outlined" | "text" | "disabled"
export type buttonTypes = undefined | "button" | "submit" | "reset"
export type buttonIcons = "arrowRight"