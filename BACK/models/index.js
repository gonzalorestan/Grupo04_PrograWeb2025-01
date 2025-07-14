const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

// Modelos
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const CartItem = require('./CartItem');
const ShippingAddress = require('./ShippingAddress');

// Relaciones
User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

User.hasMany(CartItem);
CartItem.belongsTo(User);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

ShippingAddress.hasMany(Order);
Order.belongsTo(ShippingAddress);

// Exportar todo
module.exports = {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  CartItem,
  ShippingAddress
};
