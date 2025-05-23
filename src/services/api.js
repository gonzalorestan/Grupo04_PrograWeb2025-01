const API_URL = 'https://dummyjson.com';

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
