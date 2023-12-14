// controllers/ActivityStatusesController.js

const ActivityStatusesController = {};
const pool = require('../dbConnection');

ActivityStatusesController.getAllActivityStatuses = (req, res) => {
    const sqlQuery = "SELECT * FROM activity_statuses"

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    })
}

module.exports = ActivityStatusesController;