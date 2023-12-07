import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useComplaintsStatus() {
    const [complaintsStatus, setComplaintsStatus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ServerUrl}/api/complaints-status`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseData) => {
            const complaintsStatusData = responseData;
            setComplaintsStatus(complaintsStatusData);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, []);

    return { complaintsStatus, loading };
}