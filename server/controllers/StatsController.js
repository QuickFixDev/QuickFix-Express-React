// controllers/StatsController.js

const StatsController = {};
const pool = require('../dbConnection');

StatsController.getAllComplaints = (req, res) => {
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


module.exports = StatsController;