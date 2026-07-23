function UsuarioTable({ usuarios, onEditar, onEliminar }) {
  return (
    <div className="card shadow border-0">
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Usuario</th>
              <th>Zona</th>
              <th>Rol</th>
              <th>Centro</th>
              <th width="150">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios?.map((u) => (
              <tr key={u.idUsuario}>
                <td>{u.usuario}</td>
                <td>{u.zona}</td>
                <td>{u.rol}</td>
                <td>{u.centroVotacion ?? "-"}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEditar(u)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onEliminar(u)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsuarioTable;
