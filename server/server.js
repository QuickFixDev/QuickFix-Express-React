const express = require('express');
const PORT = 5000;
const pool = require('./dbConnection'); // Require the database connection pool
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/filter-test', (req, res) => {
    console.log("posted app in server side")
    const sqlQuery = req.body.sqlQuery; // Assuming your query is sent in the request body
    console.log('sqlQuery is:', sqlQuery);

    // Execute the SQL query
    pool.query(sqlQuery, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error executing query' });
        } else {
            // Send the query result back as JSON
            res.json(result);
        }
    });
});

app.post('/complain-form', (req, res) => {
    const sqlQuery = `
INSERT INTO user_complaints
(complaint_id, user_id, complaint_title, complaint_description, complaint_date, status, category_id)
VALUES (NULL, ?, ?, ?, ?, ?, ?);
`

    const values = [
        req.body.user_id,
        req.body.complaint_title,
        req.body.complaint_description,
        req.body.complaint_date,
        req.body.status,
        req.body.category_id
    ]

    pool.query(sqlQuery, values, (err, data) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});



function executeQuery(res, sqlQuery, params = []) {
    console.log("executeQuery params:", params)
    pool.query(sqlQuery, params, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
        console.log(results);
    });
}

const user = { id: 1 }
const complaint = { id: 4 }

const apiRoutes = [
    { route: '/complain-form', sqlQuery: 'SELECT category_name FROM complain_categories ORDER BY category_name ASC' },
    { route: '/my-complaints', sqlQuery: 'SELECT * FROM user_complaints WHERE user_id = ?', params: user.id },
    { route: '/complaint-log', sqlQuery: 'SELECT uc.*, cc.category_name, u.house_number, u.street_name FROM user_complaints uc INNER JOIN complain_categories cc ON uc.category_id = cc.category_id INNER JOIN users u ON uc.user_id = u.user_id WHERE uc.complaint_id = ?', params: [ complaint.id ] },
    { route: '/profile', sqlQuery: 'SELECT * FROM users WHERE user_id = ?', params: [ user.id ] },
    { route: '/stats', sqlQuery: 'SELECT cc.category_name, COUNT(uc.category_id) AS category_count FROM user_complaints uc INNER JOIN complain_categories cc ON uc.category_id = cc.category_id GROUP BY cc.category_name' },
];

// Loop through route configurations and set up routes
apiRoutes.forEach(({ route, sqlQuery, params }) => {
    app.get(route, (req, res) => {
        console.log("params", params);
        executeQuery(res, sqlQuery, params);
    });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
