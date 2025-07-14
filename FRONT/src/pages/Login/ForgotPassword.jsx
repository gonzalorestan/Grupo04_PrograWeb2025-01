import React, { useState } from "react";
import { requestPasswordReset } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await requestPasswordReset(email);
         // Simula "enviado"
        localStorage.setItem("recoveryEmail", email); 
        navigate("/verificarcodigo"); 
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <div style={{ padding: 40 }}>
                    <h2>Recuperar contraseña</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="login-container"
                            type="email"
                            placeholder="Tu correo"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button className="login-submit" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
