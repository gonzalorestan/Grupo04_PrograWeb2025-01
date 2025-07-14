const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username, email, password: hashedPassword, firstName, lastName, rol
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
});

router.post('/recover', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: 'Email no registrado' });
  // Simulación de envío
  setTimeout(() => {
    res.json({ message: `Correo enviado a ${email}` });
  }, 1000);
});

// Devuelve los datos del usuario autenticado con el token JWT
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;