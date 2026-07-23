import { useState, useEffect } from "react";
import * as dashboardService from "../services/dashboardService";

function Dashboard() {
  const [resumen, setResumen] = useState(null);
  const [resumenCentro, setResumenCentro] = useState(null);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    try {
      cargarResumen();
      cargarResumenCentro();
    } catch (error) {
      console.log(error.response?.data?.mensaje);
    }
  }, []);

  const fecha = new Date().toLocaleDateString("es-SV", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const cargarResumen = async () => {
    const data = await dashboardService.obtenerResumen();

    setResumen(data);
  };

  const cargarResumenCentro = async () => {
    const data = await dashboardService.obtenerResumenCentro();

    setResumenCentro(data);
  };

  const registrados = resumen ? resumen.usuarios + resumen.personal : 0;

  const registrosPersonal = Math.round(
    resumen ? (registrados / resumen.registroPersonal) * 100 : 0,
  );

  // Calcular Centros Completados
  const centrosCompletados = resumenCentro?.filter(
    (c) => c.registrados >= c.debenRegistrarse,
  ).length;

  const totalCentros = resumenCentro?.length;

  const porcentajeCentros =
    totalCentros === 0
      ? 0
      : Math.round((centrosCompletados * 100) / totalCentros);

  return (
    <div className="container-fluid">
      {/* Bienvenida */}

      <div className="mb-4">
        <h2 className="fw-bold">👋 Bienvenido, {usuario?.usuario}</h2>

        <p className="text-muted mb-0">{fecha}</p>
      </div>

      {/* Tarjetas */}

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted">Usuarios</h6>

                  <h2 className="fw-bold">{resumen?.usuarios}</h2>
                </div>

                <i
                  className="bi bi-people-fill text-primary"
                  style={{ fontSize: "45px" }}
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted">Centros</h6>

                  <h2 className="fw-bold">{resumen?.centros}</h2>
                </div>

                <i
                  className="bi bi-building text-success"
                  style={{ fontSize: "45px" }}
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted">Personal</h6>

                  <h2 className="fw-bold">{resumen?.personal}</h2>
                </div>

                <i
                  className="bi bi-person-badge-fill text-warning"
                  style={{ fontSize: "45px" }}
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted">Reportes</h6>

                  <h2 className="fw-bold">0</h2>
                </div>

                <i
                  className="bi bi-file-earmark-bar-graph-fill text-danger"
                  style={{ fontSize: "45px" }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda fila */}

      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body">
              <h4>Avance General</h4>

              <br />

              <p>
                Registro de Personal {registrados}/{resumen?.registroPersonal}
              </p>

              <div className="progress mb-4">
                <div
                  className="progress-bar"
                  style={{ width: registrosPersonal + "%" }}
                >
                  {registrosPersonal + "%"}
                </div>
              </div>

              <p>
                Centros Completados {centrosCompletados}/{totalCentros}
              </p>

              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${porcentajeCentros}%` }}
                >
                  {porcentajeCentros}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow rounded-4 mt-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Estado de Centros de Votación</h4>

                <span className="badge bg-primary">{totalCentros} Centros</span>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Centro de Votación</th>
                      <th className="text-center">Registrados</th>
                      <th width="35%">Avance</th>
                      <th className="text-center">Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {resumenCentro?.map((centro) => {
                      const porcentaje = Math.round(
                        (centro.registrados / centro.debenRegistrarse) * 100,
                      );

                      return (
                        <tr key={centro.idCentro}>
                          <td>{centro.centroVotacion}</td>

                          <td className="text-center">
                            <strong>
                              {centro.registrados}/{centro.debenRegistrarse}
                            </strong>
                          </td>

                          <td>
                            <div
                              className="progress"
                              style={{ height: "20px" }}
                            >
                              <div
                                className={`progress-bar ${
                                  porcentaje === 100
                                    ? "bg-success"
                                    : porcentaje >= 70
                                      ? "bg-warning"
                                      : "bg-danger"
                                }`}
                                style={{ width: `${porcentaje}%` }}
                              >
                                {porcentaje}%
                              </div>
                            </div>
                          </td>

                          <td className="text-center">
                            {porcentaje === 100 ? (
                              <span className="badge bg-success">Completo</span>
                            ) : (
                              <span className="badge bg-warning text-dark">
                                Pendiente
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
