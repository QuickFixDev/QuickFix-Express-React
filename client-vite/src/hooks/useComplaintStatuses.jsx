import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useComplaintStatuses() {
    const [complaintStatuses, setComplaintStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ServerUrl}/api/complaints-status`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseData) => {
            const complaintStatusesData = responseData;
            setComplaintStatuses(complaintStatusesData);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, []);

    return { complaintStatuses, loading };
}