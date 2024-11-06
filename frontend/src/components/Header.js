import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Recuperar información de autenticación desde localStorage
  const rolesJSON = localStorage.getItem("roles");
  const roles = rolesJSON ? JSON.parse(rolesJSON) : [];

  return (
    <div id="top-header">
      <button onClick={toggleSidebar} id="menu-button">
        ☰ Menu
      </button>
      <span id="titulo">ADOPTAYA.COM</span>
      <div id="sidebar" className={isSidebarOpen ? 'open' : ''}>
        <ul>
          {roles.includes("admin") && (
            <>
              <li><Link to="/UserList" className='item1'>Usuarios</Link></li>
              <li><Link to="/UserForm" className='item3'>Agregar usuario</Link></li>
            </>
          )}
          <li><Link to="/Login" className='item2'>Login</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
