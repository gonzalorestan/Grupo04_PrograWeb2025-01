const express = require('express');
const router = express.Router();
const { Product } = require('../models');

router.get('/', async (req, res) => {
  const { search } = req.query;
  let where = {};
  if (search) {
    where = { title: { [require('sequelize').Op.iLike]: `%${search}%` } };
  }
  const products = await Product.findAll({ where });
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'No encontrado' });
  res.json(product);
});

module.exports = router;