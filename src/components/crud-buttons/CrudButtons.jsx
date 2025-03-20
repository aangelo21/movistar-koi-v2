import "./CrudButtons.css";
import { useState, useEffect } from "react";
import { ref, push, get } from "firebase/database";
import { db } from "../../firebase/config";

function CrudButtons() {
  const [showModal, setShowModal] = useState(false);
  const [nextId, setNextId] = useState(0);
  const [eventData, setEventData] = useState({
    description: "",
    end: "",
    id: "0",
    start: "",
    title: ""
  });

  useEffect(() => {
    const eventsRef = ref(db, "events");
    get(eventsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const events = snapshot.val();
        const ids = Object.values(events).map(event => parseInt(event.id));
        const maxId = Math.max(...ids);
        setNextId(maxId + 1);
      }
    });
  }, []);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventsRef = ref(db, "events");
      const formattedEvent = {
        ...eventData,
        id: nextId.toString(),
        start: formatDateTime(eventData.start),
        end: formatDateTime(eventData.end)
      };
      
      await push(eventsRef, formattedEvent);
      setNextId(nextId + 1);
      setShowModal(false);
      setEventData({
        description: "",
        end: "",
        id: "0",
        start: "",
        title: ""
      });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <>
      <div className="crud-buttons-container">
        <button className="crud-button" onClick={() => setShowModal(true)}>
          Añadir un evento
        </button>
        <button className="crud-button">Editar un evento</button>
        <button className="crud-button">Eliminar un evento</button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Añadir Evento</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Título"
                value={eventData.title}
                onChange={(e) => setEventData({...eventData, title: e.target.value})}
              />
              <input
                type="datetime-local"
                value={eventData.start}
                onChange={(e) => setEventData({...eventData, start: e.target.value})}
              />
              <input
                type="datetime-local"
                value={eventData.end}
                onChange={(e) => setEventData({...eventData, end: e.target.value})}
              />
              <textarea
                placeholder="Descripción"
                value={eventData.description}
                onChange={(e) => setEventData({...eventData, description: e.target.value})}
              />
              <div className="modal-buttons">
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CrudButtons;
