import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="top-header">
      <button onClick={toggleSidebar} id="menu-button">
        ☰ Menu
      </button>
      <span id="titulo">ADOPTAYA.COM</span>
      {isSidebarOpen && (
        <div id="sidebar">
          <ul>
            <li><Link to="/UserList" className='item1'>Usarios</Link></li>
            <li><Link to="/Login" className='item2'>Login</Link></li>
            <li><Link to="/UserForm" className='item3'>UserForm</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
