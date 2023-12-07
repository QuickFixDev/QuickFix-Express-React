// controllers/ComplaintsHistoryController.js

const ComplaintsHistoryController = {};
const pool = require('../dbConnection');

ComplaintsHistoryController.getAllComplaintsHistory = (req, res) => {
    const sqlQuery = "SELECT * FROM complaints_history"

    pool.query(sqlQuery, (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    })
}

ComplaintsHistoryController.createComplaintHistory = (req, res) => {
    const { comment, employee_id, complaint_id, status_id } = req.body;
    const sqlQuery = `
        INSERT INTO complaints_history( comment, employee_id, complaint_id, status_id )
        VALUES ( ?, ?, ?, ? )
    `

    pool.query(sqlQuery, [ comment, employee_id, complaint_id, status_id ], (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).json({ error: 'Error inserting data' });
        } else {
            res.json(results);
        }
    })
}

module.exports = ComplaintsHistoryController;