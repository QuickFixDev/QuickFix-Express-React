import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useComplaintStatuses(params = {}) {
    const { statusId } = params;
    const [complaintStatuses, setComplaintStatuses] = useState([]);
    const [isLoading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/complaint-statuses`;

    if (statusId) {
        apiUrl += `/statusId/${statusId}`
    }

    useEffect(() => {
        fetch(apiUrl, {
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

    return { complaintStatuses, isLoading };
}