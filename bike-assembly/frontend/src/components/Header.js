import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.scss'

const Header = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <header className="header">
      <>
        <img src={process.env.PUBLIC_URL + '/logo.png'} />
        <h1>Bike Point</h1>
      </>
      <nav>
        <button onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
