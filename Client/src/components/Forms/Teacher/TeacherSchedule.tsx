import("@/assets/css/calendar.css");

import { useRef } from "react";

import { Box, useMediaQuery } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventInput } from "@fullcalendar/core";
import esLocale from "@fullcalendar/core/locales/es";

import IFormikProps from "@/interfaces/IFormikProps";
import { ISchedule } from "@/interfaces/ICalendar";

import { getDatesBaseOnDay, isMultipleDays } from "@/validation/others/Dates";

const TeacherSchedule = ({ formik }: IFormikProps) => {
  const isSmallScreen = useMediaQuery("(max-width:899px)");
  const schedule: ISchedule[] = formik.values.schedule;

  const calendarRef = useRef<FullCalendar>(null);
  const days = [
    "Domingo", // 0
    "Lunes", // 1
    "Martes", // 2
    "Miércoles", // 3
    "Jueves", // 4
    "Viernes", // 5
    "Sábado", // 6
  ];

  const assignHour = (eventSelected: DateSelectArg) => {
    let newSchedule: ISchedule[] = [...formik.values.schedule];
    const daySelected = days[eventSelected.start.getDay()];

    if (isMultipleDays(eventSelected)) {
      eventSelected.view.calendar.unselect();
      return;
    }

    const dayIndex = newSchedule.findIndex(
      (events) => events.day === daySelected
    );

    const dayDetail: EventInput = {
      day: daySelected,
      startHour: eventSelected.start.toLocaleTimeString(),
      endHour: eventSelected.end.toLocaleTimeString(),
    };

    if (dayIndex === -1) {
      newSchedule.push(dayDetail as ISchedule);
    } else {
      newSchedule[dayIndex] = dayDetail as ISchedule;
    }

    formik.setFieldValue("schedule", newSchedule);
  };

  return (
    <Box
      sx={{
        textTransform: "uppercase",
        height: "100%",
      }}
    >
      <FullCalendar
        height={isSmallScreen ? "30rem" : "100%"}
        aspectRatio={1.5}
        navLinks={true}
        ref={calendarRef}
        locale={esLocale}
        selectable={true}
        expandRows={true}
        allDaySlot={false}
        select={assignHour}
        slotMinTime={"04:00"}
        slotMaxTime={"24:00"}
        headerToolbar={false}
        slotDuration={"01:00"}
        events={schedule
          .map((day) => {
            const dayIndex = days.indexOf(day.day);
            const offsetDate = getDatesBaseOnDay(dayIndex);

            const event = {
              day: day.day,
              start: new Date(`${offsetDate} ${day.startHour}`),
              end: new Date(`${offsetDate} ${day.endHour}`),
              display: "background",
              overlap: false,
            };
            return event;
          })
          .filter((event) => event)}
        initialView={"timeGridWeek"}
        dayHeaderFormat={{ weekday: "long" }}
        plugins={[timeGridPlugin, interactionPlugin]}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
        }}
      />
    </Box>
  );
};

export default TeacherSchedule;
