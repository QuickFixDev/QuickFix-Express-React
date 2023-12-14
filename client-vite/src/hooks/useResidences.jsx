import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useResidences(params = {}) {
    const { id, tenantId, ownerId } = params;
    const [residences, setResidences] = useState([]);
    const [isLoading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/residences`;

    if (id) {
        apiUrl += `/${id}`;
    } else if (tenantId) {
        apiUrl += `/tenant/${tenantId}`;
    } else if (ownerId) {
        apiUrl += `/owner/${ownerId}`;
    }

    useEffect(() => {
        fetch(apiUrl, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseData) => {
                const residencesData = responseData;
                setResidences(residencesData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [apiUrl, id, tenantId, ownerId]);


    return { residences, isLoading };
}
