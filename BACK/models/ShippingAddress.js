const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ShippingAddress = sequelize.define('ShippingAddress', {
  departamento: DataTypes.STRING,
  provincia: DataTypes.STRING,
  distrito: DataTypes.STRING,
  direccion: DataTypes.STRING,
  postal: DataTypes.STRING,
  celular: DataTypes.STRING,
  dni: DataTypes.STRING
});

module.exports = ShippingAddress;
