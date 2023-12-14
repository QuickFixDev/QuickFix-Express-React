// controllers/UserController.js

const UserController = {};
const pool = require('../dbConnection');

UserController.getAllUsers = (req, res) => {
    console.log("Fetching the users");
    const sqlQuery = `
    SELECT 
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        r.role_name,
        u.status_id,
        us.name AS status,
        re.residence_id
    FROM
        users u
    INNER JOIN
        users_roles ur ON u.user_id = ur.user_id
    INNER JOIN
        roles r ON ur.role_id = r.role_id
    INNER JOIN
        activity_statuses us ON u.status_id = us.id
    LEFT JOIN
        residences re ON u.user_id = re.tenant_user_id;
    `;
    ;

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err); // Log the error
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    });
};

UserController.getUserByEmail = (req, res) => {
    const sqlQuery = `
    SELECT 
        u.user_id, 
        u.first_name, 
        u.last_name, 
        u.email,
        u.phone,
        r.role_name,
        u.status_id,
        us.name AS status
    FROM
        users u
    INNER JOIN 
        users_roles ur ON u.user_id = ur.user_id
    INNER JOIN 
        roles r ON ur.role_id = r.role_id
    INNER JOIN 
        activity_statuses us ON u.status_id = us.id
    WHERE 
        u.email = ?
    `;

    const userEmail = req.params.id;

    pool.query(sqlQuery, userEmail, (err, results) => {
        if (err) {
            console.log(`Error fetching user with email: ${userEmail}`);
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            // Handle the case when no user is found with the provided email
            return res.status(404).json({ error: 'User not found' });
        }

        const user_id = results[0].user_id; // Extract the user_id from the first result
        res.json(results[0]);
    });
};

UserController.deleteUser = async (req, res) => {
    const userId = req.params.id;

    const sqlQuery = `DELETE FROM users WHERE user_id = ?`;
    const values = [userId];    

    pool.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'damn bro, User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
};

UserController.createUser = (req, res) => {
    const formData = req.body;
    console.log('form data in query: ', formData);

    const { first_name, last_name, email, phone, role_id, residence } = formData;

    const userSqlQuery = `INSERT INTO users (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`;
    const userRolesSqlQuery = `INSERT INTO users_roles (user_id, role_id) VALUES (?, ?)`;

    pool.query(userSqlQuery, [first_name, last_name, email, phone], (err, userResults) => {
        if (err) {
            console.error('Error storing form data:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            const userId = userResults.insertId;

            // Execute the second query to insert into the user_roles table
            pool.query(userRolesSqlQuery, [userId, role_id], (err) => {
                if (err) {
                    console.error('Error storing user role data:', err);
                    res.status(500).json({ message: 'Internal server error' });
                } else {
                    console.log('Form data and user role saved successfully');

                    // Insert into residences table based on the role
                    let residenceQuery;
                    if (role_id === '1') {
                        residenceQuery = `UPDATE residences SET tenant_user_id = ?, status = 'occupied' WHERE residence_id = ?`;
                    } else if (role_id === '7') {
                        residenceQuery = `UPDATE residences SET owner_user_id = ? WHERE residence_id = ?`;
                    }

                    pool.query(residenceQuery, [userId, residence], (err) => {
                        if (err) {
                            console.error('Error storing residence data:', err);
                            res.status(500).json({ message: 'Internal server error' });
                        } else {
                            console.log('Residence data saved successfully');
                            res.json({ message: 'Form data, user role, and residence saved successfully' });
                        }
                    });
                }
            });
        }
    });
};

module.exports = UserController;