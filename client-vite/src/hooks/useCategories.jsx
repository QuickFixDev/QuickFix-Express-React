import ServerUrl from '../constants/ServerUrl';
import { useState, useEffect } from 'react';

export function useCategories(params = {}) {
    const { id } = params;
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);

    let apiUrl = `${ServerUrl}/api/categories`;

    if (id) {
        apiUrl += `/${id}`
    }

    
    useEffect(() => {
        fetch(apiUrl, {
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

    return { categories, isLoading };
}