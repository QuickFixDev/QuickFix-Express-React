// controllers/ComplaintController.js

const ComplaintController = {};
const pool = require('../dbConnection');

ComplaintController.getUserComplaints = (req, res) => {

}

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
    const userId = req.params.id;
    const sqlQuery = 'SELECT * FROM user_complaints WHERE user_id = ?';

    pool.query(sqlQuery, userId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json('internal server error');
        } else {
            res.json(result);
        }
    });

};

ComplaintController.createComplaint = async (req, res) => {
    const formData = req.body;
    console.log('form data in query: ', formData)
    const { user_id, status, category_id, complaint_date, complaint_title, complaint_description } = formData;
    const sqlQuery = `
        INSERT INTO user_complaints (user_id, status, category_id, complaint_date, complaint_title, complaint_description)
        VALUES (?, ?, ?, ?, ?, ?)
        `;

    pool.query(sqlQuery, [user_id, status, category_id, complaint_date, complaint_title, complaint_description], (err, results) => {
        if (err) {
            console.error('Error storing form data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('Form data saved with ID:', results.insertId);
            res.json({ message: 'Form data saved successfully' });
        }
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