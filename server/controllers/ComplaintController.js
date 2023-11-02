// controllers/ComplaintController.js

const ComplaintController = {};
const pool = require('../dbConnection');

ComplaintController.getAllComplaints = (req, res) => {
    const sqlQuery = 'SELECT * FROM user_complaints';

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err); // Log the error
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    });
};

ComplaintController.getComplaintById = (req, res) => {
    const sqlQuery = 'SELECT * FROM user_complaints WHERE user_id = ?';
    const values = 1

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

module.exports = ComplaintController;