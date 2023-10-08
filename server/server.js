const express = require('express');
const authMiddleware = require('./middleware/authMiddleware'); // Adjust the path as needed
const PORT = 5000;
const pool = require('./dbConnection'); // Require the database connection pool

const app = express();


// Route to retrieve categories from the database
app.get('/complain-form', authMiddleware.isResident, (req, res) => {
    pool.query('SELECT category_name FROM complain_categories ORDER BY category_name ASC', (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
        console.log(results);
    });
});

// Route to retrieve categories from the database
app.get('/my-complaints', (req, res) => {
    const user = {
        id: 1
    }

    pool.query('SELECT * FROM user_complaints WHERE user_id = ?', user.id, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
        console.log(results);
    });
});

// Route to retrieve categories from the database
app.get('/complaint-log', (req, res) => {
    const complaint = {
        id: 3
    }

    const sqlQuery = `
    SELECT uc.*, cc.category_name, u.house_number, u.street_name
    FROM user_complaints uc
    INNER JOIN complain_categories cc ON uc.category_id = cc.category_id
    INNER JOIN users u ON uc.user_id = u.user_id
    WHERE uc.complaint_id = ?;
    `;


    // uc means "user_complaints" and cc means "complain category"
    pool.query(sqlQuery, complaint.id, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
        console.log(results);
    });
});

// Route to retrieve categories from the database
app.get('/profile', (req, res) => {
    const user = {
        id: 1
    }

    pool.query('SELECT * FROM users WHERE user_id = ?', user.id, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
        console.log(results);
    });
});

// Route to retrieve categories from the database
app.get('/stats', (req, res) => {
    const sqlQuery = `
    SELECT cc.category_name, COUNT(uc.category_id) AS category_count
    FROM user_complaints uc
    INNER JOIN complain_categories cc ON uc.category_id = cc.category_id
    GROUP BY cc.category_name;
    `;

    pool.query(sqlQuery, (error, results) => {
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
