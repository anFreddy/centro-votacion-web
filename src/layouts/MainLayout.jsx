import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import SidebarMovil from "../components/common/SidebarMovil";
import "./layout.css";

function MainLayout() {
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

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
