import { NavLink } from "react-router-dom";

function MenuSidebar({ esAdministrador, onClick }) {
  return (
    <>
      {/* Dashboard */}
      {esAdministrador && (
        <NavLink
          to="/dashboard"
          className="nav-link text-white px-4 py-3"
          onClick={onClick}
        >
          <i className="bi bi-house-door-fill me-2"></i>
          Dashboard
        </NavLink>
      )}

      {/* Usuarios */}
      {esAdministrador && (
        <NavLink
          to="/usuarios"
          className="nav-link text-white px-4 py-3"
          onClick={onClick}
        >
          <i className="bi bi-people-fill me-2"></i>
          Usuarios
        </NavLink>
      )}

      {/* Centros */}
      {esAdministrador && (
        <NavLink
          to="/centros"
          className="nav-link text-white px-4 py-3"
          onClick={onClick}
        >
          <i className="bi bi-building me-2"></i>
          Centros
        </NavLink>
      )}

      {/* Personal */}
      <NavLink
        to="/personal"
        className="nav-link text-white px-4 py-3"
        onClick={onClick}
      >
        <i className="bi bi-person-badge-fill me-2"></i>
        Personal
      </NavLink>

      {/* Reportes */}
      {esAdministrador && (
        <NavLink
          to="/reportes"
          className="nav-link text-white px-4 py-3"
          onClick={onClick}
        >
          <i className="bi bi-file-earmark-text-fill me-2"></i>
          Reportes
        </NavLink>
      )}
    </>
  );
}

export default MenuSidebar;
