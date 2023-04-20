import { useState } from 'react'
import './App.css'

//React Router
import { Routes, Route } from "react-router-dom"

//App's pages
import Home from "./pages/Home"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
