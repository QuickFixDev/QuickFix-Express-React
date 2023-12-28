// controllers/ComplaintsHistoryController.js

const ComplaintsHistoryController = {};
const pool = require('../dbConnection');

ComplaintsHistoryController.getAllComplaintsHistory = (req, res) => {
    const sqlQuery = "SELECT * FROM complaints_history"

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    })
}

ComplaintsHistoryController.getComplaintHistory = (req, res) => {
    const id = req.params.complaintId
    const sqlQuery = `
        SELECT * FROM complaints_history
        WHERE complaint_id = ?
    ;`;

    pool.query(sqlQuery, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    })
}

ComplaintsHistoryController.getAdminComplaintsHistory = (req, res) => {
    const id = req.params.adminId
    const sqlQuery = `
        SELECT * FROM complaints_history
        WHERE admin_id = ?
    ;`;

    pool.query(sqlQuery, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    })
}

ComplaintsHistoryController.getEmployeeComplaintsHistory = (req, res) => {
    const id = req.params.employeeId
    console.log('test for employee id: ', id)
    const sqlQuery = `
        SELECT * FROM complaints_history
        WHERE employee_id = ?
    ;`;

    pool.query(sqlQuery, [id], (err, results) => {
        if (err) {
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
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error inserting data' });
        } else {
            res.json(results);
        }
    })
}



module.exports = ComplaintsHistoryController;