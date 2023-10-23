export interface ISchedule {
  day: string;
  startHour: string;
  endHour: string;
}

export interface IEventuality {
  type: string;
  date: string;
  startHour: string;
  endHour: string;
}

export interface ScheduleBlockTeacher {
  name: string;
  teacherId: string;
  userId: string;
}

export interface ScheduleBlockByDay {
  [day: string]: {
    [hour: string]: ScheduleBlockTeacher[];
  };
}
