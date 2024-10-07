import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import GlobalStyles from "./components/GlobalStyles/GlobalStyles.jsx";
import { UserProvider } from './contexts/UserContext.jsx';
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <GlobalStyles>
                <ToastContainer />
                <App />
            </GlobalStyles>
        </UserProvider>
    </React.StrictMode>
);
