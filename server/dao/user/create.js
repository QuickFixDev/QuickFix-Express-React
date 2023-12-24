const pool = require('../../dbConnection');

const createUser = (formData) => {
    return new Promise((resolve, reject) => {
        const { first_name, last_name, email, phone, status_id } = formData;
        const userSqlQuery = `INSERT INTO users (first_name, last_name, email, phone, status_id) VALUES (?, ?, ?, ?, ?)`;

        pool.query(userSqlQuery, [first_name, last_name, email, phone, status_id], (err, userResults) => {
            if (err) {
                console.error('Error storing form data:', err);
                reject(err);
            } else {
                const userId = userResults.insertId;
                resolve(userId);
            }
        });
    });
};

const createUserRole = (userId, role_id) => {
    return new Promise((resolve, reject) => {
        const userRolesSqlQuery = `INSERT INTO users_roles (user_id, role_id) VALUES (?, ?)`;

        pool.query(userRolesSqlQuery, [userId, role_id], (err) => {
            if (err) {
                console.error('Error storing user role data:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = {
    createUser,
    createUserRole,
};