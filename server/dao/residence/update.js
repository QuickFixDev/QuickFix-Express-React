const pool = require('../../dbConnection');

const updateResidenceUser = (userId, roleId, residenceId) => {
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

module.exports = {
    updateResidenceUser,
}