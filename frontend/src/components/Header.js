import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UserContext from '../slices/UserContext';

const LogOutButton = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { t } = useTranslation();

  if (!currentUser) {
    return null;
  }

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        setCurrentUser(null);
        localStorage.removeItem('user');
      }}
    >
      {t('header.exit')}
    </button>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom">
      <div className="container">
        <a
          className="navbar-brand text-light"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          {t('header.logo')}
        </a>
        <LogOutButton />
      </div>
    </nav>
  );
};

export default Header;
