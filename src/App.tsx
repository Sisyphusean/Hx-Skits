import './App.css'

//React Router
import { Routes, Route } from "react-router-dom"

//App's pages
import Home from "./pages/Home"
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'

//Toastify CSS
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer'
import Dialog from './components/Dialog'

function App() {

  return (
    <div 
    id="rootContent"
    className='scroll-smooth'>
      <Dialog />
      <div className="h-5/6">
        <ToastContainer limit={1} />
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
