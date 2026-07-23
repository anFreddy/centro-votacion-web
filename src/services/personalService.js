import api from "./api";

// Obtener todo el personal
export const listar = async (id) => {
  const response = await api.get(`/Personal/centro/${id}`);

  return response.data;
};

// Obtener un registro por Id
export const obtener = async (id) => {
  const response = await api.get(`/Personal/${id}`);

  return response.data;
};

// Crear
export const crear = async (personal) => {
  const response = await api.post("/Personal", personal);

  return response.data;
};

// Actualizar
export const actualizar = async (id, personal) => {
  const response = await api.put(`/Personal/${id}`, personal);

  return response.data;
};

// Eliminar
export const eliminar = async (id) => {
  const response = await api.delete(`/Personal/${id}`);

  return response.data;
};

// Obtener estadísticas de Centro

export const obtenerCantidades = async (idCentro) => {
  const response = await api.get(`/CentroCargo/${idCentro}`);

  return response.data;
};
