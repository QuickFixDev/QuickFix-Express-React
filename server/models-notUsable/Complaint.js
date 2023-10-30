const Sequelize = require('sequelize');
const db = require('../dbConfig');

const Complaint = db.define('Complaint', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});

module.exports = Complaint;