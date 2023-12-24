/* eslint-disable react/prop-types */
import React, { useState, useContext, createContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ServerUrl from '../constants/ServerUrl';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function removeDotsFromLocalPart(email) {
    const [localPart, domain] = email.split('@');
    const localPartWithoutDots = localPart.replace(/\./g, '');
    return `${localPartWithoutDots}@${domain}`;
}

const updateUserPhoto = async (userId, photoUrl) => {
    try {
        await fetch(`${ServerUrl}/admin/users/${userId}/photo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                photoUrl: photoUrl
            }),
        });
        console.log('User data updated successfully.');
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};

export function AuthProvider({ children }) {
    const { user, isAuthenticated, logout } = useAuth0();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authUser, setAuthUser] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!isAuthenticated) {
                return;
            }
            const email = user.email;
            const userEmail = removeDotsFromLocalPart(email);

            try {
                const response = await fetch(`${ServerUrl}/user/get-by-email/${userEmail}`);
                const responseData = await response.json();

                if (responseData.user_id) {
                    setAuthUser({
                        Id: responseData.user_id,
                        Email: responseData.email,
                        FirstName: responseData.first_name,
                        LastName: responseData.last_name,
                        Phone: responseData.phone,
                        Role: responseData.role_name,
                        Status: responseData.status,
                        StatusId: responseData.status_id,
                    });
                    await updateUserPhoto(responseData.user_id, user.picture);
                    setIsLoggedIn(true);
                } else {
                    logout();
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false when fetch is done
            }
        };

        fetchUserData();
    }, [user, isAuthenticated, logout, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <AuthContext.Provider value={{ authUser, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
