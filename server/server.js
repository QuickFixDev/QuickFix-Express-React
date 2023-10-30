const express = require('express');
const PORT = 5000;
const pool = require('./dbConnection');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("hello world")
});

app.get('/user-management', (req, res) => {
    console.log('Server route is triggered');
    const sqlQuery = 'SELECT * FROM users';

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching data'});
            console.log(err);
        } else {
            res.json(results);
            console.log("results: ", results);
        }
    });
    console.log("diplay user server handling");
});

function executeQuery(req, res, sqlQuery) {
    const params = req.params;
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

app.delete('/delete-user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const sqlQuery = 'DELETE FROM users WHERE user_id = ?';

    pool.query(sqlQuery, userId, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting user' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
});

app.get('/user-storage', (req, res) => {
    const tableName = 'users'
    const query = `DESCRIBE ${tableName}`;
    pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch attributes' });
        } else {
            const attributes = results.map((row) => row.Field);
            res.json(attributes);
        }
    });
});

app.post('/user-storage', (req, res) => {
    const tableName = 'users'
    const formData = req.body;

    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, formData, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Form submission failed' });
        } else {
            console.log('Form data inserted successfully');
            res.status(200).json({ message: 'Form submitted successfully' });
        }
    });
});

app.post('/filter-test', (req, res) => {
    console.log("posted app in server side")
    const sqlQuery = req.body.filterQuery;
    console.log('sqlQuery is:', sqlQuery);

    pool.query(sqlQuery, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error executing query' });
        } else {
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
