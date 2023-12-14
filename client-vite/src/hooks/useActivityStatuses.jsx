import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useActivityStatuses(params = {}) {
    const { id } = params;
    const [activityStatuses, setActivityStatuses] = useState([]);
    const [isLoading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/activity-statuses`
    
    if (id) {
        apiUrl += `/${id}`
    }

    useEffect(() => {
        fetch(apiUrl, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseData) => {
            const activityStatusesData = responseData;
            setActivityStatuses(activityStatusesData);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, []);

    return { activityStatuses, isLoading };
}