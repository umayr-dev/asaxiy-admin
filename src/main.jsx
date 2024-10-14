import React from 'react'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './assets/styles/main.css'


createRoot(document.querySelector('.wrapper')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
