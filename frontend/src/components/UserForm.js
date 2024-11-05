// src/components/UserForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../lib/Api';
import Header from './Header';
import "../css/UserForm.css";


const UserFormBody = ({ onUserAdded }) => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      displayName,
      password,
      roles, 
      isEnabled,
    };

    Api.fetch('user', { method: 'POST', body: JSON.stringify(newUser), headers: { 'Content-Type': 'application/json' } })
      .then(() => {
        alert('Usuario Creado');
        navigate('/UserList');
        if (onUserAdded) onUserAdded();
      })
      .catch(e => {
        console.error(e);
        setError(e.message);
      });
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
          Contraseña:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
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
      {error && <p className="error">{error}</p>}
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

