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
import { useIsUserLoggedIn } from './customhooks/useIsUserLoggedIn';
import { useUsersJWT } from './customhooks/useUsersJWT';
import { useGetUsername } from './customhooks/useGetUsername';

//React Hooks
import { useEffect, useContext } from 'react';

//Utils
import { checkUserTokenValidity } from './utilities/checkusertokenvalidity';
import { AppDataContext } from './contexts/appdatacontext';
import { toastHandler } from './utilities/toastHandler';


function App() {
  const location = useLocation()
  const { userType } = useIsUserTypeSet()

  const { appData, setAppData } = useContext(AppDataContext)


  return (

    <div
      id="rootContent"
      className='flex flex-col scroll-smooth h-screen w-screen'>

      {/* {currentPath === "/home" ? <Dialog /> : null} */}
      {location.pathname !== "/" ? <Navbar /> : null}

      {/**Render the Onboarding dialog only if the user is not logged in */}
      {userType !== "unset"
        && !appData.userData.isUserLoggedIn
        && appData.userData.onboardingState === "incomplete"
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
