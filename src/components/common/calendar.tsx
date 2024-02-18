import React from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import koLocale from "@fullcalendar/core/locales/ko";

const FullCalendarComponent = ({ events }) => {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={koLocale}
        // eventContent={renderEventContent}
      />
    </div>
  );
};

export default FullCalendarComponent;
