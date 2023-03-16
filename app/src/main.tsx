import axios from 'axios';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
