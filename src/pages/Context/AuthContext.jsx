import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, loginUser } from '../../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioActivo');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('usuarioActivo');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // ✅ Admin local
      if (email === "admin@tuapp.com" && password === "admin123") {
        const adminUser = {
          email: email,
          firstName: "Admin",
          lastName: "Local",
          username: "admin",
          rol: "admin"
        };
        localStorage.setItem('usuarioActivo', JSON.stringify(adminUser));
        setUser(adminUser);
        return adminUser;
      }

      // 🔄 Login normal dummyjson
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.accessToken);

      const userData = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        id: data.id,
        username: data.username,
        rol: "usuario"
      };

      localStorage.setItem('usuarioActivo', JSON.stringify(userData));
      setUser(userData);
      return userData;

    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error AuthProvider');
  }
  return context;
}
