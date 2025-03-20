import "./CrudButtons.css";

function CrudButtons() {
  return (
    <>
      <div className="crud-buttons-container">
        <button className="crud-button">Añadir un evento</button>
        <button className="crud-button">Editar un evento</button>
        <button className="crud-button">Eliminar un evento</button>
      </div>
    </>
  );
}

export default CrudButtons;
