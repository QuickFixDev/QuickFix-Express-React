/* eslint-disable react/prop-types */
// AuthContext.js
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useContext, createContext, useEffect, } from 'react';
import ServerUrl from '../constants/ServerUrl';
import Logout from '../components/access/Logout';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { user, isAuthenticated, isLoading, logout } = useAuth0();
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
    const [authUser, setAuthUser] = useState({
        Name: user ? user.name : null
    });

    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(0);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhone] = useState(0);
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [statusId, setStatusId] = useState(0);

    const [redirectUser, setRedirectUser] = useState(false);
    const navigate = useNavigate();

    // Validation of existing user in database based on auth0's provided user
    if (isAuthenticated) {

        function removeDotsFromLocalPart(email) {
            const [localPart, domain] = email.split('@');
            const localPartWithoutDots = localPart.replace(/\./g, '');
            return `${localPartWithoutDots}@${domain}`;
        }

        const email = user.email;
        const userEmail = removeDotsFromLocalPart(email);

        fetch(`${ServerUrl}/user/get-by-email/${userEmail}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseData) => {
                setUserId(responseData.user_id);
                setEmail(responseData.email);
                setFirstName(responseData.first_name);
                setLastName(responseData.last_name);
                setPhone(responseData.phone);
                setRole(responseData.role_name)
                setStatus(responseData.status)
                setStatusId(responseData.status_id)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });

        if (loading) {
            return (
                <p>Loading</p>
            );
        }

    }

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                if (userId != null) {
                    setAuthUser({
                        Id: user ? userId : null,
                        FirstName: user ? firstName : null,
                        LastName: user ? lastName : null,
                        Email: user ? email : null,
                        Phone: user ? phoneNumber : null,
                        Role: user ? role : null,
                        StatusId: user ? statusId : null,
                        Status: user ? status : null
                    });
                } else {
                    // If userId is 0, it means no results were found, so system log the user out
                    setAuthUser({
                        Id: null,
                        FirstName: null,
                        LastName: null,
                        Email: null,
                        Phone: null,
                        Role: null,
                        StatusId: null,
                        Status: null
                    });
                    logout();
                    setRedirectUser(true)
                    navigate('/user/request');

                    return;
                }
            } else {
                // Handle the case when the user is not authenticated
                setAuthUser({
                    Id: null,
                    FirstName: null,
                    Email: null,
                    LastName: null,
                    Phone: null,
                    Role: null,
                    StatusId: null,
                    Status: null
                });

            }
            setIsLoggedIn(isAuthenticated);
        }
    }, [
        user,
        isAuthenticated,
        isLoading,
        userId,
        role,
        loading,
        email,
        firstName,
        lastName,
        phoneNumber,
        status,
        statusId,
        redirectUser,
    ]);

    return (
        <AuthContext.Provider value={{ authUser, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}