import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";

import Session from "@/models/Session";

import BookSession from "@/components/Forms/Session/BookSession";

import { IEventItem } from "@/interfaces/ICalendar";

import { useLazyGetAllSessionsBetweenDatesQuery } from "@/slices/SessionSlice";
import { useAppSelector } from "@/hooks/useRedux";

import { useMediaQuery } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { DayHeaderMountArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";

const StudentEventSchedule = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const calendarApi = calendarRef.current?.getApi();

  const isWideScreen = useMediaQuery("(min-width:899px)");
  const student = useAppSelector((state) => state.students.itemSelected);

  const [refresh] = useLazyGetAllSessionsBetweenDatesQuery();

  const [events, setEvents] = useState<IEventItem[]>([]);
  const [session, setSession] = useState<Session>();
  const [flag, setFlag] = useState(false);

  async function fetchSchedule(query?: string) {
    if (calendarApi) {
      const start = calendarApi.view.activeStart.toISOString();
      const end = calendarApi.view.activeEnd.toISOString();

      const schedule = await refresh(
        query || `?id=${student.studentId}&start=${start}&end=${end}`
      ).unwrap();

      setEvents(
        schedule.map((session: Session) => {
          const start = dayjs(session.sessionDate).toDate();
          const end = dayjs(session.sessionDate)
            .add(session.duration, "minutes")
            .toDate();

          return {
            start: start,
            end: end,
            startStr: start.toISOString(),
            endStr: end.toISOString(),
            display: "background",
            color: "purple",
          };
        })
      );
    }
  }

  useEffect(() => {
    fetchSchedule();
  }, [flag, isWideScreen]);

  const addDayNameToDisabledHeader = (cell: DayHeaderMountArg) => {
    if (cell.isDisabled) {
      const span = document.createElement("a");
      span.className = "fc-col-header-cell-cushion";
      span.innerText = cell.text;
      cell.el.firstChild?.appendChild(span);
    }
  };

  return (
    <React.Fragment>
      <FullCalendar
        events={events}
        navLinks={true}
        ref={calendarRef}
        locale={esLocale}
        aspectRatio={1.5}
        selectable={false}
        expandRows={true}
        allDaySlot={false}
        slotMinTime={"04:00"}
        slotMaxTime={"24:00"}
        slotDuration={"01:00"}
        initialView={"timeGridWeek"}
        height={isWideScreen ? "100%" : "30rem"}
        validRange={{ start: new Date() }}
        plugins={[timeGridPlugin, interactionPlugin]}
        dayHeaderFormat={{ weekday: isWideScreen ? "long" : "short" }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
        }}
        headerToolbar={{
          left: "prevButton",
          center: "title",
          right: "nextButton",
        }}
        dayHeaderDidMount={async (cell: DayHeaderMountArg) => {
          addDayNameToDisabledHeader(cell);
        }}
        customButtons={{
          prevButton: {
            icon: "chevron-left",
            click: async function () {
              calendarApi?.prev();
              await fetchSchedule();
            },
          },
          nextButton: {
            icon: "chevron-right",
            click: async function () {
              calendarApi?.next();
              await fetchSchedule();
            },
          },
        }}
        viewDidMount={async (mounted) => {
          const start = mounted.view.activeStart.toISOString();
          const end = mounted.view.activeEnd.toISOString();
          mounted.view.calendar.prev();

          setFlag(true);
          await fetchSchedule(
            `?id=${student.studentId}&start=${start}&end=${end}`
          );
        }}
      />

      <BookSession session={session} selected={undefined} clicked={undefined} />
    </React.Fragment>
  );
};

export default StudentEventSchedule;
