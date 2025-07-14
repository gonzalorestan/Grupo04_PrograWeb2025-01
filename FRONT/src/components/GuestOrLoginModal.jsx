import React, { useState } from "react";
import styles from "./Modal.module.css";

export default function GuestOrLoginModal({ onClose, onGuest, onLogin }) {
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleGuestContinue = () => {
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Ingresa un correo válido");
      return;
    }
    setError("");
    onGuest(email);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {!showEmail ? (
          <>
            <h2>¿Cómo deseas continuar?</h2>
            <button className={styles.modalButton} onClick={() => setShowEmail(true)}>
              Continuar como invitado
            </button>
            <button className={styles.modalButton} onClick={onLogin}>
              Iniciar sesión
            </button>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </>
        ) : (
          <>
            <h2>Ingresa tu correo</h2>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.modalInput}
            />
            {error && <div className={styles.modalError}>{error}</div>}
            <button className={styles.modalButton} onClick={handleGuestContinue}>
              Continuar
            </button>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </>
        )}
      </div>
    </div>
  );
}
