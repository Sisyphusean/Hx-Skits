import './App.css'

//React Router
import { Routes, Route } from "react-router-dom"

//App's pages
import Home from "./pages/Home"
import Onboarding from './pages/Onboarding'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </div>
  )
}

export default App
