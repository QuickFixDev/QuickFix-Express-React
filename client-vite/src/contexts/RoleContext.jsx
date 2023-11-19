import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function getRoles() {
    const [roles, setroles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ServerUrl}/api/roles`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseData) => {
                const rolesData = responseData;
                setroles(rolesData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return { roles, loading };
}