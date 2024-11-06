// src/components/UserForm.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Api } from '../lib/Api';
import Header from './Header';
import "../css/UserForm.css";
import { patch } from '@mui/material';

const UserFormBody = () => {
  const {uuid} = useParams();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState('user'); // Establecer un valor por defecto
  const [isEnabled, setIsEnabled] = useState(true);
  const [error, setError] = useState('');
  const [tituloDelBoton, setTituloDelBoton] = useState('Agregar usuario');
  const navigate = useNavigate();

  useEffect(() => {
    setUsername('');
    setDisplayName('');
    setPassword('');
    setRoles('');
    setIsEnabled(true);

    getUser(uuid);
    if (uuid) {
      setTituloDelBoton('Modificar Usuario');
    } else {
      setTituloDelBoton('Agregar Usuario');
    }

  }, [uuid]);

  async function getUser(uuid) {
    if (!uuid) {
      return;
    }

    try { 
      const res = await Api.fetch(`user/${uuid}`);
      if (!res) {
        return;
      }

      const list = await res.json();
      if (!list || !list.length) {
        return;
      }

      const item = list[0];
      
      setUsername(item.username);
      setDisplayName(item.displayName);
      setPassword('');
      setRoles(item.roles);
      setIsEnabled(item.isEnabled);
    } catch {}
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
   
    const newUser = {
      username,
      displayName,
      roles, 
      isEnabled,
    };

    if (password) {
      newUser.password = password;
    }

    let service = 'user';
    let method = 'POST';

    if (uuid) {
      method = 'PATCH';
      service += `/${uuid}`;
    }

    Api.fetch(service, { method, body: JSON.stringify(newUser), headers: { 'Content-Type': 'application/json' } })
      .then(() => {
        alert('Usuario Creado');
        navigate('/UserList');
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
            autoComplete=''
          />
        </label>
        <label>
          Roles:
          <select 
            value={roles} 
            onChange={(e) => setRoles(e.target.value)} 
            required
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <label>
          Habilitado:
          <input 
            type="checkbox" 
            checked={isEnabled} 
            onChange={(e) => setIsEnabled(e.target.checked)} 
          />
        </label>
        <button type="submit">{tituloDelBoton}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

const UserForm = () => (
  <div>
    <Header />
    <UserFormBody />
  </div>
);

export default UserForm;
