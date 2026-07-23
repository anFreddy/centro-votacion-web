import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-primary me-3 d-lg-none"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMovil"
          >
            <i className="bi bi-list fs-4"></i>
          </button>

          <h4 className="m-0 fw-bold">Dashboard</h4>
        </div>

        <div className="d-flex align-items-center">
          <div className="text-end me-3">
            <div className="fw-bold">{usuario?.usuario}</div>

            <small className="text-muted">{usuario?.rol}</small>
          </div>

          <button className="btn btn-outline-danger" onClick={cerrarSesion}>
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
