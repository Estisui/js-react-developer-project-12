import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: "channelsInfo",
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
    removeChannel: (state, { payload }) => {
      if (payload.id === state.currentChannelId) {
        state.currentChannelId = 1;
      }
      state.channels = state.channels.filter(
        (channel) => channel.id !== payload.id,
      );
    },
    renameChannel: (state, { payload }) => {
      state.channels.find((channel) => channel.id === payload.id).name =
        payload.name;
    },
  },
});

export const {
  setChannels,
  setCurrentChannelId,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
