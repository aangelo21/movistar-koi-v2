import "./Calendar.css";
import React, { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid, createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { db } from "../../firebase/config";
import { ref, onValue } from "firebase/database";

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: events,
    defaultView: "month",
    plugins: [eventsService, createEventModalPlugin()],
  });

  useEffect(() => {
    const eventsRef = ref(db, "events");
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedEvents = Object.entries(data).map(([key, event]) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          description: event.description,
        }));
        setEvents(formattedEvents);
        eventsService.set(formattedEvents);
      } else {
        setEvents([]);
        eventsService.set([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [eventsService]);

  useEffect(() => {
    eventsService.set(events);
  }, [events, eventsService]);

  if (isLoading) {
    return <div>Loading calendar...</div>;
  }

  return (
    <div className="calendar-container">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
