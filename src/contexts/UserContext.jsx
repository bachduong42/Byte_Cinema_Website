
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     if (localStorage.getItem('accessToken')) {
    //         getUser()
    //             .then((data) => setUser(data))
    //             .catch((error) => console.log('Error fetching user:', error));
    //     }
    // }, []);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}