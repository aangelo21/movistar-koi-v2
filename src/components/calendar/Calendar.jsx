import "./Calendar.css";
import React, { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid, createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { db } from "../../firebase/config";
import { getDatabase, ref, onValue } from "firebase/database";

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsRef = ref(db, "events");

    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Raw Firebase data:", data);
      if (data) {
        const formattedEvents = Object.entries(data).map(([key, event]) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          description: event.description,
        }));
        console.log("Formatted events:", formattedEvents);
        setEvents(formattedEvents);
      }
    });
  }, []);

  console.log("Current events state:", events);
  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    initialEvents: events,
    defaultView: "month",
    plugins: [
      eventsService,
      createDragAndDropPlugin(),
      createEventModalPlugin(),
    ],
  });

  return (
    <div className="calendar-container">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
