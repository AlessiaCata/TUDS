import React from 'react';
import { Link } from 'react-router-dom';

// Definición de los elementos del menú
const items = [
  {
    key: 'login',
    to: '/login',
    label: 'Login',
    roles: [],
  },
  {
    key: 'user-list',
    to: '/user-list',
    label: 'Usuarios',
    roles: ['admin'],
  },
  {
    key: 'opcion-1',
    to: '/option-1',
    label: 'Opcion 1',
    roles: ['user'],
  },
  {
    key: 'opcion-2',
    to: '/option-2',
    label: 'Opcion 2',
    roles: ['user', 'admin'],
  },
];

// Función para filtrar los elementos del menú según los roles
const getFilteredItems = (roles) => {
  if (roles.length === 0) {
    // Mostrar solo items sin roles específicos
    return items.filter(item => item.roles.length === 0);
  } else {
    // Mostrar items cuyo rol coincida con los roles proporcionados
    return items.filter(item => item.roles.some(role => roles.includes(role)));
  }
};

const Menu = ({ menuVisibility, roles = [] }) => {
  // Obtener elementos filtrados según los roles
  const filteredItems = getFilteredItems(roles);

  // Crear la lista de enlaces del menú
  const lista = filteredItems.map(item => (
    <li key={item.key}>
      <Link to={item.to}>{item.label}</Link>
    </li>
  ));

  return (
    <nav id="mainMenu" style={{ display: menuVisibility ? 'block' : 'none' }}>
      <ul>
        {lista}
      </ul>
    </nav>
  );
};

export default Menu;




/*const Menu = ({ menuVisibility }) => {
  return (
    <div id="mainMenu" style={{ display: menuVisibility ? 'block' : 'none' }}>
      <Link to="/UserList">Usuarios</Link>
      <Link to="/Login">Login</Link>
      <Link to="/UserForm">UserForm</Link>

    </div>
  );
}; 

export default Menu; */
