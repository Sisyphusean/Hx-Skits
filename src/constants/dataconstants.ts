//Import data interfaces
import * as dataInterfaces from "../interfaces/datainterfaces";

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

const emptyUserData: dataInterfaces.userData = {
    userType: emptyUserType,
    userToken: "",
    onboardingState: emptyOnboardingState,
    areNotificationEnabled: false,
    hasUserInstalledAppAsPwa: false,
    firstOpened: new Date(),
}

const emptySkitData: dataInterfaces.skitData = {
    currentSkit: emptyCurrentSkit,
    nameSkitData: null
}

const emptyLiveData: dataInterfaces.liveData = {
    isHyphonixLiveOnTwitch: false,
    isHyphonixLiveOnYoutube: false,
    currentOmegleTags: []
}

export const emptyAppData: dataInterfaces.appData = {
    userData: emptyUserData,
    skitData: emptySkitData,
    liveData: emptyLiveData
}