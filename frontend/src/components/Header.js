import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../css/Header.css';
import Salir from './Salir.js'; 

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
      
      <Link to="/" id="titulo">
        ADOPTAYA.COM
      </Link>

      <div id="sidebar" className={isSidebarOpen ? 'open' : ''}>
        <ul>
          {roles.length > 0 ? ( // Verificar si el usuario está autenticado
            <>
              {roles.includes("admin") && (
                <>
                  <li><Link to="/UserList" className='item1'>Usuarios</Link></li>
                  <li><Link to="/UserForm" className='item3'>Agregar usuario</Link></li>
                </>
              )}
              {/* Botón Salir aparece solo si el usuario ha iniciado sesión */}
              <li>
                <Salir /> {/* El botón de Salir */}
              </li>
            </>
          ) : (
            // Si el usuario no está autenticado, muestra solo el enlace de Login
            <li><Link to="/Login" className='item2'>Login</Link></li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;

