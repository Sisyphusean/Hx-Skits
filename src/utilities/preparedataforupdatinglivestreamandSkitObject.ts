//Import interfaces
import { updateLiveStreamDataObject } from "../interfaces/apiinterfaces";
import { appData, liveData, skitData } from "../interfaces/datainterfaces";

/**
 * This function prepares the data for updating the livestream storage object and current skit storage object. It returns the updated app data object
 * @param {updateLiveStreamDataObject} liveStreamData This is the livestream data object containing information for updating the livestream
 * @param {appData} appData This is the app data object containing the current app data
 * @returns {appData} updatedLiveStreamAppData This is the updated app data object
 */
export const prepareDataForUpdatingLivestreamStorageAndCurrentSkitObject = (liveStreamData: any,
    appData: appData) => {

    console.log(liveStreamData)

    let modifiedLiveData: liveData = {
        currentOmegleTags: [],
        isHyphonixLiveOnTwitch: false,
        isHyphonixLiveOnYoutube: false,
        linkToHyphonixTwitch: "",
        linkToHyphonixYoutube: ""
    }

    let modifiedCurrentSkit: skitData = {
        currentSkit: "none",
        nameSkitData: { marksCurrentName: "", shouldTheMarkBeGaslight: false }
    }

    if (liveStreamData.streamingOn === "twitch") {
        modifiedLiveData = {
            ...modifiedLiveData,
            isHyphonixLiveOnTwitch: true,
            linkToHyphonixTwitch: liveStreamData.streamingLink,
            isHyphonixLiveOnYoutube: false,
            linkToHyphonixYoutube: ""
        }
    }

    if (liveStreamData.streamingOn === "youtube") {
        modifiedLiveData = {
            ...modifiedLiveData,
            isHyphonixLiveOnYoutube: true,
            linkToHyphonixYoutube: liveStreamData.streamingLink,
            isHyphonixLiveOnTwitch: false,
            linkToHyphonixTwitch: ""
        }
    }

    if (liveStreamData.activityType === "nameskit"
        && liveStreamData.streamingOn !== "none") {
        modifiedCurrentSkit = {
            ...modifiedCurrentSkit,
            currentSkit: "nameskit"
        }
    }

    let updatedLiveStreamAndSkitAppData: appData = {
        ...appData,
        skitData: modifiedCurrentSkit,
        liveData: modifiedLiveData

    }

    return updatedLiveStreamAndSkitAppData

}