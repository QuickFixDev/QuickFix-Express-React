// controllers/ComplaintsStatusController.js

const ComplaintsStatusController = {};
const pool = require('../dbConnection');

ComplaintsStatusController.getAllStatuses = (req, res) => {
    console.log('retrieved all')
    const sqlQuery = "SELECT * FROM complaints_status"

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    })
}

ComplaintsStatusController.getStatusById = (req, res) => {
    const statusId = req.params.statusId;
    const sqlQuery = "SELECT * FROM complaints_status WHERE id = ?"

    console.log('retrieved status with id: ', statusId)

    pool.query(sqlQuery, [statusId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    })
}

module.exports = ComplaintsStatusController;