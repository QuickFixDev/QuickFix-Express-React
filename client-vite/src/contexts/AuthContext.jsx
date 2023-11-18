/* eslint-disable react/prop-types */
// AuthContext.js
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useContext, createContext, useEffect, } from 'react';
import ServerUrl from '../constants/ServerUrl';
import Logout from '../components/common/Logout';

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
    const [houseNumber, setHouseNumber] = useState(0);
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [role, setRole] = useState('');
    const [streetName, setStreetName] = useState('');
    const [picture, setPicture] = useState('');
useEffect
    // Validation of existing user in database based on auth0's provided user
    if (isAuthenticated) {

        function removeDotsFromLocalPart(email) {
            const [localPart, domain] = email.split('@');
            const localPartWithoutDots = localPart.replace(/\./g, '');
            return `${localPartWithoutDots}@${domain}`;
        }

        const email = user.email;
        const userEmail = removeDotsFromLocalPart(email);

        fetch(`${ServerUrl}/user/${userEmail}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)

                setUserId(responseData.user_id);
                setEmail(responseData.email);
                setFirstName(responseData.first_name);
                setHouseNumber(responseData.house_number);
                setLastName(responseData.last_name);
                setPhoneNumber(responseData.phone);
                setStreetName(responseData.street_name);
                setPicture(user.picture)

            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });



            fetch(`${ServerUrl}/get/roles/${userId}`, {
                method: 'GET',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((responseData) => {
                    console.log('response data:', responseData);
                    console.log(responseData)
                    setRole(responseData);
                    setLoading(false);
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
                        Email: user ? email : null,
                        HouseNumber: user ? houseNumber : null,
                        LastName: user ? lastName : null,
                        PhoneNumber: user ? phoneNumber : null,
                        Role: user ? role : null,
                        StreetName: user ? streetName : null
                    });
                } else {
                    // If userId is 0, it means no results were found, so system log the user out
                    setAuthUser({
                        Id: null,
                        FirstName: null,
                        Email: null,
                        HouseNumber: null,
                        LastName: null,
                        PhoneNumber: null,
                        Role: null,
                        StreetName: null
                    });
                    logout();
                    return; // Exit the effect to prevent further updates
                }
            } else {
                // Handle the case when the user is not authenticated
                setAuthUser({
                    Id: null,
                    FirstName: null,
                    Email: null,
                    HouseNumber: null,
                    LastName: null,
                    PhoneNumber: null,
                    Role: null,
                    StreetName: null
                });
            }
            console.log('user id below: ', userId);
            setIsLoggedIn(isAuthenticated);
        }
    }, [
        user,
        isAuthenticated,
        isLoading,
        userId,
        role
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