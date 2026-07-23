import { useState, useEffect } from "react";
import { obtenerCentros } from "../../services/centroService";
import * as zonasService from "../../services/zonasService";

function UsuarioModal({ mostrar, cerrar, guardar, usuarioSeleccionado }) {
  const [formulario, setFormulario] = useState([]);
  const [centros, setCentros] = useState([]);
  const [centrosFiltrados, setCentrosFiltrados] = useState([]);
  const [zonas, setZonas] = useState([]);

  const limpiarFormulario = () => {
    setFormulario({
      idUsuario: 0,
      usuario: "",
      clave: "",
      idRol: "",
      idCentro: "",
      idZona: "",
      activo: true,
    });
  };

  const cargarCentros = async () => {
    try {
      const data = await obtenerCentros();

      setCentros(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarZonas = async () => {
    const data = await zonasService.listar();
    setZonas(data);
  };

  useEffect(() => {
    cargarZonas();
    cargarCentros();
  }, []);

  useEffect(() => {
    if (!mostrar) return;

    if (usuarioSeleccionado) {
      // Filtrar el centro según Zona
      setCentrosFiltrados(
        centros.filter((c) => c.idZona === Number(usuarioSeleccionado.idZona)),
      );

      setFormulario({
        idUsuario: usuarioSeleccionado.idUsuario,
        usuario: usuarioSeleccionado.usuario,
        clave: usuarioSeleccionado.clave,
        idRol: usuarioSeleccionado.idRol,
        idCentro: usuarioSeleccionado.idCentro,
        idZona: usuarioSeleccionado.idZona,
        activo: true,
      });
    } else {
      limpiarFormulario();
    }
  }, [usuarioSeleccionado, mostrar]);

  const cambiarValor = (e) => {
    const { name, value } = e.target;

    setFormulario((prev) => {
      const nuevoFormulario = {
        ...prev,
        [name]:
          name === "idRol" || name === "idCentro"
            ? value === ""
              ? null
              : Number(value)
            : value,
      };

      // Si el rol es Administrador, quitar el centro
      if (name === "idRol" && Number(value) === 1) {
        nuevoFormulario.idCentro = null;
      }

      return nuevoFormulario;
    });

    // Cuando cambie la zona
    if (name === "idZona") {
      setFormulario((prev) => ({
        ...prev,
        idZona: Number(value),
        idCentro: null,
      }));

      setCentrosFiltrados(centros.filter((c) => c.idZona === Number(value)));

      return;
    }
  };

  if (!mostrar) return null;

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{usuarioSeleccionado ? "Editar Usuario" : "Nuevo Usuario"}</h5>

            <button className="btn-close" onClick={cerrar}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label>Usuario</label>

              <input
                className="form-control"
                name="usuario"
                value={formulario.usuario}
                onChange={cambiarValor}
              />
            </div>

            <div className="mb-3">
              <label>Contraseña</label>

              <input
                type="password"
                className="form-control"
                name="clave"
                value={formulario.clave}
                onChange={cambiarValor}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rol</label>

              <select
                className="form-select"
                name="idRol"
                value={formulario.idRol}
                onChange={cambiarValor}
              >
                <option value="">Seleccione...</option>

                <option value="1">Administrador</option>

                <option value="2">Jefe de Centro</option>
              </select>
            </div>

            {formulario.idRol !== 1 && (
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

                <label className="form-label">Centro</label>

                <select
                  className="form-select"
                  name="idCentro"
                  value={formulario.idCentro}
                  onChange={cambiarValor}
                >
                  <option value="">Seleccione...</option>

                  {centrosFiltrados.map((centro) => (
                    <option key={centro.idCentro} value={centro.idCentro}>
                      {centro.centroVotacion}
                    </option>
                  ))}
                </select>
              </div>
            )}
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

export default UsuarioModal;
