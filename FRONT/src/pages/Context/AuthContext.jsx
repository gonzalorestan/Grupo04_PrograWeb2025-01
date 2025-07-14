import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, loginUser } from '../../services/api';
import { testUsers } from '../../data/testUsers';

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
    // verifica y mantiene la sesion activa
    const checkAuth = async () => {
          const token = localStorage.getItem('token');
          const storedUser = localStorage.getItem('usuarioActivo');

          if (token && storedUser) {
              try {
                  const userData = await getCurrentUser(token);
                  setUser({...userData, ...JSON.parse(storedUser)});
              } catch (error) {
                  console.warn('Token invalido, manteniendo sesion local');
                  setUser(JSON.parse(storedUser));
              }
          }
          setLoading(false);
      };

    checkAuth();
  }, [logout]);

  const login = async (email, password) => {
    // Primero, buscar en los usuarios de prueba locales
    /*const localUser = testUsers.find(u => u.correo === email && u.password === password);
    if (localUser) {
      const userData = {
        email: localUser.correo,
        firstName: localUser.nombre,
        rol: localUser.rol,
      };
      localStorage.setItem('usuarioActivo', JSON.stringify(userData));
      setUser(userData);
      return userData;
    }*/

    try {
      // ✅ Admin local
      /*if (email === "admin@tuapp.com" && password === "admin123") {
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
      }*/

      // 🔄 Login normal servidor base de datos
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);

      const userData = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        username: data.user.username,
        rol: data.user.rol
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
