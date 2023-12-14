// controllers/ProfileController.js

const ProfileController = {};
const pool = require('../dbConnection');

ProfileController.getProfileInfo = (req, res) => {
    console.log("Fetching all users");
    const sqlQuery = `SELECT * FROM users WHERE user_id = ?`;
    const values = 1

    pool.query(sqlQuery, values, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err); // Log the error
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    });
};

module.exports = ProfileController;