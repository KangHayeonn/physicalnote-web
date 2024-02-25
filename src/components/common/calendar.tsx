import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import koLocale from "@fullcalendar/core/locales/ko";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import {
  EventClickArg,
  EventContentArg,
  DatesSetArg,
  EventSourceInput,
} from "@fullcalendar/core/index.js";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  dailyDateSelector,
  recordDateSelector,
} from "@/recoil/schedule/scheduleState";
import Api from "@/api/schedule";
import { getDateToString } from "@/utils/dateFormat";
import { searchPlayerGraderSelector } from "@/recoil/search/searchState";
import { ScheduleResponseType } from "@/types/schedule";

const FullCalendarComponent = () => {
  const router = useRouter();
  const [recordDate, setRecordDate] = useRecoilState<Date>(recordDateSelector);
  const searchGrader = useRecoilValue<string>(searchPlayerGraderSelector);
  const setDailyDate = useSetRecoilState<Date>(dailyDateSelector);
  const [events, setEvents] = useState<EventSourceInput>([]);
  const [playerGrader, setPlayerGrader] = useState<string>("");

  function handleEventClick(clickInfo: EventClickArg) {
    const id = clickInfo.event._def.publicId;
    if (id) router.push(`schedule/create/${Number(id)}`);
  }

  const handleDateClick = (clickInfo: DateClickArg) => {
    const date = new Date(clickInfo.date);
    setDailyDate(date);
  };

  const onChangeMonth = ({ startStr }: DatesSetArg) => {
    const date = new Date(startStr);
    date.setDate(date.getDate() + 7);
    setRecordDate(date);
  };

  const getSchedule = async () => {
    const getGrader = () => {
      return playerGrader !== "ALL" ? playerGrader : "";
    };

    await Api.v1GetSchedule(getGrader(), getDateToString(recordDate)).then(
      (res) => {
        const result = res.data;

        const tempEvents: EventSourceInput = [];
        result.map((item: ScheduleResponseType) => {
          tempEvents.push({
            id: item.id.toString(),
            title: item.name,
            start: new Date(item.recordDate),
            type: item.importantYn,
            color: item.colorCodeValue,
          });
        });

        setEvents(tempEvents);
      }
    );
  };

  useEffect(() => {
    getSchedule();
  }, [recordDate, playerGrader]);

  useEffect(() => {
    setPlayerGrader(searchGrader);
  }, [searchGrader]);

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
        dayMaxEvents={2}
        dateClick={handleDateClick}
        datesSet={onChangeMonth}
      />
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const { type } = eventInfo.event._def.extendedProps;

  return (
    <>
      {!type ? (
        <div
          className="w-full text-[#343333] text-[14px] font-[700] px-2 py-1 rounded-[5px] cursor-pointer"
          style={{ backgroundColor: `${eventInfo.event.backgroundColor}` }}
        >
          {eventInfo.event.title}
        </div>
      ) : (
        <div className="w-full flex space-x-1 cursor-pointer">
          <Image
            src="/images/star_checked.svg"
            width={0}
            height={0}
            alt="important icon"
            style={{ width: "22px", height: "auto" }}
          />
          <div className="w-full text-[14px] font-[700] overflow-hidden overflow-ellipsis">
            {eventInfo.event.title}
          </div>
        </div>
      )}
    </>
  );
};

export default FullCalendarComponent;
