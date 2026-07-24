function Cargando({ visible, texto = "Cargando..." }) {
  if (!visible) return null;

  return (
    <div
      className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(255,255,255,.75)",
        backdropFilter: "blur(2px)",
        zIndex: 9999,
      }}
    >
      <div className="text-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        ></div>

        <h5 className="mt-3">{texto}</h5>
      </div>
    </div>
  );
}

export default Cargando;
