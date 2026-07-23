import { HashRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Centros from "./pages/Centros";
import Personal from "./pages/Personal";
import Reportes from "./pages/Reportes";
import ProtectedRoute from "./components/common/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Sistema */}
        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />

          <Route
            path="/centros"
            element={
              <ProtectedRoute>
                <Centros />
              </ProtectedRoute>
            }
          />

          <Route
            path="/personal"
            element={
              <ProtectedRoute>
                <Personal />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reportes"
            element={
              <ProtectedRoute>
                <Reportes />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
