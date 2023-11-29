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
const RoleRoutes = require('./routes/RoleRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const ResidenceRoutes = require('./routes/ResidenceRoutes');
const ResidentialRoutes = require('./routes/ResidentialRoutes');

app.use('/api/categories', CategoryRoutes);
app.use('/api/roles', RoleRoutes);
app.use('/api/residences', ResidenceRoutes);
app.use('/api/residentials', ResidentialRoutes);
app.use('/api/complaints', ComplaintRoutes);
app.use('/api/users', UserRoutes);
    
app.use('/admin/users', UserRoutes);
app.use('/admin/complaints', ComplaintRoutes);
app.use('/admin/roles', RoleRoutes);
app.use('/admin/residences', ResidenceRoutes);
app.use('/admin/residentials', ResidentialRoutes);

app.use('/user/complaints', ComplaintRoutes);
app.use('/user/residences', ResidenceRoutes);
app.use('/user', UserRoutes);

app.use('/profile', ProfileRoutes);



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

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});