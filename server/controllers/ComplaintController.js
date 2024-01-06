// controllers/ComplaintController.js

const ComplaintController = {};
const pool = require('../dbConnection');

ComplaintController.getUserComplaints = (req, res) => {

}

ComplaintController.getAllComplaints = (req, res) => {
    const sqlQuery = `SELECT * FROM complaints_test`;

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err); // Log the error
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    });
};

ComplaintController.getComplaintByComplaintId = (req, res) => {
    const complaintId = req.params.complaintId;
    const sqlQuery = `SELECT * FROM complaints_test WHERE id = ?`;

    pool.query(sqlQuery, [complaintId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json('internal server error');
        } else {
            res.json(result);
        }
    });

};

ComplaintController.getComplaintByUserId = (req, res) => {
    const userId = req.params.userId;
    const sqlQuery = `SELECT * FROM complaints_test WHERE user_id = ?`;

    pool.query(sqlQuery, [userId], (err, result) => {
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
    const { user_id, category_id, title, description, submitted_date } = formData;
    const sqlQuery = `
        INSERT INTO complaints_test (user_id, category_id, title, description, submitted_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    pool.query(sqlQuery, [user_id, category_id, title, description, submitted_date], (err, results) => {
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
    const sqlQuery = `SELECT cc.category_name, COUNT(uc.category_id) AS category_count FROM complaints_test uc INNER JOIN categories cc ON uc.category_id = cc.category_id GROUP BY cc.category_name`;

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