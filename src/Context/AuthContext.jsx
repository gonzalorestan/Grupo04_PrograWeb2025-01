import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getCurrentUser, loginUser} from '../../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
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
        try {
            const data = await loginUser(email, password);
            localStorage.setItem('token', data.accessToken);

            const userData = {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                image: data.image,
                id: data.id,
                username: data.username
            };

            localStorage.setItem('usuarioActivo', JSON.stringify(userData));
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
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