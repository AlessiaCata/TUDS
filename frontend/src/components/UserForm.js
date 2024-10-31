// src/components/UserForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../lib/Api';
import Header from './Header';
import "../css/UserForm.css";

const UserFormBody = ({ onUserAdded }) => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [roles, setRoles] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      displayName,
      roles: roles.split(',').map(role => role.trim()),
      isEnabled,
    };

    try {
      const response = await Api('user', 'POST', newUser);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Llama a la función para recargar la lista de usuarios
      onUserAdded(); 
      navigate('/userlist'); // Navega a la lista de usuarios al agregar
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
    }
  };

  return (
    <div>
      <form className="user-form" onSubmit={handleAddUser}>
        <label>
          Usuario:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </label>
        <label>
          Nombre:
          <input 
            type="text" 
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)} 
            required 
          />
        </label>
        <label>
          Roles (separados por coma):
          <input 
            type="text" 
            value={roles} 
            onChange={(e) => setRoles(e.target.value)} 
            required 
          />
        </label>
        <label>
          Habilitado:
          <input 
            type="checkbox" 
            checked={isEnabled} 
            onChange={(e) => setIsEnabled(e.target.checked)} 
          />
        </label>
        <button type="submit">Agregar Usuario</button>
      </form>
    </div>
  );
};

const UserForm = ({ onUserAdded }) => (
  <div>
    <Header />
    <UserFormBody onUserAdded={onUserAdded} />
  </div>
);

export default UserForm;
