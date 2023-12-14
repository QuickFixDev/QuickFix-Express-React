import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useUsers(id = null) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/users`;

    if (id) {
        apiUrl += `/${id}`
    }

    useEffect(() => {
        fetch(apiUrl, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseData) => {
                const usersData = responseData;
                setUsers(usersData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return { users, loading };
}
