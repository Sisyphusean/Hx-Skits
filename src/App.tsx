import './App.css'

//React Router
import { Routes, Route, useLocation } from "react-router-dom"

//Toastify CSS
import 'react-toastify/dist/ReactToastify.css';

//Components
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'
import OnboardingDialog from './components/OnboardingDialog'
import Navbar from './components/Navbar';

//Guards
import { OnboardingGuard } from './guards/OnboardingGuard'
import { HomeGuard } from './guards/HomeGuard'
import { AdminGuard } from './guards/AdminGuard'
import { LoginGuard } from './guards/LoginGuard'

//Custom Hooks
import { useIsUserTypeSet } from "./customhooks/useOnboardingGuardHook";
import { useSetAppData } from './customhooks/useSetAppData';

//React Hooks
import { useContext, useEffect, useCallback } from 'react';

//Utils
import { AppDataContext } from './contexts/appdatacontext';
import { openDatabase, getFcmObjectStoreData, updateFcmToken, getFcmToken, addFcmToken, deletAllFcmTokens } from './utilities/indexdb';

//Interfaces
import { appData } from './interfaces/datainterfaces';

//Firebase
import { getFirebaseCloudMessengerToken } from './firebase/firebase';

//Services
import { saveAndSubscribeTokenToTopics, validateToken } from './services/firebaseservices'


function App() {
  const location = useLocation()
  const { userType } = useIsUserTypeSet()
  const { appData } = useContext(AppDataContext)
  const setAppData = useSetAppData()



  useEffect(() => {

    let fcmToken = appData.userData.userFCMToken
    let onboardingState = appData.userData.onboardingState
    let userPlatform = appData.userData.userPlatform

    const fetchNewToken = async () => {
      const token = await getFirebaseCloudMessengerToken()

      if (token) {

        let newDataWithUpdateAppToken: appData = {
          ...appData,
          userData: {
            ...appData.userData,
            userFCMToken: token as string
          }
        }

        await saveAndSubscribeTokenToTopics(token as string, userPlatform).then(
          async (response) => {
            //200 means the token was saved successfully
            //409 means the token already exists
            if (typeof response !== "boolean"
              && (response.status === 200 || response.status === 409)) {
              setAppData(newDataWithUpdateAppToken)

              //Add the new token to the indexedDB or update the existing one
              await openDatabase()
                .then(
                  async (db) => {
                    addFcmToken(db, token as string)
                  })
            }
          },

          (reject) => {
            console.error("Error saving user fcm token, user will not recieve notifications ", reject)
          }
        )

      }
    }

    const handleToken = async () => {
      /**
       * If the user has not granted notification permissions up to this points,
       * we will not attempt to fetch a new FCM token since there will be no point as getToken() will fail
       */
      if (!fcmToken
        && appData.userData.areNotificationEnabled
        && (onboardingState === "complete" || onboardingState === "notifications")) {
        await fetchNewToken()
      }

      //If the token is exists, we will check if it is valid and if not, 
      //we will remove it from every where it is stored
      if (fcmToken) {
        const isTokenValid = await validateToken(fcmToken)

        if (typeof isTokenValid !== 'boolean' && (isTokenValid.status === 202 || isTokenValid.status === 404)) {
          let newAppDataWithNoFCMToken: appData = {
            ...appData,
            userData: {
              ...appData.userData,
              userFCMToken: null
            }
          }

          //remove it from appData (react memory and local storage)
          setAppData(newAppDataWithNoFCMToken)

          //remove it from indexedDB
          openDatabase().then(
            (db) => {
              deletAllFcmTokens(db).then().catch((error) => console.error("Error deleting all tokens from indexedDB ", error))
            }
          )

        }

      }
    }

    handleToken()

  }, [appData.userData.userFCMToken, appData.userData.onboardingState])

  return (

    <div
      id="rootContent"
      className='flex flex-col scroll-smooth h-screen w-screen'>

      {/* {currentPath === "/home" ? <Dialog /> : null} */}
      {location.pathname !== "/" ? <Navbar /> : null}

      {/**Render the Onboarding dialog only if the user is not logged in */}
      {userType !== "unset"
        && !appData.userData.isUserLoggedIn
        && (appData.userData.onboardingState === "incomplete" || appData.userData.onboardingState === "pwa")
        ? <OnboardingDialog /> : ""}

      <div id="mainArea" className="relative flex gap-8 flex-col ">
        <div className='absolute'>
          <ToastContainer limit={1} />
        </div>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={OnboardingGuard()} />
          <Route path="/login" element={LoginGuard()} />
          <Route path="/home" element={HomeGuard()} />
          <Route path="/admin" element={AdminGuard()} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
