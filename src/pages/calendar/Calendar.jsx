import Banner from "../../components/banner/Banner";
import CalendarApp from "../../components/calendar/Calendar";
import CrudButtons from "../../components/crud-buttons/CrudButtons";

function Calendar() {
  return (
    <div>
      <Banner title="Calendario" />
      <CrudButtons />
      <CalendarApp />
    </div>
  );
}

export default Calendar;
