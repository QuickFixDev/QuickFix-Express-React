import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function getRoles() {
    const [roles, setroles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ServerUrl}/roles`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('response -----------------', responseData)
                const rolesData = responseData;
                setroles(rolesData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    console.log('roles log', roles)
    return { roles, loading };
}