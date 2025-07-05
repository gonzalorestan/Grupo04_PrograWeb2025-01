import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ProveedorCategoria } from './pages/Context/ContextoCategoria';
import { AuthProvider } from './pages/Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProveedorCategoria>
          <App />
        </ProveedorCategoria>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
