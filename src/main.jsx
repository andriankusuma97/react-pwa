import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// HAPUS INI - tidak perlu lagi kalau pakai VitePWA plugin
// import * as serviceWorkerRegistration from './serviceWorkerRegistration.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// HAPUS INI JUGA - VitePWA plugin handle otomatis
// serviceWorkerRegistration.register();