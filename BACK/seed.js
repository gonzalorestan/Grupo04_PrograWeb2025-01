const sequelize = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const products = [
  {
    title: 'zapatillas nike',
    description: 'muy suave',
    price: 2000.00,
    image: 'https://dummyimage.com/400x300/000/fff&text=Laptop+Lenovo'
  },
  {
    title: 'zapatillas adidas',
    description: 'suave',
    price: 1000.00,
    image: 'https://dummyimage.com/400x300/000/fff&text=Galaxy+A54'
  },
  {
    title: 'Medias',
    description: 'elasticos',
    price: 99.99,
    image: 'https://dummyimage.com/400x300/000/fff&text=Mouse+Logitech'
  }
];

const users = [
  {
    username: 'seuz',
    email: 'seuz@gmail.com',
    password: '12345',
    firstName: 'seuz',
    lastName: 'seuz',
    rol: 'admin'
  },
  {
    username: 'vienos',
    email: 'vienos@gmail.com',
    password: '12345',
    firstName: 'Vienos',
    lastName: 'López',
    rol: 'cliente'
  }
];

async function seed() {
  try {
    await sequelize.sync({ force: false }); // No borramos tablas

    // Productos
    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.bulkCreate(products);
      console.log('Productos insertados');
    }

    // Usuarios
    const userCount = await User.count();
    if (userCount === 0) {
      const hashedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return { ...user, password: hashedPassword };
        })
      );

      await User.bulkCreate(hashedUsers);
      console.log('Usuarios insertados');
    }

    process.exit();
  } catch (error) {
    console.error('Error al insertar datos:', error);
    process.exit(1);
  }
}

seed();
