import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Obtener el tema guardado o usar "light" por defecto
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "light";
  });

  // Aplicar el tema al HTML y guardarlo
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", tema);
    localStorage.setItem("tema", tema);
  }, [tema]);

  // Cambiar entre claro y oscuro
  const cambiarTema = () => {
    setTema((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        tema,
        cambiarTema,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
