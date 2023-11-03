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
    const email = req.params.email;
    const userIdQuery = 'SELECT user_id FROM users WHERE email = ?';

    function removeDotsFromLocalPart(email) {
        const [ localPart, domain ] = email.split('@');
        const localPartWithoutDots = localPart.replace(/\./g, '');
        return `${localPartWithoutDots}@${domain}`;
    }

    const emailWithoutPeriods = removeDotsFromLocalPart(email);

    pool.query(userIdQuery, emailWithoutPeriods, (err, results) => {
        if (err) {
            console.error("Error querying user ID:", err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            console.error("User not found");
            res.status(404).json({ message: `User with email ${[ emailWithoutPeriods ]} not found` });
            return;
        }

        const user_id = results[ 0 ].user_id;
        console.log(user_id)

        const sqlQuery = 'SELECT * FROM user_complaints WHERE user_id = ?';

        pool.query(sqlQuery, user_id, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json('internal server error');
            } else {
                res.json(results);
            }
        });
    });
};

module.exports = ComplaintController;