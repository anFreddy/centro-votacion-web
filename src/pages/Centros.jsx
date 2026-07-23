import { useState, useEffect } from "react";
import * as centroService from "../services/centroService";
import CentroTable from "../components/centros/CentroTable";
import CentroModal from "../components/centros/CentroModal";

function Centros() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [centrosObtenidos, setCentrosObtenidos] = useState(null);
  const [centroSeleccionado, setCentroSeleccionado] = useState(null);

  useEffect(() => {
    obtenerCentros();
  }, []);

  const obtenerCentros = async () => {
    try {
      const data = await centroService.obtenerCentros();

      setCentrosObtenidos(data);
    } catch (error) {
      console.log(error.response?.data?.mensaje);
    }
  };

  // Nuevo Centro
  const nuevoCentro = () => {
    setCentroSeleccionado(null);
    setMostrarModal(true);
  };

  // Agregar o editar Centro
  const agregarEditar = (centro) => {
    setCentroSeleccionado(centro);
    setMostrarModal(true);
  };

  const agregarEditarCentro = async (formulario) => {
    try {
      // Validar que los campos estén llenos
      if (
        !formulario.idZona ||
        !formulario.centroVotacion ||
        !formulario.numeroJRV
      ) {
        alert("Por favor, llena todos los campos.");
        return;
      }

      if (centroSeleccionado) {
        // Editar
        await centroService.actualizar(centroSeleccionado.idCentro, formulario);
      } else {
        // Agregar
        await centroService.crear(formulario);
      }

      // Cerrar el modal y limpiar centro seleccionado
      setCentroSeleccionado(null);
      setMostrarModal(false);

      // Cargar centros
      obtenerCentros();
    } catch (error) {
      alert(error.response?.data?.mensaje);
      console.log(error.response?.data?.mensaje);
    }
  };

  // Eliminar Centro
  const eliminar = async (centro) => {
    try {
      if (centro) {
        const confirmar = window.confirm(
          `¿Estás seguro de eliminar el ${centro.centroVotacion}?\nEsta acción no se puede deshacer.`,
        );

        if (confirmar) {
          await centroService.eliminar(centro.idCentro);
          obtenerCentros();
        }
      }
    } catch (error) {
      alert(error.response?.data?.mensaje);
      console.log(error.response?.data?.mensaje);
    }
  };

  const cerrarModal = () => {
    setCentroSeleccionado(null);
    setMostrarModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Centros</h2>

        <button className="btn btn-primary" onClick={nuevoCentro}>
          <i className="bi bi-plus-circle me-2"></i>
          Nuevo Centro
        </button>
      </div>

      <CentroTable
        centros={centrosObtenidos}
        onEditar={agregarEditar}
        onEliminar={eliminar}
      />

      <CentroModal
        mostrar={mostrarModal}
        cerrar={cerrarModal}
        guardar={agregarEditarCentro}
        centroSeleccionado={centroSeleccionado}
      />
    </div>
  );
}

export default Centros;
