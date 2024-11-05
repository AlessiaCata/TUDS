// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../lib/Api';
import Header from './Header';
import "../css/UserForm.css";

const EditUsuarioBody= ({ onUserAdded, user = null }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState(user?.roles || 'user');
  const [isEnabled, setIsEnabled] = useState(user?.isEnabled ?? true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setDisplayName(user.displayName);
      setRoles(user.roles);
      setIsEnabled(user.isEnabled);
    }
  }, [user]);

  const handleSaveUser = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      displayName,
      password: password || undefined, // Solo enviar contraseña si ha sido modificada
      roles, 
      isEnabled,
    };

    const requestOptions = {
      method: user ? 'PATCH' : 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    };

    const url = user ? `user/${user.uuid}` : 'user';

    try {
      await Api.fetch(url, requestOptions);
      alert(user ? 'Usuario Actualizado' : 'Usuario Creado');
      navigate('/UserList');
      if (onUserAdded) onUserAdded();
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  const handleCancel = () => {
    navigate('/UserList');
  };

  return (
    <div>
      <form className="user-form" onSubmit={handleSaveUser}>
        <label>
          Usuario:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            disabled={!!user} // Deshabilitar campo si es edición
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
            placeholder={user ? "Dejar en blanco para mantener" : "Ingresar contraseña"}
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
        <div className="form-buttons">
          <button type="submit">{user ? 'Guardar Cambios' : 'Agregar Usuario'}</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

const EditUsuario = ({ onUserAdded, user = null }) => (
  <div>
    <Header />
    <EditUsuarioBody onUserAdded={onUserAdded} user={user} />
  </div>
);

export default EditUsuario;
