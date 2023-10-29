import { useContext } from "react";
import UserContext from "../slices/UserContext";

const LogOutButton = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  if (!currentUser) {
    return null;
  }

  return (
    <button type="button" className="btn btn-primary">
      Выйти
    </button>
  );
};

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom">
      <div className="container">
        <a className="navbar-brand text-light" href="/">
          Hexlet Chat
        </a>
        <LogOutButton />
      </div>
    </nav>
  );
};

export default Header;
