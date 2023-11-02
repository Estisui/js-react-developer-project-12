import { useEffect, useContext, useState } from "react";
import UserContext from "../slices/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addChannel,
  setChannels,
  removeChannel,
  renameChannel,
} from "../slices/channelsSlice";
import { addMessage, setMessages } from "../slices/messagesSlice";
import { socket } from "../socket";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import getModal from "../modals";
import { openModal } from "../slices/modalSlice";
import ChannelButton from "./channelButton";
import Header from "./Header";
import { useTranslation } from "react-i18next";

const ChatPage = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const channelsInfo = useSelector((state) => state.channelsInfo);
  const messagesInfo = useSelector((state) => state.messagesInfo);
  const modal = useSelector((state) => state.modal);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    socket.on("newMessage", (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on("newChannel", (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on("removeChannel", (payload) => {
      dispatch(removeChannel(payload));
    });
    socket.on("renameChannel", (payload) => {
      dispatch(renameChannel(payload));
    });

    return () => socket.removeAllListeners();
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/api/v1/data", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })
        .then((response) => {
          setIsAuthorized(true);
          dispatch(setChannels(response.data));
          dispatch(setMessages(response.data));
          socket.connect();
        })
        .catch(() => navigate("/login"));
    }

    return () => socket.disconnect();
  }, [currentUser, dispatch, navigate]);

  const renderModal = ({ isOpened, type, id }) => {
    if (!isOpened) {
      return null;
    }

    const Component = getModal(type);
    return <Component id={id} />;
  };

  const MessageForm = () => {
    const formik = useFormik({
      initialValues: {
        message: "",
      },
      onSubmit: (values) => {
        socket.emit("newMessage", {
          body: values.message,
          channelId: channelsInfo.currentChannelId,
          username: currentUser.username,
        });
      },
    });

    return (
      <Form
        novalidate=""
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <Form.Group className="input-group has-validation">
          <Form.Control
            name="message"
            id="message"
            autoFocus
            aria-label={t("messages.new")}
            placeholder={t("messages.enter")}
            className="border-0 p-0 ps-2"
            value={formik.values.message}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            className="btn-group-vertical border-0 focus-ring"
            variant=""
            disabled={!formik.values.message}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              ></path>
            </svg>
            <span className="visually-hidden">{t("send")}</span>
          </Button>
        </Form.Group>
      </Form>
    );
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded border border-light">
        <div className="row h-100 flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t("channels")}</b>
              <button
                type="button"
                class="p-0 text-primary btn btn-group-vertical"
                onClick={() => dispatch(openModal({ type: "adding" }))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ul
              id="channels-box"
              className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
            >
              {channelsInfo.channels.map((channel) => (
                <ChannelButton channel={channel} />
              ))}
            </ul>
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="mb-4 p-3 small border-bottom">
                <p className="m-0">
                  <b>
                    #{" "}
                    {channelsInfo.currentChannelId
                      ? channelsInfo.channels.find(
                          (channel) =>
                            channel.id === channelsInfo.currentChannelId,
                        ).name
                      : ""}
                  </b>
                </p>
                <span className="text-muted">
                  {
                    messagesInfo.messages.filter(
                      (message) =>
                        message.channelId === channelsInfo.currentChannelId,
                    ).length
                  }{" "}
                  {t("messages.message", {
                    count: messagesInfo.messages.filter(
                      (message) =>
                        message.channelId === channelsInfo.currentChannelId,
                    ).length,
                  })}
                </span>
              </div>
              <div
                id="messages-box"
                className="chat-messages overflow-auto px-5"
              >
                {messagesInfo.messages
                  .filter(
                    (message) =>
                      message.channelId === channelsInfo.currentChannelId,
                  )
                  .map((message) => (
                    <div key={message.id} className="text-break mb-2">
                      <b>{message.username}</b>: {message.body}
                    </div>
                  ))}
              </div>
              <div className="mt-auto px-5 py-3">
                <MessageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModal(modal)}
    </div>
  );
};

export default ChatPage;
