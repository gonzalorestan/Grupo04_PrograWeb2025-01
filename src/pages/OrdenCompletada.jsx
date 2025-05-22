import React from "react";
import { useNavigate } from "react-router-dom";

const OrdenCompletada = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h2>¡Felicidades Completaste tu Orden!</h2>
      <img src="/resources/check.png" alt="Check" style={{ width: "180px", margin: "2rem 0" }} />
      <button onClick={() => navigate("/")}>SEGUIR COMPRANDO</button>
    </div>
  );
};

export default OrdenCompletada;