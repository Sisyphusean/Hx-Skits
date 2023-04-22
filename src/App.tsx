import './App.css'

//React Router
import { Routes, Route } from "react-router-dom"

//App's pages
import Home from "./pages/Home"
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'


function App() {

  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
