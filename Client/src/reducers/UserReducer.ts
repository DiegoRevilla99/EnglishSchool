import { createSlice } from "@reduxjs/toolkit";

import { UserSlice } from "@/slices/UserSlice";

import { IPayloadError } from "@/interfaces/IPayloadError";
import { IUser, UserFilled, UserInitial } from "@/interfaces/Formik/IUser";
import User from "@/models/User";

import { errorToast, successToast } from "@/utils";

const initialState = {
  items: new Array<User>(),
  itemSelected: UserInitial,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      const user = UserFilled(
        new User(state.items.find((lev) => lev.id === action.payload))
      );
      state.itemSelected = <IUser>{ ...user };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      UserSlice.endpoints.createUser.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Usuario agregado");
      }
    );
    builder.addMatcher(
      UserSlice.endpoints.createUser.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      UserSlice.endpoints.getAllUsers.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      UserSlice.endpoints.updateUser.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (user) => user.id === action.meta.arg.originalArgs.userId
        );
        state.items[foundIndex] = action.payload;
        successToast("Usuario actualizado");
      }
    );
    builder.addMatcher(
      UserSlice.endpoints.updateUser.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      UserSlice.endpoints.deleteUser.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (user) => user.id === action.meta.arg.originalArgs
        );
        state.items.splice(foundIndex, 1);

        successToast("Usuario eliminado");
      }
    );
    builder.addMatcher(
      UserSlice.endpoints.deleteUser.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectUser } = usersSlice.actions;

export default usersSlice.reducer;
