// controllers/RoleController.js

const RoleController = {};
const pool = require('../dbConnection');

RoleController.createRole = (req, res) => {
    const formData = req.body;
    const { roleName } = formData;

    const sqlQuery = `
    INSERT INTO roles (role_name)
    VALUES (?)
    `;

    pool.query(sqlQuery, [roleName], (err, results) => {
        if (err) {
            console.error('Error storing form data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('Form data saved with ID:', results.insertId);
            res.json({ message: 'Form data saved successfully' });
        }
    });
}

RoleController.editRole = (req, res) => {
    const formData = req.body;
    const { roleName, roleId } = formData;

    const sqlQuery = `
        UPDATE roles
        SET role_name = ?
        WHERE role_id = ?
    `;

    pool.query(sqlQuery, [roleName, roleId], (err, results) => {
        if (err) {
            console.error('Error storing form data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('Form data saved with ID:', results.insertId);
            res.json({ message: 'Form data saved successfully' });
        }
    });
}

RoleController.getAllRoles = (req, res) => {
    const sqlQuery = `SELECT * FROM roles`
    console.log('entered role retrieving')

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error(err)
        }
        res.json(results)
    })
}

RoleController.getRoleById = (req, res) => {
    const userId = req.params.id;
    const roleIdQuery = `SELECT role_id FROM users_roles WHERE user_id = ?`;

    if (userId !== 0) {
        pool.query(roleIdQuery, userId, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }

            if (results.length > 0) {
                const roleId = results[0].role_id;
                const roleNameQuery = `SELECT role_name FROM roles WHERE role_id = ?`;

                pool.query(roleNameQuery, roleId, (err, roleResults) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Database error');
                    }
                    const roleName = roleResults[0].role_name;
                    console.log(roleName)
                    res.json(roleName);
                });
            } else {
                return res.status(404).send('No role found for this user');
            }
        });
    }
};


module.exports = RoleController;