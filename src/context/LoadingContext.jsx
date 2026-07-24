import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [texto, setTexto] = useState("Cargando...");

  const mostrarCarga = (mensaje = "Cargando...") => {
    setTexto(mensaje);
    setVisible(true);
  };

  const ocultarCarga = () => {
    setVisible(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        visible,
        texto,
        mostrarCarga,
        ocultarCarga,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
