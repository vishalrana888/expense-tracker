const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Expense = sequelize.define('Expense', {
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

module.exports = Expense;
