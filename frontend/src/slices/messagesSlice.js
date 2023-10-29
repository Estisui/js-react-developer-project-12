import { createSlice } from "@reduxjs/toolkit";
import { removeChannel } from "./channelsSlice";

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload.messages;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      state.messages = state.messages.filter(
        (message) => message.channelId !== payload.id,
      );
    });
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
