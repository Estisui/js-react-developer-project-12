import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';
import Page404 from './components/Page404';
import UserContext from './slices/UserContext';
import SignUp from './components/SignUp';

const App = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null,
  );

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
