import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();

    setMensaje("");
    setCargando(true);

    try {
      const respuesta = await login(usuario, password);

      localStorage.setItem("token", respuesta.token);
      localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));

      if (respuesta.usuario.rol === "Administrador") {
        navigate("/dashboard");
      } else {
        navigate("/personal");
      }
    } catch {
      setMensaje("Usuario o contraseña incorrectos");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Panel izquierdo */}

        <div className="col-lg-7 d-none d-lg-flex flex-column justify-content-center text-white px-5">
          <h1 className="display-3 fw-bold">Centro de Votación</h1>

          <h3 className="mb-4">Sistema de Administración</h3>

          <p className="fs-5">
            Administra usuarios, centros de votación, personal y reportes desde
            una sola plataforma.
          </p>

          <div className="mt-5 fs-5">
            <p>✔ Gestión de Usuarios</p>

            <p>✔ Gestión de Centros</p>

            <p>✔ Personal Asignado</p>

            <p>✔ Reportes</p>

            <p>✔ Seguridad mediante JWT</p>
          </div>
        </div>

        {/* Login */}

        <div className="col-lg-5 col-12 d-flex align-items-center justify-content-center">
          <div
            className="card shadow-lg border-0 rounded-4"
            style={{ width: "420px" }}
          >
            <div className="card-body p-5">
              <div className="text-center">
                <h2 className="fw-bold mb-1">Bienvenido</h2>

                <p className="text-muted">Inicia sesión para continuar</p>
              </div>

              <form onSubmit={iniciarSesion}>
                <div className="mb-3">
                  <label className="form-label">Usuario</label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Ingrese su usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Contraseña</label>

                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {mensaje && <div className="alert alert-danger">{mensaje}</div>}

                <button
                  className="btn btn-primary btn-lg w-100"
                  type="submit"
                  disabled={cargando}
                >
                  {cargando ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
