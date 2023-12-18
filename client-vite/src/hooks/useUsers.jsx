import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useUsers(params = {}) {
    const { id } = params;
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/users`;

    if (id) {
        apiUrl += `/${id}`
    }

    const fetchData = () => {
        setLoading(true);

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
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return { users, isLoading, fetchData };
}
