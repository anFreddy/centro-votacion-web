import api from "./api";

export const listar = async () => {
  const response = await api.get("/Cargos");

  return response.data;
};
