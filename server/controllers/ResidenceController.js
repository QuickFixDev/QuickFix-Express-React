// controllers/ResidenceController.js

const ResidenceController = {};
const pool = require('../dbConnection');
const executeQuery = require('../utils/dbUtils');

ResidenceController.getAllResidences = (req, res) => {
    console.log("Fetching the residences");
    const sqlQuery = `SELECT * FROM residences`;
    executeQuery(req, res, sqlQuery)
};

ResidenceController.getResidenceById = (req, res) => {
    id = req.params.id;
    const sqlQuery = `SELECT * FROM residences WHERE residence_id = ?`;
    executeQuery(req, res, sqlQuery, [id])
};

ResidenceController.getResidenceByTenantId = (req, res) => {
    id = req.params.id;
    const sqlQuery = `SELECT * FROM residences WHERE tenant_user_id = ?`;
    executeQuery(req, res, sqlQuery, [id])
};

ResidenceController.getResidenceByOwnerId = (req, res) => {
    id = req.params.id;
    const sqlQuery = `SELECT * FROM residences WHERE owner_user_id = ?`;
    executeQuery(req, res, sqlQuery, [id])
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
    const { residentialId, zipCode, streetName, streetNumber, details, ownerUserId, tenantUserId } = formData;

    sqlQuery = `
        INSERT INTO residences (residential_id, zip_code, street_name, street_number, details, owner_user_id, tenant_user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    pool.query(sqlQuery, [residentialId, zipCode, streetName, streetNumber, details, ownerUserId, tenantUserId], (err, results) => {
        if (err) {
            console.error('Error storing form data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('Form data saved with ID:', results.insertId);
            res.json({ message: 'Form data saved successfully' });
        }
    });
}

ResidenceController.updateResidence = (req, res) => {
    const formData = req.body;
    console.log('form data in query: ', formData)
    const { residentialId, zipCode, streetName, streetNumber, details, ownerUserId, tenantUserId, residenceId } = formData;

    sqlQuery = `
        UPDATE residences
        SET residential_id = ?, zip_code = ?, street_name = ?, street_number = ?, details = ?, owner_user_id = ?, tenant_user_id = ?
        WHERE residence_id = ?
    `

    pool.query(sqlQuery, [residentialId, zipCode, streetName, streetNumber, details, ownerUserId, tenantUserId, residenceId], (err, results) => {
        if (err) {
            console.error('Error updating residence data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('Form data saved with ID:', results.insertId);
            res.json({ message: 'Form data saved successfully' });
        }
    });
}

module.exports = ResidenceController;