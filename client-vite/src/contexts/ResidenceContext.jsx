import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function getResidences() {
    const [residences, setResidences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ServerUrl}/residences`, {
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
    }, []);

    return { residences, loading };
}