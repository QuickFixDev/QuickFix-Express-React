import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useActivityStatuses() {
    const [activityStatuses, setActivityStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ServerUrl}/api/activity-statuses`, {
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

    return { activityStatuses, loading };
}