import React from 'react';
import logo from './Datacom-Primary-Logo-RGB.svg';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
        <div className="header-inner">
            <img src={logo} alt="Datacom Logo" className="logo" />
      </div>
    </header>
  );
};

export default Header;