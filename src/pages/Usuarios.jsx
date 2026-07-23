import { useEffect, useState } from "react";
import UsuarioModal from "../components/usuarios/UsuarioModal";
import UsuarioTable from "../components/usuarios/UsuarioTable";
import {
  obtenerUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../services/usuarioService";

function Usuarios() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios();

      setUsuarios(data);
    } catch (error) {
      console.error(error);

      alert("No se pudieron cargar los usuarios.");
    }
  };

  // Nuevo usuario
  const nuevoUsuario = () => {
    setUsuarioSeleccionado(null);
    setMostrarModal(true);
  };

  // Agregar o editar usuario
  const agregarEditar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModal(true);
  };

  const guardarUsuario = async (formulario) => {
    // Validar que los campos requeridos estén completos
    if (
      !formulario.usuario ||
      !formulario.clave ||
      !formulario.idRol ||
      !formulario.idCentro
    ) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    try {
      if (usuarioSeleccionado) {
        // Editar Usuario
        await editarUsuario(usuarioSeleccionado.idUsuario, formulario);
      } else {
        // Crear usuario
        await crearUsuario(formulario);
      }

      // Cerrar el modal y limpiar el formulario
      setMostrarModal(false);
      setUsuarioSeleccionado(null);

      cargarUsuarios();
    } catch (error) {
      console.error(error);
      console.error(error.response?.data?.mensaje);

      alert("No se pudo guardar.\n" + error.response?.data?.mensaje);
    }
  };

  // Eliminar usuario
  const eliminar = async (usuario) => {
    // Confirmar eliminación
    const confirmacion = window.confirm(
      `¿Está seguro de que desea eliminar al usuario "${usuario.usuario}"? \nEsta acción no se puede deshacer.`,
    );

    if (confirmacion) {
      try {
        await eliminarUsuario(usuario.idUsuario);
        setUsuarioSeleccionado(null);
        cargarUsuarios();
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.mensaje);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Usuarios</h2>

        <button className="btn btn-primary" onClick={nuevoUsuario}>
          <i className="bi bi-plus-circle me-2"></i>
          Nuevo Usuario
        </button>
      </div>

      <UsuarioTable
        usuarios={usuarios}
        onEditar={agregarEditar}
        onEliminar={eliminar}
      />

      <UsuarioModal
        mostrar={mostrarModal}
        cerrar={() => {
          setUsuarioSeleccionado(null);
          setMostrarModal(false);
        }}
        guardar={guardarUsuario}
        usuarioSeleccionado={usuarioSeleccionado}
      />
    </div>
  );
}

export default Usuarios;
