import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const nombre = 'Fernando'
const apellido = 'Herrera';

let valorDado= 5;

valorDado = 6;

if (true) {
  let valorDado = 6;

  console.log(valorDado)
}
console.log(nombre,apellido,valorDado)
reportWebVitals();
