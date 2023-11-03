// controllers/UserController.js

const UserController = {};
const pool = require('../dbConnection');

UserController.getAllUsers = (req, res) => {
    console.log("Fetching all users");
    const sqlQuery = 'SELECT * FROM users';

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err); // Log the error
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    });
};

UserController.getUserByEmail = (req, res) => {
    console.log("Fetching all users");
    const sqlQuery = 'SELECT * FROM users WHERE email = {auth0 email}';

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err); // Log the error
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    });
};

UserController.deleteUser = async (req, res) => {
    const userId = req.params.id;

    const sqlQuery = 'DELETE FROM users WHERE user_id = ?';
    const values = [ userId ];

    pool.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
};

UserController.createUser = (req, res) => {
    sqlQuery = 'INSERT INTO users (first_name, last_name, role, street_name, house_number, phone_number, email) VALUES (?, ?, ?, ?, ?, ?, ?)'

    pool.query(sqlQuery, [ first_name, last_name, role, street_name, house_number, phone_number, email ], (err, results) => {
        if (err) {
            console.error('Error storing form data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('Form data saved with ID:', results.insertId);
            res.json({ message: 'Form data saved successfully' });
        }
    });
}

module.exports = UserController;