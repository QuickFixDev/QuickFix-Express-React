import React, { useEffect, useState } from 'react';

export default function FetchUserTest() {
    const [ backendData, setBackendData ] = useState([ {} ]);

    useEffect(() => {
        // Fetch data from the backend API
        fetch("/api")
            .then((response) => response.json())
            .then((data) => {
                setBackendData(data);
            });
    }, []);

    return (
        <div>
            {typeof backendData.users === "undefined" ? (
                <p>Loading...</p>
            ) : (
                backendData.users.map((user, i) => (
                    <p key={i}>{user}</p>
                ))
            )}
        </div>
    );
}
