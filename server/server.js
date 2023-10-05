// app.js
const express = require('express');
const app = express();
const PORT = 5000;
const pool = require('./dbConnection'); // Require the database connection pool

// Route to retrieve categories from the database
app.get('/complain-form', (req, res) => {
    pool.query('SELECT * FROM complain_categories ORDER BY category_name ASC', (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
        console.log(results);
    });
});

// Sample API route
app.get('/api', (req, res) => {
    res.json({ users: [ 'userOne', 'userTwo', 'userThree' ] });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
