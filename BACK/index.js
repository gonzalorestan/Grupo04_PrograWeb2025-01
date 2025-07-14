const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');


const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

sequelize.sync().then(() => {
  console.log('DB sincronizada');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Servidor corriendo en puerto ${process.env.PORT || 5000}`)
  );
});
