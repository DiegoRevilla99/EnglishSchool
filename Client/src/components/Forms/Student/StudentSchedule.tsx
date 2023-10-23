import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";

import Session from "@/models/Session";

import BookSession from "@/components/Forms/Session/BookSession";

import { IScheduleItem } from "@/interfaces/ICalendar";

import { getDayName } from "@/validation/others/Dates";

import { useLazyGetAllTeachersSessionsByLevelQuery } from "@/slices/SessionSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleOpenOtherModal } from "@/reducers/ModalReducer";

import { useMediaQuery } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { DayHeaderMountArg } from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

const StudentSchedule = ({ dateSelected }: { dateSelected: string }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const calendarApi = calendarRef.current?.getApi();

  const dispatch = useAppDispatch();
  const isWideScreen = useMediaQuery("(min-width:899px)");
  const currentUser = useAppSelector((state) => state.auth.user);

  const [refresh] = useLazyGetAllTeachersSessionsByLevelQuery();

  const [events, setEvents] = useState<IScheduleItem[]>([]);
  const [flag, setFlag] = useState(false);

  const [selected, setSelected] = useState<IScheduleItem>();
  const [clicked, setClicked] = useState<DateClickArg>();
  const [session, setSession] = useState<Session>();

  async function fetchSchedule(query?: string) {
    if (calendarApi) {
      const start = calendarApi.view.activeStart.toISOString();
      const end = calendarApi.view.activeEnd.toISOString();

      const schedule = await refresh(
        query ||
          `?level=${
            currentUser?.level as string
          }&start=${start}&end=${end}&student=${currentUser?.studentId}`
      ).unwrap();

      const newEvents: IScheduleItem[] = [];
      const activeDays = dayjs(calendarApi.view.activeEnd).diff(
        calendarApi?.view.activeStart,
        "days"
      );

      for (let i = 0; i < activeDays; i++) {
        const calendarDayRender = dayjs(calendarApi.view.activeStart).add(
          i,
          "days"
        );
        const dayName = getDayName(calendarDayRender.toDate());
        const dayHoursRange = schedule[dayName];
        const dayFormatted = calendarDayRender.format().split("T")[0];

        if (dayHoursRange) {
          Object.keys(dayHoursRange).forEach((hour) => {
            const teachersAvailable = dayHoursRange[hour];
            if (teachersAvailable.length !== 0) {
              const start = dayjs(`${dayFormatted} ${hour}`);
              const endHour = start
                .add(1, "hour")
                .toDate()
                .toLocaleTimeString();
              const end = new Date(`${dayFormatted} ${endHour}`);

              newEvents.push({
                start: start.toDate(),
                end: end,
                startStr: start.toISOString(),
                endStr: end.toISOString(),
                teachers: teachersAvailable,
                day: dayName,
                display: "background",
                color: "#61B3EA",
              });
            }
          });
        }
      }

      if (currentUser?.sessions) {
        currentUser.sessions.forEach((session) => {
          const start = dayjs(session.sessionDate);
          const end = start.add(session.duration, "minutes");

          newEvents.push({
            start: start.toDate(),
            end: end.toDate(),
            startStr: start.toISOString(),
            endStr: end.toISOString(),
            day: getDayName(start.toDate()),
            display: "background",
            color: start.isBefore(dayjs()) ? "#9703F2" : "#EA583E",
            teachers: [],
          });
        });
      }

      setEvents(newEvents);
    }
  }

  async function renderSchedule() {
    if (calendarApi) {
      const selectedDate = dayjs(dateSelected).hour(0).toDate();
      calendarApi.setOption("now", selectedDate.toISOString());
      calendarApi.destroy();
      calendarApi.render();
      calendarApi.gotoDate(selectedDate);
      await fetchSchedule();
    }
  }

  useEffect(() => {
    fetchSchedule();
  }, [flag, currentUser]);

  useEffect(() => {
    renderSchedule();
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
    <React.Fragment>
      <FullCalendar
        events={events}
        navLinks={true}
        ref={calendarRef}
        locale={esLocale}
        firstDay={0}
        aspectRatio={1.5}
        selectable={true}
        expandRows={true}
        allDaySlot={false}
        slotMinTime={"04:00"}
        slotMaxTime={"24:00"}
        slotDuration={"01:00"}
        initialView={"timeGridWeek"}
        validRange={{ start: new Date() }}
        height={isWideScreen ? "100%" : "30rem"}
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
        dateClick={(clicked: DateClickArg) => {
          const sessionBooked = currentUser?.sessions.find((event) => {
            return clicked.date.toISOString() === event.sessionDate;
          });

          if (sessionBooked) {
            setSession(sessionBooked);
            setClicked(undefined);
            setSelected(undefined);
            dispatch(handleOpenOtherModal());
            return;
          }

          if (dayjs(clicked.dateStr).isBefore(dayjs())) {
            clicked.view.calendar.unselect();
            return;
          }

          const selected =
            events.find((event) => {
              return (
                dayjs(clicked.dateStr).hour() === dayjs(event.startStr).hour()
              );
            }) || ({} as IScheduleItem);

          if (Object.keys(selected).length !== 0) {
            setClicked(clicked);
            setSelected(selected);
            setSession(undefined);
            dispatch(handleOpenOtherModal());
            return;
          }

          clicked.view.calendar.unselect();
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
            `?level=${
              currentUser?.level as string
            }&start=${start}&end=${end}&student=${currentUser?.studentId}`
          );
        }}
      />

      <BookSession session={session} selected={selected} clicked={clicked} />
    </React.Fragment>
  );
};

export default StudentSchedule;
