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
            console.error("hey User not found");
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

ComplaintController.createComplaint = async (req, res) => {
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
            console.error("heeeeey User not found");
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

ComplaintController.getComplaintsInGraphic = (req, res) => {
    console.log("Fetching all complaints");
    const sqlQuery = 'SELECT cc.category_name, COUNT(uc.category_id) AS category_count FROM user_complaints uc INNER JOIN complain_categories cc ON uc.category_id = cc.category_id GROUP BY cc.category_name';

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err); // Log the error
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    });
};

module.exports = ComplaintController;