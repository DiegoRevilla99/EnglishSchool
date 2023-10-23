import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "@/slices/ApiSlice";

import AuthReducer from "@/reducers/AuthReducer";

import RoleReducer from "@/reducers/RoleReducer";
import UserReducer from "@/reducers/UserReducer";
import StudentReducer from "@/reducers/StudentReducer";
import TeacherReducer from "@/reducers/TeacherReducer";
import LevelReducer from "@/reducers/LevelReducer";
import UnitReducer from "@/reducers/UnitReducer";
import PlanReducer from "@/reducers/PlanReducer";
import SessionReducer from "@/reducers/SessionReducer";
import ModalReducer from "@/reducers/ModalReducer";
import LessonReducer from "@/reducers/LessonReducer";
import TagReducer from "@/reducers/TagReducer";
import PostReducer from "@/reducers/PostReducer";
import CommentReducer from "@/reducers/CommentReducer";

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    // Reducer for auth management
    auth: AuthReducer,
    // Reducers for app content
    roles: RoleReducer,
    users: UserReducer,
    students: StudentReducer,
    teachers: TeacherReducer,
    sessions: SessionReducer,
    plans: PlanReducer,
    levels: LevelReducer,
    units: UnitReducer,
    lessons: LessonReducer,
    posts: PostReducer,
    tags: TagReducer,
    comments: CommentReducer,
    // Reducers for app interaction
    modal: ModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
