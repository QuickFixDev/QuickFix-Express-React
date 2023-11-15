// controllers/ResidentialController.js

const ResidentialController = {};
const pool = require('../dbConnection');

ResidentialController.getAllResidentials = (req, res) => {
    console.log("Fetching the residentials");
    const sqlQuery = 'SELECT * FROM residentials';

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
    const sqlQuery = 'DELETE FROM residentials WHERE residence_id = ?';

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
    const { residential_id, owner_user_id, tenant_user_id, zip_code, street_name, street_number, details } = formData;

    sqlQuery = 'INSERT INTO residentials (residential_id, owner_user_id, tenant_user_id, zip_code, street_name, street_number, details) VALUES (?, ?, ?, ?, ?, ?, ?)'

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

// ResidentialController.getUserId = (req, res) => {
//     const sqlQuery = 'SELECT * FROM users WHERE email = ?';
//     const userEmail = req.params.id;

//     pool.query(sqlQuery, userEmail, (err, results) => {
//         if (err) {
//             console.log(`Error fetching user with email: ${userEmail}`);
//             console.error(err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         if (results.length === 0) {
//             // Handle the case when no user is found with the provided email
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const user_id = results[0].user_id; // Extract the user_id from the first result
//         res.json(results[0]);
//     });
// };


// ResidentialController.getUserByEmail = (req, res) => {
//     console.log("Fetching the users");
//     const sqlQuery = 'SELECT * FROM users WHERE email = {auth0 email}';

//     pool.query(sqlQuery, (err, results) => {
//         if (err) {
//             console.error("Error fetching data:", err); // Log the error
//             res.status(500).json({ error: 'Error fetching data' });
//         } else {
//             res.json(results);
//         }
//     });
// };

module.exports = ResidentialController;













