import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function getComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ServerUrl}/api/complaints`, {
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