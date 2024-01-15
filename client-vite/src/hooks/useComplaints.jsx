import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useComplaints(params = {}) {
    const { userId } = params;
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [refreshed, setRefreshed] = useState(false);

    let apiUrl = `${ServerUrl}/api/complaints`;

    if (userId) {
        apiUrl += `/userId/${userId}`
    }

    useEffect(() => {
        fetch(apiUrl, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseData) => {
                const complaintsData = responseData;
                setComplaints(complaintsData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [refreshed]);

    const refresh = () => {
        setRefreshed(!refreshed)
    }

    return { complaints, isLoading, refresh};
}