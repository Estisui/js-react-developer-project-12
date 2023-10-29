import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesSlice";
import channelsReducer from "./channelsSlice";
import modalReducer from "./modalSlice";

export default configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    modal: modalReducer,
  },
});
