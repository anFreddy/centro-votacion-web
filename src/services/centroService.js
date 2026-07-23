import api from "./api";

export const obtenerCentros = async () => {
  const response = await api.get("/CentrosVotacion");

  return response.data;
};

export const listarPorZona = async (idZona) => {
  const response = await api.get(`/CentrosVotacion/Zona/${idZona}`);

  return response.data;
};

export const obtener = async (idCentro) => {
  const response = await api.get(`/CentrosVotacion/${idCentro}`);

  return response.data;
};

export const crear = async (centro) => {
  const response = await api.post("/CentrosVotacion", centro);

  return response.data;
};

export const actualizar = async (id, centro) => {
  const response = await api.put(`/CentrosVotacion/${id}`, centro);

  return response.data;
};

export const eliminar = async (idCentro) => {
  const response = await api.delete(`/CentrosVotacion/${idCentro}`);

  return response.data;
};
