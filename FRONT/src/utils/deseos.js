// src/utils/deseos.js

/**
 * Agrega un producto a la lista de deseos del usuario activo en localStorage, evitando duplicados por id.
 * @param {Object} producto - El producto a guardar (debe tener al menos id, nombre, imagen, talla, precio, categoria).
 * @returns {boolean} true si se agregó, false si ya existía.
 */
export function agregarADeseos(producto) {
  const user = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!user || !user.correo) return false;
  const key = `guardados_${user.correo}`;
  let deseos = JSON.parse(localStorage.getItem(key)) || [];
  // Evitar duplicados por id
  if (deseos.some(item => item.id === producto.id)) {
    return false;
  }
  deseos.push(producto);
  localStorage.setItem(key, JSON.stringify(deseos));
  return true;
}
