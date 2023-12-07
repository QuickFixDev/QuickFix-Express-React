// controllers/ComplaintsStatusController.js

const ComplaintsStatusController = {};
const pool = require('../dbConnection');

ComplaintsStatusController.getAllStatuses = (req, res) => {
    const sqlQuery = "SELECT * FROM complaints_status"

    pool.query(sqlQuery, (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    })
}

module.exports = ComplaintsStatusController;