import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//React Router DOM
import { BrowserRouter } from "react-router-dom";

//Import Tailwind CSS
import './tailwind.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
