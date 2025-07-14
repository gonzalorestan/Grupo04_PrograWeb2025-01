const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  price: DataTypes.FLOAT,
  image: DataTypes.STRING
});

module.exports = Product;
