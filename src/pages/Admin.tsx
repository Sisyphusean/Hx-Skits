
//Components
import AdminPageNameSkitActivity from "../components/admin_page_components/AdminPageNameSkit";
import AdminPageSetTags from "../components/admin_page_components/AdminPageSetTags";
import AdminLiveStreamSelector from "../components/admin_page_components/AdminLiveStreamSelector";

//React hooks
import { useState, useEffect, useCallback } from "react";

//Custom hooks
import { useGetAppData } from "../customhooks/useGetAppData";
import { useSetAppData } from "../customhooks/useSetAppData";

//Framer
import { motion, AnimatePresence } from "framer-motion";

//Interfaces
import { appData } from "../interfaces/datainterfaces";
import { getOmegleTagsResponse, updateLiveStreamDataObject, nameSkitDataObject } from "../interfaces/apiinterfaces";

//Constants
import { possibleComponents } from "../constants/dataconstants";

//Services
import { getter } from "../services/apirequests";

//Utilities
import { prepareDataForUpdatingLivestreamStorageAndCurrentSkitObject } from "../utilities/preparedataforupdatinglivestreamandSkitObject";


export default function Admin() {
    const { appData } = useGetAppData()
    const [currentComponent, setCurrentComponent] = useState(possibleComponents.nameSkit)
    const setAppData = useSetAppData()

    useEffect(() => {
        if (!appData.skitData.currentSkit) {
            setCurrentComponent(possibleComponents.selector)
        }

        if (appData.skitData.currentSkit === "nameskit") {
            setCurrentComponent(possibleComponents.nameSkit)
        }

        if (appData.skitData.currentSkit === "none") {
            setCurrentComponent(possibleComponents.livestream)
        }
    }, [appData])

    // Make a call to omegle data, livestream data, and 
    // name skit data API and update the memory
    useEffect(() => {
        Promise.allSettled([

            //Get the Omegle Data on app load
            getter(import.meta.env.VITE_USER_GET_OMEGLE_TAGS as string),
            //Get the livestream data on app load
            getter(import.meta.env.VITE_USER_GET_LIVESTREAM as string),
            //Get the name skit data on app load
            getter(import.meta.env.VITE_USER_GET_NAMESKIT as string)

        ]).then((results) => {
            //The results are in the order of the Omegle request and then the livestream request
            let omegleData: getOmegleTagsResponse | undefined;
            let livestreamData: updateLiveStreamDataObject | undefined;
            let nameSkitData: nameSkitDataObject | undefined

            results.map((result, index) => {

                if (result.status === "fulfilled" && index === 0) {
                    omegleData = result.value.data as getOmegleTagsResponse
                }

                if (result.status === "fulfilled" && index === 1) {
                    livestreamData = result.value.data as updateLiveStreamDataObject
                }

                if (result.status === "fulfilled" && index === 2) {
                    nameSkitData = result.value.data as nameSkitDataObject
                }
            })

            if (omegleData && livestreamData && nameSkitData) {

                let appDataWithUpdatedLiveStreamData = prepareDataForUpdatingLivestreamStorageAndCurrentSkitObject(livestreamData, appData)
                let newUpdatedAppData: appData = {
                    ...appDataWithUpdatedLiveStreamData,
                    skitData: {
                        ...appData.skitData,
                        currentSkit: livestreamData.activityType === "nameskit" ? "nameskit" : "none",
                        nameSkitData: {
                            ...appData.skitData.nameSkitData,
                            marksCurrentName: nameSkitData.marksName,
                            shouldTheMarkBeGaslight: JSON.parse(nameSkitData.shouldUserBeGaslit)
                        }
                    },
                    liveData: {
                        ...appDataWithUpdatedLiveStreamData.liveData,
                        currentOmegleTags: omegleData.currentOmegleTags
                    }
                }

                setAppData(newUpdatedAppData)

            }

        })

    }, [])

    const getCurrentNameSkit = useCallback(() => {

        if (appData.skitData.currentSkit === "nameskit") {
            return (
                <div className="flex flex-col m-0 p-0 gap-6">
                    <AdminPageSetTags />
                    <AdminPageNameSkitActivity />
                </div>
            )
        } else {
            return (
                <div className="bg-white h-auto text-charlestoneGreen p-6 rounded-lg
            xxs:w-full">
                    <p
                        className="text-charlestoneGreen opacity-60"
                    >
                        Please set the Hyphonix's current activity to "Community name skit" to control the community name skit updates
                    </p>
                </div>
            )
        }

    }, [appData.skitData.currentSkit])

    const getCurrentComponents = useCallback(() => {
        return (
            <motion.div
                key="nameskit"
                layout
            >
                <div className="flex flex-col w-full items-center gap-12">
                    <div
                        className="flex flex-col m-0 p-0 w-full gap-6"
                    >
                        <h3
                            className="text-white text-lg font-semibold"
                        >Live stream settings</h3>
                        <AdminLiveStreamSelector minified={true} />
                    </div>

                    <div
                        className="flex flex-col gap-6">
                        <h3
                            className="text-white text-lg font-semibold"
                        >Community name skit settings</h3>

                        {getCurrentNameSkit()}
                    </div>
                </div>
            </motion.div>
        )
    }, [currentComponent])


    return (
        <div
            id="adminPage"
            className="h-full justify-center items-center sm:w-6/12 xxs:10/12 mx-auto rounded-lg mb-2 p-4">
            <div
                className="flex flex-col  w-full items-center justify-center relative">
                <AnimatePresence>
                    {getCurrentComponents()}
                </AnimatePresence>
            </div>
        </div>
    )
}