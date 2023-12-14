// controllers/ResidentialController.js

const ResidentialController = {};
const pool = require('../dbConnection');

ResidentialController.getAllResidentials = (req, res) => {
    console.log("Fetching the residentials");
    const sqlQuery = `SELECT * FROM residentials`;

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err); // Log the error
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
        console.log(results);
    });
};

ResidentialController.deleteResidential = async (req, res) => {
    const residenceId = req.params.id;
    const sqlQuery = `DELETE FROM residentials WHERE residence_id = ?`;

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

ResidentialController.createResidential = (req, res) => {
    const formData = req.body;
    console.log('form data in query: ', formData)
    const { residential_name, country, state, city } = formData;

    sqlQuery = `INSERT INTO residentials ( residential_name, country, state, city ) VALUES ( ?, ?, ?, ? )`

    pool.query(sqlQuery, [ residential_name, country, state, city ], (err, results) => {
        if (err) {
            console.error('Error storing form data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('Form data saved with ID:', results.insertId);
            res.json({ message: 'Form data saved successfully' });
        }
    });
}

module.exports = ResidentialController;