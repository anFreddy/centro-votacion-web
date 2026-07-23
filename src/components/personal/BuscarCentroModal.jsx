import { useEffect, useState } from "react";
import * as zonaService from "../../services/zonasService";
import * as centroService from "../../services/centroService";

function BuscarCentroModal({ cerrar, seleccionar }) {
  const [zonas, setZonas] = useState([]);
  const [centros, setCentros] = useState([]);

  const [idZona, setIdZona] = useState("");
  const [idCentro, setIdCentro] = useState("");

  useEffect(() => {
    cargarZonas();
  }, []);

  const cargarZonas = async () => {
    const datos = await zonaService.listar();

    setZonas(datos);
  };

  const cambiarZona = async (e) => {
    const id = e.target.value;

    setIdZona(id);

    setIdCentro("");

    const datos = await centroService.listarPorZona(id);

    setCentros(datos);
  };

  const aceptar = () => {
    if (!idZona || !idCentro) {
      alert("Seleccione una zona y un centro.");

      return;
    }

    seleccionar(idZona, idCentro);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Buscar Centro de Votación</h5>

            <button className="btn-close" onClick={cerrar}></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Zona</label>

                <select
                  className="form-select"
                  value={idZona}
                  onChange={cambiarZona}
                >
                  <option value="">Seleccione...</option>

                  {zonas.map((z) => (
                    <option key={z.idZona} value={z.idZona}>
                      {z.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Centro</label>

                <select
                  className="form-select"
                  value={idCentro}
                  onChange={(e) => setIdCentro(e.target.value)}
                  disabled={!idZona}
                >
                  <option value="">Seleccione...</option>

                  {centros.map((c) => (
                    <option key={c.idCentro} value={c.idCentro}>
                      {c.centroVotacion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={cerrar}>
              Cancelar
            </button>

            <button className="btn btn-primary" onClick={aceptar}>
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuscarCentroModal;
