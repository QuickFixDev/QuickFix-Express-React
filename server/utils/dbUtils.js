const pool = require('../dbConnection');

const executeQuery = (req, res, sqlQuery, params = [], callback = (results) => { }) => {
    console.log("executeQuery params:", params);

    pool.query(sqlQuery, params, (err, results) => {
        if (err) {
            handleQueryError(res, err);
        } else {
            callback(results);
            sendJsonResponse(res, results);
        }
        console.log(results);
    });
};

function handleQueryError(res, error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

function sendJsonResponse(res, data) {
    res.json(data);
}

module.exports = executeQuery;