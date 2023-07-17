//React Hooks
import { useEffect, useState, useCallback, useMemo, useContext, MouseEventHandler, ReactNode } from "react"

//Import AppDataContext
import { AppDataContext } from "../contexts/appdatacontext"

//Import custom hook
import { useSetAppData } from "../customhooks/useSetAppData"
import { appData, beforeInstallPromptEvent } from "../interfaces/datainterfaces"

//Utilities
import { toastHandler } from "../utilities/toastHandler"

//Declare the deffered prompt outside of the dialog component to ensure it runs 
//and perists regardless of refresh and whether or not component is mounted
var defferedPrompt: beforeInstallPromptEvent | null = null
window.addEventListener("beforeinstallprompt", (event) => {
    defferedPrompt = event as beforeInstallPromptEvent
})


export default function OnboardingDialog() {
    //App Data instantiations
    const { appData } = useContext(AppDataContext)
    const notificationStateIndicators = { enabled: "✅", disabled: "🟠" }
    const [currentPage, setCurrentPage] = useState(1)
    const [isDialogOpen, toggleDialogOpen] = useState(true)
    const setAppData = useSetAppData()
    var isUserBrowserSupported: boolean = true
    var pageToDisplay: ReactNode = null


    const isIosPwaInstalled = (): boolean => {
        const matchMedia =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.matchMedia('(display-mode: fullscreen)').matches;

        return matchMedia;
    };

    const installPWA = useCallback(
        async () => {
            if (defferedPrompt !== null && appData.userData.userPlatform !== "ios") {

                //Show the install prompt and get the user's choice
                const pwaInstallResults = await defferedPrompt.prompt().then(
                    (userChoice) => {
                        if (userChoice.outcome === "accepted") {
                            return {
                                isPwaInstalled: true,
                                pwaPlatform: userChoice.platform
                            }
                        } else {
                            return false
                        }
                    }
                )

                //Update the app data to reflect the user's choice and get the correct platform
                if (pwaInstallResults) {
                    setAppData(
                        {
                            ...appData,
                            userData: {
                                ...appData.userData,
                                onboardingState: "pwa",
                                hasUserInstalledAppAsPwa: pwaInstallResults.isPwaInstalled
                            }
                        }
                    )
                    appData.userData.userPlatform === "android" && appData.userData.doesUserHavePwaSupport
                        ? null
                        : moveDialogToTheNextPage()
                }

                if (!pwaInstallResults) {
                    let newAppData: appData = {
                        ...appData,
                        userData: {
                            ...appData.userData,
                            onboardingState: "pwa",
                        }
                    }

                    setAppData(newAppData)
                    moveDialogToTheNextPage()
                }

            }

            if (defferedPrompt === null && appData.userData.userPlatform === "ios") {

                let isPwaInstalled = isIosPwaInstalled()
                // console.log(isPwaInstalled)
                if (isPwaInstalled) {
                    setAppData(
                        {
                            ...appData,
                            userData: {
                                ...appData.userData,
                                onboardingState: "pwa",
                                hasUserInstalledAppAsPwa: true,
                                userPlatform: "ios"
                            }
                        }
                    )
                    moveDialogToTheNextPage()
                }

                if (!isPwaInstalled) {
                    toastHandler.showErrorToast("Please add this app to your home screen before continuing",
                        "top-right")
                }
            }

            if (defferedPrompt === null && appData.userData.userPlatform !== "ios") {
                { import.meta.env.VITE_ENV === 'dev' ? console.error("Deffered Prompt is null") : null }
            }
        }, [defferedPrompt, appData])

    /** This function is used to move the dialog to the next page, i.e. From page 1 to 2 and from 2 to 1 */
    const moveDialogToTheNextPage = useCallback(() => {

        if (currentPage == 1) {
            setCurrentPage(2)
        }
        if (currentPage === 2) {
            setCurrentPage(1)

        }
    }, [currentPage])

    useEffect(() => {

        // alert(`Browser: ${appData.userData.browserType}, Service worker: ${navigator.serviceWorker ? "True" : "False"}, Deffered Prompt:${isPWACompatibleBrowser() ? 'True' : 'False'}`)

        //This checks if the user has previously assented to the PWA install prompt. If they have move them on
        if (appData.userData.onboardingState === "pwa" || appData.userData.hasUserInstalledAppAsPwa) {
            setCurrentPage(2)
        }

        if ((appData.userData.onboardingState === "notifications" || appData.userData.onboardingState === "complete") || appData.userData.areNotificationEnabled) {
            toggleDialogOpen(false)
        }
    }, [])

    // Make body of the html fixed if the dialog is open to prevent scrolling and bad ux
    useEffect(() => {
        if (isDialogOpen) {
            document.body.style.overflow = "hidden"
        }
        if (!isDialogOpen) {
            document.body.style.overflow = "visible"
        }
    }, [isDialogOpen])

    /**
     * This function enables notifications for the user and updates the app's data in react's memory and in local storage
     */
    const enableNotifications = useCallback(() => {

        try {
            Notification.requestPermission()
                .then((permission) => {

                    //This will try to get the user to grant notification permission, if such a permission
                    // is not granted prior. It would also update the AppData to reflect the user's choice
                    if (permission === "granted") {
                        let newAppDataWithEnabledNotificationsAndOnboardingState: appData = {
                            ...appData,
                            userData: {
                                ...appData.userData,
                                areNotificationEnabled: true,
                                onboardingState: "notifications"
                            }
                        }

                        setAppData(newAppDataWithEnabledNotificationsAndOnboardingState)

                        navigator.serviceWorker.ready.then(
                            (registration) => {
                                registration.showNotification("Notifications Enabled!",
                                    { body: " 🥸 You'll receive Notifications like this from now on. Bababooey!! " })
                            }
                        )
                    } else if (permission === "denied") {
                        let newAppDataWithDisabledNotificationsAndOnboardingState: appData = {
                            ...appData,
                            userData: {
                                ...appData.userData,
                                areNotificationEnabled: false,
                                onboardingState: "notifications"
                            }
                        }

                        setAppData(newAppDataWithDisabledNotificationsAndOnboardingState)
                    }

                    setTimeout(() => {
                        toggleDialogOpen(false)
                    }, 2000)

                })
        } catch (error) {
            // Safari doesn't return a promise for requestPermissions and it                                                                                                                                       
            // throws a TypeError. It takes a callback as the first argument                                                                                                                                       
            // instead.
            if (error instanceof TypeError) {
                Notification.requestPermission((permission) => {
                    // console.log("Notifications are not enabled")

                    //This will try to get the user to grant notification permission, if such a permission
                    // is not granted prior. It would also update the AppData to reflect the user's choice
                    if (permission === "granted") {
                        let newAppDataWithEnabledNotificationsAndOnboardingState: appData = {
                            ...appData,
                            userData: {
                                ...appData.userData,
                                areNotificationEnabled: true,
                                onboardingState: "notifications"
                            }
                        }

                        setAppData(newAppDataWithEnabledNotificationsAndOnboardingState)

                        navigator.serviceWorker.ready.then(
                            (registration) => {
                                registration.showNotification("Notifications Enabled!",
                                    { body: " 🥸 You'll receive Notifications like this from now on. Bababooey!! " })
                            }
                        )
                    }

                    moveDialogToTheNextPage()

                });
            } else {
                throw error;
            }
        }

    }, [appData])

    const getClassNameDependingOnPage = useCallback((currentPage: number, pageToCheckAgainst = 1) => {
        return (`transition-all transform duration-500 w-8/12 h-full flex flex-wrap 
        \${pageToCheckAgainst === 1 ? "sm:flex-row-reverse" : "xxs:flex-row sm:flex-row-reverse"}
            bg-white p-0 rounded-md text-charlestoneGreen w-7/12 justify-center
            overflow-hidden
            xxs:h-5/6
            xs: w-9/12 xxs:h-6/6 ${appData.userData.userPlatform === "ios" ?
                "xs:my-8 xs:h-6/6 \
                ss:h-full\
                s:my-14 s:h-5/6\
                sm:my-40"
                : "xs:my-24"}
            s:my-40
            sm:${pageToCheckAgainst === 1 ? "flex-row" : ''}
            md:h-4/6 md:w-9/12 md:items-center
            lg:w-7/12 lg:h-5/6
            2xl:w-3/12
            ${currentPage === pageToCheckAgainst
                ? "opacity-100"
                : "opacity-0 translate-x-40 absolute pointer-events-none"}`)
    }, [currentPage])

    const pageOne = useCallback(() => {

        let instructionPreamble: ReactNode = <></>
        let buttonText = ""
        let device = "device"
        let hasAndroidDeviceInstalledPwa = (
            appData.userData.userPlatform === "android"
            && appData.userData.onboardingState === "pwa"
            && appData.userData.hasUserInstalledAppAsPwa === true
        )

        //Change the text depending on the user's platform
        if (appData.userData.userPlatform === "ios") {
            device = "iPhone"
            instructionPreamble = (
                <div className="mt-4">
                    <span className="inline-block pb-2">To add this app to your iPhone:</span>
                    <ol>
                        <li>1. Tap the share icon in your browser, scroll down, and select 'Add to Home Screen'.</li>
                        <li>2. Re-open the app, re-select who you are, and when you return to this dialog, tap the button below.</li>
                    </ol>
                </div>
            )


            buttonText = "I've added this app to my iPhone!"
        }

        if (appData.userData.userPlatform === "android") {
            device = "Android"
            instructionPreamble =
                <>
                    Click the button below to add this app to your Android device and never miss out on Hx Streams and Skits!"
                </>
            buttonText = "Add this app to my phone!"
        }

        if (hasAndroidDeviceInstalledPwa) {
            device = "Android"
            instructionPreamble =
                <>
                    You've installed the Hx app! Please close your browser and open the Hx Skits app from your home screen.
                </>
            buttonText = "Add this app to my phone!"
        }

        if (appData.userData.userPlatform !== "android" && appData.userData.userPlatform !== "ios" && !hasAndroidDeviceInstalledPwa) {
            device = "Computer"
            instructionPreamble =
                <>
                    Click the button below to add this app to your Computer and never miss out on Hx Streams and Skits!
                </>
            buttonText = "Add this app to my computer!"
        }

        return (
            <div
                className={getClassNameDependingOnPage(currentPage, 1)}>
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

                <div className="flex flex-row xxs:w-full sm:w-8/12  m-0
                    s:py-0 s:flex s:items-start ">
                    <div className="
                    xxs:p-6
                    s:py-0
                    sm:w-full sm:p-8 sm:h-full sm:items-center">
                        <h5 className="text-lg font-bold w-full">

                            {
                                hasAndroidDeviceInstalledPwa
                                    ? "Close this page and return to the Hx app"
                                    : ` Add this app to your ${device} for easy access 📱💻`
                            }

                        </h5>


                        {instructionPreamble}

                        {
                            hasAndroidDeviceInstalledPwa
                                ? null
                                : <button
                                    onClick={installPWA}
                                    type="button"
                                    className={`flex flex-row items-center text-white p-4 border  xxs:p-3
                            border-deepBlue-300 rounded-md bg-deepBlue-500 mt-4 ${currentPage === 1 ? "" : "pointer-events-none"}
                            xxs:w-full xxs:justify-center
                            sm:w-auto
                            hover:text-white hover:font-bold hover:bg-deepBlue-400 hover:scale-105
                            active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95`}>

                                    {buttonText}

                                </button>
                        }


                        <div className="mt-6">
                            <p className="text-sm">Step 1 of 2</p>
                        </div>
                    </div>
                </div>

            </div>)
    }, [currentPage, appData])

    /** This is the dynamic first page that will be rendered depending on external dependencies */
    const pageTwo = useCallback(() => {
        return (
            <div
                className={getClassNameDependingOnPage(currentPage, 2)}>

                <div
                    id="div2"
                    className="relative bg-videoBG flex flex-wrap flex-row
                        xxs: w-full xxs:h-2/5 xxs:text-center
                        sm:w-5/12 sm:h-full">
                    <video className="w-full h-full object-contain" autoPlay loop playsInline muted>
                        <source
                            src="/assets/notificationsVideo.mp4"
                        >
                        </source>
                    </video>
                </div>

                <div className="m-0
                    xxs:w-full xxs:h-full
                    s:inline s:h-auto 
                    sm:flex-row
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
                        < button
                            onClick={() => {
                                enableNotifications();
                            }}
                            type="button"
                            className={`transition flex flex-row items-center text-white p-4 border border-deepBlue-300 
                                rounded-md bg-deepBlue-500 mt-4 ${currentPage === 1 ? "invisible" : "visible"
                                }
                                xxs:w-full xxs:justify-center
                                s:inline-block
                                hover:text-white hover:font-bold hover:bg-deepBlue-400 hover:scale-105
                                active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95`}
                        >

                            {appData.userData.areNotificationEnabled ? "Notifications enabled" : "Enable notifications"}
                            {appData.userData.areNotificationEnabled ? notificationStateIndicators.enabled : notificationStateIndicators.disabled}

                        </button>
                        <div className="mt-6">
                            <p className="text-sm">Step 2 of 2</p>
                        </div>
                    </div>
                </div>

            </div >
        )
    }, [currentPage, appData.userData.areNotificationEnabled])

    const unsupportedBrowserPage = useMemo(() => {
        let userBrowser = appData.userData.browserType.toLowerCase()
        console.log(userBrowser)
        let isBrowserSupported = (
            userBrowser === "chrome"
            || userBrowser === "brave"
        )


        if (!isBrowserSupported) {
            isUserBrowserSupported = false
        }

        return (
            <div>
                <p
                    className="text-center text-lg font-bold"
                >
                    Your Browser ({userBrowser[0].toLocaleUpperCase() + userBrowser.slice(1)}) is currently not supported. <br />
                    Please open the app in Google Chrome or Brave Browser to continue.
                </p>
            </div>
        )
    }, [appData])

    pageToDisplay = useMemo(() => {
        if (currentPage === 1) {
            return pageOne()
        }

        return pageTwo()

    }, [currentPage, appData])

    // console.log(`Is ${appData.userData.browserType} Supported: `, isUserBrowserSupported)


    /** 
     * This is the dynamic second page that will be rendered depending on external dependencies. If the person's browser supports the 
     * PWA event listener, beforeinstallprompt, then this page will be rendered, otherwise it be render instructing the user
     * how to manually install the Hx app as a PWA
     */
    return (
        <div className={` transition-all duration-300 absolute top-0 p-0 m-0 h-screen bg-opacity-80 bg-charlestoneGreen text-white 
        inset-0 flex flex-col items-center justify-center z-50 overflow-hidden
        ${isDialogOpen ? 'opacity-100' : 'opacity-0 -translate-y-40 pointer-events-none'} `}>
            {isUserBrowserSupported ? pageToDisplay : unsupportedBrowserPage}
        </div>
    )
}