import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});


export const getOrder = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await api.put(`/orders/${id}/cancel`);
  return response.data;
};


export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await api.put(`/users/${id}/toggle-status`);
  return response.data;
};


export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const requestPasswordReset = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

export const getOrdersPage = async (page = 1, limit = 10) => {
  const response = await api.get(`/orders?page=${page}&limit=${limit}`);
  return response.data;
};
export default api;