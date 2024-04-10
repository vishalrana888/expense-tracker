const Sequelize = require('sequelize');

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../util/db');

class Expense extends Model {}

Expense.init({
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
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
}, {
  sequelize,
  modelName: 'Expense'
});

module.exports = Expense;
