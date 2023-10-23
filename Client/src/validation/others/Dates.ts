import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { DateSelectArg } from "@fullcalendar/core";

export const isMultipleDays = (date: DateSelectArg) => {
  const start = date.start.getDay();
  const end = date.end.getDay();

  return start !== end;
};

export const isSameDay = (date: DateSelectArg) => {
  const start = date.start.getDay();
  const end = date.end.getDay();

  return start === end;
};

export const getNowDate = () => {
  var tzoffset = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
};

export const getDatesBaseOnDay = (dayIndex: number) => {
  const nowIndex = new Date().getDay();
  const finalDate = dayjs();

  // Si es hoy es domingo, pero el argumento dia es distinto a domingo
  if (nowIndex === 0) {
    if (dayIndex !== 0) {
      return finalDate
        .subtract(7 - dayIndex, "days")
        .format()
        .split("T")[0];
    }
  } else {
    if (dayIndex === 0) {
      return finalDate
        .add(7 - nowIndex, "days")
        .format()
        .split("T")[0];
    } else if (dayIndex < nowIndex) {
      return finalDate
        .subtract(nowIndex - dayIndex, "days")
        .format()
        .split("T")[0];
    } else if (dayIndex > nowIndex) {
      return finalDate
        .add(dayIndex - nowIndex, "days")
        .format()
        .split("T")[0];
    }
  }

  return finalDate.format().split("T")[0];
};

export function getDayName(date: Date) {
  const actualDay = date.toLocaleDateString("es-ES", { weekday: "long" });
  return actualDay.charAt(0).toUpperCase() + actualDay.slice(1);
}

export function getDateFromHours(hours: string) {
  const now = new Date().toLocaleDateString();
  return new Date(`${now} ${hours}`);
}

export function isBetweenRange(
  startHour: string,
  endHour: string,
  dateHour: string
) {
  const start = dayjs(startHour);
  const end = dayjs(endHour);
  const date = dayjs(dateHour);

  return (
    date.isBetween(startHour, endHour, "hour", "[]") &&
    date.hour() <= end.hour() &&
    date.hour() >= start.hour()
  );
}
