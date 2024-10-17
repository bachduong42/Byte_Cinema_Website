
import { createContext, useCallback, useState } from "react";
import { refreshToken } from "../services/refreshToken";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null)
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const checkLoginSession = useCallback(async () => {
        if (document.cookie) return true;
        const response = await refreshToken();
        if (!response) {
            setIsTokenExpired(true);
            logout();
            return false;
        }
        return true
    }, [])

    const login = (user) => {
        setUser(user);
        localStorage.setItem('isLogin', true);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('isLogin');
        localStorage.removeItem('accessToken');
    };

    const saveEmail = (email) => {
        setEmail(email)
    }

    const getEmail = () => {
        return email
    }

    return (
        <UserContext.Provider value={{ user, login, logout, saveEmail, getEmail, checkLoginSession }}>
            {children}
            {isTokenExpired && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Your session has expired. Please login again.</p>
                        <button onClick={() => setIsTokenExpired(false)}>Close</button>
                    </div>
                </div>
            )}
        </UserContext.Provider>
    )
}