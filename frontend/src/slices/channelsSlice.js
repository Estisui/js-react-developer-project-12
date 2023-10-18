import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
    },
  },
});

export const { setChannels, setCurrentChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;
