const Sequelize = require('sequelize');
const db = require('../dbConfig');

console.log(db)
console.log(Sequelize)

const Category = Sequelize.define('Category', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Category;