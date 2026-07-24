import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import SidebarMovil from "../components/common/SidebarMovil";
import Cargando from "../components/common/Cargando";
import { useLoading } from "../context/LoadingContext";
import "./layout.css";

function MainLayout() {
  const { visible, texto } = useLoading();

  return (
    <>
      {/* Sidebar escritorio */}
      <div className="d-none d-lg-block">
        <Sidebar />
      </div>

      {/* Sidebar móvil */}
      <div className="d-lg-none">
        <SidebarMovil />
      </div>

      {/* Contenido */}
      <div className="main-content">
        <Navbar />

        <div
          className="py-3 px-2 position-relative"
          style={{ minHeight: "calc(100vh - 56px)" }}
        >
          <Cargando visible={visible} texto={texto} />

          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
