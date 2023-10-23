import { createSlice } from "@reduxjs/toolkit";

import { TeacherSlice } from "@/slices/TeacherSlice";

import { IPayloadError } from "@/interfaces/IPayloadError";
import {
  ITeacher,
  TeacherFilled,
  TeacherInitial,
} from "@/interfaces/Formik/ITeacher";
import Teacher from "@/models/Teacher";

import { errorToast, successToast } from "@/utils";

const initialState = {
  items: new Array<Teacher>(),
  itemSelected: TeacherInitial,
};

export const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    selectTeacher: (state, action) => {
      const teacher = TeacherFilled(
        new Teacher(state.items.find((lev) => lev.user.id === action.payload))
      );
      state.itemSelected = <ITeacher>{ ...teacher };
    },
    addEventualityToTeacher: (state, action) => {
      const { teacherId, eventuality } = action.payload;
      if (teacherId === state.itemSelected.teacherId) {
        state.itemSelected.eventualities.push(eventuality);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      TeacherSlice.endpoints.createTeacher.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Profesor agregado");
      }
    );
    builder.addMatcher(
      TeacherSlice.endpoints.createTeacher.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      TeacherSlice.endpoints.addEventuality.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      TeacherSlice.endpoints.getAllTeachers.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      TeacherSlice.endpoints.updateTeacher.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (teacher) => teacher.id === action.meta.arg.originalArgs.teacherId
        );
        state.items[foundIndex] = action.payload;
        successToast("Profesor actualizado");
      }
    );
    builder.addMatcher(
      TeacherSlice.endpoints.updateTeacher.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      TeacherSlice.endpoints.updateSchedule.matchFulfilled,
      (state, action) => {
        successToast("Horario actualizado");
      }
    );
    builder.addMatcher(
      TeacherSlice.endpoints.updateSchedule.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      TeacherSlice.endpoints.deleteTeacher.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (teacher) => teacher.user.id === action.meta.arg.originalArgs
        );
        state.items.splice(foundIndex, 1);

        successToast("Profesor eliminado");
      }
    );
    builder.addMatcher(
      TeacherSlice.endpoints.deleteTeacher.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectTeacher, addEventualityToTeacher } = teachersSlice.actions;

export default teachersSlice.reducer;
