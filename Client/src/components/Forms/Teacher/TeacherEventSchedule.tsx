import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

import Session from "@/models/Session";

import { days } from "@/utils";
import { IEventItem, IEventuality } from "@/interfaces/ICalendar";
import { useLazyGetAllSessionsBetweenDatesQuery } from "@/slices/SessionSlice";

import { useMediaQuery } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { DayHeaderMountArg } from "@fullcalendar/core";

const TeacherEventSchedule = ({
  dateSelected,
  eventualities,
  teacherId,
}: {
  dateSelected?: string;
  eventualities: IEventuality[];
  teacherId: string;
}) => {
  const calendarRef = useRef<FullCalendar>(null);
  const calendarApi = calendarRef.current?.getApi();

  const isWideScreen = useMediaQuery("(min-width:899px)");

  const [refresh] = useLazyGetAllSessionsBetweenDatesQuery();

  const [events, setEvents] = useState<IEventItem[]>([]);
  const [flag, setFlag] = useState(false);

  async function fetchSchedule(query?: string) {
    if (calendarApi) {
      const start = calendarApi.view.activeStart.toISOString();
      const end = calendarApi.view.activeEnd.toISOString();

      const schedule = await refresh(
        query || `?id=${teacherId}&start=${start}&end=${end}`
      ).unwrap();

      const scheduleEvents = schedule.map((session: Session) => {
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
      });

      const eventualitiesEvents = eventualities
        .map((eventuality) => {
          const date = dayjs(eventuality.date).toDate();
          const startHours = new Date(
            eventuality.startHour
          ).toLocaleTimeString();
          const endHours = new Date(eventuality.endHour).toLocaleTimeString();

          const day = days[date.getDay()];

          const event = {
            day: day,
            start: new Date(`${date.toLocaleDateString()} ${startHours}`),
            end: new Date(`${date.toLocaleDateString()} ${endHours}`),
            display: "background",
            color: eventuality.type === "Ausencia" ? "#2C3D4F" : "#EA583E",
            overlap: false,
          };

          if (calendarApi) {
            const endDay = calendarApi.view.activeEnd;
            return dayjs(date).isAfter(endDay) ? undefined : event;
          }
        })
        .filter((event) => event);

      setEvents([...scheduleEvents, ...eventualitiesEvents]);
    }
  }

  async function renderSchedule() {
    if (calendarApi) {
      const selectedDate = dayjs(dateSelected);
      calendarApi?.setOption("now", selectedDate.toISOString());
      calendarApi?.destroy();
      calendarApi?.render();
      calendarApi?.gotoDate(selectedDate.toDate());

      await fetchSchedule();
    }
  }

  useEffect(() => {
    fetchSchedule();
  }, [flag, eventualities]);

  useEffect(() => {
    if (dateSelected) {
      renderSchedule();
    }
  }, [dateSelected, isWideScreen]);

  const addDayNameToDisabledHeader = (cell: DayHeaderMountArg) => {
    if (cell.isDisabled) {
      const span = document.createElement("a");
      span.className = "fc-col-header-cell-cushion";
      span.innerText = cell.text;
      cell.el.firstChild?.appendChild(span);
    }
  };

  return (
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
        await fetchSchedule(`?id=${teacherId}&start=${start}&end=${end}`);
      }}
    />
  );
};

export default TeacherEventSchedule;
