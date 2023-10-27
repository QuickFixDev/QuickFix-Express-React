import { useState } from 'react';

const QueryExecution = () => {
    const [queryResult, setQueryResult] = useState(null);

    function handleQueryExecution() {
        const sqlQuery = "SELECT * FROM users";
        const serverUrl = "http://localhost:5000/filter-test";

        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sqlQuery }),
        })
        .then(response => response.json())
        .then(data => {
            // Update the state with the query result
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