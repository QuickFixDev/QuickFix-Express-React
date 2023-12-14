import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useResidentials(params = {}) {
    const { id } = params;
    const [residentials, setResidentials] = useState([]);
    const [isLoading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/residentials`;

    if (id) {
        apiUrl += `/${id}`
    }

    useEffect(() => {
        fetch(apiUrl, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseData) => {
                const residentialsData = responseData;
                setResidentials(residentialsData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return { residentials, isLoading };
}