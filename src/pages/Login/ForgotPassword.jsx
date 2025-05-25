import React, { useState } from "react";
import { requestPasswordReset } from "../../services/api";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await requestPasswordReset(email);
        setStatus("Correo enviado (simulado). Revisa tu bandeja.");
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
                    {status && <p>{status}</p>}
                </div>
            </div>
        </div>
    );
}
