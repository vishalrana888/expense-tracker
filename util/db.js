const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', 'Vishal@888', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: false // Disable logging for cleaner output
});
(async () => {
  try {
    await sequelize.sync(); // Sync all defined models to the database
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
module.exports = sequelize;
