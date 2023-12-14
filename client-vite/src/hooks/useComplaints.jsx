import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useComplaints(userId = null) {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/complaints`;

    if (userId) {
        apiUrl += `/${userId}`
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
    }, []);

    return { complaints, loading };
}