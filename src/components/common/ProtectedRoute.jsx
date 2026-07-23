import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles = [] }) {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (roles.length > 0 && !roles.includes(usuario?.idRol)) {
    return <Navigate to="/personal" replace />;
    // O a una página de "Acceso denegado"
  }

  return children;
}

export default ProtectedRoute;
