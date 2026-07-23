import { useEffect, useState } from "react";
import * as personalService from "../../services/personalService";
import * as cargoService from "../../services/cargoService";
import { Alert } from "bootstrap";

function PersonalModal({ registro, cerrar }) {
  const [cargos, setCargos] = useState([]);

  const cargarCargos = async () => {
    const datos = await cargoService.listar();

    setCargos(datos);
  };

  const [formulario, setFormulario] = useState({
    idPersonal: "",
    idCentro: "",
    idCargo: "",
    nombreCompleto: "",
    telefono: "",
    dui: "",
  });

  useEffect(() => {
    cargarCargos();
    if (registro) {
      setFormulario(registro);
    }
  }, [registro]);

  const cambiarValor = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const guardar = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (
      formulario.nombreCompleto === "" ||
      formulario.telefono === "" ||
      formulario.dui === "" ||
      formulario.idCargo === ""
    ) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    try {
      if (formulario.idPersonal > 0) {
        // Actualiza por Id
        await personalService.actualizar(formulario.idPersonal, formulario);
      } else {
        // Crear nuevo
        await personalService.crear(formulario);
      }
      cerrar();
    } catch (error) {
      alert(error.response?.data?.mensaje);
    }
  };

  return (
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {formulario.idPersonal > 0 ? "Editar Personal" : "Nuevo Personal"}
            </h5>
          </div>

          <form onSubmit={guardar}>
            <div className="modal-body">
              <input
                className="form-control mb-3"
                name="nombreCompleto"
                placeholder="Nombre Completo"
                value={formulario.nombreCompleto}
                onChange={cambiarValor}
              />

              <input
                className="form-control mb-3"
                name="telefono"
                placeholder="Teléfono"
                value={formulario.telefono}
                onChange={cambiarValor}
              />

              <input
                className="form-control mb-3"
                name="dui"
                placeholder="DUI"
                value={formulario.dui}
                onChange={cambiarValor}
              />

              <select
                className="form-select"
                name="idCargo"
                value={formulario.idCargo}
                onChange={cambiarValor}
              >
                <option value="">Seleccione un cargo</option>
                {cargos.map((cargo) => (
                  <option key={cargo.idCargo} value={cargo.idCargo}>
                    {cargo.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cerrar}
              >
                Cancelar
              </button>

              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonalModal;
