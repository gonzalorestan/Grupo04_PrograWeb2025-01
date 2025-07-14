const express = require('express');
const router = express.Router();
const { CartItem, Product } = require('../models');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/:userId', async (req, res) => {
  const items = await CartItem.findAll({ where: { UserId: req.params.userId }, include: Product });
  res.json(items);
});

router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const existing = await CartItem.findOne({ where: { UserId: userId, ProductId: productId } });
  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return res.json(existing);
  }
  const newItem = await CartItem.create({ UserId: userId, ProductId: productId, quantity });
  res.status(201).json(newItem);
});

router.delete('/remove/:id', async (req, res) => {
  await CartItem.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;