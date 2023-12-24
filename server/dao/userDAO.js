const pool = require('../dbConnection');

const createUser = (formData) => {
    return new Promise((resolve, reject) => {
        const { first_name, last_name, email, phone, status_id } = formData;
        const userSqlQuery = `INSERT INTO users (first_name, last_name, email, phone, status_id) VALUES (?, ?, ?, ?, ?)`;

        console.log('---------- query ----------', userSqlQuery)

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

const insertUserRole = (userId, role_id) => {
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

const updateResidence = (userId, roleId, residenceId) => {
    return new Promise((resolve, reject) => {
        let residenceQuery;

        if (roleId !== 7) {
            residenceQuery = `UPDATE residences SET tenant_user_id = ?, status = 'occupied' WHERE residence_id = ?`;
        } else if (roleId === 7) {
            residenceQuery = `UPDATE residences SET owner_user_id = ? WHERE residence_id = ?`;
        }

        pool.query(residenceQuery, [userId, residenceId], (err) => {
            if (err) {
                console.error('Error storing residence data:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const updateUserData = (userId, firstName, lastName, email, phone) => {
    return new Promise((resolve, reject) => {
        const updateUserQuery = `
            UPDATE users

            SET 
                first_name = ?,
                last_name = ?,
                email = ?,
                phone = ?

            WHERE user_id = ?
        ;`;

        pool.query(updateUserQuery, [firstName, lastName, email, phone, userId], (err) => {
            if (err) {
                console.error('Error updating user:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const updateUserRole = (userId, roleId) => {
    return new Promise((resolve, reject) => {
        const updateUserQuery = `
            UPDATE users_roles

            SET 
                user_id = ?,
                role_id = ?
            
            WHERE user_id = ?
        ;`;

        pool.query(updateUserQuery, [userId, roleId, userId], (err) => {
            if (err) {
                console.error('Error updating user:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const updateUserStatus = (userId, statusId) => {
    return new Promise((resolve, reject) => {
        const updateUserQuery = `
            UPDATE users

            SET 
                status_id = ?
            
            WHERE user_id = ?
        ;`;

        pool.query(updateUserQuery, [statusId, userId], (err) => {
            if (err) {
                console.error('Error updating user:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = {
    createUser,
    insertUserRole,
    updateResidence,
    updateUserData,
    updateUserRole,
    updateUserStatus,
};