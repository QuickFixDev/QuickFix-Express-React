const express = require('express');
const PORT = process.env.PORT || 5000;
const pool = require('./dbConnection');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello world");
});

const UserRoutes = require('./routes/UserRoutes');
const ComplaintRoutes = require('./routes/ComplaintRoutes');
const ProfileRoutes = require('./routes/ProfileRoutes');
const StatsRoutes = require('./routes/StatsRoutes');
const ComplaintFormRoutes = require('./routes/ComplaintFormRoutes');
const RoleRoutes = require('./routes/RoleRoutes');

app.use('/users', UserRoutes);
app.use('/user-storage', UserRoutes);
app.use('/my-complaints/:email', ComplaintRoutes);
app.use('/profile', ProfileRoutes);
app.use('/stats', StatsRoutes);
app.use('/complain-form', ComplaintFormRoutes);
app.use('/roles', RoleRoutes);

app.delete('/delete-category/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const sqlQuery = 'DELETE FROM categories WHERE category_id = ?';

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


const user = { id: 1 }
const complaint = { id: 4 }

app.get('/category-management', (req, res) => {
    console.log('Server route is triggered');
    const sqlQuery = 'SELECT * FROM categories';

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching data' });
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

// app.get('/complaints', (req, res) => {
//     const sqlQuery = 'SELECT * FROM user_complaints WHERE user_id = 1';
//     const params = user.id;
//     executeQuery(params, res, sqlQuery);
// });

// app.get('/complaint-management', (req, res) => {
//     const sqlQuery = 'SELECT uc.*, cc.category_name, u.house_number, u.street_name FROM user_complaints uc INNER JOIN complain_categories cc ON uc.category_id = cc.category_id INNER JOIN users u ON uc.user_id = u.user_id WHERE uc.complaint_id = ?';
//     const params = [ complaint.id ];
//     executeQuery(params, res, sqlQuery);
// });

// app.get('/profile', (req, res) => {
//     const sqlQuery = 'SELECT * FROM users WHERE user_id = ?';
//     const params = [ user.id ];
//     executeQuery(params, res, sqlQuery);
// });

// app.get('/stats', (req, res) => {
//     const sqlQuery = 'SELECT cc.category_name, COUNT(uc.category_id) AS category_count FROM user_complaints uc INNER JOIN complain_categories cc ON uc.category_id = cc.category_id GROUP BY cc.category_name';
//     console.log(sqlQuery)
//     executeQuery(req, res, sqlQuery);
// });

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});