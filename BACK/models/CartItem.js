const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CartItem = sequelize.define('CartItem', {
  quantity: DataTypes.INTEGER
});


module.exports = CartItem;