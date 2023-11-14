// controllers/CategoryController.js

const CategoryController = {};
const pool = require('../dbConnection');

CategoryController.getAllCategories = (req, res) => {
    const sqlQuery = "SELECT * FROM categories"

    pool.query(sqlQuery, (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    })
}

module.exports = CategoryController;