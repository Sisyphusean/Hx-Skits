import './App.css'


//React Router
import { Routes, Route, useLocation } from "react-router-dom"

//App's pages
import Home from "./pages/Home"
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Admin from './pages/Admin'

//Toastify CSS
import 'react-toastify/dist/ReactToastify.css';

//Components
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'
import Dialog from './components/Dialog'

//Guards
import { OnboardingGuard } from './guards/OnboardingGuard'

function App() {

  const currentPath = useLocation().pathname

  return (
    <div
      id="rootContent"
      className='flex flex-col scroll-smooth h-screen w-screen'>

      {currentPath === "/home" ? <Dialog /> : null}

      <div id="mainArea" className="relative flex gap-8 flex-col ">
        <div className='absolute'>
          <ToastContainer limit={1} />
        </div>
        <Routes>
          <Route path="/" element={OnboardingGuard()} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
