// controllers/UserController.js

const UserController = {};
const pool = require('../dbConnection');

UserController.getAllUsers = (req, res) => {
    console.log("Fetching the users");
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
    console.log("Fetching the users");
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
    const values = [userId];

    pool.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'damn bro, User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
};

UserController.createUser = (req, res) => {

    const formData = req.body;
    console.log('form data in query: ', formData)
    const { first_name, last_name, role, street_name, house_number, phone_number, email } = formData;

    sqlQuery = 'INSERT INTO users (first_name, last_name, role, street_name, house_number, phone_number, email) VALUES (?, ?, ?, ?, ?, ?, ?)'

    pool.query(sqlQuery, [first_name, last_name, role, street_name, house_number, phone_number, email], (err, results) => {
        if (err) {
            console.error('Error storing form data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('Form data saved with ID:', results.insertId);
            res.json({ message: 'Form data saved successfully' });
        }
    });
}

UserController.getUserId = (req, res) => {
    const sqlQuery = 'SELECT * FROM users WHERE email = ?';
    const userEmail = req.params.id;

    pool.query(sqlQuery, userEmail, (err, results) => {
        if (err) {
            console.log(`Error fetching user with email: ${userEmail}`);
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            // Handle the case when no user is found with the provided email
            return res.status(404).json({ error: 'User not found' });
        }

        const user_id = results[0].user_id; // Extract the user_id from the first result
        res.json(results[0]);
    }); 
};

module.exports = UserController;