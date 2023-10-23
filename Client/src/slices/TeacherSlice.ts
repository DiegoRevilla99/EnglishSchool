import { IEventuality, ISchedule } from "@/interfaces/ICalendar";
import { ApiSlice } from "./ApiSlice";
import { ITeacher } from "@/interfaces/Formik/ITeacher";

export const TeacherSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTeacher: builder.mutation({
      query: (teacher: ITeacher) => ({
        url: "/teachers",
        method: "POST",
        body: { ...teacher },
      }),
    }),
    addEventuality: builder.mutation({
      query: ({
        teacherId,
        eventuality,
      }: {
        teacherId: string;
        eventuality: IEventuality;
      }) => ({
        url: "/teachers/eventuality",
        method: "POST",
        body: { id: teacherId, eventuality: eventuality },
      }),
    }),
    getAllTeachers: builder.query({
      query: () => "/teachers",
    }),
    getOneTeacher: builder.query({
      query: (id: string) => `/teachers/${id}`,
    }),
    updateTeacher: builder.mutation({
      query: (teacher: ITeacher) => ({
        url: "/teachers",
        method: "PUT",
        body: { ...teacher },
      }),
    }),
    updateSchedule: builder.mutation({
      query: ({
        teacherId,
        schedule,
      }: {
        teacherId: string;
        schedule: ISchedule[];
      }) => ({
        url: `/teachers/schedule`,
        method: "PUT",
        body: { id: teacherId, schedule: schedule },
      }),
    }),
    resetTeacherPassword: builder.mutation({
      query: (teacher: ITeacher) => ({
        url: "/teachers/reset",
        method: "PUT",
        body: { ...teacher },
      }),
    }),
    deleteTeacher: builder.mutation({
      query: (id: string) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTeacherMutation,
  useAddEventualityMutation,
  useGetAllTeachersQuery,
  useLazyGetAllTeachersQuery,
  useGetOneTeacherQuery,
  useLazyGetOneTeacherQuery,
  useResetTeacherPasswordMutation,
  useUpdateTeacherMutation,
  useUpdateScheduleMutation,
  useDeleteTeacherMutation,
} = TeacherSlice;
