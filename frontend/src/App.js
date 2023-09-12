import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Page404 from './components/Page404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
