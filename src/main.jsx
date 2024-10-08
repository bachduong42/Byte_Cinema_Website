import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import GlobalStyles from "./components/GlobalStyles/GlobalStyles.jsx";
import { UserProvider } from './contexts/UserContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <GlobalStyles>
                <ToastContainer
                    position="top-center" // Hoặc "bottom-center" nếu bạn muốn hiển thị dưới cùng
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <App />
            </GlobalStyles>
        </UserProvider>
    </React.StrictMode>
);
