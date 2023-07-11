//Components
import Navbar from '../components/Navbar';
import HomepageSkitComponent from '../components/home_page_components/HomePageSkitComponent';
import HomePageLiveIndicator from '../components/home_page_components/HomePageLiveIndicator';
import HomePageSetupLevel from '../components/home_page_components/HomePageSetupIndicator';
import HomePageTutorialCard from '../components/home_page_components/HomePageTutorialCard';

//AppDataContext
import { AppDataContext } from '../contexts/appdatacontext';

//React Hooks
import { useContext, useEffect, useCallback } from "react";

//Animations
import { pageAnimations } from '../constants/animation';
import { checkUserTokenValidity } from '../utilities/checkusertokenvalidity';
import { toastHandler } from '../utilities/toastHandler';
import { logUserOutLocally } from '../utilities/loguseroutlocally';

//Custom Hook
import { useSetAppData } from '../customhooks/useSetAppData';

//Firebase
import { getFirebaseCloudMessengerToken } from '../firebase/firebase'

//Services
import { getter } from '../services/apirequests';

//Interfaces
import { getOmegleTagsResponse, updateLiveStreamDataObject } from '../interfaces/apiinterfaces';
import { appData } from '../interfaces/datainterfaces';

//Utilities
import { prepareDataForUpdatingLivestreamStorageAndCurrentSkitObject } from '../utilities/preparedataforupdatinglivestreamandSkitObject';

export default function Home() {

    const { appData } = useContext(AppDataContext)
    const setAppData = useSetAppData()

    //function for getting app Data (liveskit, omgeletags, etc) from the API
    const getAppDataFromAPIAndSetItInMemory = useCallback(async () => {

        Promise.allSettled([

            //Get the Omegle Data on app load
            getter(import.meta.env.VITE_USER_GET_OMEGLE_TAGS as string),
            //Get the livestream data on app load
            getter(import.meta.env.VITE_USER_GET_LIVESTREAM as string)

        ]).then((results) => {
            //The results are in the order of the Omegle request and then the livestream request
            let omegleData: getOmegleTagsResponse | undefined;
            let livestreamData: updateLiveStreamDataObject | undefined;

            results.map((result, index) => {

                if (result.status === "fulfilled" && index === 0) {
                    omegleData = result.value.data as getOmegleTagsResponse
                }

                if (result.status === "fulfilled" && index === 1) {
                    livestreamData = result.value.data as updateLiveStreamDataObject
                }
            })

            if (omegleData && livestreamData) {

                let appDataWithUpdatedLiveStreamData = prepareDataForUpdatingLivestreamStorageAndCurrentSkitObject(livestreamData, appData)
                let newUpdatedAppData: appData = {
                    ...appDataWithUpdatedLiveStreamData,
                    liveData: {
                        ...appDataWithUpdatedLiveStreamData.liveData,
                        currentOmegleTags: omegleData.currentOmegleTags
                    }
                }

                setAppData(newUpdatedAppData)

            }

        })


    }, [appData])



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

    //UseEffect for getting the omegle and livestream data from the db
    useEffect(() => {
        getAppDataFromAPIAndSetItInMemory()
    }, [])

    const getHomePage = useCallback(() => {
        let homePageSkitComponentReference = null

        if (appData.skitData.currentSkit !== "none") {
            homePageSkitComponentReference = <HomepageSkitComponent
                marksCurrentName={appData.skitData.nameSkitData.marksCurrentName}
                tags={appData.liveData.currentOmegleTags}
                shouldUserGaslightTheMark={appData.skitData.nameSkitData.shouldTheMarkBeGaslight}
            />
        } else {
            homePageSkitComponentReference = ""
        }

        return (
            <>
                {homePageSkitComponentReference}
                < div
                    className='w-full flex gap-8 flex-col-reverse md:flex-col lg:flex-row'>
                    < HomePageLiveIndicator
                        isHyphonixLiveOnTwitch={appData.liveData.isHyphonixLiveOnTwitch}
                        linkToHyphonixTwitch={appData.liveData.linkToHyphonixTwitch}
                        isHyphonixLiveOnYoutube={appData.liveData.isHyphonixLiveOnYoutube}
                        linkToHyphonixYoutube={appData.liveData.linkToHyphonixYoutube}
                    />
                    <HomePageSetupLevel />
                </div >

                <div
                    className=''>
                    <HomePageTutorialCard />
                </div>
            </>
        )
    }, [appData])


    return (

        <div id="home" className="px-4 ">
            <div className='flex flex-row flex-wrap px-4 gap-8 h-4/6
             sm:px-32
             lg:px-52'>

                {getHomePage()}

            </div>
        </div >

    )
}