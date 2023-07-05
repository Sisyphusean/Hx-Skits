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

//Interfaces
import { appData } from './interfaces/datainterfaces';

//Firebase
import { getFirebaseCloudMessengerToken } from './firebase/firebase';

//Services
import { saveToken, validateToken } from './services/firebaseservices'


function App() {
  const location = useLocation()
  const { userType } = useIsUserTypeSet()
  const { appData } = useContext(AppDataContext)
  const setAppData = useSetAppData()


  useEffect(() => {

    let fcmToken = appData.userData.userFCMToken
    let onboardingState = appData.userData.onboardingState
    let userPlatform = appData.userData.userPlatform

    const renewToken = async () => {
      const token = await getFirebaseCloudMessengerToken()

      if (token) {

        let newDataWithUpdateAppToken: appData = {
          ...appData,
          userData: {
            ...appData.userData,
            userFCMToken: token as string
          }
        }

        await saveToken(token as string, userPlatform).then(
          (response) => {
            if (typeof response !== "boolean" && response.status === 200) {
              setAppData(newDataWithUpdateAppToken)
            }
          },

          (reject) => {
            console.error("Error saving user fcm token, user will not recieve notifications ", reject)
          }
        )
        setAppData(newDataWithUpdateAppToken)

      }
    }

    const handleToken = async () => {
      if (!fcmToken && (onboardingState === "complete" || onboardingState === "notifications")) {
        await renewToken()
      }

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
          setAppData(newAppDataWithNoFCMToken)
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
