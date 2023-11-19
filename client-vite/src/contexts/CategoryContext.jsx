import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function getCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ServerUrl}/api/categories`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseData) => {
            const categoriesData = responseData;
            setCategories(categoriesData);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, []);

    return { categories, loading };
}