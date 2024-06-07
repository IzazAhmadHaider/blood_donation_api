require('dotenv').config();
const Sequelize = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
//   host: process.env.HOST,
//   dialect: process.env.DIALECT
// });

// const sequelize = new Sequelize('blooddonation', 'root', '', {
//   host: 'localhost',
//   dialect: 'mariadb'
// });

const sequelize = new Sequelize('devcares_blooddonation', 'devcares_izaz', 'VDH-_f!f2dFi', {
  host: '95.217.74.210',
  dialect: 'mysql'   
});

module.exports = sequelize;
