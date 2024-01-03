import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useUsers(params = {}) {
    const { id } = params;
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/users`;

    if (id) {
        apiUrl += `/${id}`;
    }

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }

            const responseData = await response.json();
            setUsers(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return { users, isLoading, fetchData };
}
