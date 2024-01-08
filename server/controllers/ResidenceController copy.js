// controllers/ResidenceController.js

const ResidenceController = {};
const pool = require('../dbConnection');

ResidenceController.getAllResidences = (req, res) => {
    console.log("Fetching the residences");
    const sqlQuery = `SELECT * FROM residences`;

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
        console.log(results);
    });
};

ResidenceController.deleteResidence = async (req, res) => {
    const residenceId = req.params.id;
    const sqlQuery = `DELETE FROM residences WHERE residence_id = ?`;

    pool.query(sqlQuery, residenceId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete residence' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Residence not found' });
        } else {
            res.json({ message: 'Residence deleted successfully' });
        }
    });
};

ResidenceController.createResidence = (req, res) => {
    const formData = req.body;
    console.log('form data in query: ', formData)
    const { residential_id, owner_user_id, tenant_user_id, zip_code, street_name, street_number, details } = formData;

    sqlQuery = `INSERT INTO residences (residential_id, owner_user_id, tenant_user_id, zip_code, street_name, street_number, details) VALUES (?, ?, ?, ?, ?, ?, ?)`

    pool.query(sqlQuery, [residential_id, owner_user_id, tenant_user_id, zip_code, street_name, street_number, details], (err, results) => {
        if (err) {
            console.error('Error storing form data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('Form data saved with ID:', results.insertId);
            res.json({ message: 'Form data saved successfully' });
        }
    });
}

module.exports = ResidenceController;
