import { useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId) {
      setCurrentUser(userId);
    } else {
      navigate('/login');
    }
  });
  
  return(
    <div>
      <h1>CHAT</h1>
    </div>
  );
};

export default ChatPage;