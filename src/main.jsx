// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css'
// Router'ı import ediyoruz
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Uygulamamızı BrowserRouter ile sarmalıyoruz */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)