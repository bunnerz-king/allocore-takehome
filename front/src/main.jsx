import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import DrinkProvider from './context/DrinkProvider.jsx'
  import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
    <DrinkProvider>
    <BrowserRouter>
        <ToastContainer 
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        theme="colored"
        />

      <App />
    </BrowserRouter>
    </DrinkProvider>
)
