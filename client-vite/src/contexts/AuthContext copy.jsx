/* eslint-disable react/prop-types */
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useContext, createContext, useEffect } from 'react';
import ServerUrl from '../constants/ServerUrl';
import Logout from '../components/access/Logout';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { user, isAuthenticated, isLoading, logout } = useAuth0();
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [redirectUser, setRedirectUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (!isAuthenticated) {
                return;
            }

            setLoading(true);

            try {
                const email = user.email;
                const userEmail = removeDotsFromLocalPart(email);
                const response = await fetch(`${ServerUrl}/user/get-by-email/${userEmail}`, {method: 'GET'})
                const responseData = await response.json();

                if (responseData) {
                    setAuthUser({
                        Id: responseData.user_id,
                        FirstName: responseData.first_name,
                        LastName: responseData.last_name,
                        Email: responseData.email,
                        Phone: responseData.phone,
                        Role: responseData.role_name,
                        StatusId: responseData.status_id,
                        Status: responseData.status,
                        PhotoUrl: user.picture,
                    });
                } else {
                    setRedirectUser(true);
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [user, isAuthenticated, logout, navigate]);

    return (
        <AuthContext.Provider value={{ authUser, isLoggedIn }}>
            {loading ? <p>Loading</p> : children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

function removeDotsFromLocalPart(email) {
    const [localPart, domain] = email.split('@');
    const localPartWithoutDots = localPart.replace(/\./g, '');
    return `${localPartWithoutDots}@${domain}`;
}
