import React, { createContext, useState, useEffect } from "react";
import { loginUser as loginUsuario, registerUser, obtenerPerfil } from '../Api/usuarioService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const verificarAutenticacion = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const perfil = await obtenerPerfil();
                    setUsuario(perfil.data);
                } catch (error) {
                    console.error("Error al verificar autenticación:", error);
                    localStorage.removeItem("token");
                }
            }
            setCargando(false);
        };

        verificarAutenticacion();
    }, []);

    const login = async (email, password) => {
        const respuesta = await loginUsuario({ email, password });
        localStorage.setItem("token", respuesta.data.token);
        setUsuario(respuesta.data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
