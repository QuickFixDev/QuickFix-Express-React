const Sequelize = require('sequelize');
const db = require('../dbConfig');

const User = db.define('User', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = User;