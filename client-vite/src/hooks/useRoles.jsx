import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useRoles(params = {}) {
    const { id } = params;
    const [roles, setroles] = useState([]);
    const [isLoading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/roles`;

    if (id) {
        apiUrl += `/${id}`
    }

    useEffect(() => {
        fetch(apiUrl, {
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

    return { roles, isLoading };
}