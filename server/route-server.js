const express = require('express');
const authMiddleware = require('./middleware/authMiddleware'); // Adjust the path as needed
const PORT = 5173;
const pool = require('./dbConnection'); // Require the database connection pool
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())

app.post('/complain_form', (req, res) => {
    const sqlQuery = `
    INSERT INTO user_complaints
    (user_id, complaint_title, complaint_description, complaint_date, status, category_id)
    Values (?);
    `

    const values = [
        req.body.user_id,
        req.body.complaint_title,
        req.body.complaint_description,
        req.body.complaint_date,
        req.body.status,
        req.body.category_id
    ]

    pool.query(sqlQuery, values, (error, results) => {

    })
})


function executeQuery(res, sqlQuery, params = []) {
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


// ---------- Common routes

app.get('/profile', (req, res) => {
    const user = { id: 1 }
    const sqlQuery = `
    SELECT *
    FROM users
    WHERE user_id = ?
    `;
    
    executeQuery(res, sqlQuery, [user.id]);
});


// ---------- Resident routes

app.get('/complain-form', (req, res) => {
    const sqlQuery = `
    SELECT category_name
    FROM complain_categories
    ORDER BY category_name ASC
    `;

    executeQuery(res, sqlQuery);
});

app.get('/my-complaints', (req, res) => {
    const user = { id: 1 }
    const sqlQuery = `
    SELECT *
    FROM user_complaints
    WHERE user_id = ?
    `;

    executeQuery(res, sqlQuery, [user.id]);
});


// ---------- Admin routes

app.get('/stats', (req, res) => {
    const sqlQuery = `
    SELECT cc.category_name, COUNT(uc.category_id) AS category_count
    FROM user_complaints uc
    INNER JOIN complain_categories cc ON uc.category_id = cc.category_id
    GROUP BY cc.category_name;
    `;

    executeQuery(res, sqlQuery)
});

app.get('/complaint-log', (req, res) => {
    const complaint = { id: 3 }
    const sqlQuery = `
    SELECT uc.*, cc.category_name, u.house_number, u.street_name
    FROM user_complaints uc
    INNER JOIN complain_categories cc ON uc.category_id = cc.category_id
    INNER JOIN users u ON uc.user_id = u.user_id
    WHERE uc.complaint_id = ?;
    `;

    executeQuery(res, sqlQuery, [complaint.id]);
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
