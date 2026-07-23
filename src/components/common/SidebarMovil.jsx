import { useNavigate } from "react-router-dom";
import MenuSidebar from "./MenuSidebar";

function SidebarMovil() {
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
      className="offcanvas offcanvas-start bg-primary text-white"
      tabIndex="-1"
      id="sidebarMovil"
    >
      {/* Encabezado */}

      <div className="offcanvas-header border-bottom">
        <div>
          <i className="bi bi-ballot-fill fs-2"></i>

          <h5 className="mt-2 mb-0">Centro de Votación</h5>

          <small>Sistema Administrativo</small>
        </div>

        <button
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>

      {/* Menú */}

      <div className="offcanvas-body d-flex flex-column">
        <div className="flex-grow-1">
          <MenuSidebar
            esAdministrador={esAdministrador}
            onClick={() =>
              document.querySelector('[data-bs-dismiss="offcanvas"]')?.click()
            }
          />
        </div>

        {/* Usuario */}

        <div className="border-top pt-3">
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
    </div>
  );
}

export default SidebarMovil;
