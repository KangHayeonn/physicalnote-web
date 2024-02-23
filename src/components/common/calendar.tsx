import React from "react";
import Image from "next/image";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import koLocale from "@fullcalendar/core/locales/ko";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import { FullCalendarComponentType } from "@/types/common";

const FullCalendarComponent = ({ events }: FullCalendarComponentType) => {
  const renderEventContent = (eventInfo: EventContentArg) => {
    const { type } = eventInfo.event._def.extendedProps;
    return (
      <>
        {type !== "important" ? (
          <div className="w-full bg-[#CAD5E8] text-[#343333] text-[14px] font-[700] px-2 py-1 rounded-[5px]">
            {eventInfo.event.title}
          </div>
        ) : (
          <div className="w-full flex space-x-1">
            <Image
              src="/images/star_checked.svg"
              width={0}
              height={0}
              alt="important icon"
              style={{ width: "22px", height: "auto" }}
            />
            <div className="w-full text-[14px] font-[700] overflow-hidden overflow-ellipsis">
              안녕하세요안녕하세요안녕하세요
            </div>
          </div>
        )}
      </>
    );
  };

  function handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  const handleDateClick = (clickInfo: DateClickArg) => {
    console.log(clickInfo);
  };

  return (
    <div>
      <FullCalendar
        height={"1000px"}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={koLocale}
        eventContent={renderEventContent}
        headerToolbar={{
          left: "",
          center: "title",
          right: "prev,next",
        }}
        eventClick={handleEventClick}
        dayMaxEvents={true}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default FullCalendarComponent;
