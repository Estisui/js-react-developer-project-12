import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
  type: null,
  id: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpened = true;
      state.type = payload.type;
      state.id = payload.id || null;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.id = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
