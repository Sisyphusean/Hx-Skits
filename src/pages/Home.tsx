//Components
import Navbar from '../components/Navbar';
import HomepageSkitComponent from '../components/home_page_components/HomePageSkitComponent';
import HomePageLiveIndicator from '../components/home_page_components/HomePageLiveIndicator';
import HomePageSetupLevel from '../components/home_page_components/HomePageSetupIndicator';
import HomePageTutorialCard from '../components/home_page_components/HomePageTutorialCard';

//AppDataContext
import { AppDataContext } from '../contexts/appdatacontext';

//React Hooks
import { useContext, useEffect } from "react";

//Animations
import { pageAnimations } from '../constants/animation';
import { checkUserTokenValidity } from '../utilities/checkusertokenvalidity';
import { toastHandler } from '../utilities/toastHandler';
import { logUserOutLocally } from '../utilities/loguseroutlocally';

//Custom Hook
import { useSetAppData } from '../customhooks/useSetAppData';

//Firebase
import { getFirebaseCloudMessengerToken } from '../firebase/firebase'

export default function Home() {

    const { appData } = useContext(AppDataContext)
    const setAppData = useSetAppData()

    useEffect(() => {

        const checkUserTokenValidityAndLogUserOutIfInvalid = async () => {
            if (appData.userData.userToken
                && appData.userData.username) {
                let isJWTValid = await checkUserTokenValidity(appData.userData.userToken, appData.userData.username)

                if (!isJWTValid) {
                    let newData = logUserOutLocally(appData)
                    toastHandler.showErrorToast("Your session has expired. Please login again.", "top-right")
                    setAppData(newData)
                }

            }
        }

        checkUserTokenValidityAndLogUserOutIfInvalid()

    }, [])

    useEffect(() => {

        let isNotificationEnabled = appData.userData.areNotificationEnabled

        if (isNotificationEnabled) {
            getFirebaseCloudMessengerToken()
        } else {
            console.log("Notifications are disabled")
        }

    }, [appData.userData.areNotificationEnabled])


    return (

        <div id="home" className="px-4 ">
            <div className='flex flex-row flex-wrap px-4 gap-8 h-4/6
             sm:px-32
             lg:px-52'>

                {appData.skitData.currentSkit === "none" ? ""
                    : <HomepageSkitComponent
                        marksCurrentName={appData.skitData.nameSkitData.marksCurrentName}
                        tags={appData.liveData.currentOmegleTags}
                        shouldUserGaslightTheMark={appData.skitData.nameSkitData.shouldTheMarkBeGaslight}
                    />}

                <div
                    className='w-full flex gap-8 flex-col-reverse
                    md:flex-col
                    lg:flex-row'>
                    <HomePageLiveIndicator
                        isHyphonixLiveOnTwitch={appData.liveData.isHyphonixLiveOnTwitch}
                        linkToHyphonixTwitch={appData.liveData.linkToHyphonixTwitch}
                        isHyphonixLiveOnYoutube={appData.liveData.isHyphonixLiveOnYoutube}
                        linkToHyphonixYoutube={appData.liveData.linkToHyphonixYoutube}
                    />
                    <HomePageSetupLevel />
                </div>

                <div
                    className=''>
                    <HomePageTutorialCard />
                </div>

            </div>
        </div >

    )
}