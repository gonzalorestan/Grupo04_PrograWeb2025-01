const express = require('express');
const router = express.Router();
const { Order, OrderItem, Product, ShippingAddress } = require('../models');
const verifyToken = require('../middlewares/authMiddleware');

// Crear una orden
router.post('/', verifyToken, async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod } = req.body;

    let total = 0;
    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Producto ${item.productId} no encontrado` });
      }
      total += product.price * item.quantity;
    }

    // Crear dirección de envío
    const savedAddress = await ShippingAddress.create(shippingAddress);

    // Crear orden
    const order = await Order.create({
      UserId: userId,
      total,
      paymentMethod,
      ShippingAddressId: savedAddress.id
    });

    // Crear items
    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      await OrderItem.create({
        OrderId: order.id,
        ProductId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al procesar orden', error: err.message });
  }
});


// Obtener órdenes paginadas del usuario autenticado
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
      where: { UserId: req.user.id },
      include: OrderItem,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({ orders: rows, total: count });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener órdenes' });
  }
});

// Obtener orden por ID
router.get('/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: OrderItem
  });
  if (!order) return res.status(404).json({ error: 'No encontrado' });
  res.json(order);
});




// Mantener la ruta de admin para consultar órdenes de otro usuario
router.get('/user/:userId', verifyToken, async (req, res) => {
  if (parseInt(req.user.id) !== parseInt(req.params.userId)) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  const orders = await Order.findAll({
    where: { UserId: req.params.userId },
    include: OrderItem
  });
  res.json(orders);
});

module.exports = router;
