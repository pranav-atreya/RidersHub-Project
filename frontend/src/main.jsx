import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext'; 
import Modal from 'react-modal'; 

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider> {/* WRAPPER 1 */}
      <BrowserRouter>     {/* WRAPPER 2 */}
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);