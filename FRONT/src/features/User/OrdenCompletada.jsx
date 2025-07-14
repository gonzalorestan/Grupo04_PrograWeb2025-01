import React from "react";
import { useNavigate } from "react-router-dom";

const OrdenCompletada = () => {
  const navigate = useNavigate();
  

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
      backgroundColor: "#f4f2f9", 
      textAlign: "center",
    }}
  >

      <h2>¡Felicidades Completaste tu Orden!</h2>
      <img src="/resources/check.PNG" alt="Check" style={{ width: "180px", margin: "2rem 0" ,textAlign: "center"}} />
      <button onClick={() => navigate("/")}>SEGUIR COMPRANDO</button>
    </div>
  );
};

export default OrdenCompletada;
