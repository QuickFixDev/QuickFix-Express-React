/* eslint-disable react/prop-types */
// AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { isAuthenticated, isLoading } = useAuth0();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [ isAuthenticated, isLoading ]);

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}