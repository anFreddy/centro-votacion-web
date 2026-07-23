import { useNavigate } from "react-router-dom";
import MenuSidebar from "./MenuSidebar";

function Sidebar() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const esAdministrador = usuario?.rol === "Administrador";

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column bg-primary text-white shadow"
      style={{
        width: "260px",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
      }}
    >
      {/* Logo */}
      <div className="text-center py-4 border-bottom">
        <i className="bi bi-ballot-fill fs-1"></i>

        <h4 className="mt-3 mb-0 fw-bold">Centro de Votación</h4>

        <small>Sistema Administrativo</small>
      </div>

      {/* Menú */}
      <div className="flex-grow-1 mt-4 overflow-auto">
        <MenuSidebar esAdministrador={esAdministrador} />
      </div>

      {/* Usuario */}
      <div className="border-top p-3">
        <div className="mb-3">
          <strong>{usuario?.usuario}</strong>
          <br />
          <small>{usuario?.rol}</small>
        </div>

        <button className="btn btn-danger w-100" onClick={cerrarSesion}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
