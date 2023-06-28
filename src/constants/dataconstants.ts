//Import data interfaces
import { appData, userData, skitData, liveData, nameSkitData } from "../interfaces/datainterfaces";

//Import types
import * as customTypes from "../types/types";

/**
 * 
 * The following are used to instantiate empty objects that match the shape of the data interfaces
 * 
 */

const emptyUserType: customTypes.userType = "unset";
const emptyOnboardingState: customTypes.onboardingState = "incomplete";
const emptyCurrentSkit: customTypes.currentSkit = "none";

const emptyUserData: userData = {
    userType: emptyUserType,
    userToken: "",
    username: "",
    userId: "",
    onboardingState: emptyOnboardingState,
    areNotificationEnabled: false,
    browserType: "",
    doesUserHavePwaSupport: false,
    userPlatform: "unknown",
    hasUserInstalledAppAsPwa: false,
    firstOpened: new Date(),
    isUserLoggedIn: false,
    userFCMToken: null
}

const emptyNameSkitData: nameSkitData = {
    marksCurrentName: "",
    shouldTheMarkBeGaslight: false

}

const emptySkitData: skitData = {
    currentSkit: emptyCurrentSkit,
    nameSkitData: emptyNameSkitData
}

const emptyLiveData: liveData = {
    isHyphonixLiveOnTwitch: false,
    linkToHyphonixTwitch: "",
    isHyphonixLiveOnYoutube: false,
    linkToHyphonixYoutube: "",
    currentOmegleTags: []
}

export const emptyAppData: appData = {
    userData: emptyUserData,
    skitData: emptySkitData,
    liveData: emptyLiveData
}

export const possibleComponents = { selector: "selector", nameSkit: "nameSkit", livestream: "none" }