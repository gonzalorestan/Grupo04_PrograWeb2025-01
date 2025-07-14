const API_URL = 'http://localhost:5000/api';

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const getUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`);
  return res.json();
};

export const getOrders = async () => {
  const res = await fetch(`${API_URL}/carts`);
  return res.json();
};

export const getOrder = async (id) => {
  const res = await fetch(`${API_URL}/carts/${id}`);
  console.log({res}, res);
  
  return res.json();
};


export const toggleUserStatus = (id, isActive) => {
  return new Promise((resolve) => {
    console.log(`Simulando desactivación del usuario ${id}`);
    setTimeout(() => resolve({ success: true }), 500);
  });
};

export const cancelOrder = (id) => {
  return new Promise((resolve) => {
    console.log(`Simulando cancelación de orden ${id}`);
    setTimeout(() => resolve({ success: true }), 500);
  });
};

export const getOrdersPage = async (page = 1, limit = 5, token) => {
  const res = await fetch(`${API_URL}/orders/my-orders?page=${page}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Error al obtener órdenes');
  return res.json();
};

export const loginUser = async (email, password) => {
  /*if (email === "admin@tuapp.com" && password === "admin123") {
    return {
      accessToken: "fakeAdminToken",
      email: "admin@tuapp.com",
      firstName: "Admin",
      lastName: "Principal",
      image: "admin.png",
      username: "adminUser",
      rol: "admin"
    };
  }

  const user = await findUserByEmail(email);

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: user.username,
      password: password,
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Contraseña incorrecta');
  }

  const authData = await response.json();

  return {
    ...authData,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    username: user.username,
    rol: "usuario" 
  };*/
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json(); // { token, user }
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al obtener usuario');
  }

  return response.json();
};

export const registerUser = async (userData) => {
  /*const response = await fetch(`${API_URL}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
      password: userData.password,
      age: userData.age
    })
  });

  if (!response.ok) {
    throw new Error('Error al registrar usuario');
  }

  return response.json();*/
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (!res.ok) throw new Error('Error al registrar usuario');
  return res.json();
};

export const requestPasswordReset = async (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Simulando envío de correo a ${email}`);
      resolve({ success: true });
    }, 1000);
  });
};

export const updateUserProfile = async (updateData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Simulando actualización de perfil con:", updateData);
      const currentUser = JSON.parse(localStorage.getItem("usuarioActivo")) || {};

      const updatedUser = {
        ...currentUser,
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        email: updateData.email
      };

      localStorage.setItem("usuarioActivo", JSON.stringify(updatedUser));
      resolve(updatedUser);
    }, 1000);
  });
};

export const checkout = async (userId, items, shippingAddress, paymentMethod, token) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ userId, items, shippingAddress, paymentMethod })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al procesar la orden');
  }

  return res.json();
};




