function PersonalTable({ datos, editar, eliminar }) {
  return (
    <table className="table table-hover align-middle">
      <thead className="table-light">
        <tr>
          <th>Nombre</th>

          <th>Cargo</th>

          <th>Teléfono</th>

          <th>DUI</th>

          <th width="150">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {datos.map((item) => (
          <tr key={item.idPersonal}>
            <td>{item.nombreCompleto}</td>

            <td>{item.cargo}</td>

            <td>{item.telefono}</td>

            <td>{item.dui}</td>

            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editar(item)}
              >
                <i className="bi bi-pencil"></i>
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminar(item)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PersonalTable;
