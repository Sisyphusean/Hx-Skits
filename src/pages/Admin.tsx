
//Components
import AdminPageNameSkitActivity from "../components/admin_page_components/AdminPageNameSkit";
import AdminPageSetTags from "../components/admin_page_components/AdminPageSetTags";
import AdminLiveStreamSelector from "../components/admin_page_components/AdminLiveStreamSelector";

//React hooks
import { useState, useEffect, useCallback } from "react";

//Custom hooks
import { useGetAppData } from "../customhooks/useGetAppData";

//Framer
import { motion, AnimatePresence } from "framer-motion";

import { possibleComponents } from "../constants/dataconstants";

export default function Admin() {
    const { appData } = useGetAppData()
    const [currentComponent, setCurrentComponent] = useState(possibleComponents.nameSkit)

    useEffect(() => {
        console.log("appData.skitData.currentSkit", appData.skitData.currentSkit)
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