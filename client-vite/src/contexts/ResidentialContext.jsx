import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function getResidentials() {
    const [residentials, setResidentials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ServerUrl}/api/residentials`, {
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

    return { residentials, loading };
}