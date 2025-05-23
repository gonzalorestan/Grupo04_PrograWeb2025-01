import React from "react";
import styles from "./Modal.module.css";

const QRModal = ({ total, onClose, onSuccess }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <button className={styles.close} onClick={onClose}>X</button>
        <img src="/resources/qr.png" alt="QR" style={{ width: "180px", margin: "auto" }} />
        <button onClick={onSuccess}>COMPLETAR ORDEN</button>
      </div>
    </div>
  );
};

export default QRModal;
