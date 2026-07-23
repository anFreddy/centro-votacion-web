import { useState, useEffect } from "react";
import * as zonasService from "../../services/zonasService";

function CentroModal({ mostrar, cerrar, guardar, centroSeleccionado }) {
  const [formulario, setFormulario] = useState([]);
  const [zonas, setZonas] = useState([]);

  const cargarZonas = async () => {
    const data = await zonasService.listar();
    setZonas(data);
  };

  useEffect(() => {
    cargarZonas();
  }, []);

  useEffect(() => {
    if (!mostrar) return;

    if (centroSeleccionado) {
      setFormulario({
        idCentro: centroSeleccionado.idCentro,
        idZona: centroSeleccionado.idZona,
        centroVotacion: centroSeleccionado.centroVotacion,
        numeroJRV: centroSeleccionado.numeroJRV,
      });
    } else {
      limpiarFormulario();
    }
  }, [mostrar, centroSeleccionado]);

  const limpiarFormulario = () => {
    setFormulario({
      idCentro: "",
      idZona: "",
      centroVotacion: "",
      numeroJRV: "",
    });
  };

  const cambiarValor = (e) => {
    const { name, value } = e.target;

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!mostrar) return null;

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{centroSeleccionado ? "Editar Centro" : "Nuevo Centro"}</h5>

            <button className="btn-close" onClick={cerrar}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Zona</label>

              <select
                className="form-select"
                name="idZona"
                value={formulario.idZona}
                onChange={cambiarValor}
              >
                <option value="">Seleccione...</option>
                {zonas.map((zona) => (
                  <option key={zona.idZona} value={zona.idZona}>
                    {zona.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Centro de Votación</label>

              <input
                className="form-control"
                name="centroVotacion"
                value={formulario.centroVotacion}
                onChange={cambiarValor}
              />
            </div>

            <div className="mb-3">
              <label>Número JRV</label>

              <input
                type="Number"
                className="form-control"
                name="numeroJRV"
                value={formulario.numeroJRV}
                onChange={cambiarValor}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={cerrar}>
              Cancelar
            </button>

            <button
              className="btn btn-primary"
              onClick={() => guardar(formulario)}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CentroModal;
