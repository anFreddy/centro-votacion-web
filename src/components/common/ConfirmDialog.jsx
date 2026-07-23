function ConfirmDialog({ mostrar, titulo, mensaje, aceptar, cancelar }) {
  if (!mostrar) return null;

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{titulo}</h5>
          </div>

          <div className="modal-body">
            <p>{mensaje}</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={cancelar}>
              Cancelar
            </button>

            <button className="btn btn-danger" onClick={aceptar}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
