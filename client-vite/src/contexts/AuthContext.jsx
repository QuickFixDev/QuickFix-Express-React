/* eslint-disable react/prop-types */
// AuthContext.js
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useContext, createContext, } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { user, isAuthenticated } = useAuth0();

    // You can set the user data here
    const [ authUser, setAuthUser ] = useState({
        Name: user ? user.name : null,
    });

    const [ isLoggedIn, setIsLoggedIn ] = useState(isAuthenticated);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}