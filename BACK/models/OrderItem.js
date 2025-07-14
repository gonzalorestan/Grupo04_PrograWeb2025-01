const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderItem = sequelize.define('OrderItem', {
  quantity: DataTypes.INTEGER,
  price: DataTypes.FLOAT
});

module.exports = OrderItem;
