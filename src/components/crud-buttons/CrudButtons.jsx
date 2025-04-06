import "./CrudButtons.css";
import { useState, useEffect } from "react";
import { ref, push, remove, update, onValue } from "firebase/database";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

function CrudButtons() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [nextId, setNextId] = useState(0);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    description: "",
    end: "",
    id: "0",
    start: "",
    title: ""
  });

  useEffect(() => {
    const eventsRef = ref(db, "data/events");
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      if (snapshot.exists()) {
        const eventsData = snapshot.val();
        const eventsArray = Object.entries(eventsData).map(([key, value]) => ({
          ...value,
          firebaseKey: key
        }));
        setEvents(eventsArray);
        
        const ids = eventsArray.map(event => parseInt(event.id));
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        setNextId(maxId + 1);
      } else {
        setEvents([]);
        setNextId(0);
      }
    });

    return () => unsubscribe();
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
    
    if (!eventData.title || !eventData.start || !eventData.end || !eventData.description) {
      setShowValidationModal(true);
      return;
    }

    try {
      const eventsRef = ref(db, "data/events");
      const formattedEvent = {
        ...eventData,
        id: nextId.toString(),
        start: formatDateTime(eventData.start),
        end: formatDateTime(eventData.end)
      };
      
      await push(eventsRef, formattedEvent);
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

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    if (!eventData.title || !eventData.start || !eventData.end || !eventData.description) {
      setShowValidationModal(true);
      return;
    }

    try {
      const eventRef = ref(db, `/data/events/${selectedEvent.firebaseKey}`);
      const formattedEvent = {
        ...eventData,
        start: formatDateTime(eventData.start),
        end: formatDateTime(eventData.end)
      };
      
      await update(eventRef, formattedEvent);
      setShowEditModal(false);
      setSelectedEvent(null);
      setEventData({
        description: "",
        end: "",
        id: "0",
        start: "",
        title: ""
      });
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    try {
      const eventRef = ref(db, `/data/events/${selectedEvent.firebaseKey}`);
      await remove(eventRef);
      setShowDeleteModal(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="crud-buttons-container">
        <button className="crud-button" onClick={() => setShowModal(true)}>
          Añadir un evento
        </button>
        <button className="crud-button" onClick={() => setShowEditModal(true)}>
          Editar un evento
        </button>
        <button className="crud-button" onClick={() => setShowDeleteModal(true)}>
          Eliminar un evento
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => setShowModal(false)}
            >×</button>
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

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => {
                setShowEditModal(false);
                setSelectedEvent(null);
                setEventData({
                  description: "",
                  end: "",
                  id: "0",
                  start: "",
                  title: ""
                });
              }}
            >×</button>
            <h2>Editar Evento</h2>
            <select
              value={selectedEvent?.firebaseKey || ""}
              onChange={(e) => {
                const event = events.find(ev => ev.firebaseKey === e.target.value);
                setSelectedEvent(event);
                if (event) {
                  setEventData({
                    description: event.description,
                    end: event.end,
                    id: event.id,
                    start: event.start,
                    title: event.title
                  });
                }
              }}
            >
              <option value="">Seleccionar evento</option>
              {events.map(event => (
                <option key={event.firebaseKey} value={event.firebaseKey}>
                  {event.title}
                </option>
              ))}
            </select>
            {selectedEvent && (
              <form onSubmit={handleEdit}>
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
                  <button type="submit">Actualizar</button>
                  <button type="button" onClick={() => {
                    setShowEditModal(false);
                    setSelectedEvent(null);
                    setEventData({
                      description: "",
                      end: "",
                      id: "0",
                      start: "",
                      title: ""
                    });
                  }}>
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedEvent(null);
              }}
            >×</button>
            <h2>Eliminar Evento</h2>
            <select
              value={selectedEvent?.firebaseKey || ""}
              onChange={(e) => {
                const event = events.find(ev => ev.firebaseKey === e.target.value);
                setSelectedEvent(event);
              }}
            >
              <option value="">Seleccionar evento</option>
              {events.map(event => (
                <option key={event.firebaseKey} value={event.firebaseKey}>
                  {event.title}
                </option>
              ))}
            </select>
            {selectedEvent && (
              <div>
                <p>¿Estás seguro de que deseas eliminar "{selectedEvent.title}"?</p>
                <div className="modal-buttons">
                  <button onClick={handleDelete}>Eliminar</button>
                  <button onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedEvent(null);
                  }}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showValidationModal && (
        <div className="modal">
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => setShowValidationModal(false)}
            >×</button>
            <h2>Error de Validación</h2>
            <p>Por favor, complete todos los campos requeridos:</p>
            <ul>
              {!eventData.title && <li>Título</li>}
              {!eventData.start && <li>Fecha de inicio</li>}
              {!eventData.end && <li>Fecha de fin</li>}
              {!eventData.description && <li>Descripción</li>}
            </ul>
            <div className="modal-buttons">
              <button onClick={() => setShowValidationModal(false)}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CrudButtons;