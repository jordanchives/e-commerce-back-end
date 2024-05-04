// Import the Sequelize and dotenv packages
require('dotenv').config();
const Sequelize = require('sequelize');

// Create a new Sequelize object using the database name, MySQL username, and MySQL password provided in the .env file
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
