
//Types
import { userType, onboardingState, currentSkit } from "../types/types"

/**
 *  This interface describes the type of information that is used to describe the user entity
 */
export interface userData {
    //This is the user's type which can either be admin or limited
    userType: userType
    //This is the user's token that is used to authenticate the user
    userToken: string,
    /** This property is used to specify if the user has been onboarded or not. It can either be incomplete 
     * if the user is yet to even see the dialog, notifications if the user has seen the first page of the 
     * onboarding dialog that shows notifications and complete if the user has completed the onboarding process 
     * by enabling notifications and installing the app as a PWA. */
    onboardingState: onboardingState,
    //This property is used to specify if the user has enabled notifications after they were asked to
    areNotificationEnabled: boolean,
    //This property specifies if the application has been installed succesfully as a PWA
    hasUserInstalledAppAsPwa: boolean,
    //This property stores the date the user first opened the application
    firstOpened: Date | string
}

/**
 *  This interface describes the type of information that is used to describe the data specific to the NameSkit
 */
export interface nameSkitData {
    //This property contains the current name of the mark being trolled
    marksCurrentName: string,
    //This property indicates whether or not the community users should gaslight the mark
    shouldTheMarkBeGaslight: boolean
}

/**
 *  This interface describes the type of information that is used to describe the skit data
 */
export interface skitData {
    //This property indicates the current skit that is being played
    currentSkit: currentSkit,
    //This property indicates the data specific to the NameSkit. It is set to null if the current skit is not the NameSkit
    nameSkitData: nameSkitData | null
}

/**
 *  This interface describes the type of information that is used to describe the live states of Hyphonix
 */
export interface liveData {
    //This property indicates whether or not Hyphonix is live on Twitch
    isHyphonixLiveOnTwitch: boolean,
    //This property indicates whether or not Hyphonix is live on Youtube
    isHyphonixLiveOnYoutube: boolean,
    //This property indicates what tags Hyphonix is currently using on Omegle
    currentOmegleTags: string[]
}

/**
 * This is an interface that is used to describe the entire data structure of the app's data 
 */
export interface appData {
    // This property is used to store the data specific to the user
    userData: userData,
    //This property is used to store the data specific to the skit that is currently being played
    skitData: skitData,
    //This property is used to store the data specific to the live states of Hyphonix
    liveData: liveData,
}

