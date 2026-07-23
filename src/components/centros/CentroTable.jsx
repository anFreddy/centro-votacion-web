function CentroTable({ centros, onEditar, onEliminar }) {
  return (
    <div className="card shadow border-0">
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Zona</th>
              <th>Centro de Votación</th>
              <th>Número JRV</th>
              <th width="150">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {centros?.map((u) => (
              <tr key={u.idCentro}>
                <td>{u.zona}</td>
                <td>{u.centroVotacion}</td>
                <td>{u.numeroJRV}</td>

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

export default CentroTable;
