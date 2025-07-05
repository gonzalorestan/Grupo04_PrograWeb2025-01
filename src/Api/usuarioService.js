import api from '../services/api'; 

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const loginUsuario = loginUser; 

export const obtenerPerfil = async () => {
  const response = await api.get('/usuarios/perfil');
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};