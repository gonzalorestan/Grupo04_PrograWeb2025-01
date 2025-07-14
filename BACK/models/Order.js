const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  total: DataTypes.FLOAT,
  status: { type: DataTypes.STRING, defaultValue: 'Pendiente' },
  paymentMethod: DataTypes.STRING
});

module.exports = Order;
