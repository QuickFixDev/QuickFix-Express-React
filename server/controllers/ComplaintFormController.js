// controllers/ComplaintFormController.js

const ComplaintFormController = {};
const pool = require('../dbConnection');

ComplaintFormController.createComplaint = async (req, res) => {
    function removeDotsFromLocalPart(email) {
        const [ localPart, domain ] = email.split('@');
        const localPartWithoutDots = localPart.replace(/\./g, '');
        return `${localPartWithoutDots}@${domain}`;
    }

    const formData = req.body;

    const { email, status, category_id, complaint_date, complaint_title, complaint_description } = formData;
    const emailWithoutPeriods = removeDotsFromLocalPart(email);

    // Query the user_id so it can be stored in complaint user id field
    const userIdQuery = `SELECT user_id FROM users WHERE email = ?`;
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

        // Complete complaint creation
        const sqlQuery = `
        INSERT INTO user_complaints (user_id, status, category_id, complaint_date, complaint_title, complaint_description)
        VALUES (?, ?, ?, ?, ?, ?)
        `;

        pool.query(sqlQuery, [ user_id, status, category_id, complaint_date, complaint_title, complaint_description ], (err, results) => {
            if (err) {
                console.error('Error storing form data:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Form data saved with ID:', results.insertId);
                res.json({ message: 'Form data saved successfully' });
            }
        });
    });
};

module.exports = ComplaintFormController;