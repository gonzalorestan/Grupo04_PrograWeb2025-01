import React, { createContext, useState, useContext } from 'react';

export const CategoriaContexto = createContext();

export const ProveedorCategoria = ({ children }) => {
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: "Running", descripcion: "Calzado para correr" },
    { id: 2, nombre: "Urbanas", descripcion: "Calzado urbano y casual" },
    { id: 3, nombre: "Premium", descripcion: "Modelos exclusivos y premium" },
    { id: 4, nombre: "Chunky", descripcion: "Calzado chunky y voluminoso" },
    { id: 5, nombre: "Sandalias", descripcion: "Sandalias y slides" },
    { id: 6, nombre: "Jordan", descripcion: "Colección Air Jordan" },
    { id: 7, nombre: "Fútbol", descripcion: "Calzado para fútbol" },
    { id: 8, nombre: "Tenis", descripcion: "Calzado para tenis" }
  ]);

  const agregarCategoria = (nuevaCategoria) => {
    const nueva = { ...nuevaCategoria, id: categorias.length + 1 };
    setCategorias([...categorias, nueva]);
  };

  const eliminarCategoria = (id) => {
    setCategorias(categorias.filter(cat => cat.id !== id));
  };

  const actualizarCategoria = (categoriaActualizada) => {
    setCategorias(categorias.map(cat =>
      cat.id === categoriaActualizada.id ? categoriaActualizada : cat
    ));
  };

  return (
    <CategoriaContexto.Provider value={{ categorias, agregarCategoria, eliminarCategoria, actualizarCategoria }}>
      {children}
    </CategoriaContexto.Provider>
  );
};

export const useCategoria = () => useContext(CategoriaContexto);





