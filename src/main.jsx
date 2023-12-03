import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import { WalletProvider } from './context/walletContext.jsx';
import { Buffer } from 'buffer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

window.Buffer = window.Buffer || Buffer;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
      <ToastContainer/>
    </WalletProvider>
  </React.StrictMode>,
)
