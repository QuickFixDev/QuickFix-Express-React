import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useComplaintsHistory(params = {}) {
    const { complaintId, employeeId, adminId } = params;
    const [complaintsHistory, setComplaintsHistory] = useState([]);
    const [isLoading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/complaints-history`;

    if (complaintId) {
        apiUrl += `/history/${complaintId}`
    } else if (employeeId) {
        apiUrl += `/employee/${employeeId}`
    } else if (adminId) {
        apiUrl += `/admin/${adminId}`
    }

    useEffect(() => {
        fetch(apiUrl, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseData) => {
                const complaintsHistoryData = responseData;
                setComplaintsHistory(complaintsHistoryData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return { complaintsHistory, isLoading };
}