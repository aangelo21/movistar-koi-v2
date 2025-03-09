import "./Calendar.css";
import React, { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { eventsData } from "../../services/eventsData";
import '@schedule-x/theme-default/dist/index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: eventsData,
    plugins: [eventsService, createDragAndDropPlugin(), createEventModalPlugin()]
  })

  return (
    <div className="calendar-container">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp