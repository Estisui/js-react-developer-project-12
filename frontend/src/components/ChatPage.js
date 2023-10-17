import { useEffect, useContext } from "react";
import UserContext from "../slices/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setChannels } from "../slices/channelsSlice";
import { setMessages } from "../slices/messagesSlice";
import cn from "classnames";

const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

const ChatPage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const channelsInfo = useSelector((state) => state.channelsInfo);
  const messagesInfo = useSelector((state) => state.messagesInfo);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      setCurrentUser(userId);
    } else {
      navigate("/login");
    }
  }, [navigate, setCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/api/v1/data", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })
        .then((response) => {
          dispatch(setChannels(response.data));
          dispatch(setMessages(response.data));
        })
        .catch(() => {});
    }
  }, [currentUser, dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <nav className="navbar navbar-expand-lg navbar-light border-bottom">
        <div className="container">
          <a className="navbar-brand text-light" href="/">
            Chat
          </a>
          <button type="button" className="btn btn-primary">
            Выйти
          </button>
        </div>
      </nav>
      <div className="container h-100 my-4 overflow-hidden rounded border border-light">
        <div className="row h-100 flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button
                type="button"
                class="p-0 text-primary btn btn-group-vertical"
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
                <li key={channel.id} className="nav-item w-100">
                  <button
                    type="button"
                    className={cn("w-100 rounded-0 text-start btn", {
                      "btn-outline-secondary":
                        channel.id === channelsInfo.currentChannelId,
                    })}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </button>
                </li>
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
                            channel.id === channelsInfo.currentChannelId
                        ).name
                      : ""}
                  </b>
                </p>
                <span className="text-muted">
                  {
                    messagesInfo.messages.filter(
                      (message) =>
                        message.channelId === channelsInfo.currentChannelId
                    ).length
                  }{" "}
                  {declOfNum(
                    messagesInfo.messages.filter(
                      (message) =>
                        message.channelId === channelsInfo.currentChannelId
                    ).length,
                    ["сообщение", "сообщения", "сообщений"]
                  )}
                </span>
              </div>
              <div
                id="messages-box"
                className="chat-messages overflow-auto px-5"
              >
                {messagesInfo.messages.map((message) => (
                  <div key={message.id} className="text-break mb-2">
                    <b>{message.username}</b>
                    ": "{message.body}
                  </div>
                ))}
              </div>
              <div className="mt-auto px-5 py-3">
                <form novalidate="" className="py-1 border rounded-2">
                  <div className="input-group has-validation">
                    <input
                      name="body"
                      aria-label="Новое сообщение"
                      placeholder="Введите сообщение..."
                      className="border-0 p-0 ps-2 form-control"
                      value=""
                    />
                    <button
                      type="submit"
                      className="btn btn-group-vertical"
                      disabled=""
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
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
