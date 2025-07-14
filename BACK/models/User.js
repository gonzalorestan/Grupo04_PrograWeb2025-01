const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, unique: true },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  rol: DataTypes.STRING
});

module.exports = User;
