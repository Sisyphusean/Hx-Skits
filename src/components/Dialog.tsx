import { useEffect, useState } from "react"

export default function Dialog() {
    const notificationStateIndicators = { enabled: "✅", disabled: "🟠" }
    const [areNotificationsEnabled, toggleNotifications] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [isDialogOpen, toggleDialogOpen] = useState(true)

    //Refactor Document.GetElement is frowned upon in React
    // useEffect(() => {
    //     let parentDiv: any = document.getElementById("rootContent")
    //     if (isDialogOpen) {
    //         parentDiv.body.style.overflow = "hidden"
    //     } else {
    //         parentDiv.body.style.overflow = "visible"
    //     }
    // }, [])

    function nextPage() {
        setCurrentPage(prevVal => prevVal === 1 ? 2 : 1)
    }

    function enableNotification() {
        if (!areNotificationsEnabled) {
            toggleNotifications(true)
        }
    }

    function getCustomClassName(currentPage: number, pageToCheckAgainst = 1) {
        return (`transition-all transform duration-500 w-8/12 h-full flex flex-wrap ${pageToCheckAgainst === 1 ? "flex-row" : "xxs:flex-row sm:flex-col-reverse"}
       bg-white p-0 rounded-md text-charlestoneGreen w-7/12 justify-center
        overflow-hidden
        xxs: w-9/12 xxs:h-5/6
        s:h-5/6
        sm:${pageToCheckAgainst === 1 ? "flex-row-reverse" : ''}
        md:h-3/6
        lg:w-7/12 lg:h-h-5/6
        2xl:w-3/12
        ${currentPage === pageToCheckAgainst
                ? "opacity-100"
                : "opacity-0 translate-x-40 absolute pointer-events-none"}`)

    }

    function getPage1() {

        return (

            <div
                className={getCustomClassName(currentPage, 1)}>

                <div
                    id="div2"
                    className="relative bg-videoBG flex flex-wrap flex-row
                    xxs: w-full xxs:h-2/5 xxs:text-center
                    sm:w-5/12 sm:h-full">
                    <video className="w-full h-full object-contain" autoPlay loop muted>
                        <source
                            src="/assets/notificationsVideo.mp4"
                        >
                        </source>
                    </video>
                </div>

                <div className="flex flex-row m-0
                xxs:w-full
                sm:w-7/12 sm:items-center">
                    <div className="
                    xxs:w-full xxs:p-6
                    sm:w-4/5 sm:p-8">
                        <h5 className="text-lg font-bold w-full">
                            Enable notifications for Skits & when Hyphonix is live 🥸
                        </h5>
                        <p className="
                        xxs:mt-2 xxs:w-full
                        sm:mt-4 sm:w-11/12">
                            Be the first to know when Hyphonix streams. Join Name Skits and events without watching.
                            Don't miss out!
                        </p>

                        <button
                            onClick={() => {
                                enableNotification();
                                !areNotificationsEnabled ? setTimeout(() => {
                                    nextPage()
                                }, 1000) : nextPage()
                            }}
                            type="button"
                            className={`transition flex flex-row items-center text-white p-4 border border-deepBlue-300 
                            rounded-md bg-deepBlue-500 mt-4 ${currentPage === 2 ? "invisible" : "visible"}
                            hover:text-white hover:font-bold hover:bg-deepBlue-400 hover:scale-105
                            active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95`}>

                            Enable Notifications! {areNotificationsEnabled ? notificationStateIndicators.enabled : notificationStateIndicators.disabled}

                        </button>

                        <div className="mt-6">
                            <p className="text-sm">Step 1 of 2</p>
                        </div>
                    </div>
                </div>

            </div>)
    }

    function getPage2() {

        return (
            <div
                className={getCustomClassName(currentPage, 2)}>

                <div
                    className="bg-clouds flex flex-wrap m-0 p-0 
                    xxs:w-full xxs:h-2/5
                    sm:w-4/12 sm:h-full">
                    <img
                        src="/assets/hyphonixSipping.png"
                        alt=""
                        title=""
                        className="h-full xxs:w-full object-cover"
                    />
                </div>

                <div className="flex flex-row xxs:w-full sm:w-8/12 items-center m-0">
                    <div className="
                    xxs:p-6
                    sm:w-full sm:p-8 sm:h-full">
                        <h5 className="text-lg font-bold w-full">
                            Add this app to your device for easy access 📱💻
                        </h5>
                        <p className="xxs:w-full sm:w-11/12 mt-4">
                            Add this app for instant access to Hyphonix’s streams and events. Don’t miss out - save it now!
                        </p>

                        <button
                            onClick={nextPage}
                            type="button"
                            className={`flex flex-row items-center text-white p-4 border  xxs:p-3
                            border-deepBlue-300 rounded-md bg-deepBlue-500 mt-4 ${currentPage === 2 ? "" : "pointer-events-none"}
                            hover:text-white hover:font-bold hover:bg-deepBlue-400 hover:scale-105
                            active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95`}>

                            Add this app to my device!

                        </button>

                        <div className="mt-6">
                            <p className="text-sm">Step 2 of 2</p>
                        </div>
                    </div>
                </div>

            </div>)
    }

    return (
        <div className="absolute top-0 p-0 m-0 h-screen w-screen bg-opacity-80 bg-charlestoneGreen text-white 
        inset-0 flex flex-col items-center justify-center z-50">
            {getPage1()}
            {getPage2()}
        </div>
    )
}