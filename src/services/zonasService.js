import api from "./api";

export const listar = async () => {
  const response = await api.get("/Zonas");

  return response.data;
};

export const obtenerZona = async (id) => {
  const response = await api.get(`/Zonas/${id}`);

  return response.data;
};
