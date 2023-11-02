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

module.exports = UserController;