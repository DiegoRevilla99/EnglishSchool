import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openCreate: false,
  openEdit: false,
  openOther: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleOpenCreateModal: (state) => {
      state.openCreate = true;
    },
    handleOpenEditModal: (state) => {
      state.openEdit = true;
    },
    handleOpenOtherModal: (state) => {
      state.openOther = true;
    },
    handleCloseCreateModal: (state) => {
      state.openCreate = false;
    },
    handleCloseEditModal: (state) => {
      state.openEdit = false;
    },
    handleCloseOtherModal: (state) => {
      state.openOther = false;
    },
  },
});

export const {
  handleOpenCreateModal,
  handleOpenEditModal,
  handleOpenOtherModal,
  handleCloseCreateModal,
  handleCloseEditModal,
  handleCloseOtherModal,
} = modalSlice.actions;

export default modalSlice.reducer;
