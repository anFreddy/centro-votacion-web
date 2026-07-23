import api from "./api";

export const login = async (usuario, password) => {
  const response = await api.post("/Auth/Login", {
    usuario,
    password,
  });

  return response.data;
};
