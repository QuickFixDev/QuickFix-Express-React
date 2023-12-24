const pool = require('../../dbConnection');

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

const updateUserPhoto = (userId, photoUrl) => {
    return new Promise((resolve, reject) => {
        const userPhotoSqlQuery = `UPDATE users SET photo_url = ? WHERE user_id = ?`;

        pool.query(userPhotoSqlQuery, [photoUrl, userId], (err) => {
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
    updateUserData,
    updateUserRole,
    updateUserStatus,
    updateUserPhoto,
};