import { useState } from 'react';
import ServerUrl from '../../constants/ServerUrl';

const QueryExecution = () => {
    const [queryResult, setQueryResult] = useState(null);

    function handleQueryExecution() {
        const sqlQuery = "SELECT * FROM users";
        const fetchUrl = `${ServerUrl}/filter-test`;

        fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sqlQuery }),
        })
        .then(response => response.json())
        .then(data => {
            setQueryResult(data);
        })
        .catch(error => {
            console.error("Error executing query:", error);
        });
    }

    return (
        <div>
            <button onClick={handleQueryExecution}>Execute query</button>
            {queryResult && (
                <div>
                    <h2>Query Result</h2>
                    <pre>{JSON.stringify(queryResult, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default QueryExecution;