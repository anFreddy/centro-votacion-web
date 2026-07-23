import api from "./api";

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  const response = await api.get("/Usuarios");

  return response.data;
};

// Obtener usuario por IdCentro

export const obtenerUsuarioCentro = async (id) => {
  const response = await api.get(`/Usuarios/centro/${id}`);

  return response.data;
};

// Crear usuario
export const crearUsuario = async (usuario) => {
  const response = await api.post("/Usuarios", usuario);

  return response.data;
};

// Actualizar usuario
export const editarUsuario = async (id, usuario) => {
  const response = await api.put(`/Usuarios/${id}`, usuario);

  return response.data;
};

// Eliminar usuario
export const eliminarUsuario = async (id) => {
  const response = await api.delete(`/Usuarios/${id}`);

  return response.data;
};

// Activar / Desactivar usuario
export const cambiarEstadoUsuario = async (id) => {
  const response = await api.post(`/Usuarios/${id}`);

  return response.data;
};
