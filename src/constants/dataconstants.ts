//Import data interfaces
import {appData, userData, skitData, liveData} from "../interfaces/datainterfaces";

//Import types
import * as customTypes from "../types/types";

/**
 * 
 * The following are used to instantiate empty objects that match the shape of the data interfaces
 * 
 */

const emptyUserType: customTypes.userType = "limited";
const emptyOnboardingState: customTypes.onboardingState = "incomplete";
const emptyCurrentSkit: customTypes.currentSkit = "none";

const emptyUserData: userData = {
    userType: emptyUserType,
    userToken: "",
    onboardingState: emptyOnboardingState,
    areNotificationEnabled: false,
    hasUserInstalledAppAsPwa: false,
    firstOpened: new Date(),
}

const emptySkitData: skitData = {
    currentSkit: emptyCurrentSkit,
    nameSkitData: null
}

const emptyLiveData: liveData = {
    isHyphonixLiveOnTwitch: false,
    isHyphonixLiveOnYoutube: false,
    currentOmegleTags: []
}

export const emptyAppData: appData = {
    userData: emptyUserData,
    skitData: emptySkitData,
    liveData: emptyLiveData
}