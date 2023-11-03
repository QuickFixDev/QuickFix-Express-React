// controllers/RoleController.js

const RoleController = {};
const pool = require('../dbConnection');

RoleController.createRole = (req, res) => {
    const formData = req.body;
    const { role_name } = formData;
    console.log(role_name);
    const sqlQuery = `
    INSERT INTO roles (role_name)
    VALUES (?)
    `;

    pool.query(sqlQuery, [ role_name ], (err, results) => {
        if (err) {
            console.error('Error storing form data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('Form data saved with ID:', results.insertId);
            res.json({ message: 'Form data saved successfully' });
        }
    });
}

module.exports = RoleController;