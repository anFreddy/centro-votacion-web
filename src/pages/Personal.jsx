import { useEffect, useState, useSyncExternalStore } from "react";
import PersonalTable from "../components/personal/PersonalTable";
import PersonalModal from "../components/personal/PersonalModal";
import * as personalService from "../services/personalService";
import * as centroService from "../services/centroService";
import BuscarCentroModal from "../components/personal/BuscarCentroModal";
import * as usuarioService from "../services/usuarioService";

function Personal() {
  const [personal, setPersonal] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [registroEditar, setRegistroEditar] = useState(null);
  const [mostrarBuscarCentro, setMostrarBuscarCentro] = useState(false);
  const [idZona, setIdZona] = useState(null);
  const [idCentro, setIdCentro] = useState(null);
  const [usuarioCentro, setUsuarioCentro] = useState(null);
  const [centroSeleccionado, setCentroSeleccionado] = useState(null);
  const [estadisticas, setEstadisticas] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const esAdministrador = usuario?.rol === "Administrador";

  const totalPermitidos = estadisticas.reduce(
    (total, item) => total + item.cantidad,
    0,
  );

  const totalRegistrados = estadisticas.reduce(
    (total, item) => total + item.registrados,
    0,
  );

  const porcentajeGeneral =
    totalPermitidos > 0
      ? Math.round((totalRegistrados / totalPermitidos) * 100)
      : 0;

  useEffect(() => {
    if (!esAdministrador) {
      cambiarCentro(null, usuario.idCentro);
    }
  }, [esAdministrador]);

  const cambiarCentro = async (zona, centro) => {
    if (zona) {
      setIdZona(zona);
    } else {
      const datos = await centroService.obtener(centro);
      setIdZona(datos.idZona);
    }

    setIdCentro(centro);

    await Promise.all([
      cargarCentro(centro),
      cargarPersonal(centro),
      obtenerUsuarioEncargado(centro),
      cargarEstadisticas(centro),
    ]);

    setMostrarBuscarCentro(false);
  };

  const cargarEstadisticas = async (idCentro) => {
    const datos = await personalService.obtenerCantidades(idCentro);

    setEstadisticas(datos);
  };

  const obtenerUsuarioEncargado = async (idCentro) => {
    const datos = await usuarioService.obtenerUsuarioCentro(idCentro);

    setUsuarioCentro(datos);
  };

  const cargarCentro = async (idCentro) => {
    const datos = await centroService.obtener(idCentro);

    setCentroSeleccionado(datos);
  };

  const cargarPersonal = async (idCentro) => {
    const datos = await personalService.listar(idCentro);

    setPersonal(datos);
  };

  const nuevoRegistro = () => {
    if (!idCentro) {
      alert("Por favor, selecciona un centro.");
      return;
    }

    setRegistroEditar({
      idPersonal: 0,
      idCentro: idCentro,
      idCargo: "",
      nombreCompleto: "",
      telefono: "",
      dui: "",
    });

    setMostrarModal(true);
  };

  const editarRegistro = (item) => {
    setRegistroEditar(item);
    setMostrarModal(true);
  };

  const eliminarRegistro = async (item) => {
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar a ${item.nombreCompleto}?\nEsta acción no se puede deshacer.`,
    );

    if (confirmar) {
      await personalService.eliminar(item.idPersonal);

      if (idCentro) {
        cargarPersonal(idCentro);
        cargarEstadisticas(idCentro);
      }
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    if (idCentro) {
      cargarPersonal(idCentro);
      cargarEstadisticas(idCentro);
    }
  };

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
          <h2 className="fw-bold mb-0">Personal del Centro</h2>

          <small className="text-muted">
            Administración del personal asignado al centro de votación
          </small>
        </div>

        <div className="d-flex gap-2">
          {esAdministrador && (
            <button
              className="btn btn-outline-primary"
              onClick={() => setMostrarBuscarCentro(true)}
            >
              <i className="bi bi-search me-2"></i>
              Buscar Centro
            </button>
          )}

          <button className="btn btn-primary" onClick={nuevoRegistro}>
            <i className="bi bi-person-plus-fill me-2"></i>
            Nuevo Registro
          </button>
        </div>
      </div>

      {/* Información del Centro */}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-5">
              <label className="text-muted">Centro de Votación</label>

              <h5 className="fw-bold">
                {centroSeleccionado?.centroVotacion ?? "Seleccione un centro"}
              </h5>
            </div>

            <div className="col-md-4">
              <label className="text-muted">Jefe de Centro</label>

              <h5>{usuarioCentro?.usuario ?? "-"}</h5>
            </div>

            <div className="col-md-3">
              <div>
                <label className="text-muted">Personal Registrado</label>

                <h4 className="fw-bold text-primary">
                  {totalRegistrados}/{totalPermitidos}
                </h4>

                <small className="text-muted">
                  {porcentajeGeneral}% completado
                </small>

                <div className="progress mt-2" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${porcentajeGeneral}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header">Estado del Personal</div>

        <div className="card-body">
          <div className="row">
            {estadisticas.map((item) => {
              const porcentaje = Math.round(
                (item.registrados / item.cantidad) * 100,
              );

              return (
                <div className="col-lg-3 col-md-6 mb-3" key={item.idCargo}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-3">
                      <div className="fw-semibold small mb-2">
                        {item.nombre}
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">
                          {item.registrados} / {item.cantidad}
                        </span>

                        <span className="fw-bold">{porcentaje}%</span>
                      </div>

                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className={`progress-bar ${
                            porcentaje === 100
                              ? "bg-success"
                              : porcentaje >= 50
                                ? "bg-warning"
                                : "bg-danger"
                          }`}
                          style={{ width: `${porcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabla */}

      <div className="card shadow-sm border-0">
        <div className="card-header">Personal registrado</div>
        <div className="card-body">
          <PersonalTable
            datos={personal}
            editar={editarRegistro}
            eliminar={eliminarRegistro}
          />
        </div>
      </div>

      {mostrarModal && (
        <PersonalModal registro={registroEditar} cerrar={cerrarModal} />
      )}

      {mostrarBuscarCentro && (
        <BuscarCentroModal
          cerrar={() => setMostrarBuscarCentro(false)}
          seleccionar={cambiarCentro}
        />
      )}
    </div>
  );
}

export default Personal;
