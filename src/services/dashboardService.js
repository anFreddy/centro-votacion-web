import api from "./api";

export const obtenerResumen = async () => {
  const response = await api.get("/Dashboard");

  return response.data;
};

export const obtenerResumenCentro = async () => {
  const response = await api.get("/Dashboard/Centro");

  return response.data;
};
