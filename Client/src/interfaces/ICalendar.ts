import { ITeacherSession } from "./Formik/ISession";

export interface ISchedule {
  day: string;
  startHour: string;
  endHour: string;
}

export interface IScheduleSpot {
  startHour: string;
  teachers: ITeacherSession[];
}

export interface IScheduleItem {
  start: Date;
  end: Date;
  startStr: string;
  endStr: string;
  teachers: ITeacherSession[];
  day: string;
  display: string;
  color: string;
}

export interface IEventItem {
  start: Date;
  end: Date;
  startStr: string;
  endStr: string;
  display: string;
  color: string;
}

export interface IEventuality {
  type: string;
  date: string;
  startHour: string;
  endHour: string;
}
