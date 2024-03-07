import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styling/style.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
      <App />
    </BrowserRouter>

)
